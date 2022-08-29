/**
 * User class
 */

import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import {
  doc, getDoc, query, collection, where, updateDoc, arrayUnion, getDocs, orderBy,
  arrayRemove, addDoc, deleteDoc,
} from 'firebase/firestore';
import {
  getDownloadURL, ref, uploadBytes,
} from 'firebase/storage';
import { QSELECT } from '../consts';
import Router from '../router';
import Elements from './Elements';
import UserGroup from './UserGroup';

class User extends UserGroup {
  constructor(
    email,
    username,
    firstName,
    lastName,
    phoneNumber,
    uid,
    avatar,
    password,
  ) {
    super();
    this.email = email;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.uid = uid;
    this.avatar = avatar;
    this.password = password;
  }

  /**
   * @returns function to add friends you selected to add
   */
  async addFriends() {
    await this.setUserInfo();
    const SelectedFriendsArray = document.querySelectorAll('.add-people input:checked');
    SelectedFriendsArray.forEach(async (friend) => {
      await updateDoc(doc(this.firestore, 'Users', JSON.parse(localStorage.getItem('user')).uid), {
        friendRequests: arrayUnion(friend.id),
      });
    });
  }

  /**
   * @param {*} component the componentContainer to clear and re-render when friend request is shown
   * @returns a friend request overlay that gives you the option to accept or reject a friend
   * request
   */
  async showFriendRequest(component) {
    const q = query(collection(this.firestore, 'Users'), where('friendRequests', 'array-contains', this.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const inviteContainer = QSELECT('.friends-container__invitation-container');
      if (doc.exists()) {
        inviteContainer.appendChild(
          Elements.createInviteButton({
            textContent: `${doc.data().username} <i class='fas fa-chevron-circle-right fa-lg'></i>`,
            classname: 'invitation__button',
            eventUID: doc.data().uid,
            onClick: async () => {
              QSELECT('.friend-list-container').innerHTML = '';
              const friendContainer = QSELECT('.friend-list-container');
              console.log(friendContainer);
              Elements.createFriendRequestOverlay({
                container: friendContainer,
                doc: doc.data(),
                acceptOnClick: async () => {
                  await this.acceptFriendRequest(doc.data().uid, this.uid).then(() => {
                    component.clearComponentContainer();
                    component.renderAsync();
                  });
                },
                rejectOnClick: () => {
                  this.rejectFriendRequest(doc.data().uid);
                  component.clearComponentContainer();
                  component.renderAsync();
                },
              });
            },
          }),
        );
      }
    });
  }

  /**
   * @param {*} friendID the uid of the friend
   * @param {*} userID  the uid of the user
   * @returns updates the firestore of both friend and user document -> Id's in friends field
   */
  async acceptFriendRequest(friendID, userID) {
    const docRef = doc(this.firestore, 'Users', friendID);
    await updateDoc(docRef, {
      friends: arrayUnion(this.uid),
      friendRequests: arrayRemove(this.uid),
    });
    const docRef2 = doc(this.firestore, 'Users', userID);
    await updateDoc(docRef2, {
      friends: arrayUnion(friendID),
      friendRequests: arrayRemove(friendID),
    });

    const chatroomCreate = await addDoc(collection(this.firestore, 'Chatrooms'), {
      usersUID: [friendID, userID],
    });

    await updateDoc(doc(this.firestore, 'Chatrooms', chatroomCreate.id), {
      chatroomUID: chatroomCreate.id,
    });
  }

  /**
   * @param {*} friendID the uid of the friend
   * @returns deletes the users uid out of the friendRequest array in friends firestore document
   */
  async rejectFriendRequest(friendID) {
    const docRef = doc(this.firestore, 'Users', friendID);
    await updateDoc(docRef, {
      friendRequests: arrayRemove(this.uid),
    });
  }

  /**
   * @param {*} friendUID the uid of the friend
   * @returns function to remove a friend out of the users and friends firestore docoument +
   * removes the chatroom they both share
   */
  async removeFriend(friendUID, UserID) {
    await updateDoc(doc(this.firestore, 'Users', UserID), {
      friends: arrayRemove(friendUID),
    });

    await updateDoc(doc(this.firestore, 'Users', friendUID), {
      friends: arrayRemove(UserID),
    });

    const q = query(collection(this.firestore, 'Chatrooms'), where('usersUID', 'array-contains', friendUID));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (docs) => {
      if (docs.data().usersUID.includes(UserID)) {
        const docRef = doc(this.firestore, 'Chatrooms', docs.data().chatroomUID);
        await deleteDoc(docRef);
      }
    });
  }

  /**
   * @param {*} friendUID the uid of the friend
   * @returns gets the data of a specific friend
   */
  async getSpecificFriend(friendUID) {
    const docRef = doc(this.firestore, 'Users', friendUID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      localStorage.setItem('friend', JSON.stringify(docSnap.data()));
    }
  }

  /**
   * @param {*} componentContainer componentContainer of component (this.componentContainer)
   * @returns Shows all your friends in the friends list
   */
  async showFriends(componentContainer) {
    this.friends.forEach(async (friend) => {
      const q = query(collection(this.firestore, 'Users'), where('uid', '==', friend), orderBy('username'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const friendsContainer = QSELECT('.friends-container');
        if (doc.exists()) {
          friendsContainer.appendChild(
            Elements.createFriendCard({
              url: doc.data().avatarImageUrl,
              username: doc.data().username,
              deleteID: doc.data().uid,
              onClick: () => {
                Elements.createFriendDeleteOverlay({
                  container: QSELECT('.friend-list-container'),
                  doc: doc.data(),
                  componentContainer,
                });
              },
            }),
          );
        } else {
          console.log('no data');
        }
      });
    });
  }

  /**
   * @returns Sets the users info into the fields for later use
   */
  async setUserInfo() {
    const docRef = doc(this.firestore, 'Users', JSON.parse(localStorage.getItem('user')).uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.email = docSnap.data().email;
      this.username = docSnap.data().username;
      this.firstName = docSnap.data().firstName;
      this.lastName = docSnap.data().lastName;
      this.phoneNumber = docSnap.data().phoneNumber;
      this.uid = JSON.parse(localStorage.getItem('user')).uid;
      this.avatar = docSnap.data().avatarImageUrl;

      const fullName = `${this.firstName} ${this.lastName}`;
      const { email } = this;
      localStorage.setItem('fullName', fullName);
      localStorage.setItem('email', email);
    }
  }

  /**
   * @returns checks if the are Friends has any friends
   */
  async checkIfFriends() {
    const q = query(collection(this.firestore, 'Users'), where('Friends', '==', true));
    const querySnapshot = await getDoc(q);
    if (querySnapshot.exists()) {
      return true;
    }

    return false;
  }

  /**
   * @param {*} imagePath the path of where the image is stored
   * @returns a function to upload your own avatar to the firebase storage
   */
  async uploadAvatar(imagePath) {
    const imagesRef = ref(this.storage, `userAvatar/avatar-${JSON.parse(localStorage.getItem('user')).uid}`);
    const pathRef = ref(this.storage, `userAvatar/avatar-${JSON.parse(localStorage.getItem('user')).uid}`);

    await uploadBytes(imagesRef, imagePath).then((snapshot) => {
    }).then(() => {
      getDownloadURL(ref(this.storage, pathRef))
        .then((url) => {
          this.updateUserImage(url);
        });
    });
  }

  /**
   * @returns Gets the urlPath of where the users image is stored
   */
  async getAvatar() {
    const docRef = doc(this.firestore, 'Users', JSON.parse(localStorage.getItem('user')).uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      localStorage.setItem('avatarImageUrl', docSnap.data().avatarImageUrl);
    }
  }

  /**
   * @param {*} url the url of the image
   * @returns updates the url into the users firestore document
   */
  async updateUserImage(url) {
    await updateDoc(doc(this.firestore, 'Users', JSON.parse(localStorage.getItem('user')).uid), {
      avatarImageUrl: url,
    });
  }

  /**
   * @param {*} username username of the user
   * @param {*} firstName user's first name
   * @param {*} lastName  user's last name
   * @param {*} phoneNumber user's phone number
   * @returns updates the users info into the users firestore document
   */
  async updateUserInfo(username, firstName, lastName, phoneNumber) {
    await updateDoc(doc(this.firestore, 'Users', JSON.parse(localStorage.getItem('user')).uid), {
      username,
      firstName,
      lastName,
      phoneNumber,
    });
  }

  /**
   * @returns the date of when the event was created
   */
  getCreationDate() {
    const dateObj = new Date();
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const sDay = dateObj.toLocaleDateString('be-NL', options);
    return sDay;
  }

  async getAccountData() {
    const form = new FormData(QSELECT('form:nth-child(1)'));
    this.email = form.get('email');
    this.password = form.get('password');
    console.log(this.email);
  }

  async deleteAllUserData(friends) {
    friends.forEach(async (friend) => {
      await this.removeFriend(friend, this.uid);
    });

    await deleteDoc(doc(this.firestore, 'Users', this.uid));

    const q = query(collection(this.firestore, 'Events'), where('hostUID', '==', this.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docs) => {
      if (docs.exists()) {
        await deleteDoc(doc(this.firestore, 'Events', docs.id));
      }
    });

    const q2 = query(collection(this.firestore, 'Events'), where('acceptedUsers', 'array-contains', this.uid));
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach(async (docs) => {
      if (docs.exists()) {
        await updateDoc(doc(this.firestore, 'Events', docs.id), {
          acceptedUsers: arrayRemove(this.uid),
        });
      }
    });

    const q3 = query(collection(this.firestore, 'Events'), where('invitedUsers', 'array-contains', this.uid));
    const querySnapshot3 = await getDocs(q3);
    querySnapshot3.forEach(async (docs) => {
      if (docs.exists()) {
        await updateDoc(doc(this.firestore, 'Events', docs.id), {
          acceptedUsers: arrayRemove(this.uid),
        });
      }
    });
  }

  /**
   * @returns deletes the account of the user after credentials are asked
   */
  async deleteAccount() {
    await this.getAccountData();

    await this.getAllFriends();

    const credential = EmailAuthProvider.credential(
      this.email,
      this.password,
    );
    reauthenticateWithCredential(this.auth.currentUser, credential).then(async () => {
      await this.deleteAllUserData(this.friends);
      await this.auth.currentUser.delete().then(() => {
        Router.navigate('/');
      });
    }).catch((error) => {
      console.log(error);
    });
  }
}

export default User;

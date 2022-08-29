/**
 * Chatroom class for everything chat related
 */

import {
  getDocs,
  getFirestore, collection, query, where, addDoc, serverTimestamp, onSnapshot, orderBy, doc,
  getDoc,
} from 'firebase/firestore';

import { QSELECT } from '../consts';
import User from './User';
import Elements from './Elements';
import Router from '../router';
import AudioSound from './Audio';

class Chatroom {
  constructor(
    uid,
  ) {
    this.uid = uid;
    this.firestore = getFirestore();
    this.user = new User();
    this.audio = new AudioSound();
  }

  /**
   * @returns Gets all the chatrooms with your friends and adds a chatroomcard to the chatroomlist
   */
  async getFriendsChatrooms() {
    await this.user.setUserInfo();
    await this.user.getAllFriends();

    const chatroomContainer = QSELECT('.chat-container');

    this.user.friends.forEach(async (friend) => {
      const docSnap = await getDoc(doc(this.firestore, 'Users', friend));

      if (docSnap.exists()) {
        const q = query(collection(this.firestore, 'Chatrooms'), where('usersUID', 'array-contains', friend));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          if (doc.data().usersUID.includes(this.user.uid)) {
            chatroomContainer.appendChild(
              Elements.createChatroomCard({
                eventUID: doc.data().chatroomUID,
                url: docSnap.data().avatarImageUrl,
                classname: 'chatroom-card',
                username: `${docSnap.data().username}`,
                onClick: async () => {
                  localStorage.setItem('friendUIDChat', docSnap.data().uid);
                  await this.user.getSpecificFriend(localStorage.getItem('friendUIDChat'));
                  Router.navigate('/chatroom-friend');
                },
              }),
            );
          }
        });
      }
    });
  }

  /**
   * @returns Gets all the chatrooms of the events you are in and
   * adds a chatroomcard to the chatroomlist
   */
  async getEventChatrooms() {
    await this.user.setUserInfo();
    const chatroomContainer = QSELECT('.event-chat-container');
    const q = query(collection(this.firestore, 'Chatrooms'), where('acceptedUsers', 'array-contains', this.user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      chatroomContainer.appendChild(
        Elements.createChatroomCard({
          url: '../assets/other/cityscape.svg',
          eventUID: doc.data().eventUID,
          classname: 'chatroom-card',
          username: doc.data().name,
          onClick: () => {
            Router.navigate('/chatroom');
          },
        }),
      );
    });
  }

  /**
   * @returns Sends a message
   */
  async sendMessage() {
    await this.user.setUserInfo();
    const message = QSELECT('#chatInput');
    const docRef = collection(this.firestore, 'Chatrooms', localStorage.getItem('chatroomID'), 'Messages');
    if (message.value !== '') {
      await addDoc(docRef, {
        message: message.value,
        user: this.user.username,
        time: this.changeDate(),
        timestamp: serverTimestamp(),
      }).then(() => {
        message.value = '';
      });
    }
  }

  /**
   * @returns Gets all the messages with Onsnapshot (real-time)
   */
  async getMessages() {
    await this.user.setUserInfo();
    const q = query(collection(this.firestore, 'Chatrooms', localStorage.getItem('chatroomID'), 'Messages'), orderBy('timestamp'));
    onSnapshot(q, (snapshot) => {
      const chatField = QSELECT('.chat__field');
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          if (change.doc.data().user === this.user.username) {
            chatField.appendChild(Elements.createContainer({
              className: 'chat__bubble--me',
              children: [
                Elements.createText({
                  textContent: change.doc.data().message,
                }),
                Elements.createSmall({
                  textContent: `${change.doc.data().user} | ${change.doc.data().time} `,
                }),
              ],
            }));
          } else {
            this.audio.playMessage();
            chatField.appendChild(Elements.createContainer({
              className: 'chat__bubble--other',
              children: [
                Elements.createText({
                  textContent: change.doc.data().message,
                }),
                Elements.createSmall({
                  textContent: `${change.doc.data().user} | ${change.doc.data().time} `,
                }),
              ],
            }));
          }
        }
        chatField.scrollTop = chatField.scrollHeight;
      });
    });
  }

  changeDate() {
    const date = new Date();
    const modified = date.toLocaleString('be-NL');
    return modified;
  }
}

export default Chatroom;

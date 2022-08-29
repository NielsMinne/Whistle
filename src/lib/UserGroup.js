/**
 * UserGroup class that is extended to User,Host and Participant
 */

import { getAuth } from 'firebase/auth';
import {
  getFirestore, query, collection, where, getDocs, getDoc, doc,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import initFirebase from './firebase/firebaseSetup';

class UserGroup {
  constructor() {
    this.allUsers = [];
    this.friends = [];
    this.acceptedUsers = [];
    this.friendRequests = [];
    initFirebase();
    this.auth = getAuth();
    this.storage = getStorage();
    this.firestore = getFirestore();
  }

  /**
   * @returns gets all the users that are not the user itself
   */
  async getAllUsers() {
    const q = query(collection(this.firestore, 'Users'), where('uid', '!=', this.uid));
    const querySnapshot = await getDocs(q);
    const allUsers = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        allUsers.push(doc.data());
      } else {
        console.log('damn');
      }
    });
    this.allUsers = allUsers;
  }

  /**
   * gets all the friends and stores it in the friends array
   */
  async getAllFriends() {
    const docRef = doc(this.firestore, 'Users', this.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.friends = docSnap.data().friends;
    } else {
      console.log('no friends');
    }

    const q = query(collection(this.firestore, 'Users'), where('friendRequests', 'array-contains', this.uid));
    const querySnapshot = await getDocs(q);
    const friendRequestArr = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        friendRequestArr.push(doc.data().uid);
      }
    });

    this.friendRequests = friendRequestArr;
  }
}

export default UserGroup;

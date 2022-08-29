/**
 * Participant Class
 * */

import {
  arrayRemove, arrayUnion, doc, updateDoc,
} from 'firebase/firestore';
import User from './User';

class Participant extends User {
  constructor(uid) {
    super();
    this.uid = uid;
  }

  /**
   * @returns function to accept the invite to a certain event
   */
  async acceptInvite() {
    await this.setUserInfo();

    const docRef = doc(this.firestore, 'Events', localStorage.getItem('invitedEvent'));
    const chatRef = doc(this.firestore, 'Chatrooms', localStorage.getItem('invitedEvent'));
    await updateDoc(docRef, {
      invitedUsers: arrayRemove(this.uid),
      acceptedUsers: arrayUnion(this.uid),
    });

    await updateDoc(chatRef, {
      acceptedUsers: arrayUnion(this.uid),
    });
  }

  /**
   * @returns function to reject the invite to a certain event
   */
  async rejectInvite() {
    await this.setUserInfo();

    const docRef = doc(this.firestore, 'Events', localStorage.getItem('invitedEvent'));

    await updateDoc(docRef, {
      invitedUsers: arrayRemove(this.uid),
    });
  }

  /**
   * @returns function to leave the invite you are taking part in
   */
  async leaveEvent() {
    await this.setUserInfo();

    const docRef = doc(this.firestore, 'Events', localStorage.getItem('hostedEventUID'));

    await updateDoc(docRef, {
      acceptedUsers: arrayRemove(this.uid),
    });
  }
}

export default Participant;

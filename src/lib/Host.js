/**
 * Host Class for creating,updating or deleting events
 */

import {
  addDoc, collection, doc, deleteDoc, setDoc, arrayUnion, updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import User from './User';
import Location from './Location';
import { QSELECT } from '../consts';
import Router from '../router';

class Host extends User {
  constructor(uid) {
    super();
    this.uid = uid;
    this.location = new Location();
  }

  /**
   * @returns creates an event in firestore with the given data
   */
  async createEvent() {
    await this.location.setLocationData();
    await this.setUserInfo();
    const form = new FormData(QSELECT('.create__form'));
    const eventTitle = form.get('eventTitle');
    const description = form.get('description');
    const date = form.get('eventDate');
    const startTime = form.get('startTime');
    const endTime = form.get('endTime');

    const eventCreate = await addDoc(collection(this.firestore, 'Events'), {
      eventTitle,
      createdOn: this.getCreationDate(),
      description,
      date,
      startTime,
      endTime,
      street: this.location.street,
      number: this.location.number,
      city: this.location.city,
      coords: this.location.coords,
      hostUID: this.uid,
      creator: `${this.firstName} ${this.lastName}`,
      invitedUsers: this.invitedUsers,
      acceptedUsers: [this.uid],
    });

    await this.uploadEventBanner(eventCreate.id);

    await setDoc(doc(this.firestore, 'Chatrooms', eventCreate.id), {
      eventUID: eventCreate.id,
      name: eventTitle,
      acceptedUsers: [this.uid],
    });
  }

  /**
   * @param {*} eventUID the ID of the specific event you want to edit
   * @returns Edits the specific event if you adjust some data
   */
  async editEvent(eventUID) {
    await this.setUserInfo();
    const form = new FormData(QSELECT('.create__form'));
    const eventTitle = form.get('eventTitle');
    const description = form.get('description');
    const date = form.get('eventDate');
    const startTime = form.get('startTime');
    const endTime = form.get('endTime');

    await this.uploadEventBanner(localStorage.getItem('hostedEventUID'));

    await updateDoc(doc(this.firestore, 'Events', eventUID), {
      eventTitle,
      description,
      date,
      startTime,
      endTime,
    });
  }

  /**
   * @param {*} eventUID the ID of the specific event you want to update the banner for
   * @returns Uploads a picture of the event to firebase storage
   */
  async uploadEventBanner(eventUID) {
    const formAvatar = new FormData(QSELECT('.avatar-overlay__input'));
    const uploadedImage = formAvatar.get('avatarImage');

    if (uploadedImage.size > 0) {
      const imagesRef = ref(this.storage, `eventBanner/event-${eventUID}`);

      await uploadBytes(imagesRef, uploadedImage).then((snapshot) => {
        getDownloadURL(ref(this.storage, imagesRef))
          .then((url) => {
            updateDoc(doc(this.firestore, 'Events', eventUID), {
              eventUID,
              eventBannerUrl: url,
            });
          });
      });
    } else {
      updateDoc(doc(this.firestore, 'Events', eventUID), {
        eventUID,
        eventBannerUrl: '../assets/other/placeholder_event.jpg',
      });
    }
  }

  /**
   * @returns updates the invited friends array in firestore for the specific event
   */
  async InviteMoreFriends() {
    const SelectedUsersArray = document.querySelectorAll('.add-people input:checked');
    SelectedUsersArray.forEach(async (friend) => {
      await updateDoc(doc(this.firestore, 'Events', localStorage.getItem('hostedEventUID')), {
        invitedUsers: arrayUnion(friend.id),
      });
    });
  }

  /**
   * @returns Stores the users you selected into this.invitedUsers for later use
   */
  async StoreAllInvitedUsers() {
    const invitedUsersArr = [];
    const SelectedUsersArray = document.querySelectorAll('.add-people input:checked');
    SelectedUsersArray.forEach(async (user) => {
      invitedUsersArr.push(user.id);
    });
    this.invitedUsers = invitedUsersArr;
  }

  /**
   * @returns Deletes an event you host
   */
  async deleteEvent() {
    await deleteDoc(doc(this.firestore, 'Events', localStorage.getItem('hostedEventUID')));
    await deleteDoc(doc(this.firestore, 'Chatrooms', localStorage.getItem('hostedEventUID')));
    Router.navigate('/my-events');
  }
}

export default Host;

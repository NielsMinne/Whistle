/**
 * Event Class for every event info and details
 */

import {
  getFirestore, collection, query, getDocs, where, orderBy, getDoc, doc,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import Elements from './Elements';
import { QSELECT } from '../consts';
import Location from './Location';
import Host from './Host';
import Router from '../router';
import AudioSound from './Audio';

class Event {
  constructor(
    uid,
    name,
    description,
    date,
    startTime,
    endTime,
    invitedUsers,
    createdOn,
    eventBanner,
  ) {
    this.uid = uid;
    this.createdOn = createdOn;
    this.name = name;
    this.description = description;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.invitedUsers = invitedUsers;
    this.eventBanner = eventBanner;
    this.storage = getStorage();
    this.firestore = getFirestore();
    this.location = new Location();
    this.host = new Host();
    this.audio = new AudioSound();
  }

  /**
   * @param {*} containerClass The container class of which the participants need to be appended to
   * @returns returns all the participants in a certain event
   */
  async showParticipants(containerClass) {
    this.acceptedUsers.forEach(async (user) => {
      const q = query(collection(this.firestore, 'Users'), where('uid', '==', user));
      const querySnapshot = await getDocs(q);
      const participantContainer = QSELECT(`.${containerClass}`);
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          participantContainer.appendChild(
            Elements.createParticipant({
              className: 'user__avatar',
              url: doc.data().avatarImageUrl,
              username: doc.data().username,
            }),
          );
        }
      });
    });
  }

  /**
   * @param {*} userUID the ID of the User
   * @param {*} container The container where the popup needs to happen (this.componentContainer)
   * @returns Checks if there is any event active at the current time
   */
  async isEventActive(userUID, container) {
    const q = query(collection(this.firestore, 'Events'), where('acceptedUsers', 'array-contains', userUID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await this.compareDate(doc.data().date, doc.data(), container);
    });
  }

  /**
   * @param {*} eventDate the date of the event
   * @param {*} doc The firestore doc.data() of each event
   * @param {*} container The container where the popup needs to happen (this.componentContainer)
   * @returns Checks if date and time is between the events time and responds accordingly
   */
  async compareDate(eventDate, doc, container) {
    const inputDate = new Date(eventDate);
    const todaysDate = new Date();
    if (inputDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)) {
      const { startTime } = doc;
      const { endTime } = doc;

      const currentDate = new Date();

      const startDate = new Date(currentDate.getTime());
      startDate.setHours(startTime.split(':')[0]);
      startDate.setMinutes(startTime.split(':')[1]);
      startDate.setSeconds(0);

      const endDate = new Date(currentDate.getTime());
      endDate.setHours(endTime.split(':')[0]);
      endDate.setMinutes(endTime.split(':')[1]);
      endDate.setSeconds(0);

      if (((startDate < currentDate) && (endDate > currentDate))) {
        localStorage.setItem('activeEventUID', doc.eventUID);
        localStorage.setItem('eventActive', true);
        this.eventActivePopup(container);
      } else {
        localStorage.setItem('eventActive', false);
      }
    }
  }

  /**
 * @param {*} container container callback
 * @returns A popup that tells you the event is active with a take care button and go back button
 */

  async eventActivePopup(container) {
    await this.getSpecificEvent(localStorage.getItem('activeEventUID'));
    this.audio.playEventActive();
    const app = QSELECT('#app');
    container.style.opacity = '0.6';
    app.appendChild(
      Elements.createContainer({
        className: 'popup-container',
        children: [
          Elements.createHeader({
            size: 4,
            textContent: `${this.name}<br>has started!`,
          }),
          Elements.createText({
            textContent: 'Go to TAKE CARE MODE?',
          }),
          Elements.createContainer({
            className: 'popup-container__button-container',
            children: [
              Elements.createButton({
                textContent: 'No, Go back',
                className: 'button__reject',
                onClick: () => {
                  const popup = QSELECT('.popup-container');
                  popup.remove();
                  container.style.opacity = '1';
                },
              }),
              Elements.createButton({
                textContent: 'Take Care',
                className: 'button__accept',
                onClick: () => {
                  Router.navigate('/take-care-mode');
                },
              }),
            ],
          }),
        ],
      }),
    );
  }

  /**
   * @returns Gets all the events you are Hosting
   */
  async getHostedEvents() {
    await this.host.setUserInfo();
    const hostedEventContainer = QSELECT('.host-container');
    const q = query(collection(this.firestore, 'Events'), where('hostUID', '==', this.host.uid), orderBy('date'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      if (doc.exists()) {
        hostedEventContainer.appendChild(
          Elements.createEventCard({
            onClick: () => { Router.navigate('/my-hosted-event'); },
            url: doc.data().eventBannerUrl,
            eventUID: doc.id,
            eventTime: `${doc.data().startTime} - ${doc.data().endTime}`,
            eventName: doc.data().eventTitle,
            eventDate: this.ModifyDate(doc.data().date),
          }),
        );
      }
    });
  }

  /**
   * @returns Gets all the event invitations you have
   */
  async getEventInvitations() {
    await this.host.setUserInfo();
    const invitationContainer = QSELECT('.invitation-container');
    const q = query(collection(this.firestore, 'Events'), where('invitedUsers', 'array-contains', this.host.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        invitationContainer.appendChild(Elements.createInviteButton({
          onClick: () => { Router.navigate('/my-event-invitation'); },
          className: 'invitation__button',
          textContent: `${doc.data().eventTitle} <i class='fas fa-chevron-circle-right fa-lg'></i>`,
          eventUID: doc.id,
        }));
      }
    });
  }

  /**
   * @returns Gets all the upcoming events you participate in
   */
  async getUpcomingEvents() {
    await this.host.setUserInfo();
    const upcomingEventContainer = QSELECT('.upcoming-events-container');
    const q = query(collection(this.firestore, 'Events'), where('acceptedUsers', 'array-contains', this.host.uid), orderBy('date'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        upcomingEventContainer.appendChild(
          Elements.createEventCard({
            onClick: () => { Router.navigate('/my-upcoming-event'); },
            url: doc.data().eventBannerUrl,
            eventUID: doc.id,
            eventTime: `${doc.data().startTime} - ${doc.data().endTime}`,
            eventName: doc.data().eventTitle,
            eventDate: this.ModifyDate(doc.data().date),
          }),
        );
      }
    });
  }

  /**
   * @param {*} eventUID the ID of the Event you want the data from
   * @returns Gets the data of a specific event
   */
  async getSpecificEvent(eventUID) {
    const docRef = doc(this.firestore, 'Events', eventUID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.uid = docSnap.id;
      this.name = docSnap.data().eventTitle;
      this.description = docSnap.data().description;
      this.date = docSnap.data().date;
      this.createdOn = docSnap.data().createdOn;
      this.startTime = docSnap.data().startTime;
      this.endTime = docSnap.data().endTime;
      this.acceptedUsers = docSnap.data().acceptedUsers;
      this.invitedUsers = docSnap.data().invitedUsers;
      this.eventBanner = docSnap.data().eventBannerUrl;
      this.location.setEventLocationData({
        street: docSnap.data().street,
        city: docSnap.data().city,
        number: docSnap.data().number,
        coords: docSnap.data().coords,
      });
      this.host.username = docSnap.data().creator;
    } else {
      console.log('No such document!');
    }
  }

  ModifyDate(dateString) {
    const dateObj = new Date(dateString);
    const optionsDay = {
      day: 'numeric',
    };
    const modifiedDay = dateObj.toLocaleDateString('be-NL', optionsDay).toUpperCase();
    const optionsMonth = {
      month: 'short',
    };
    const modifiedMonth = dateObj.toLocaleDateString('be-NL', optionsMonth).toUpperCase();
    const modifiedDate = `${modifiedDay}<br>${modifiedMonth}`;
    return modifiedDate;
  }

  modifyDateFull(dateString) {
    const dateObj = new Date(dateString);
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const modifiedDate = dateObj.toLocaleDateString('be-NL', options);
    return modifiedDate;
  }
}

export default Event;

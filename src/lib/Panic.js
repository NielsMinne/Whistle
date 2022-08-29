/**
 * Panic Class for everything related to panic button and messages from it
 * */

import {
  collection, deleteDoc, doc, getFirestore, onSnapshot, query, setDoc,
} from 'firebase/firestore';
import User from './User';
import Location from './Location';
import { QSELECT } from '../consts';
import Elements from './Elements';
import Router from '../router';
import AudioSound from './Audio';

class Panic {
  constructor() {
    this.location = new Location();
    this.firestore = getFirestore();
    this.user = new User();
    this.audio = new AudioSound();
  }

  /**
   * @returns sends an alert when you click on the panic button to firebase collection PanicMessages
   */
  async sendAlert() {
    await this.user.setUserInfo();
    await this.location.getCurrentPosition();

    setTimeout(async () => {
      const docRef = doc(this.firestore, `PanicMessages/${localStorage.getItem('activeEventUID')}/Panics`, this.user.uid);
      await setDoc(docRef, {
        location: await this.location.autoAdressFill(localStorage.getItem('currentPositionCoords').split(',')),
        distance: localStorage.getItem('currentPositionCoords'),
        phone: this.user.phoneNumber,
        user: `${this.user.firstName} ${this.user.lastName}`,
        userUID: this.user.uid,
      });
    }, 3000);
  }

  /**
   * @returns removes the alert when button is clicked again (panic over)
   */
  async removeAlert() {
    await this.user.setUserInfo();
    clearTimeout();
    const docRef = doc(this.firestore, `PanicMessages/${localStorage.getItem('activeEventUID')}/Panics`, this.user.uid);
    await deleteDoc(docRef);
  }

  /**
   * @param {*} container container to add your panic popup message to
   * @returns functions that listen if panics come in and
   * displays them with a popup message (onSnapshot)
   */
  async listenForPanics(container) {
    if (JSON.parse(localStorage.getItem('eventActive'))) {
      const q = query(collection(this.firestore, 'PanicMessages', localStorage.getItem('activeEventUID'), 'Panics'));
      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === 'added') {
            if (change.doc.data().userUID !== this.user.uid) {
              this.audio.playPanicPopup();
              container.style.opacity = '0.6';
              const app = QSELECT('#app');
              app.appendChild(
                Elements.createContainer({
                  className: 'popup-panic-container',
                  children: [
                    Elements.createHeader({
                      size: 4,
                      textContent: `${change.doc.data().user}<br> is <span>panicking</span>`,
                    }),
                    Elements.createContainer({
                      className: 'popup-panic-container__location',
                      children: [
                        Elements.createText({
                          textContent: 'Location:',
                        }),
                        Elements.createText({
                          textContent: change.doc.data().location,
                          className: 'data',
                        }),
                      ],
                    }),
                    Elements.createText({
                      textContent: `Distance: approx. ${await this.location.calculateDistanceBetweenPoints(change.doc.data().distance.split(','), localStorage.getItem('currentPositionCoords').split(','))}km`,
                    }),
                    Elements.createText({
                      textContent: `Number: ${change.doc.data().phone}`,
                    }),

                    Elements.createContainer({
                      className: 'popup-panic-container__button-container',
                      children: [
                        Elements.createButton({
                          textContent: 'Bel <i class="fas fa-phone"></i>',
                          className: 'button__invite',
                          onClick: () => {

                          },
                        }),
                        Elements.createPopupChatButton({
                          textContent: `<p class="no-display">${change.doc.data().userUID}</p> Chat <i class="fas fa-comment-dots"></i>`,
                          className: 'button__invite',
                          onClick: () => {
                            Router.navigate('/chatlist');
                          },
                        }),
                      ],
                    }),
                    Elements.createButton({
                      textContent: 'Close',
                      className: 'button__warning',
                      onClick: () => {
                        const popup = QSELECT('.popup-panic-container');
                        popup.remove();
                        container.style.opacity = '1';
                      },
                    }),
                  ],
                }),
              );
            }
          }
        });
      });
    }
  }
}

export default Panic;

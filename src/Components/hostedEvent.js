/**
 * Hosted Events Component
 */

import {
  collection, getDocs, getFirestore, query, where,
} from 'firebase/firestore';
import { QSELECT } from '../consts';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Event from '../lib/Event';
import Host from '../lib/Host';
import Router from '../router';
import Location from '../lib/Location';

class HostedEventComponent extends Component {
  constructor() {
    super({
      name: 'my-hosted-event',
      routerPath: '/my-hosted-event',
    });
    this.event = new Event();
    this.host = new Host();
    this.firestore = getFirestore();
    this.location = new Location();
  }

  async renderAsync() {
    this.clearComponentContainer();
    await this.host.setUserInfo();
    await this.host.getAllFriends();
    await this.event.getSpecificEvent(localStorage.getItem('hostedEventUID')); // gets specific Event data
    await this.event.showParticipants('my-hosted-events__participants--container');

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'image-background',
      id: 'image-background2',
    }));
    this.componentContainer.appendChild(Elements.createHeaderNav({
      containerClassName: 'header-nav-container',
      title: 'WH<span>!</span>STLE HOST',
      subTitle: 'Details on your event',
    }));

    this.componentContainer.appendChild(
      Elements.createImageDiv({
        className: 'my-hosted-events__image',
        url: this.event.eventBanner,
      }),
    );

    this.componentContainer.appendChild(
      Elements.createContainer({
        className: 'my-hosted-events',
        children: [
          Elements.createContainer({
            className: 'my-hosted-events__title-container',
            children: [
              Elements.createHeader({
                size: 5,
                className: 'my-hosted-events__text',
                textContent: this.event.name,
              }),
              Elements.createIcon({
                className: 'fas fa-edit fa-2x',
                id: 'editEvent',
                onClick: () => {
                  Router.navigate('/edit-event');
                },
              }),
            ],
          }),
          Elements.createHeader({
            size: 5,
            className: 'my-hosted-events__description--title',
            textContent: 'Description.',
          }),
          Elements.createHorizontalRule({
            size: 2,
          }),
          Elements.createText({
            className: 'my-hosted-events__description',
            textContent: this.event.description,
          }),
          Elements.createHeader({
            size: 5,
            className: 'my-hosted-events__information--title',
            textContent: 'Information.',
          }),
          Elements.createHorizontalRule({
            size: 2,
          }),
          Elements.createContainer({
            className: 'information-container',
            children: [
              Elements.createContainer({
                className: 'my-hosted-events__information',
                children: [
                  Elements.createText({
                    textContent: `Created on: ${this.event.createdOn} `,
                  }),
                  Elements.createText({
                    textContent: `Created by: ${this.event.host.username} `,
                  }),
                  Elements.createText({
                    textContent: `Date: ${this.event.modifyDateFull(this.event.date)}`,
                  }),
                  Elements.createText({
                    textContent: `Event start: ${this.event.startTime}`,
                  }),
                  Elements.createText({
                    textContent: `Event end: ${this.event.endTime}`,
                  }),
                ],
              }),
              Elements.createContainer({
                className: 'my-hosted-events__map',
                children: [
                  Elements.createMap({
                    searchContainer: ('my-hosted-events__map'),
                    coords: this.event.location.coords,
                  }),
                  Elements.createText({
                    textContent: `${this.event.location.street} ${this.event.location.number}, ${this.event.location.city}`,
                  }),
                ],
              }),
            ],
          }),
          Elements.createHeader({
            size: 5,
            className: 'my-hosted-events__participants--title',
            textContent: 'Participants.',
          }),
          Elements.createHorizontalRule({
            size: 2,
          }),
          Elements.createContainer({
            className: 'my-hosted-events__participants--container',
          }),
          Elements.createButton({
            textContent: 'Invite more people',
            className: ' button__invite my-hosted-events__button--invite',
            onClick: () => {
              const overlay = QSELECT('.add-users-overlay');
              overlay.className = 'add-users-overlay';
              const container = QSELECT('.add-users-container');

              this.host.friends.forEach(async (friend) => {
                const q = query(collection(this.firestore, 'Users'), where('uid', '==', friend));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                  if ((!this.event.acceptedUsers.includes(doc.data().uid))
                  && (!this.event.invitedUsers.includes(doc.data().uid))) {
                    container.appendChild(
                      Elements.createAddPeople({
                        avatarUrl: doc.data().avatarImageUrl,
                        username: doc.data().username,
                        uid: doc.data().uid,
                      }),
                    );
                  }
                });
              });
            },
          }),
          Elements.createButton({
            textContent: 'Go to Chatroom of Event',
            className: ' button__normal my-hosted-events__button--normal',
            onClick: () => {
              localStorage.setItem('chatroomID', this.event.uid);
              Router.navigate('/chatroom');
            },
          }),
          Elements.createButton({
            textContent: 'DELETE EVENT',
            className: ' button__warning my-hosted-events__button--warning',
            onClick: () => {
              QSELECT('.delete-event-overlay').className = 'delete-event-overlay';
            },
          }),

        ],
      }),
    );

    this.componentContainer.appendChild(

      Elements.createContainer({
        className: 'delete-event-overlay hide',
        children: [
          Elements.createHeader({
            className: 'delete-event-overlay__header',
            size: 2,
            textContent: `Are you sure you want to <span>delete</span> "${this.event.name}" `,
          }),
          Elements.createContainer({
            className: 'delete-event-overlay__button-container',
            children: [
              Elements.createButton({
                textContent: 'NO',
                className: 'button__accept',
                onClick: () => {
                  QSELECT('.delete-event-overlay').className = 'delete-event-overlay hide';
                },
              }),
              Elements.createButton({
                textContent: 'YES',
                className: 'button__reject',
                onClick: () => {
                  this.host.deleteEvent();
                },
              }),

            ],
          }),

        ],
      }),

    );

    this.componentContainer.appendChild(

      Elements.createContainer({
        className: 'add-users-overlay hide',
        children: [
          Elements.createHeader({
            className: 'add-users-overlay__header',
            size: 2,
            textContent: 'Who do you <br> want to add?',
          }),
          Elements.createContainer({
            className: 'add-users-container',
          }),
          Elements.createButton({
            textContent: 'Add',
            className: 'button__invite--add',
            onClick: async () => {
              await this.host.InviteMoreFriends().then(() => {
                this.clearComponentContainer();
                this.renderAsync();
              });
            },
          }),
        ],
      }),
    );

    return this.componentContainer;
  }
}

export default HostedEventComponent;

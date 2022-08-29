/**
 * Create Event Component
 */

import {
  getFirestore, query, collection, where, getDocs,
} from 'firebase/firestore';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Location from '../lib/Location';
import { MAX_EVENT_TITLE, QSELECT } from '../consts';
import Host from '../lib/Host';
import Router from '../router';
import ActivityIndicator from '../lib/ActivityIndicator';

class CreateEventComponent extends Component {
  constructor() {
    super({
      name: 'create-event',
      routerPath: '/create-event',
    });
    this.host = new Host();
    this.location = new Location();
    this.firestore = getFirestore();
  }

  async renderAsync() {
    this.clearComponentContainer();

    await this.host.setUserInfo();
    await this.host.getAllFriends();
    this.host.StoreAllInvitedUsers();

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'image-background',
      id: 'image-background2',
    }));
    const form = document.createElement('form');
    form.className = 'create__form';
    const eventContainer = document.createElement('div');
    eventContainer.className = 'form';

    this.componentContainer.appendChild(Elements.createHeaderNav({
      containerClassName: 'header-nav-container',
      title: 'WH<span>!</span>STLE CREATE',
      subTitle: 'Create your own event!',
    }));

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'create__text',
      children: [
        Elements.createHeader({
          size: 3,
          textContent: 'Create.',
        }),
        Elements.createText({
          textContent: 'Create your event<br>and invite friends.',
        }),
      ],
    }));

    eventContainer.appendChild(Elements.createContainer({
      children: [
        Elements.createInput({
          className: 'form__input',
          type: 'text',
          id: 'eventTitle',
          required: true,
          maxChar: MAX_EVENT_TITLE,
        }),
        Elements.createLabel({
          textContent: '<span class=\'form__label-name\'>Event Title</span>',
          className: 'form__label',
        }),
      ],
    }));

    const textArea = document.createElement('textarea');
    textArea.name = 'description';
    textArea.maxLength = 200;

    eventContainer.appendChild(Elements.createContainer({
      className: 'form__textarea',
      children: [
        Elements.createLabel({
          textContent: 'Description',
          className: 'form__account-label',
        }),
        textArea,
      ],
    }));

    eventContainer.appendChild(Elements.createContainer({
      children: [
        Elements.createInput({
          className: 'form__input',
          type: 'date',
          id: 'eventDate',
          required: true,
        }),
        Elements.createLabel({
          textContent: 'Event Date',
          className: 'form__label',
        }),
      ],
    }));

    eventContainer.appendChild(Elements.createContainer({
      children: [
        Elements.createInput({
          className: 'form__input',
          type: 'time',
          id: 'startTime',
          required: true,
        }),
        Elements.createLabel({
          textContent: 'Start of Event',
          className: 'form__label',
        }),
      ],
    }));

    eventContainer.appendChild(Elements.createContainer({
      children: [
        Elements.createInput({
          className: 'form__input',
          type: 'time',
          id: 'endTime',
          required: true,
        }),
        Elements.createLabel({
          textContent: 'End of Event',
          className: 'form__label',
        }),
      ],
    }));

    eventContainer.appendChild(Elements.createContainer({
      children: [
        Elements.createInput({
          className: 'form__input',
          type: 'text',
          id: 'location',
          required: true,
        }),
        Elements.createLabel({
          textContent: '<span class=\'form__label-name\'>Location</span>',
          className: 'form__label',
        }),
      ],
    }));

    eventContainer.appendChild(Elements.createButton({
      textContent: 'Check Location',
      className: 'button__invite location-button',
      onClick: async () => {
        await this.location.checkLocation();
        await this.location.setLocationData();
      },
    }));
    eventContainer.appendChild(Elements.createContainer({
      id: 'mapContainer',
    }));

    const Avatarform = document.createElement('form');
    Avatarform.className = 'avatar-overlay__input';

    Avatarform.appendChild(Elements.createButton({
      textContent: 'Upload Image...',
      className: 'button__normal avatar-overlay__button',
    }));

    Avatarform.appendChild(
      Elements.createInput({
        type: 'file',
        className: 'avatar-overlay__file',
        name: 'avatarImage',
        id: 'avatarImage',
      }),
    );

    eventContainer.appendChild(Elements.createContainer({
      className: 'form__input',
      children: [
        Elements.createLabel({
          textContent: 'Event Banner',
          className: 'form__account-label',
        }),
        Avatarform,
      ],
    }));
    eventContainer.appendChild(Elements.createContainer({
      className: 'form__input',
      children: [
        Elements.createLabel({
          textContent: 'Invite Friends',
          className: 'form__account-label',
        }),
        Elements.createButton({
          textContent: 'Invite friends',
          className: 'button__normal--friends',
          onClick: () => {
            const overlay = QSELECT('.add-users-overlay');
            overlay.className = 'add-users-overlay';
            const container = QSELECT('.add-users-container');
            this.host.friends.forEach(async (friend) => {
              const q = query(collection(this.firestore, 'Users'), where('uid', '==', friend));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                container.appendChild(
                  Elements.createAddPeople({
                    avatarUrl: doc.data().avatarImageUrl,
                    username: doc.data().username,
                    uid: doc.data().uid,
                  }),
                );
              });
            });
          },
        }),
      ],
    }));

    eventContainer.appendChild(
      Elements.createButton({
        textContent: 'Create Event',
        className: 'button__invite create-button',
        onClick: async () => {
          await this.host.createEvent().then(() => {
            Router.navigate('/home');
          });
        },

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
            onClick: () => {
              this.host.StoreAllInvitedUsers();
              const overlay = QSELECT('.add-users-overlay');
              overlay.className = 'add-users-overlay hide';
            },
          }),
        ],
      }),
    );

    form.appendChild(eventContainer);
    this.componentContainer.appendChild(form);
    return this.componentContainer;
  }
}

export default CreateEventComponent;

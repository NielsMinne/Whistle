/**
 * Edit Event Component
 */

import {
  getFirestore,
} from 'firebase/firestore';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Location from '../lib/Location';

import Host from '../lib/Host';
import Router from '../router';
import Event from '../lib/Event';

class EditEventComponent extends Component {
  constructor() {
    super({
      name: 'edit-event',
      routerPath: '/edit-event',
    });
    this.host = new Host();
    this.location = new Location();
    this.firestore = getFirestore();
    this.event = new Event();
  }

  async renderAsync() {
    this.clearComponentContainer();
    
    await this.event.getSpecificEvent(localStorage.getItem('hostedEventUID'));

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
      title: 'WH<span>!</span>STLE EDIT',
      subTitle: 'Edit your own event!',
    }));

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'create__text',
      children: [
        Elements.createHeader({
          size: 3,
          textContent: 'Edit.',
        }),
        Elements.createText({
          textContent: 'Edit your event.',
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
          value: this.event.name,
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
    textArea.value = this.event.description;

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
          value: this.event.date,
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
          value: this.event.startTime,
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
          value: this.event.endTime,
        }),
        Elements.createLabel({
          textContent: 'End of Event',
          className: 'form__label',
        }),
      ],
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

    eventContainer.appendChild(
      Elements.createButton({
        textContent: 'Update Event',
        className: 'button__invite create-button',
        onClick: async () => {
          await this.host.editEvent(localStorage.getItem('hostedEventUID')).then(() => {
            Router.navigate('/my-hosted-event');
          });
        },

      }),
    );

    form.appendChild(eventContainer);
    this.componentContainer.appendChild(form);
    return this.componentContainer;
  }
}

export default EditEventComponent;

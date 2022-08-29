/**
 * Upcoming Event Component
 */

import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Event from '../lib/Event';
import Participant from '../lib/Participant';
import Router from '../router';

class InvitedEventComponent extends Component {
  constructor() {
    super({
      name: 'my-event-invitation',
      routerPath: '/my-event-invitation',
    });
    this.event = new Event();
    this.participant = new Participant();
  }

  async renderAsync() {
    this.clearComponentContainer();
    await this.event.getSpecificEvent(localStorage.getItem('invitedEvent'));
    await this.event.showParticipants('my-event-invitation__participants--container');

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
        className: 'my-event-invitation__image',
        url: this.event.eventBanner,
      }),
    );

    this.componentContainer.appendChild(
      Elements.createContainer({
        className: 'my-event-invitation',
        children: [
          Elements.createHeader({
            size: 5,
            className: 'my-event-invitation__text',
            textContent: this.event.name,
          }),
          Elements.createHeader({
            size: 5,
            className: 'my-event-invitation__description--title',
            textContent: 'Description.',
          }),
          Elements.createHorizontalRule({
            size: 2,
          }),
          Elements.createText({
            className: 'my-event-invitation__description',
            textContent: this.event.description,
          }),
          Elements.createHeader({
            size: 5,
            className: 'my-event-invitation__information--title',
            textContent: 'Information.',
          }),
          Elements.createHorizontalRule({
            size: 2,
          }),
          Elements.createContainer({
            className: 'information-container',
            children: [
              Elements.createContainer({
                className: 'my-event-invitation__information',
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
                className: 'my-event-invitation__map',
                children: [
                  Elements.createMap({
                    searchContainer: ('my-event-invitation__map'),
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
            className: 'my-event-invitation__participants--title',
            textContent: 'Participants.',
          }),
          Elements.createHorizontalRule({
            size: 2,
          }),
          Elements.createContainer({
            className: 'my-event-invitation__participants--container',
          }),
          Elements.createContainer({
            className: 'my-event-invitation__button-container',
            children: [
              Elements.createButton(({
                textContent: 'REJECT ',
                className: 'button__reject',
                onClick: async () => {
                  await this.participant.rejectInvite();
                  Router.navigate('/my-events');
                },
              })),
              Elements.createButton({
                textContent: 'ACCEPT',
                className: 'button__accept',
                onClick: async () => {
                  await this.participant.acceptInvite();
                  Router.navigate('/my-events');
                },

              }),
            ],
          }),

        ],
      }),

    );

    return this.componentContainer;
  }
}

export default InvitedEventComponent;

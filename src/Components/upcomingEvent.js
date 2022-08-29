/**
 * Upcoming Event detail component
 */

import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Event from '../lib/Event';
import Participant from '../lib/Participant';
import Router from '../router';
import { QSELECT } from '../consts';

class UpcomingEventComponent extends Component {
  constructor() {
    super({
      name: 'my-upcoming-event',
      routerPath: '/my-upcoming-event',
    });
    this.event = new Event();
    this.participant = new Participant();
  }

  async renderAsync() {
    this.clearComponentContainer();
    await this.event.getSpecificEvent(localStorage.getItem('hostedEventUID'));

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'image-background',
      id: 'image-background2',
    }));

    this.componentContainer.appendChild(Elements.createHeaderNav({
      containerClassName: 'header-nav-container',
      title: 'WH<span>!</span>STLE HOST',
      subTitle: 'Details on the event',
    }));

    this.componentContainer.appendChild(
      Elements.createImageDiv({
        className: 'my-upcoming-event__image',
        url: this.event.eventBanner,
      }),
    );

    this.componentContainer.appendChild(
      Elements.createContainer({
        className: 'my-upcoming-event',
        children: [
          Elements.createHeader({
            size: 5,
            className: 'my-upcoming-event__text',
            textContent: this.event.name,
          }),
          Elements.createHeader({
            size: 5,
            className: 'my-upcoming-event__description--title',
            textContent: 'Description.',
          }),
          Elements.createHorizontalRule({
            size: 2,
          }),
          Elements.createText({
            className: 'my-upcoming-event__description',
            textContent: this.event.description,
          }),
          Elements.createHeader({
            size: 5,
            className: 'my-upcoming-event__information--title',
            textContent: 'Information.',
          }),
          Elements.createHorizontalRule({
            size: 2,
          }),
          Elements.createContainer({
            className: 'information-container',
            children: [
              Elements.createContainer({
                className: 'my-upcoming-event__information',
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
                className: 'my-upcoming-event__map',
                children: [
                  Elements.createMap({
                    searchContainer: ('my-upcoming-event__map'),
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
            className: 'my-upcoming-event__participants--title',
            textContent: 'Participants.',
          }),
          Elements.createHorizontalRule({
            size: 2,
          }),
          Elements.createContainer({
            className: 'my-upcoming-event__participants--container',
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
            textContent: 'LEAVE EVENT',
            className: ' button__warning my-hosted-events__button--warning',
            onClick: () => {
              QSELECT('.leave-event-overlay').className = 'leave-event-overlay';
            },
          }),
        ],
      }),
    );

    this.componentContainer.appendChild(

      Elements.createContainer({
        className: 'leave-event-overlay hide',
        children: [
          Elements.createHeader({
            className: 'leave-event-overlay__header',
            size: 2,
            textContent: `Are you sure you want to <span>leave</span> "${this.event.name}" `,
          }),
          Elements.createContainer({
            className: 'leave-event-overlay__button-container',
            children: [
              Elements.createButton({
                textContent: 'NO',
                className: 'button__accept',
                onClick: () => {
                  QSELECT('.leave-event-overlay').className = 'leave-event-overlay hide';
                },
              }),
              Elements.createButton({
                textContent: 'YES',
                className: 'button__reject',
                onClick: () => {
                  this.participant.leaveEvent();
                  Router.navigate('/my-events');
                },
              }),

            ],
          }),

        ],
      }),
    );

    await this.event.showParticipants('my-upcoming-event__participants--container');
    return this.componentContainer;
  }
}

export default UpcomingEventComponent;

/**
 * My Events Overview Component
 */

import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Event from '../lib/Event';

class MyEventComponent extends Component {
  constructor() {
    super({
      name: 'my-events',
      routerPath: '/my-events',
    });
    this.event = new Event();
  }

  async renderAsync() {
    this.clearComponentContainer();
    this.event.getEventInvitations();
    this.event.getHostedEvents();
    this.event.getUpcomingEvents();
    this.event.isEventActive(JSON.parse(localStorage.getItem('user')).uid, this.componentContainer); //checks if an event is active

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'image-background',
      id: 'image-background2',
    }));

    this.componentContainer.appendChild(Elements.createHeaderNav({
      containerClassName: 'header-nav-container',
      title: 'WH<span>!</span>STLE EVENTS',
      subTitle: 'Current and upcoming events!',
    }));

    this.componentContainer.appendChild(
      Elements.createContainer({
        className: 'my-events',
        children: [
          Elements.createHeader({
            size: 5,
            textContent: 'Invitations',
            className: 'my-events__title',
          }),
          Elements.createHorizontalRule({
            size: 2,
          }),
          Elements.createContainer({
            className: 'invitation-container',
          }),
          Elements.createHeader({
            size: 5,
            textContent: 'Hosted Events',
            className: 'my-events__title',
          }),
          Elements.createHorizontalRule({
            size: 2,
          }),
          Elements.createContainer({
            className: 'host-container',
          }),
          Elements.createHeader({
            size: 5,
            textContent: 'Upcoming Events',
            className: 'my-events__title',
          }),
          Elements.createHorizontalRule({
            size: 2,
          }),
          Elements.createContainer({
            className: 'upcoming-events-container',
          }),
        ],
      }),
    );

    return this.componentContainer;
  }
}

export default MyEventComponent;

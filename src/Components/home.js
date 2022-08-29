/**
 * Home-list view Component
 */

import { QSELECT } from '../consts';
import Authenticator from '../lib/Authenticator';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Panic from '../lib/Panic';
import User from '../lib/User';
import Router from '../router';
import Location from '../lib/Location';
import Event from '../lib/Event';

class HomeComponent extends Component {
  constructor() {
    super({
      name: 'home',
      routerPath: '/home',
    });
    this.user = new User();
    this.authenticator = new Authenticator();
    this.panic = new Panic();
    this.location = new Location();
    this.event = new Event();
  }

  async renderAsync() {
    if (JSON.parse(localStorage.getItem('gridPref'))) {
      Router.navigate('/home-grid');
      return null;
    }

    this.clearComponentContainer();
    await this.user.setUserInfo(); // Sets user info into this.user
    await this.user.getAvatar(); // get the avatar of the user
    await this.location.getCurrentPosition(); // gets the current position for use later)

    if (localStorage.getItem('activeEventUID')) { // If there is an event active --> listens at take care mode but also at the home page
      await this.panic.listenForPanics(this.componentContainer);
    }

    await this.event.isEventActive(JSON.parse(localStorage.getItem('user')).uid, this.componentContainer); // Checks if an event is active and creates a popup

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'image-background',
      id: 'image-background2',
    }));

    this.componentContainer.appendChild(Elements.createHeaderNav({
      containerClassName: 'header-nav-container',
      title: 'WH<span>!</span>STLE HOME',
      subTitle: this.getDate(),
    }));

    this.componentContainer.appendChild(
      Elements.createContainer({
        className: 'home-list',
        children: [
          Elements.createHeader({
            size: 5,
            textContent: `Welcome ${this.user.username}`,
          }),
          Elements.createText({
            textContent: 'what would you like to do?',
          }),
          Elements.createHorizontalRule({
            size: 1,
            className: 'horizontal-line',
          }),
          Elements.createIcon({
            className: 'fas fa-th fa-2x home-list__grid-icon',
            onClick: () => {
              localStorage.setItem('gridPref', true);
              Router.navigate('/home-grid');
            },
          }),
          Elements.createHomeItem({
            textContent: 'Create Event',
            className: ' home-list__item',
            iconClass: ' fas fa-plus-square fa-lg',
            onClick: () => {
              Router.navigate('/create-event');
            },
          }),
          Elements.createHomeItem({
            textContent: 'My Events',
            className: ' home-list__item',
            iconClass: ' fas fa-ticket-alt fa-lg',
            onClick: () => {
              Router.navigate('/my-events');
            },
          }),
          Elements.createHomeItem({
            textContent: 'Friend List',
            className: ' home-list__item',
            iconClass: 'fas fa-user-friends fa-lg',
            onClick: () => {
              Router.navigate('/friend-list');
            },
          }),
          Elements.createHomeItem({
            textContent: 'Chatrooms',
            className: ' home-list__item',
            iconClass: ' fas fa-comment-dots fa-lg',
            onClick: () => {
              Router.navigate('/chatlist');
            },
          }),
          Elements.createHomeItem({
            textContent: 'Meldet.org',
            className: ' home-list__item',
            iconClass: ' fas fa-exclamation-triangle fa-lg',
            onClick: () => {
              Router.navigate('/meldet');
            },
          }),
          Elements.createHomeItem({
            textContent: 'Account Settings',
            className: ' home-list__item',
            iconClass: ' fas fa-cogs fa-lg',
            onClick: () => {
              Router.navigate('/account-settings');
            },
          }),
          Elements.createHomeItem({
            textContent: 'Logout',
            className: ' home-list__item',
            iconClass: ' fas fa-power-off fa-lg',
            onClick: () => {
              localStorage.removeItem('user');
              this.authenticator.logout();
            },
          }),
        ],

      }),
    );

    if (JSON.parse(localStorage.getItem('eventActive'))) { // whenever an event is active -> show the panic button at home
      this.componentContainer.appendChild(
        Elements.createButton({
          textContent: 'WHISTLE <i class="fas fa-exclamation-circle"></i>',
          className: 'button__panic home-list__whistle',
          onClick: () => {
            if (QSELECT('.button__panic').className === 'button__panic home-list__whistle') {
              QSELECT('.button__panic').className = 'button__panic home-list__whistle--active';
              this.panic.sendAlert(); // sends an alert
            } else {
              QSELECT('.button__panic').className = 'button__panic home-list__whistle';

              this.panic.removeAlert(); // clicking the button again removes the alert
            }
          },
        }),
      );
    }

    return this.componentContainer;
  }
}

export default HomeComponent;

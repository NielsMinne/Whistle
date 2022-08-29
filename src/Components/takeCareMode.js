/**
 * Take Care component
 */

import { QSELECT } from '../consts';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Event from '../lib/Event';
import Location from '../lib/Location';
import Panic from '../lib/Panic';
import Router from '../router';

class TakeCareModeComponent extends Component {
  constructor() {
    super({
      name: 'take-care-mode',
      routerPath: '/take-care-mode',
    });
    this.event = new Event();
    this.location = new Location();
    this.panic = new Panic();
  }

  async renderAsync() {
    this.clearComponentContainer();
    await this.event.getSpecificEvent(localStorage.getItem('activeEventUID'));
    await this.location.updatePositionUsers();
    await this.location.listenForPositionChanges();
    await this.location.getUsersCoords();
    await this.panic.listenForPanics(this.componentContainer);

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'image-background',
      id: 'image-background2',
    }));

    this.componentContainer.appendChild(Elements.createHeaderNav({
      containerClassName: 'header-nav-container',
      title: 'TAKE CARE MODE',
    }));

    this.componentContainer.appendChild(
      Elements.createText({

        textContent: `${this.event.name} is now happening!<br>Please take care while travelling to your location!`,
        className: 'take-care-mode-container__title',
      }),
    );

    this.componentContainer.appendChild(
      Elements.createContainer({
        className: 'take-care-map',
        children: [
          Elements.createTakeCareMap({
            eventCoords: this.event.location.coords,
            coords: localStorage.getItem('currentPositionCoords').split(','),
            zoom: 12.5,
            usersInfo: this.location.takeCareUserInfo,
          }),

        ],
      }),
    );

    this.componentContainer.appendChild(
      Elements.createButton({
        textContent: 'WHISTLE <i class="fas fa-exclamation-circle"></i>',
        className: 'button__panic take-care-mode-container__whistle',
        onClick: () => {
          if (QSELECT('.button__panic').className === 'button__panic take-care-mode-container__whistle') {
            QSELECT('.button__panic').className = 'button__panic take-care-mode-container__whistle--active';
            this.panic.sendAlert();
          } else {
            QSELECT('.button__panic').className = 'button__panic take-care-mode-container__whistle';
            this.panic.removeAlert();
          }
        },
      }),
    );

    this.componentContainer.appendChild(
      Elements.createButton({
        textContent: 'Go to Chatroom of Event',
        className: 'button__normal take-care-mode-container__chatroom',
        onClick: () => {
          localStorage.setItem('chatroomID', localStorage.getItem('activeEventUID'));
          Router.navigate('/chatroom');
        },
      }),
    );

    const locationInterval = setInterval(async () => {
      await this.location.checkIfInEventRadius(this.event.location.coords, locationInterval)
        .then(() => {
          if (!window.location.toString().includes('take-care-mode')) {
            clearInterval(locationInterval);
          }
        });
      const container = QSELECT('.take-care-map');
      container.innerHTML = '';
      await this.location.getUsersCoords();
      container.appendChild(
        Elements.createTakeCareMap({
          eventCoords: this.event.location.coords,
          coords: localStorage.getItem('currentPositionCoords').split(','),
          zoom: 12.5,
          usersInfo: this.location.takeCareUserInfo,
        }),
      );
    }, 20000);
    return this.componentContainer;
  }
}

export default TakeCareModeComponent;

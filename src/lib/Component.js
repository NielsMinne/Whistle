/**
 * The Component Parent
 */

import Authenticator from './Authenticator';
import Elements from './Elements';

class Component {
  constructor({
    name,
    model,
    routerPath,
  }) {
    this.name = name;
    this.model = model;
    this.routerPath = routerPath;
    this.componentContainer = this.createComponentContainer();
    this.authenticator = new Authenticator();
  }

  createComponentContainer() {
    return Elements.createContainer({
      className: `${this.name}-container container-wrapper`,
    });
  }

  clearComponentContainer() {
    while (this.componentContainer.firstChild) {
      this.componentContainer.removeChild(this.componentContainer.lastChild);
    }
  }

  clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }
  }

  getDate() {
    const dateObj = new Date();
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const sDay = dateObj.toLocaleDateString('be-NL', options).toUpperCase();
    return sDay;
  }
}

export default Component;

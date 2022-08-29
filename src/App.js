/**
 * The app class
 */

import initFirebase from './lib/firebase/firebaseSetup';
import Router from './router';
import Component from './lib/Component';
import Authenticator from './lib/Authenticator';
import ActivityIndicator from './lib/ActivityIndicator';

class App {
  constructor(parent, portal) {
    this.parent = parent;
    this.portal = portal;
    this.components = [];
    this.reRender = null;
    initFirebase(); // Initialize Firebase throughout whole app
    this.authenticator = new Authenticator(); // Get Authenticator to check if we are logged in
  }

  clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }
  }

  addComponent(component) {
    if (!(component instanceof Component)) return;

    // get the name from our component
    const { name, routerPath } = component;

    // When a component asks to reRender
    this.authenticator.checkifLoggedIn(); // Logged in check

    component.reRender = () => this.showComponent(component);

    // add to internal class
    this.components.push(component);

    // add to router
    Router.on(routerPath, () => {
      this.showComponent({
        name,
      });
    }).resolve();
  }

  showComponent({ name }) {
    const foundComponent = this.components.find((component) => component.name === name);
    if (!foundComponent) return;

    if (foundComponent) {
      this.clearContainer(this.parent);

      if (foundComponent.render) {
        this.parent.appendChild(foundComponent.render());
      }
      if (foundComponent.renderAsync) {
        this.portal.appendChild(ActivityIndicator());
        foundComponent
          .renderAsync()
          .then((renderedComponent) => {
            this.clearContainer(this.portal);
            this.parent.appendChild(renderedComponent);
          })
          .catch((error) => {
            console.error(error.message);
            this.clearContainer(this.portal);
          });
      }
    }
  }
}

export default App;

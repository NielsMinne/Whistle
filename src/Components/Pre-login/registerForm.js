/**
 * Register Component
 */

import { MAX_USERNAME } from '../../consts';
import Component from '../../lib/Component';
import Elements from '../../lib/Elements';
import Router from '../../router';

class RegisterComponent extends Component {
  constructor() {
    super({
      name: 'register',
      model: {
        formParams: [{
          textContent: '<span class=\'form__label-name\'>Email</span>',
          placeholder: 'JohnDoe@gmail.com',
          type: 'text',
          id: 'email',
          labelClassName: 'form__label',
          inputClassName: 'form__input',
        },
        {
          textContent: '<span class=\'form__label-name\'>Username</span>',
          placeholder: 'MasterChief',
          type: 'text',
          id: 'username',
          labelClassName: 'form__label',
          inputClassName: 'form__input',
          usernameMaxChar: MAX_USERNAME,
        },
        {
          textContent: '<span class=\'form__label-name\'>Password</span>',
          placeholder: '••••••••••••••',
          type: 'password',
          id: 'password',
          labelClassName: 'form__label',
          inputClassName: 'form__input',
        },
        ],
      },
      routerPath: '/register',
    });
  }

  render() {
    this.clearComponentContainer();
    const { formParams } = this.model;

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'image-background',
      id: 'image-background',
    }));
    this.componentContainer.appendChild(
      Elements.createAppName({
        size: '4',
      }),
    );

    this.componentContainer.appendChild(
      Elements.createHeader({
        size: '2',
        textContent: 'Register.',
      }),
    );

    this.componentContainer.appendChild(
      Elements.createText({
        textContent: "Don't have an account yet? <br> Register now!",
      }),
    );

    this.componentContainer.appendChild(
      Elements.createText({
        className: 'error-message',
      }),
    );

    this.componentContainer.appendChild(
      Elements.createLoginForm({
        content: formParams,
        className: 'register-form',
        buttonName: 'Sign Up',
        onClick: () => {
          this.authenticator.register();
        },
      }),
    );

    this.componentContainer.appendChild(
      Elements.createButton({
        textContent: 'Already have an account? <br> Go to login',
        className: 'button__link',
        onClick: () => {
          Router.navigate('/');
        },
      }),
    );

    return this.componentContainer;
  }
}

export default RegisterComponent;

/**
 * Login Component
 */

import Authenticator from '../../lib/Authenticator';
import Component from '../../lib/Component';
import Elements from '../../lib/Elements';
import Router from '../../router';

class LoginComponent extends Component {
  constructor() {
    super({
      name: 'login',
      model: {
        formData: [{
          textContent: '<span class=\'form__label-name\'>Email</span>',
          placeholder: 'JohnDoe@gmail.com',
          type: 'text',
          id: 'email',
          labelClassName: 'form__label',
          inputClassName: 'form__input',
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
      routerPath: '/',
    });
    this.authenticator = new Authenticator();
  }

  render() {
    this.clearComponentContainer();
    const { formData } = this.model;

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
        textContent: 'Login.',
      }),
    );

    this.componentContainer.appendChild(
      Elements.createText({
        textContent: 'Welcome to Whistle, <br> please sign in',
      }),
    );

    this.componentContainer.appendChild(
      Elements.createText({
        className: 'error-message',
      }),
    );

    this.componentContainer.appendChild(
      Elements.createLoginForm({
        content: formData,
        className: 'login-form',
        buttonName: 'Login',
        onClick: () => {
          this.authenticator.login(); // logs in when button is clicked
        },
      }),
    );

    this.componentContainer.appendChild(
      Elements.createHeader({
        size: 4,
        textContent: 'Or login with',
      }),
    );

    this.componentContainer.appendChild(
      Elements.createContainer({
        className: 'login-authenticate',
        children: [
          Elements.createButton({
            textContent: '<i class="fab fa-google"></i><p>GOOGLE</p>',
            className: 'button__invite login-authenticate__google',
            onClick: () => {
              this.authenticator.loginWithGoogle(); // Google Login
            },
          }),
        ],
      }),
    );

    this.componentContainer.appendChild(
      Elements.createButton({
        textContent: 'New User? Sign Up',
        className: 'button__link',
        onClick: () => {
          Router.navigate('/register');
        },
      }),
    );

    return this.componentContainer;
  }
}

export default LoginComponent;

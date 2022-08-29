/**
 *  Extra Info Component
 */

import Component from '../../lib/Component';
import Elements from '../../lib/Elements';
import Router from '../../router';

class InfoComponent extends Component {
  constructor() {
    super({
      name: 'info',
      model: {
        formData: [{
          textContent: '<span class=\'form__label-name\'>First Name</span>',
          placeholder: 'Johnny',
          type: 'text',
          id: 'firstName',
          labelClassName: 'form__label',
          inputClassName: 'form__input',
        },
        {
          textContent: '<span class=\'form__label-name\'>Last Name</span>',
          placeholder: 'Doe',
          type: 'text',
          id: 'lastName',
          labelClassName: 'form__label',
          inputClassName: 'form__input',
        },
        {
          textContent: '<span class=\'form__label-name\'>Phone Number</span>',
          placeholder: '0123/45.67.89',
          type: 'text',
          id: 'phoneNumber',
          labelClassName: 'form__label',
          inputClassName: 'form__input',
        },
        ],
      },
      routerPath: '/info',
    });
  }

  async renderAsync() {
    this.clearComponentContainer();
    const { formData } = this.model; // destructure the formData

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'image-background',
      id: 'image-background',
    }));

    this.componentContainer.appendChild(
      Elements.createContainer({
        className: 'extra-info',
        id: 'info',
        children: [
          Elements.createAppName({
            size: '4',
          }),
          Elements.createHeader({
            size: '2',
            textContent: 'Extra Info.',
          }),
          Elements.createText({
            textContent: 'We need some additional <br> information from you',
          }),
          Elements.createLoginForm({
            content: formData,
            className: 'info-form',
            buttonName: 'Confirm',
            onClick: () => {
              this.authenticator.updateData().then(Router.navigate('/')); // updates data to firestore and Routes back to login screen
            },
          }),
        ],
      }),
    );
    return this.componentContainer;
  }
}

export default InfoComponent;

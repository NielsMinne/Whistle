/**
 * Account Settings Component
 */

import { QSELECT } from '../consts';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import User from '../lib/User';
import Router from '../router';

class AccountComponent extends Component {
  constructor() {
    super({
      name: 'account-settings',
      routerPath: '/account-settings',
    });
    this.user = new User();
  }

  async renderAsync() {
    this.clearComponentContainer();
    await this.user.setUserInfo(); // gets the info of the user to put in the value of the fields
    await this.user.getAvatar();

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'image-background',
      id: 'image-background2',
    }));

    this.componentContainer.appendChild(Elements.createHeaderNav({
      containerClassName: 'header-nav-container',
      title: 'WH<span>!</span>STLE ACCOUNT',
      subTitle: 'Account Settings',
    }));

    this.componentContainer.appendChild(
      Elements.createContainer({
        className: 'account-container',
        children: [
          Elements.createHeader({
            size: 3,
            textContent: 'My Account.',
          }),
          Elements.createText({
            textContent: 'Review or Update <br>your account settings.',
          }),
          Elements.createFormWithNormalLabel({
            content: [
              {
                textContent: 'Username',
                placeholder: this.user.username,
                type: 'text',
                id: 'username',
                labelClassName: 'form__account-label',
                inputClassName: 'form__account-input',
                disabled: true,
                onClick: () => { const input = QSELECT('#username'); input.disabled = false; },
              },
              {
                textContent: 'First Name',
                placeholder: this.user.firstName,
                type: 'text',
                id: 'firstName',
                labelClassName: 'form__account-label',
                inputClassName: 'form__account-input',
                disabled: true,
                onClick: () => { const input = QSELECT('#firstName'); input.disabled = false; },

              },
              {
                textContent: 'Last Name',
                placeholder: this.user.lastName,
                type: 'text',
                id: 'lastName',
                labelClassName: 'form__account-label',
                inputClassName: 'form__account-input',
                disabled: true,
                value: this.user.lastName,
                onClick: () => { const input = QSELECT('#lastName'); input.disabled = false; },

              },
              {
                textContent: 'Phone Number',
                placeholder: this.user.phoneNumber,
                type: 'text',
                id: 'phoneNumber',
                labelClassName: 'form__account-label',
                inputClassName: 'form__account-input',
                disabled: true,
                onClick: () => { const input = QSELECT('#phoneNumber'); input.disabled = false; },

              },
            ],
            className: 'account-form',
          }),

          Elements.createLabel({
            textContent: 'Avatar',
            className: 'avatar-label',
          }),
          Elements.createHorizontalRule({
            size: 2,
            className: 'avatar-rule',
          }),
          Elements.createButton({
            textContent: 'Change avatar picture..',
            className: 'button__normal--avatar',
            onClick: () => {
              const overlay = QSELECT('.avatar-overlay');
              overlay.className = 'avatar-overlay';
            },
          }),
          Elements.createButton({
            textContent: 'Save Account Settings',
            className: 'button__invite',
            onClick: async () => {
              const form = new FormData(QSELECT('.account-form'));
              await this.user.updateUserInfo(
                (form.get('username')) ? form.get('username') : this.user.username,
                (form.get('firstName')) ? form.get('firstName') : this.user.firstName,
                (form.get('lastName')) ? form.get('lastName') : this.user.lastName,
                (form.get('phoneNumber')) ? form.get('phoneNumber') : this.user.phoneNumber,
              ).then(() => { Router.navigate('/home'); });
            },
          }),
          Elements.createButton({
            textContent: 'LOGOUT',
            className: 'button__normal',
            onClick: () => { this.authenticator.logout(); },
          }),
          Elements.createButton({
            textContent: 'REMOVE ACCOUNT',
            className: 'button__warning',
            onClick: () => {
              QSELECT('.delete-account-overlay').className = 'delete-account-overlay';
            },
          }),
        ],
      }),
    );

    const Avatarform = document.createElement('form');
    Avatarform.className = 'avatar-overlay__input';

    Avatarform.appendChild(Elements.createButton({
      textContent: 'Upload Image...',
      className: 'button__normal avatar-overlay__button',
    }));

    Avatarform.appendChild(
      Elements.createInput({
        type: 'file',
        className: 'avatar-overlay__file',
        name: 'avatarImage',
        id: 'avatarImage',
      }),
    );

    this.componentContainer.appendChild(

      Elements.createContainer({
        className: 'avatar-overlay hide',
        children: [
          Elements.createHeader({
            className: 'avatar-overlay__header',
            size: 2,
            textContent: ' Choose <br>Your Avatar.',
          }),
          Elements.createAvatarRadioButton({
            className: 'avatar',
            avatarArray: [
              'alien', 'bunny', 'cat', 'dog', 'frog', 'panda', 'piglet', 'pinguin', 'robot',
            ],
            size: '70px',
          }),
          Elements.createHeader({
            size: 3,
            textContent: 'OR',
            className: 'avatar-overlay__text',
          }),
          Avatarform,

          Elements.createButton({
            textContent: 'SAVE',
            className: 'button__invite avatar-overlay__button--save',
            onClick: async () => {
              if (QSELECT('input:checked')) {
                const avatar = QSELECT('input[name="avatarImage"]:checked').value;
                await this.user.updateUserImage(avatar);
              } else {
                const formAvatar = new FormData(QSELECT('.avatar-overlay__input'));
                const uploadedImage = formAvatar.get('avatarImage');
                this.user.uploadAvatar(uploadedImage).then(() => { this.user.getAvatar(); });
              }
              QSELECT('.avatar-overlay').className = 'avatar-overlay hide';
              this.clearComponentContainer();
              this.renderAsync();
            },
          }),
        ],
      }),
    );

    this.componentContainer.appendChild(
      Elements.createContainer({
        className: 'delete-account-overlay hide',
        children: [
          Elements.createHeader({
            className: 'delete-account-overlay__header',
            size: 2,
            textContent: 'Are you sure you want to <span>delete</span> your account?"',
          }),
          Elements.createContainer({
            className: 'delete-account-overlay__button-container',
            children: [
              Elements.createButton({
                textContent: 'NO',
                className: 'button__accept',
                onClick: () => {
                  QSELECT('.delete-account-overlay').className = 'delete-account-overlay hide';
                },
              }),
              Elements.createButton({
                textContent: 'YES',
                className: 'button__reject',
                onClick: () => {
                  QSELECT('.delete-account-overlay').className = 'delete-account-overlay hide';
                  QSELECT('.credentials-overlay').className = 'credentials-overlay';
                },
              }),

            ],
          }),

        ],
      }),
    );

    this.componentContainer.appendChild(
      Elements.createContainer({
        className: 'credentials-overlay hide',
        children: [
          Elements.createHeader({
            className: 'credentials-overlay__header',
            size: 3,
            textContent: 'Please insert E-mail and Password to <span>delete</span> your account',
          }),
          Elements.createContainer({
            className: 'credentials-overlay__credential-container',
            children: [
              Elements.createFormWithNormalLabel({
                content: [
                  {
                    textContent: 'E-mail',
                    placeholder: this.user.email,
                    type: 'email',
                    id: 'email',
                    labelClassName: 'form__account-label',
                    inputClassName: 'form__account-input',

                  },
                  {
                    textContent: 'Password',
                    placeholder: 'Your password',
                    type: 'password',
                    id: 'password',
                    labelClassName: 'form__account-label',
                    inputClassName: 'form__account-input',

                  },
                ],
              }),
              Elements.createButton({
                textContent: 'DELETE',
                className: 'button__warning',
                onClick: () => {
                  this.user.deleteAccount();
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

export default AccountComponent;

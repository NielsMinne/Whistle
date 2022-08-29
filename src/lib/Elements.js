/**
 * Elements Library
 */

import { QSELECT } from '../consts';
import Router from '../router';
import Location from './Location';
import User from './User';
import Authenticator from './Authenticator';

const Elements = {
  user: new User(),
  location: new Location(),
  authenticator: new Authenticator(),

  createContainer({
    className = '', id = '', innerHTML = '', children = [], onClick = null,
  }) {
    const container = document.createElement('div');
    if (id) container.setAttribute('id', id);
    container.className = className;
    container.innerHTML = innerHTML;
    if (onClick) container.addEventListener('click', () => { onClick(); });
    if (children.length) {
      children.forEach((child) => {
        if (child instanceof Element) {
          container.appendChild(child);
        }
      });
    }
    return container;
  },

  createHeader({
    size = 1, textContent = '', className = '', onClick = null,
  }) {
    if (size < 1 || size > 6) return null;
    const header = document.createElement(`h${size}`);
    header.className = className;
    header.innerHTML = textContent;
    if (onClick) header.addEventListener('click', (e) => { e.preventDefault(); onClick(); });
    return header;
  },

  createAppName({ size = 1 }) {
    if (size < 1 || size > 6) return null;
    const header = document.createElement(`h${size}`);
    header.className = 'app-name';
    const span = document.createElement('span');
    span.textContent = '!';
    header.innerHTML = 'WH<span>!</span>STLE';

    return header;
  },

  createText({ textContent = '', className = '', onClick = null }) {
    const p = document.createElement('p');
    p.innerHTML = textContent;
    p.className = className;
    if (onClick) p.addEventListener('click', (e) => { e.preventDefault(); onClick(); });
    return p;
  },

  createSmall({ textContent = '', className = '' }) {
    const small = document.createElement('small');
    small.innerHTML = textContent;
    small.className = className;
    return small;
  },

  createButton({
    textContent = '', className = '', onClick = null,
  }) {
    const button = document.createElement('button');
    button.innerHTML = textContent;
    button.className = className;
    if (onClick) button.addEventListener('click', (e) => { e.preventDefault(); onClick(); });
    return button;
  },

  createPopupChatButton({
    textContent = '', className = '', onClick = null,
  }) {
    const button = document.createElement('button');
    button.innerHTML = textContent;
    button.className = className;
    if (onClick) button.addEventListener('click', (e) => { e.preventDefault(); localStorage.setItem('chatroomID', e.currentTarget.firstChild.innerHTML); onClick(); });
    return button;
  },

  createIcon({ className = '', id = '', onClick = null }) {
    const icon = document.createElement('i');
    icon.className = className;
    icon.id = id;
    if (onClick) icon.addEventListener('click', (e) => { e.preventDefault(); localStorage.setItem('deleteFriendUID', e.currentTarget.id); onClick(); });
    return icon;
  },

  createLink({ href = '#', textContent = '', target = '_self' }) {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = textContent;
    a.target = target;
    return a;
  },

  createInput({
    className = '', type = '', id = '', placeholder = '', value = '', required = true, disabled = false, onClick = null, maxChar,
  }) {
    const input = document.createElement('input');
    input.className = className;
    input.type = type;
    input.name = id;
    input.id = id;
    input.placeholder = placeholder;
    input.required = required;
    input.disabled = disabled;
    input.value = value;
    input.max = maxChar;
    if (onclick) input.addEventListener('click', () => { onClick(); });
    return input;
  },

  createLabel({ textContent = '', className = '', labelFor = '' }) {
    const label = document.createElement('label');
    label.className = className;
    label.for = labelFor;
    label.innerHTML = textContent;
    return label;
  },

  createCategoryList({ categories = [], className = '', placeholder = '' }) {
    const select = document.createElement('select');
    select.name = className;
    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      option.innerHTML = category;
      select.appendChild(option);
    });
    select.className = className;
    select.placeholder = placeholder;
    return select;
  },

  createForm({
    content = [], className = '',
  }) {
    const form = document.createElement('form');
    form.className = className;
    const parentDiv = document.createElement('div');
    parentDiv.className = 'form';
    content.forEach(({
      textContent, placeholder, type, id, labelClassName, inputClassName,
    }) => {
      const div = document.createElement('div');
      div.appendChild(Elements.createInput({
        className: inputClassName,
        type,
        id,
        placeholder,
      }));
      div.appendChild(Elements.createLabel({
        className: labelClassName,
        labelFor: id,
        textContent,
      }));
      parentDiv.appendChild(div);
    });
    form.appendChild(parentDiv);
    return form;
  },

  createMap({ coords = [], zoom = 14 }) {
    const container = document.createElement('div');
    container.className = 'map-container';

    mapboxgl.accessToken = 'pk.eyJ1IjoibmllbHNtaSIsImEiOiJja255YXJwZGIwNTFsMnhyanUzc2xpM3lwIn0.0gILckTI2ATyJCc7fOs3Eg';
    const map = new mapboxgl.Map({
      container, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [coords[0], coords[1]], // starting position [lng, lat]
      zoom, // starting zoom
    });

    const markerEl = document.createElement('div');
    markerEl.style.width = '40px';
    markerEl.style.height = '40px';
    markerEl.className = 'marker';

    const marker = new mapboxgl.Marker(markerEl)
      .setLngLat([coords[0], coords[1]])
      .addTo(map);

    return container;
  },

  createTakeCareMap({
    eventCoords = [], coords = [], zoom = 14, usersInfo = [],
  }) {
    const container = document.createElement('div');
    container.className = 'map-container';

    mapboxgl.accessToken = 'pk.eyJ1IjoibmllbHNtaSIsImEiOiJja255YXJwZGIwNTFsMnhyanUzc2xpM3lwIn0.0gILckTI2ATyJCc7fOs3Eg';
    const map = new mapboxgl.Map({
      container, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [coords[0], coords[1]], // starting position [lng, lat]
      zoom, // starting zoom
    });

    const markerEl = document.createElement('div');
    markerEl.style.width = '40px';
    markerEl.style.height = '40px';
    markerEl.className = 'marker';

    markerEl.appendChild(
      Elements.createContainer({
        className: 'marker__radius',
      }),
    );
    const marker = new mapboxgl.Marker(markerEl)
      .setLngLat([eventCoords[0], eventCoords[1]])
      .addTo(map);

    usersInfo.forEach((info) => {
      const coords = info[0].split(',');
      const markerElUsers = document.createElement('div');
      markerElUsers.style.width = '40px';
      markerElUsers.style.height = '40px';
      markerElUsers.className = 'users-marker';
      markerElUsers.style.backgroundImage = `url(${info[1]})`;
      markerElUsers.appendChild(
        Elements.createText({
          textContent: info[2],
        }),
      );

      const marker = new mapboxgl.Marker(markerElUsers)
        .setLngLat(coords)
        .addTo(map);
    });

    return container;
  },

  createImageDiv({ className = '', url = '' }) {
    const imageDiv = document.createElement('div');
    imageDiv.className = className;
    imageDiv.style.backgroundImage = `url(${url})`;
    return imageDiv;
  },

  createSpan({ className = '', textContent = '' }) {
    const span = document.createElement('span');
    span.className = className;
    span.innerHTML = textContent;
    return span;
  },

  createFriendRequestOverlay({
    container, doc, acceptOnClick = null, rejectOnClick = null,
  }) {
    container.appendChild(
      Elements.createContainer({
        className: 'friend-request-overlay',
        children: [
          Elements.createUserAvatar({
            radius: '100px',
            url: doc.avatarImageUrl,
            className: 'friend-request-overlay__avatar',
          }),
          Elements.createHeader({
            className: 'friend-request-overlay__header',
            size: 4,
            textContent: `${doc.username}<br> wants to add you!`,
          }),
          Elements.createContainer({
            className: 'friend-request-overlay__button-container',
            children: [
              Elements.createButton({
                textContent: 'REJECT',
                className: 'button__reject',
                onClick: () => {
                  rejectOnClick();
                },
              }),
              Elements.createButton({
                textContent: 'ACCEPT',
                className: 'button__accept',
                onClick: () => {
                  acceptOnClick();
                },
              }),

            ],
          }),

        ],
      }),
    );
  },

  createFriendDeleteOverlay({
    container, doc, componentContainer,
  }) {
    container.appendChild(
      Elements.createContainer({
        className: 'friend-request-overlay',
        children: [
          Elements.createUserAvatar({
            radius: '100px',
            url: doc.avatarImageUrl,
            className: 'friend-request-overlay__avatar',
          }),
          Elements.createHeader({
            className: 'friend-request-overlay__header',
            size: 4,
            textContent: `Are you sure you want <br> to <span>DELETE</span> ${doc.username}?`,
          }),
          Elements.createContainer({
            className: 'friend-request-overlay__button-container',
            children: [
              Elements.createButton({
                textContent: 'No',
                className: 'button__accept',
                onClick: () => {
                  QSELECT('.friend-request-overlay').remove();
                },
              }),
              Elements.createButton({
                textContent: 'Yes',
                className: 'button__reject',
                onClick: () => {
                  this.user.removeFriend(localStorage.getItem('deleteFriendUID'), JSON.parse(localStorage.getItem('user')).uid);
                  componentContainer.clearComponentContainer();
                  componentContainer.renderAsync();
                },
              }),

            ],
          }),

        ],
      }),
    );
  },

  createEventCard({
    url = '', eventTime = '', eventName = '', eventDate = '', eventUID = '', onClick = null,
  }) {
    const container = document.createElement('div');
    container.className = 'event';
    const card = document.createElement('div');
    card.className = 'event__card';

    if (onClick) {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const hostedEventUID = e.currentTarget.firstChild.innerHTML;
        localStorage.setItem('hostedEventUID', hostedEventUID);
        onClick();
      });
    }
    card.appendChild(
      Elements.createText({
        className: 'event__uid',
        textContent: eventUID,
      }),
    );

    card.appendChild(
      Elements.createSpan({
        className: 'event__date',
        textContent: eventDate,
      }),
    );
    card.appendChild(
      Elements.createImageDiv({
        className: 'event__image',
        url,
      }),
    );
    card.appendChild(
      Elements.createContainer({
        children: [
          Elements.createHeader({
            size: 4,
            textContent: eventTime,
            className: 'event__time',
          }),
          Elements.createHeader({
            size: 5,
            textContent: eventName,
            className: 'event__name',
          }),
          Elements.createSpan({
            className: 'event__info',
            textContent: 'more info',
          }),
        ],
      }),
    );
    container.appendChild(card);
    return container;
  },

  createParticipant({ className = '', url = '', username = '' }) {
    const div = document.createElement('div');
    div.className = className;

    div.appendChild(
      Elements.createImageDiv({
        url,
        className: 'user__image',
      }),
    );
    div.appendChild(
      Elements.createHeader({
        size: 5,
        textContent: username,
        className: 'user__name',
      }),
    );

    return div;
  },

  createInviteButton({
    textContent = '', className = '', onClick = null, eventUID = ' ',
  }) {
    const button = document.createElement('button');
    button.innerHTML = textContent;
    button.className = className;
    button.appendChild(Elements.createText({
      textContent: eventUID,
    }));
    if (onClick) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const invitedEventUID = e.currentTarget.lastChild.innerHTML;
        console.log(invitedEventUID);
        localStorage.setItem('invitedEvent', invitedEventUID);
        onClick();
      });
    }
    return button;
  },

  createFriendCard({
    className = '', username = '', url = '', deleteID = '', onClick = null,
  }) {
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(
      Elements.createContainer({
        className: 'friend-container__friend-card',
        children: [
          Elements.createUserAvatar({
            url,
            radius: '40px',
            className: 'friend-container__avatar',
          }),
          Elements.createHeader({
            size: 5,
            className: 'friend-container__name',
            textContent: username,
          }),
          Elements.createIcon({
            className: 'fas fa-trash-alt fa-lg friend-container__delete',
            id: deleteID,
            onClick: () => {
              
              onClick();
            },
          }),
        ],
      }),
    );
    return div;
  },

  createChatroomCard({
    className = '', username = '', url = '', onClick = null, eventUID = '',
  }) {
    const div = document.createElement('div');
    div.className = className;
    if (onClick) {
      div.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem('chatroomID', e.currentTarget.firstChild.firstChild.innerHTML);
        onClick();
      });
    }
    div.appendChild(
      Elements.createContainer({
        className: 'chatroom-container__chatroom-card',
        children: [
          Elements.createText({
            textContent: eventUID,
            className: 'chatroom-container__eventUID no-display',
          }),
          Elements.createUserAvatar({
            url,
            radius: '40px',
            className: 'chatroom-container__avatar',
          }),
          Elements.createHeader({
            size: 5,
            className: 'chatroom-container__name',
            textContent: username,
          }),
        ],
      }),
    );
    return div;
  },

  createLoginForm({
    content = [], className = '', buttonName = '', onClick = null,
  }) {
    const form = document.createElement('form');
    form.className = className;
    const parentDiv = document.createElement('div');
    parentDiv.className = 'form';
    content.forEach(({
      textContent, placeholder, type, id, labelClassName, inputClassName, usernameMaxChar,
    }) => {
      const div = document.createElement('div');
      div.appendChild(Elements.createInput({
        className: inputClassName,
        type,
        id,
        placeholder,
        usernameMaxChar,
      }));
      div.appendChild(Elements.createLabel({
        className: labelClassName,
        labelFor: id,
        textContent,
      }));
      parentDiv.appendChild(div);
    });
    parentDiv.appendChild(
      Elements.createButton({
        textContent: buttonName,
        className: 'button__login',
        onClick: () => { onClick(); },
      }),
    );
    form.appendChild(parentDiv);
    return form;
  },

  createFormWithNormalLabel({
    content = [], className = '',
  }) {
    const form = document.createElement('form');
    form.className = className;
    const parentDiv = document.createElement('div');
    parentDiv.className = 'form';
    content.forEach(({
      textContent, placeholder, type, id, inputClassName, labelClassName, disabled, onClick,
    }) => {
      const div = document.createElement('div');
      div.appendChild(Elements.createLabel({
        className: labelClassName,
        labelFor: id,
        textContent,
      }));
      div.appendChild(Elements.createInput({
        className: inputClassName,
        type,
        name: id,
        id,
        placeholder,
        disabled,
      }));
      if (onClick)div.addEventListener('click', () => { onClick(); });
      parentDiv.appendChild(div);
    });

    form.appendChild(parentDiv);
    return form;
  },

  createStartupAnimation() {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const h3 = document.createElement('h1');
    div.className = 'animation';
    img.src = './assets/other/Logo.svg';
    img.className = 'animation__logo';
    h3.innerHTML = 'Wh<span class="animation_span">!</span>stle';
    h3.className = 'animation__name';
    div.appendChild(img);
    div.appendChild(h3);
    return div;
  },

  createHomeItem({
    textContent = '', className = '', iconClass = '', onClick = null,
  }) {
    const homeItem = document.createElement('div');
    const h = document.createElement('h5');
    const i = document.createElement('i');
    h.innerHTML = textContent;
    i.className = iconClass;
    homeItem.className = className;
    homeItem.appendChild(h);
    homeItem.appendChild(i);
    if (onClick) homeItem.addEventListener('click', () => { onClick(); });
    return homeItem;
  },

  createUserAvatar({
    url = '', radius = '', className = '', username = '', onClick = null,
  }) {
    const circle = document.createElement('div');
    if (onClick) circle.addEventListener('click', (e) => { e.preventDefault(); onClick(); });
    if (url) {
      circle.style.backgroundImage = `url(${url})`;
    } else {
      const p = document.createElement('p');
      p.innerText = username.charAt(0);
      circle.appendChild(p);
    }
    circle.className = className;
    circle.style.width = radius;
    circle.style.height = radius;
    return circle;
  },

  createHorizontalRule({ size = '', className = '' }) {
    const hr = document.createElement('hr');
    hr.className = className;
    hr.style.borderTop = `${size}px solid white`;
    return hr;
  },

  createHeaderNav({ containerClassName = '', title = '', subTitle = '' }) {
    this.user.getAvatar();

    const container = document.createElement('div');
    container.className = containerClassName;
    container.appendChild(this.createLeftOverlay({ overlayClassName: 'overlay-left-container hide' }));
    container.appendChild(this.createRightOverlay({ overlayClassName: 'overlay-right-container hide' }));
    container.appendChild(
      Elements.createContainer({
        className: 'header-nav',
        id: 'headerNav',
        children: [
          Elements.createIcon({
            className: 'fas fa-bars fa-2x',
            onClick: () => {
              const overlayLeft = QSELECT('.overlay-left-container');
              overlayLeft.style.animation = 'openMenu .7s ease-in-out';
              overlayLeft.style.transform = 'translateX(0px)';
              const overlayRight = QSELECT('.overlay-right-container');
              if (overlayLeft.className === 'overlay-left-container') {
                overlayLeft.style.animation = 'closeMenu .5s ease-in';
                overlayLeft.style.transform = 'translateX(-230px)';
                setTimeout(() => { overlayLeft.className = 'overlay-left-container hide'; }, 500);
              } else {
                overlayLeft.className = 'overlay-left-container';
                overlayRight.style.animation = 'closeRightMenu .5s ease-in';
                setTimeout(() => { overlayRight.className = 'overlay-right-container hide'; }, 500);
              }
            },
          }),
          Elements.createContainer({
            className: 'header-nav__textcontainer',
            children: [
              Elements.createHeader({
                size: 5,
                textContent: title,
                className: 'header-nav__maintext',
              }),
              Elements.createText({
                textContent: subTitle,
                className: 'header-nav__subtext',
              }),
            ],
          }),
          Elements.createUserAvatar({
            url: localStorage.getItem('avatarImageUrl'),
            radius: '50px',
            className: 'header-nav__avatar',
            onClick: () => {
              const overlayLeft = QSELECT('.overlay-left-container');
              const overlayRight = QSELECT('.overlay-right-container');
              overlayRight.style.animation = 'openRightMenu .7s ease-in-out';
              overlayRight.style.transform = 'translateX(0px)';
              if (overlayRight.className === 'overlay-right-container') {
                overlayRight.style.animation = 'closeRightMenu .5s ease-in';

                setTimeout(() => { overlayRight.className = 'overlay-right-container hide'; }, 500);
              } else {
                overlayRight.className = 'overlay-right-container';
                overlayLeft.style.animation = 'closeMenu .5s ease-in';
                overlayLeft.style.transform = 'translateX(-230px)';
                setTimeout(() => { overlayLeft.className = 'overlay-left-container hide'; }, 500);
              }
            },
          }),
        ],
      }),
    );
    return container;
  },

  createAvatarRadioButton({ avatarArray = [], size = '', className = '' }) {
    const container = document.createElement('div');
    container.className = className;
    avatarArray.forEach((image) => {
      const wrapper = document.createElement('div');
      const div = document.createElement('div');
      div.style.width = size;
      div.style.height = size;
      div.className = `avatar__image-${image}`;
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'avatarImage';
      input.style.width = size;
      input.style.height = size;
      input.value = `../assets/avatars/${image}.png`;
      wrapper.appendChild(input);
      wrapper.appendChild(div);

      container.appendChild(wrapper);
    });
    return container;
  },

  createLeftOverlay({ overlayClassName = '' }) {
    const overlayContainer = document.createElement('div');
    overlayContainer.className = overlayClassName;

    overlayContainer.appendChild(
      Elements.createContainer({
        children: [
          Elements.createHeader({
            size: 5,
            textContent: 'Home',
            onClick: () => {
              Router.navigate('/home');
            },
          }),

          Elements.createHeader({
            size: 5,
            textContent: 'Create Event',
            onClick: () => {
              Router.navigate('/create-event');
            },
          }),
          Elements.createHeader({
            size: 5,
            textContent: 'My Events',
            onClick: () => {
              Router.navigate('/my-events');
            },
          }),
          Elements.createHeader({
            size: 5,
            textContent: 'Friend List',
            onClick: () => {
              Router.navigate('/friend-list');
            },
          }),
          Elements.createHeader({
            size: 5,
            textContent: 'Chatrooms',
            onClick: () => {
              Router.navigate('/chatlist');
            },
          }),
          Elements.createHeader({
            size: 5,
            textContent: 'Meldet.org',
            onClick: () => {
              Router.navigate('/meldet');
            },
          }),
        ],
      }),
    );
    return overlayContainer;
  },

  createRightOverlay({ overlayClassName = '' }) {
    const overlayContainer = document.createElement('div');
    overlayContainer.className = overlayClassName;

    overlayContainer.appendChild(
      Elements.createContainer({
        children: [
          Elements.createContainer({
            className: 'overlay-right-container__account',
            children: [
              Elements.createUserAvatar({
                url: localStorage.getItem('avatarImageUrl'),
                radius: '100px',
                className: 'header-nav__avatar',
              }),
              Elements.createText({
                textContent: localStorage.getItem('fullName'),
              }),
              Elements.createSmall({
                textContent: localStorage.getItem('email'),
              }),

            ],
          }),
          Elements.createContainer({
            className: 'overlay-right-container__items',
            children: [
              Elements.createText({
                textContent: 'Change avatar',
                onClick: () => {
                  Router.navigate('/account-settings');
                },
              }),
              Elements.createText({
                textContent: 'Change username',
                onClick: () => {
                  Router.navigate('/account-settings');
                },
              }),
              Elements.createText({
                textContent: 'Remove account',
                className: 'overlay-right-container__items--remove-account',
                onClick: () => {
                  Router.navigate('/account-settings');
                },
              }),
              Elements.createText({
                textContent: 'Logout',
                onClick: () => {
                  localStorage.removeItem('user');
                  this.authenticator.logout();
                },
              }),

            ],
          }),

        ],
      }),
    );
    return overlayContainer;
  },

  createAddPeople({ avatarUrl = '', username = '', uid = '' }) {
    const div = document.createElement('div');
    div.className = 'add-people';

    div.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.currentTarget.children[2].firstChild.checked) {
        e.currentTarget.children[2].firstChild.checked = false;
      } else {
        e.currentTarget.children[2].firstChild.checked = true;
      }
    });

    div.appendChild(
      Elements.createUserAvatar({
        url: avatarUrl,
        radius: '50px',
        className: 'add-people__image',
      }),
    );

    div.appendChild(Elements.createHeader({
      size: 5,
      textContent: username,
    }));

    const label = document.createElement('label');

    div.appendChild(Elements.createContainer({
      children: [
        Elements.createInput({
          className: 'add-people__input',
          type: 'radio',
          id: uid,
          required: false,
        }),
        label,
      ],
    }));
    return div;
  },

};

export default Elements;

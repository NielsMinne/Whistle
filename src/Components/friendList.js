/**
 * Friend List Component
 */

import { QSELECT } from '../consts';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import User from '../lib/User';

class FriendListComponent extends Component {
  constructor() {
    super({
      name: 'friend-list',
      routerPath: '/friend-list',
    });
    this.user = new User();
  }

  async renderAsync() {
    this.clearComponentContainer();
    await this.user.setUserInfo();
    await this.user.getAllFriends();
    await this.user.getAllUsers();
    this.user.showFriendRequest(this);

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'image-background',
      id: 'image-background2',
    }));

    this.componentContainer.appendChild(Elements.createHeaderNav({
      containerClassName: 'header-nav-container',
      title: 'WH<span>!</span>STLE FRIENDS',
      subTitle: 'Stay connected with friends!',
    }));

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'friend-container',
      children: [
        Elements.createHeader({
          size: 5,
          textContent: 'My Friend List.',
        }),
        Elements.createHorizontalRule({
          size: 2,
        }),
        Elements.createIcon({
          className: 'fas fa-user-plus fa-2x friend-icon',
          onClick: () => {
            const friendOverlay = QSELECT('.friend-overlay');
            friendOverlay.className = 'friend-overlay';
            const usersContainer = QSELECT('.add-users-container');
            if (this.user.allUsers && this.user.friends) {
              this.user.allUsers.forEach((user) => {
                if ((!this.user.friends.includes(user.uid))
                && (!this.user.friendRequests.includes(user.uid))) {
                  usersContainer.appendChild(
                    Elements.createAddPeople({
                      avatarUrl: user.avatarImageUrl,
                      username: user.username,
                      uid: user.uid,
                    }),
                  );
                }
              });
            }
          },
        }),
        Elements.createContainer({
          className: 'friends-container',
          children: [
            Elements.createContainer({
              className: 'friends-container__invitation-container',
              children: [
                Elements.createLabel({
                  textContent: 'Invitations',
                  className: 'friends-container__label-invitations',
                }),
              ],
            }),

            Elements.createContainer({
              className: 'friends-container__accepted-container',
              children: [
                Elements.createLabel({
                  textContent: 'Friends',
                  className: 'friends-container__friends-label',
                }),
              ],
            }),
          ],
        }),
      ],
    }));

    this.componentContainer.appendChild(

      Elements.createContainer({
        className: 'friend-overlay hide',
        children: [
          Elements.createHeader({
            className: 'friend-overlay__header',
            size: 2,
            textContent: 'Who do you <br> want to add?',
          }),
          Elements.createContainer({
            className: 'add-users-container',
          }),
          Elements.createButton({
            textContent: 'Add',
            className: 'button__invite--add',
            onClick: async () => {
              await this.user.addFriends().then(async () => {
                this.clearComponentContainer();
                this.renderAsync();
              });
            },
          }),
        ],
      }),
    );

    await this.user.showFriends(this);

    return this.componentContainer;
  }
}

export default FriendListComponent;

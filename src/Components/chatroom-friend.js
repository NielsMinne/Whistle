/**
 * Chatroom for friends Component
 */

import Chatroom from '../lib/Chatroom';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import User from '../lib/User';

class ChatroomFriendComponent extends Component {
  constructor() {
    super({
      name: 'chatroom-friend',
      routerPath: '/chatroom-friend',
    });
    this.user = new User();
    this.chatroom = new Chatroom();
  }

  async renderAsync() {
    this.clearComponentContainer();

    this.chatroom.getMessages();

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'image-background',
      id: 'image-background2',
    }));

    this.componentContainer.appendChild(Elements.createHeaderNav({
      containerClassName: 'header-nav-container',
      title: 'WH<span>!</span>STLE FRIENDS',
      subTitle: 'Stay connected with friends!',
    }));

    this.componentContainer.appendChild(

      Elements.createContainer({
        className: 'chat',
        children: [

          Elements.createContainer({
            className: 'chat__field',
            children: [
              Elements.createContainer({
                className: 'chat__title-container',
                children: [
                  Elements.createUserAvatar({
                    radius: '45px',
                    className: 'chat__avatar',
                    url: JSON.parse(localStorage.getItem('friend')).avatarImageUrl,
                  }),
                  Elements.createHeader({
                    size: 5,
                    textContent: `Chat with ${JSON.parse(localStorage.getItem('friend')).username}`,
                    className: 'chat__title',
                  }),
                ],
              }),
              Elements.createHorizontalRule({
                size: 2,
              }),
            ],
          }),
          Elements.createContainer({
            className: 'chat__input',
            children: [
              Elements.createInput({
                placeholder: 'Please insert your message...',
                type: 'text',
                id: 'chatInput',
              }),
              Elements.createButton({
                textContent: '<i class="fas fa-paper-plane fa-lg"></i>',
                onClick: () => {
                  this.chatroom.sendMessage();
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

export default ChatroomFriendComponent;

/**
 * Chatlist Component
 */

import Chatroom from '../lib/Chatroom';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import User from '../lib/User';

class ChatListComponent extends Component {
  constructor() {
    super({
      name: 'chatlist',
      routerPath: '/chatlist',
    });
    this.user = new User();
    this.chatroom = new Chatroom();
  }

  async renderAsync() {
    this.clearComponentContainer();
    this.chatroom.getEventChatrooms(); // get all event chatrooms
    this.chatroom.getFriendsChatrooms(); // get all friend chatrooms

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'image-background',
      id: 'image-background2',
    }));

    this.componentContainer.appendChild(Elements.createHeaderNav({
      containerClassName: 'header-nav-container',
      title: 'WH<span>!</span>STLE CHAT',
      subTitle: 'Stay connected with friends!',
    }));

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'chatroom-container',
      children: [
        Elements.createHeader({
          size: 5,
          textContent: 'My Chat List.',
        }),
        Elements.createHorizontalRule({
          size: 2,
        }),
        Elements.createContainer({
          className: 'chat-container',
          children: [
            Elements.createLabel({
              textContent: 'Friend Chat',
              className: 'event-chat-container__label',
            }),
          ],
        }),
        Elements.createContainer({
          className: 'event-chat-container',
          children: [
            Elements.createLabel({
              textContent: 'Event Chat',
              className: 'event-chat-container__label',
            }),
          ],
        }),
      ],
    }));

    return this.componentContainer;
  }
}

export default ChatListComponent;

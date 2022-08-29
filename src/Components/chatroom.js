/**
 * Chatroom for Events Component
 */

import Chatroom from '../lib/Chatroom';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import User from '../lib/User';
import Event from '../lib/Event';

class ChatroomComponent extends Component {
  constructor() {
    super({
      name: 'chatroom',
      routerPath: '/chatroom',
    });
    this.user = new User();
    this.chatroom = new Chatroom();
    this.event = new Event();
  }

  async renderAsync() {
    this.clearComponentContainer();

    await this.event.getSpecificEvent(localStorage.getItem('chatroomID'));
    await this.chatroom.getMessages();
    
    this.componentContainer.appendChild(Elements.createContainer({
      className: 'image-background',
      id: 'image-background2',
    }));

    this.componentContainer.appendChild(Elements.createHeaderNav({
      containerClassName: 'header-nav-container',
      title: 'WH<span>!</span>STLE CHAT',
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
                    url: '../assets/other/cityscape.svg',
                  }),
                  Elements.createHeader({
                    size: 5,
                    textContent: this.event.name,
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

export default ChatroomComponent;

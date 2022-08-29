/**
 *  A Component Index (Add all components here)
 */

import App from './App';
import {
  LoginComponent, RegisterComponent, InfoComponent, HomeComponent,
  AccountComponent, HomeGridComponent, CreateEventComponent, MeldetComponent, FriendListComponent,
  MyEventComponent,
  HostedEventComponent,
  InvitedEventComponent,
  UpcomingEventComponent,
  ChatListComponent,
  ChatroomComponent,
  ChatroomFriendComponent,
  TakeCareModeComponent,
  EditEventComponent,
} from './Components';

export const allComponents = () => {
  const appContainer = document.querySelector('#app');
  const portal = document.querySelector('#portal');
  const app = new App(appContainer, portal);

  app.addComponent(new LoginComponent());
  app.addComponent(new RegisterComponent());
  app.addComponent(new InfoComponent());
  app.addComponent(new HomeComponent());
  app.addComponent(new HomeGridComponent());
  app.addComponent(new AccountComponent());
  app.addComponent(new CreateEventComponent());
  app.addComponent(new MeldetComponent());
  app.addComponent(new FriendListComponent());
  app.addComponent(new MyEventComponent());
  app.addComponent(new HostedEventComponent());
  app.addComponent(new InvitedEventComponent());
  app.addComponent(new UpcomingEventComponent());
  app.addComponent(new ChatListComponent());
  app.addComponent(new ChatroomComponent());
  app.addComponent(new ChatroomFriendComponent());
  app.addComponent(new TakeCareModeComponent());
  app.addComponent(new EditEventComponent());
};

export default allComponents;

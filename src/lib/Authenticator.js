/**
 * Authentication Class for everything related to Login/Register/Info
 */

import {
  getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  doc, getDoc, getFirestore, setDoc,
} from 'firebase/firestore';
import { QSELECT } from '../consts';
import Router from '../router';
import AudioSound from './Audio';

class Authenticator {
  constructor(
    email,
    username,
    password,
  ) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.auth = getAuth();
    this.audio = new AudioSound();
    this.firestore = getFirestore();
  }

  /**
   * @returns To register an account to firebase + updates profile
   */
  async register() {
    this.setData();
    await createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        updateProfile(this.auth.currentUser, {
          displayName: this.username,
        });
      }).then(() => { Router.navigate('/info'); })
      .catch((error) => {
        QSELECT('.error-message').innerHTML = error.code.split('/')[1].replace('-', ' ');
      });
  }

  /**
     * @returns logs in with data given in form
     */
  async login() {
    const form = new FormData(QSELECT('form'));
    this.email = form.get('email');
    this.password = form.get('password');

    await signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        this.audio.playLoginAccepted();
        Router.navigate('/home');
      })
      .catch((error) => {
        QSELECT('.error-message').innerHTML = error.code.split('/')[1].replace('-', ' ');
      });
  }

  /**
     * @returns Logs in with google and updates data
     */
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider(); // make new google provider
    try {
      await signInWithPopup(this.auth, provider)
        .then(async () => {
          const docRef = doc(this.firestore, 'Users', this.auth.currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            this.audio.playLoginAccepted();
            Router.navigate('/home');
          } else {
            this.updateGoogleData();
            this.audio.playLoginAccepted();
            Router.navigate('/home');
          }
        });
    } catch (e) {
      QSELECT('.error-message').innerHTML = e.message;
    }
  }

  /**
   * @returns Adds a user to the firestore under 'Users' collection
   */
  async addUserToDatabase(userFirstName = '', userLastName = '', phone = '', email = '', username = '', uid = '', avatarImage = '') {
    await setDoc(doc(this.firestore, 'Users', this.auth.currentUser.uid), {
      firstName: userFirstName,
      lastName: userLastName,
      phoneNumber: phone,
      email,
      username,
      uid,
      avatarImageUrl: avatarImage,
      friends: [],
    });
  }

  /**
     * @returns Adds a Google user to the firestore under 'Users' collection
     */
  async addGoogleUserToDatabase(userFirstName = '', userLastName = '', phone = '', email = '', username = '', uid = '', avatarImage = '') {
    await setDoc(doc(this.firestore, 'Users', this.auth.currentUser.uid), {
      firstName: userFirstName,
      lastName: userLastName,
      phoneNumber: phone,
      email,
      username,
      uid,
      avatarImageUrl: avatarImage,
      friends: [],
    });
  }

  /**
   * @returns Gets the data out of the register form
   */
  setData() {
    const form = new FormData(QSELECT('form'));
    this.email = form.get('email');
    this.username = form.get('username');
    this.password = form.get('password');
  }

  /**
   * @returns updates firestore with your info when you log in register
   */
  async updateData() {
    const form = new FormData(QSELECT('form'));
    const userFirstName = form.get('firstName');
    const userLastName = form.get('lastName');
    const phone = form.get('phoneNumber');

    await this.addUserToDatabase(
      userFirstName,
      userLastName,
      phone,
      this.auth.currentUser.email,
      this.auth.currentUser.displayName,
      this.auth.currentUser.uid,
      '../assets/avatars/Whistle.png',
    );
  }

  /**
   * @returns updates firestore with your info when you log in with google
   */
  async updateGoogleData() {
    const firstName = this.auth.currentUser.displayName.split(' ')[0];
    const lastName = this.auth.currentUser.displayName.split(' ')[1];

    await this.addGoogleUserToDatabase(
      firstName,
      lastName,
      '',
      this.auth.currentUser.email,
      firstName,
      this.auth.currentUser.uid,
      '../assets/avatars/Whistle.png',
    );
  }

  /**
   * @returns logs out and clears localstorage
   */
  async logout() {
    this.auth.signOut();
    localStorage.clear();
    window.location.replace('/');
  }

  /**
   * @returns Checks if someone is logged in or not
   */
  checkifLoggedIn() {
    onAuthStateChanged(this.auth, async (user) => {
      if (!user) {
        Router.navigate('/');
        return null;
      }
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    });
  }
}

export default Authenticator;

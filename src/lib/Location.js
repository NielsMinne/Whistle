/**
 * Location Class for everything related to locations and calculations
 */

import {
  collection, doc, getDocs, getFirestore, query, setDoc,
} from 'firebase/firestore';
import { QSELECT } from '../consts';
import User from './User';
import Router from '../router';

class Location {
  constructor(
    street,
    number,
    city,
    coords,
  ) {
    this.street = street;
    this.number = number;
    this.city = city;
    this.coords = coords;
    this.takeCareUserInfo = [];
    this.user = new User();
    this.firestore = getFirestore();
  }

  /**
   * @returns function to check your location and display it on the map
   */
  async checkLocation() {
    const location = QSELECT('#location').value;
    const json = await this.fetchLocation(location);
    const container = QSELECT('#mapContainer');
    container.innerHTML = '';
    mapboxgl.accessToken = 'pk.eyJ1IjoibmllbHNtaSIsImEiOiJja255YXJwZGIwNTFsMnhyanUzc2xpM3lwIn0.0gILckTI2ATyJCc7fOs3Eg';
    const map = new mapboxgl.Map({
      container, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [json[0].lon, json[0].lat], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const markerEl = document.createElement('div');
    markerEl.style.width = '40px';
    markerEl.style.height = '40px';
    markerEl.className = 'marker';

    const marker = new mapboxgl.Marker(markerEl)
      .setLngLat([json[0].lon, json[0].lat])
      .addTo(map);
  }

  /**
   *
   * @param {*} location adress of the location you want the coordinates from
   * @returns returns the data from Nominatim app, coords and info about adress
   */
  async fetchLocation(location) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${location}&format=jsonv2`);
    const json = await response.json();
    if (json.error) throw new Error(json.error);
    return json;
  }

  /**
   * @param {*} coords the longitude and latitude in aan array [lon,lat]
   * @returns returns back the adress of the coords (input)
   */
  async fetchAdressByCoords(coords) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse.php?lat=${coords[1]}&lon=${coords[0]}&zoom=18&format=jsonv2`);
    const json = await response.json();
    if (json.error) throw new Error(json.error);
    return json;
  }

  /**
   * @returns sets the data of the location into the location fields
   */
  async setLocationData() {
    const location = QSELECT('#location').value;
    const json = await this.fetchLocation(location);
    const adress = json.filter((e) => e.category === 'building')[0].display_name.split(',');
    this.coords = [json.filter((e) => e.category === 'building')[0].lon, json.filter((e) => e.category === 'building')[0].lat];
    [this.number, this.street,,, this.city] = adress;
  }

  /**
   * @param {*} coords coords of the location you are positioned
   * @returns an adress corresponding to your coords
   */
  async autoAdressFill(coords) {
    const json = await this.fetchAdressByCoords(coords);
    const adress = json.display_name.split(',');
    [this.number, this.street,,, this.city] = adress;
    const adressFull = `${this.street}, ${this.number}, ${this.city}`;
    return adressFull;
  }

  /**
   * @param {*} param0 Destructure of street, city,number and coords
   * @returns sets the data of the location into the fields
   */
  async setEventLocationData({
    street, city, number, coords,
  }) {
    this.street = street;
    this.city = city;
    this.number = number;
    this.coords = coords;
  }

  /**
   * @param {*} coords1 coords of your position
   * @param {*} coords2 coords of the other position
   * @returns the number in km's between 2 points
   */
  async calculateDistanceBetweenPoints(coords1, coords2) { // Reference to stackoverflow https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates for the calculation function
    const R = 6371;
    const dLat = (coords2[1] - coords1[1]) * (Math.PI / 180);
    const dLon = (coords2[0] - coords1[0]) * (Math.PI / 180);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(coords1[1] * (Math.PI / 180)) * Math.cos(coords2[1] * (Math.PI / 180))
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return Math.round(d * 100) / 100;
  }

  /**
   * @returns updates the position of the user every 10 seconds;
   */
  async listenForPositionChanges() {
    setInterval(async () => {
      await this.updatePositionUsers();
    }, 10000);
  }

  /**
   * @returns gets the coordinates of all the other users that are currently in the event
   */
  async getUsersCoords() {
    const q = query(collection(this.firestore, 'Events', localStorage.getItem('activeEventUID'), 'Positions'));
    const querySnapshot = await getDocs(q);
    const userInfo = [];

    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        userInfo.push(doc.data().userInfo);
      }
    });
    this.takeCareUserInfo = userInfo;
  }

  /**
   * @param {*} eventCoords the coordinates of the event location
   * @param {*} interval insert the interval to stop it from executing
   * @returns Checks if you are in the radius of the event (100m)
   */
  async checkIfInEventRadius(eventCoords, interval) {
    if (await this.calculateDistanceBetweenPoints(localStorage.getItem('currentPositionCoords').split(','), eventCoords) <= 0.1) {
      clearInterval(interval);
      Router.navigate('/home');
      localStorage.removeItem('activeEventUID');
    }
  }

  /**
   * @returns updates the position of the users to the event's collection "Positions"
   */
  async updatePositionUsers() {
    await this.user.setUserInfo();
    this.getCurrentPosition();
    const docRef = doc(this.firestore, `Events/${localStorage.getItem('activeEventUID')}/Positions`, this.user.uid);
    await setDoc(docRef, {
      userUID: this.user.uid,
      userInfo: [localStorage.getItem('currentPositionCoords'), this.user.avatar, this.user.username],
    });
  }

  /**
 * @returns Geolocation function to get your position in coordinates
 */
  async getCurrentPosition() {
    const options = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.getCurrentPosition(this.succes, this.error, options);
  }

  /**
   * @param {*} pos the callback for position
   * @returns when the getCurrentPosition() is succeeded
   */
  async succes(pos) {
    const coords = [pos.coords.longitude, pos.coords.latitude];
    localStorage.setItem('currentPositionCoords', coords);
  }

  async error(error) {
    console.log(error);
  }
}

export default Location;

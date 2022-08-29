/**
 * Audio Class for all sounds
 */

class AudioSound {
  constructor() {
    this.audio = new Audio();
  }

  playMessage() {
    this.audio = new Audio('../assets/other/sounds/chat_message.mp3');
    this.audio.play();
    this.audio.volume = 0.2;
  }

  playEventActive() {
    this.audio = new Audio('../assets/other/sounds/event_active.mp3');
    this.audio.play();
    this.audio.volume = 0.4;
  }

  playPanicPopup() {
    this.audio = new Audio('../assets/other/sounds/panic_sound.mp3');
    this.audio.play();
    this.audio.volume = 0.4;
  }

  playLoginAccepted() {
    this.audio = new Audio('../assets/other/sounds/login_accepted.mp3');
    this.audio.play();
    this.audio.volume = 0.3;
  }
}

export default AudioSound;

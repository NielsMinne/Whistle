import './sass/main.scss';
import Elements from './lib/Elements';
import { allComponents } from './allComponents';
import { QSELECT } from './consts';

const initApp = () => {
  if (!localStorage.getItem('animationLoaded')) { // This is so the animation doesn't load on every component
    const appContainer = QSELECT('#app');
    const animation = Elements.createStartupAnimation(); // animation
    const background = document.createElement('div');
    background.id = 'image-background';
    appContainer.appendChild(background);
    appContainer.appendChild(animation);
    setTimeout(() => { allComponents(); }, 5000); // after animation played -> load all components
    localStorage.setItem('animationLoaded', true); // to make sure it doesn't get played again
  } else {
    allComponents();
  }

  if ('serviceWorker' in navigator) { // Service Workers Install
    navigator.serviceWorker.register('./sw.js');
  }
};

window.addEventListener('load', initApp);

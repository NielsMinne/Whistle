const MELDET_EMAIL = 'nielsminne@gmail.com';
const MAX_USERNAME = 14;
const MAX_EVENT_TITLE = 22;

const CATEGORIES = ['ableism', 'ageism', 'alloism', 'anti-Blackness', 'antisemitism', 'biphobia', 'catcalling',
  'classism', 'enbyphobia', 'ethnocentrism', 'eugenics', 'fatphobia', 'homophobia', 'islamophobia', 'lesbophobia',
  'misogynoir', 'misogyny', 'nativism', 'queerphobia', 'racism', 'religious imperialism', 'sexism', 'sizeism', 'stigmatization of addiction',
  'stigmatization of homelessness', 'toxic masculinity', 'transphobia', 'whorephobia'];

const rootUrl = `${window.location.protocol}//${window.location.host}`;

const QSELECT = (input) => document.querySelector(input); // Shortcut querySelector

export {
  QSELECT,
  CATEGORIES,
  MELDET_EMAIL,
  rootUrl,
  MAX_USERNAME,
  MAX_EVENT_TITLE,
};

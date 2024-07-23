const path = require('path');
const i18n = require('i18n');

i18n.configure({
  locales: ['en', 'hi'], 
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en', // Default language
  queryParameter: 'lang', 
  objectNotation: true, 
  autoReload: true, 
  syncFiles: true, 
  logWarnFn: (msg) => console.warn('Warning:', msg), 
  logErrorFn: (msg) => console.error('Error:', msg)
});

module.exports = i18n;

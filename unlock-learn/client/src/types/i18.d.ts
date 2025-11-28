// src/types/i18n.d.ts
import 'react-i18next';

interface ITranslation {
  nav: {
    home: string;
    courses: string;
    about: string;
    contact: string;
    signIn: string;
    getStarted: string;
    profile: string;
    settings: string;
    logout: string;
    privacy: string;
    admin: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: {
      start: string;
      explore: string;
    };
    stats: {
      students: string;
      courses: string;
      teachers: string;
    };
  };
  features: any; // you can expand later
  auth: any;
  privacy: any;
  settings: any;
  common: any;
  courses: any;
}

declare module 'react-i18next' {
  interface Resources extends ITranslation {}
}

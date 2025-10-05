import {configureLocalization} from '@lit/localize';

import {sourceLocale, targetLocales} from '../localization/locale-codes';


export const {getLocale, setLocale} = configureLocalization({
    sourceLocale,
    targetLocales,
    loadLocale: (locale) => import(`./src/localization/locales/${locale}.js`),
  });
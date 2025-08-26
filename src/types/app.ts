import { Locale } from "date-fns";

/**
 * The config type all apps should adhere to.
 */
export type AppConfig = {
  name: string;
  description: string;
  port: number;
  i18n: {
    /**
     * Locales that are supported by the app.
     * @example { en: 'English', fr: 'Français' }
     */
    locales: Record<string, string>;
    /**
     * The default locale to use when no locale is specified.
     * This should be the key of one of the locales in the `locales` object.
     * @example 'en'
     */
    defaultLocale: string;
    dateLocales: Record<string, Locale>;
    /**
     * The currency to use for formatting currency amounts.
     * @example 'GBP'
     */
    currency: string;
    /**
     * Whether the API returns currency amounts in minor units.
     */
    currencyReturnedInMinorUnit: boolean;
  };
  homepageSlug?: string;
  /*
   * The base url that the app is hosted on
   * */
  basename: string;
  /*
   * The base route for links to start with - this is different to the basename because we host apps in iframes
   * */
  linkBaseRoute: string;
  /*
   * The path to use for API requests. The real API address should then be set
   * with a 'Kraken-app-proxy-destination' header, which Kraken will read and
   * forward requests on to.
   * */
  APIProxyURL: string;
  /*
   * The default language for the app. e.g 'en' or 'fr'. Passed to https://www.i18next.com/overview/api#changelanguage.
   * */
  defaultLanguage: string;
  /*
   * Whether to show a login form if no "localTestingSessionCookie" is found
   * */
  isLoginRequired: boolean | undefined;
  /*
   * Value to set as the Authentication header for requests
   */
  appProxyJwt: string;
};

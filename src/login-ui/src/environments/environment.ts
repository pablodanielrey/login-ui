// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  oidp_issuer: 'https://oidc.econo.unlp.edu.ar/',
  loginApiUrl: 'http://localhost:10002/login/api/v1.0',
  //logoutUrl:'https://login.econo.unlp.edu.ar/logout/{{id_token}}/{{client_id}}',
  logoutUrl:'http://localhost:10005/logout/{{id_token}}/{{client_id}}',
  session: 'SID',
  client_id: 'login-ui',

  loginHeader: 'FCE | Login',
  loginLogo: '/assets/img/logo_fce.png',
  loginFooterMini: 'DiTeSI | Dirección de Tecnologías y Sistemas Informáticos | FCE - UNLP',
  loginFooterFull: 'DiTeSI | Dirección de Tecnologías y Sistemas Informáticos | Facultad de Ciencias Económicas | UNLP | Calle 6 Nº 777',
};


/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

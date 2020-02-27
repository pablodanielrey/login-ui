export const environment = {
  production: false,
  /*
  loginApiUrl: 'https://login.testing.econo.unlp.edu.ar/login/api/v1.0',
  recoverApiUrl: 'https://login.testing.econo.unlp.edu.ar/login/api/v1.0',
  hardwareApiUrl: 'https://login.testing.econo.unlp.edu.ar/login/api/v1.0',
  */

  wardenApiUrl: 'https://api.econo.unlp.edu.ar/warden/api/v1.0',
  oidp_issuer: 'https://oidc.testing.econo.unlp.edu.ar/',

  client_id: 'login-ui',
  version: '0.2.1',
 
  url_to_activate_qr: 'http://login:10005/login/qrcode/activar',
  
  /*
  auth: {
    issuer: 'https://oidc.econo.unlp.edu.ar/',
    redirectUri: window.location.origin + '/auth/oauth2',
    clientId: 'login-ui',
    scope: 'openid profile email algo',
    waitForTokenInMsec: 2000
  } 
  */
  auth: {
    issuer: 'https://oidc.econo.unlp.edu.ar/',
    redirectUri: 'http://localhost:10005/auth/oauth2',
    clientId: 'login-ui',
    scope: 'openid profile email algo',
    waitForTokenInMsec: 2000,
    requireHttps: false
  },

  loginApiUrl: 'http://localhost:10012/login/api/v1.0',
  //recoverApiUrl: 'https://login.econo.unlp.edu.ar/recover/api/v1.0',
  recoverApiUrl: 'http://localhost:10012/recover/api/v1.0',
  hardwareApiUrl: 'http://localhost:10012/login/api/v1.0',


};

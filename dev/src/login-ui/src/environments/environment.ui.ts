export const environment = {
  production: false,
  loginApiUrl: 'https://login.testing.econo.unlp.edu.ar/login/api/v1.0',
  recoverApiUrl: 'https://login.testing.econo.unlp.edu.ar/login/api/v1.0',
  hardwareApiUrl: 'https://login.testing.econo.unlp.edu.ar/login/api/v1.0',

  wardenApiUrl: 'https://api.econo.unlp.edu.ar/warden/api/v1.0',
  oidp_issuer: 'https://oidc.testing.econo.unlp.edu.ar/',

  client_id: 'login-ui',
  version: '0.0.1',

  loader: {
    cabecera: 'LOGIN | FCE',
    version: '0.0.1',
    tituloSistema: 'LOGIN',
    subtituloSistema: '',
    desarrolloSistema: 'DiTeSI | Dirección de Tecnologías y Sistemas Informáticos',
    logoSistema: '/assets/img/fce/logofce2018.png',
  },
  
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
    issuer: 'https://oidc.testing.econo.unlp.edu.ar/',
    redirectUri: window.location.origin + '/auth/oauth2',
    clientId: 'login-ui',
    scope: 'openid profile email algo',
    waitForTokenInMsec: 2000,
    requireHttps: false
  }  

};

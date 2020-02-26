export const environment = {
  production: false,
  loginApiUrl: 'https://login.econo.unlp.edu.ar/login/api/v1.0',
  recoverApiUrl: 'https://login.econo.unlp.edu.ar/recover/api/v1.0',
  hardwareApiUrl: 'https://login.econo.unlp.edu.ar/login/api/v1.0',

  wardenApiUrl: 'https://api.econo.unlp.edu.ar/warden/api/v1.0',
  oidp_issuer: 'https://oidc.econo.unlp.edu.ar/',

  client_id: 'login-ui',
  version: '0.2.0',
  
  url_to_activate_qr: 'http://login:10005/login/qrcode/activar',
  
  auth: {
    issuer: 'https://oidc.econo.unlp.edu.ar/',
    redirectUri: 'https://login.econo.unlp.edu.ar/auth/oauth2',
    clientId: 'login-ui',
    scope: 'openid profile email',
    waitForTokenInMsec: 2000,
    requireHttps: true
  }
};

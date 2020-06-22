export const environment = {
  production: true,
  loginApiUrl: 'https://hydra.login.econo.unlp.edu.ar/login/api/v1.0',
  emailApiUrl: 'https://hydra.login.econo.unlp.edu.ar/email/api/v1.0',
  recoverApiUrl: 'https://api.login.econo.unlp.edu.ar/recover/api/v1.0',
  hardwareApiUrl: 'https://hydra.login.econo.unlp.edu.ar/login/api/v1.0',

  wardenApiUrl: 'https://warden.econo.unlp.edu.ar/warden/api/v1.0',
  oidp_issuer: 'https://oidc.econo.unlp.edu.ar/',

  client_id: 'login-ui',
  version: '0.7.5',
  
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

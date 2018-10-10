export const environment = {
  production: true,
  oidp_issuer: 'https://oidc.econo.unlp.edu.ar/',
  loginApiUrl: 'https://api.econo.unlp.edu.ar/login/api/v1.0',
  logoutUrl:'https://login.econo.unlp.edu.ar/logout/{{id_token}}/{{client_id}}',
  session: 'SID',
  client_id: 'login-ui',
  default_logout_redirect: 'https://aplicaciones.econo.unlp.edu.ar',

  loginHeader: 'FCE | Login',
  loginLogo: '/assets/img/logo_fce.png',
  loginFooterMini: 'DiTeSI | Dirección de Tecnologías y Sistemas Informáticos | FCE - UNLP',
  loginFooterFull: 'DiTeSI | Dirección de Tecnologías y Sistemas Informáticos | Facultad de Ciencias Económicas | UNLP | Calle 6 Nº 777',
};

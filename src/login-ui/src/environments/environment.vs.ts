export const environment = {
  production: false,
  oidp_issuer: 'https://oidc.econo.unlp.edu.ar/',
  loginApiUrl: 'http://localhost:10002/login/api/v1.0',
  logoutUrl:'https://login.econo.unlp.edu.ar/logout/{{id_token}}/{{client_id}}',
  session: 'SID',

  loginHeader: 'FCE | Login',
  loginLogo: '/assets/img/logo_fce.png',
  loginFooterMini: 'DiTeSI | Dirección de Tecnologías y Sistemas Informáticos | FCE - UNLP',
  loginFooterFull: 'DiTeSI | Dirección de Tecnologías y Sistemas Informáticos | Facultad de Ciencias Económicas | UNLP | Calle 6 Nº 777',
};

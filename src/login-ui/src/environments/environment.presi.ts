export const environment = {
  production: true,
  oidp_issuer: 'https://oidp.asistencia.presi.unlp.edu.ar/',
  loginApiUrl: 'https://api.asistencia.presi.unlp.edu.ar/login/api/v1.0',
  logoutUrl:'https://login.asistencia.presi.unlp.edu.ar/logout/{{id_token}}/{{client_id}}',
  session: 'SID',

  loginHeader: 'Asistencia | Login',
  loginLogo: '/assets/img/logo_presi.png',
  loginFooterMini: 'Dirección General de Personal | Presidencia',
  loginFooterFull: 'Dirección General de Personal | Presidencia | UNLP | Calle 7 Nº 776',
};

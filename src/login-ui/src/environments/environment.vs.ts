export const environment = {
  production: false,
  oidp_issuer: 'https://oidc.econo.unlp.edu.ar/',
  loginApiUrl: 'http://localhost:9006/login/api/v1.0',
  logoutUrl:'https://login.econo.unlp.edu.ar/logout/{{id_token}}/{{client_id}}',
  session: 'SID'
};

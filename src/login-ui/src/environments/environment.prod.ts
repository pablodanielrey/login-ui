export const environment = {
  production: true,
  oidp_issuer: 'https://oidc.econo.unlp.edu.ar/',
  loginApiUrl: 'https://api.econo.unlp.edu.ar/login/api/v1.0',
  logoutUrl:'https://login.econo.unlp.edu.ar/logout/{{id_token}}/{{client_id}}',
  session: 'SID'  
};

export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '0af703b6fd3c932d14fe59b489d57931'),
    apiToken: { salt: env('API_TOKEN_SALT') },
  },
});

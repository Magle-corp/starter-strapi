// Use the appropriate .env file according to the environment.
require("dotenv").config({
  path: process.env.ENVIRONMENT
    ? `environments/.env.${process.env.ENVIRONMENT}`
    : "environments/.env",
});

module.exports = () => {
  return [
    "strapi::errors",
    "strapi::security",
    {
      name: "strapi::cors",
      config: {
        enabled: true,
        headers: "*",
        origin: process.env.CORS_ALLOWED_ORIGIN.split(", "),
      },
    },
    "strapi::poweredBy",
    "strapi::logger",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
  ];
};

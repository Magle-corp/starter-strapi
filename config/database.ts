// Use the appropriate .env file according to the environment.
require("dotenv").config({
  path: process.env.ENVIRONMENT
    ? `environments/.env.${process.env.ENVIRONMENT}`
    : "environments/.env",
});

export default ({ env }) => {
  return {
    connection: {
      client: "mysql",
      connection: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
      },
    },
  };
};

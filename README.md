# Starter kit Strapi

Strapi part of the Strapi + Next starter kit.

___


## Install

See the complete documentation of the [Strapi + Next starter kit](https://github.com/Magle-corp/starter-kit-strapi-next).

## Information

<details>
<summary>Environment file system</summary>

In order to extend the environment file system provided by Strapi we use the dotenv library to benefit from an environment file specific to each desired environment.

All the environment files are present in the _environments_ folder and respect the following nomenclature: `.env.<environment name>`.

They are called specifically when the `ENVIRONMENT` variable is set when building or running the application, example :

```bash
ENVIRONMENT=staging yarn build # Use the .env.staging
ENVIRONMENT=production yarn develop # Use the .env.production
```

Use the _.env_ file if no environment is specified, such as in the development environment.

**List of files using environment variables** :

- _config/database.ts_
- _config/middlewares.ts_
</details>

<details>
<summary>Application packages list</summary>

| Package                               | Dev | Version | Latest update | Usage                         |
|---------------------------------------|-----|---------|---------------|-------------------------------|
| @strapi/plugin-i18n                   |     | 4.3.8   | 19/09/2022    | Strapi core                   |
| @strapi/plugin-users-permissions      |     | 4.3.8   | 19/09/2022    | Strapi core                   |
| @strapi/strapi                        |     | 4.3.8   | 19/09/2022    | Strapi core                   |
| @strapi/plugin-graphql                |     | 4.3.8   | 19/09/2022    | Strapi Graphql                |
| dotenv                                |     | ^16.0.2 | 19/09/2022    | Environment system            |
| mysql                                 |     | 2.18.1  | 19/09/2022    | Database system               |
| strapi-middleware-upload-plugin-cache |     | ^2.1.0  | 19/09/2022    | Cache for media library files |
</details>

const { execSync } = require("child_process");

const textColorRed = "\x1b[31m";
const textColorReset = "\x1b[0m";

// Build date format 'dd_mm_yyyy' for French local.
const currentDate = new Date()
  .toLocaleDateString("fr", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })
  .replaceAll("/", "_");

// Console log message with red color.
function consoleError(message) {
  console.log(textColorRed + message + textColorReset);
}

// Execute bash command.
function runCommand(command) {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (err) {
    consoleError(`\x1b[31mFailed to execute ${command}`, err, "\x1b[0m");
    return false;
  }
  return true;
}

// Stop process if the source is not specified.
if (!process.argv[2]) {
  consoleError(
    "No sources are specified, be sure to fill in the staging or production source"
  );
  return false;
}

const synchronizeSource = process.argv[2];

// Check if an environment file is set.
console.log("[1/5] Check if an environment file is set");
if (process.env.ENVIRONMENT) {
  consoleError(
    "Environment file not found \nCreate environment file : cp environments/.env.development environments/.env\nFills in the required variables"
  );
  return false;
}

// Use the appropriate .env file.
require("dotenv").config({ path: `environments/.env` });

// Required environment variables.
const requiredEnvVariables = {
  staging: [
    "STAGING_SERVER",
    "STAGING_DATABASE_NAME",
    "STAGING_DATABASE_USERNAME",
    "STAGING_PROJECT_FOLDER",
  ],
  production: [
    "PRODUCTION_SERVER",
    "PRODUCTION_DATABASE_NAME",
    "PRODUCTION_DATABASE_USERNAME",
    "PRODUCTION_PROJECT_FOLDER",
  ],
};

// Check if required environment variables are set.
console.log("[2/5] Check if required environment variables are set");
const undefinedEnvVariables = requiredEnvVariables[synchronizeSource].filter(
  (variable) => {
    return !process.env[variable];
  }
);
if (undefinedEnvVariables.length > 0) {
  consoleError(
    "Some environment variables are missing :\n" +
      undefinedEnvVariables.join("\n")
  );
  return false;
}

// Dump database.
console.log("[3/5] Dump database");
if (synchronizeSource === "staging") {
  runCommand(
    `ssh ${process.env.STAGING_SERVER} mysqldump -u ${process.env.STAGING_DATABASE_USERNAME} -p ${process.env.STAGING_DATABASE_NAME} > database/staging_db_dump_${currentDate}.sql`
  );
}
if (synchronizeSource === "production") {
  runCommand(
    `ssh ${process.env.PRODUCTION_SERVER} mysqldump -u ${process.env.PRODUCTION_DATABASE_USERNAME} -p ${process.env.PRODUCTION_DATABASE_NAME} > database/production_db_dump_${currentDate}.sql`
  );
}

// Execute database dump.
console.log("[4/5] Execute database dump");
runCommand(
  `docker exec -i ${process.env.LOCAL_DATABASE_CONTAINER_NAME} sh -c 'exec mysql -u ${process.env.DATABASE_USERNAME} -p${process.env.DATABASE_PASSWORD} ${process.env.DATABASE_NAME}' < database/${synchronizeSource}_db_dump_${currentDate}.sql`
);

// Import uploaded public medias.
console.log("[5/5] Import uploaded public medias");
if (synchronizeSource === "staging") {
  runCommand(
    `rsync -ravh --delete-after ${process.env.STAGING_SERVER}:${process.env.STAGING_PROJECT_FOLDER}/public/uploads public`
  );
}
if (synchronizeSource === "production") {
  runCommand(
    `rsync -ravh --delete-after ${process.env.PRODUCTION_SERVER}:${process.env.PRODUCTION_PROJECT_FOLDER}/public/uploads public`
  );
}
runCommand("touch public/uploads/.gitkeep");

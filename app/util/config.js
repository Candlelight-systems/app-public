const path = require("path");
const fs = require("fs");
const { reportError } = require("./errorhandling");

const configPath = path.join(
  __dirname.replace("app.asar", "app.asar.unpacked"),
  "/config.json"
);

let config = JSON.parse(fs.readFileSync(configPath));

const saveConfig = () => {
  return new Promise((resolver, rejecter) => {
    fs.writeFile(configPath, JSON.stringify(config, undefined, "\t"), error => {
      if (error) {
        reportError(error);
        rejecter(error);
      } else {
        config = JSON.parse(fs.readFileSync(configPath));
        resolver();
      }
    });
  });
};

module.export = {
  config: config,
  saveConfig: saveConfig,

  getPreference: name => {
    if (!config.preferences[name]) {
      // If the preference does not exist, let's just initialize it
      config.preferences[name] = null;
      saveConfig();
    }

    return config.preferences[name];
  },

  setPreference: (name, value, noSave = false) => {
    config.preferences[name] = value;
    if (!noSave) {
      saveConfig();
    }
  }
};

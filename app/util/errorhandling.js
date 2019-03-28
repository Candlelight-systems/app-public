const dialog = require("dialog");

module.exports.reportError = e => {
  dialog.showMessageBox(
    {
      type: "error",
      message: "An error has happened: " + e.toString(),
      cancelId: 0,
      defaultId: 0,
      title: "Error",
      buttons: ["Ok"]
    },
    index => {}
  );
};

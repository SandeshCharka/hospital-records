var medicaldb = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("main");
  });

  //Retrieve all Patients & Doctors.
  app.get("/search", function (req, res) {
    Promise.all([medicaldb.Patient.findAll(), medicaldb.Doctor.findAll()])
      .then(function (data) {
        var hbsObject = {
          patients: data[0],
          doctors: data[1],
        };
        // console.log(hbsObject);
        res.render("search", hbsObject);
      });
  });

  app.get("/logout", function (req, res) {
    res.set("WWW-Authenticate", "Basic realm='401'");
    res.status(401).send("Authentication required.");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
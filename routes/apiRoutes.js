var medicaldb = require("../models");

module.exports = function(app) {

  //Get all patients
  app.get("/api/patients", function(req, res) {
    medicaldb.Patient.findAll().then(function(results) {
      res.json(results);
    });
  });

  // Find Patient by ID
  app.get("/api/patients/:id", function(req, res) {
    var id = req.params.id

    medicaldb.Patient.findAll({
      where: {
        id: id,
      }
    }).then(function(results) {
      res.json(results);
    });
  });

  // Find Doctor by ID 
  app.get("/api/doctors/:id", function(req, res) {
    var id = req.params.id

    medicaldb.Doctor.findAll({
      where: {
        id: id,
      }
    }).then(function(results) {
      res.json(results);
    });
  });

  // Find Patient by DOC ID
  app.get("/api/patients/doc/:id", function(req, res) {
    var id = req.params.id

    medicaldb.Patient.findAll({
      where: {
        DoctorId: id,
      }
    }).then(function(results) {
      res.json(results);
    });
  });
};
$(document).ready(function() {

  // Activate bootstrap-select
  $('.selectpicker').selectpicker();

  // Hide/show based off search selection
  $(".divSearchPatientID").hide();
  $(".divSearchPatientName").hide();
  $(".divSearchPatientDoctorID").hide();
  $(".divSearchSubmitButton").hide();
  // Hide results div
  $("#docSearchResults").hide();
  $("#patientSearchResults").hide();
  // Hide edit div
  $("#editMedicalDiv").hide();


  // Toggle 2nd dropdown menu after first menu change
  $("#searchMethod").on("change", function() {
    var v = $(this).val();
    $(".divSearchPatientID").toggle(v == "1");
    $(".divSearchPatientName").toggle(v == "2");
    $(".divSearchPatientDoctorID").toggle(v == "3");
    // Deselects what is currently selected // Bootstrap-Select //
    $("#searchPatientID").selectpicker("refresh");
    $("#searchPatientName").selectpicker("refresh");
    $("#searchPatientDoctorID").selectpicker("refresh");
  });

  // Show Submit Button after 2nd dropdown menu change
  $("#searchPatientID, #searchPatientName, #searchPatientDoctorID").on("change", function() {
    $(".divSearchSubmitButton").show();
  });


  // Get all form data and populate results section
  $("#searchForm").on("submit", function() {

    event.preventDefault();

    var form = document.getElementById("searchForm");
    var formData = new FormData(form);
    var newformObj = {};

    for (var [key, value] of formData.entries()) {
      newformObj[key] = value;
    }
    // console.log(newformObj);
    var id;
    var docPatients = "";

    if (formData.get('searchPatientID')) {
      id = formData.get('searchPatientID')
    } else if (formData.get('searchPatientName')) {
      id = formData.get('searchPatientName')
    } else if (formData.get('searchPatientDoctorID')) {
      id = formData.get('searchPatientDoctorID')
      // Retrieve data from *patients* table based off *Doctor ID*
      $.get("/api/patients/doc/" + id).then(function(data) {
        for (var i = 0; i < data.length; i++) {
          var li = `<li> Patient ID: <b>${data[i].id}</b> Patient Name: <b>${data[i].name}</b></li>`
          docPatients += li
        }
        // Doc Search Results div
        $("#docSearchResults").html(docPatients);
      });
      // Hide/show Divs and Reset Values
      $(".divSearchSubmitButton").hide();
      $("#patientSearchResults").hide();
      $("#docSearchResults").show();
      $("#searchPatientDoctorID").val("");
      return;
    }
    // Retrieve data from *patients* table based off *Patients ID*
    // Using same method for *patients name*
    $.get("/api/patients/" + id).then(function(data) {

      $("#patientIdText").text(`${data[0].id}`);
      $("#patientNameText").text(`${data[0].name}`);

      var docID = data[0].DoctorId;
      // Another get method for the doctor's name
      // Retrieve data from *doctors* table based off *Foreign key*
      $.get("/api/doctors/" + docID).then(function(data) {
        $("#patientDocText").text(`${data[0].name}`)
      });

      var medhistory = "";
      $.get("/api/patients/medicalhistory/" + id).then(function(data) {

        for (var i = 0; i < data.length; i++) {
          var li = `<li>${moment(data[i].createdAt).format('L')} - ${data[i].data}.</li>`
          medhistory += li
        }
        $("#patientMedText").html(medhistory);
      });


      $("#docSearchResults").hide();
      $("#patientSearchResults").show();
    });

    // Reset all selected values
    $("#searchPatientID").val("")
    $("#searchPatientName").val("")
    $("#searchPatientDoctorID").val("")
    // Rehide submit button after search is done.
    $(".divSearchSubmitButton").hide();
  });

  $("#editMedicalButton").on("click", function() {

    $("#editMedicalButton").hide();
    $("#editMedicalDiv").show();
  });

  // Create new data entry of *medicalhistory* of *patient*.
  $("#addMedicalHistoryButton").on("click", function(event) {

    event.preventDefault();
    var medhis = $("#addMedicalHistoryInput").val().trim();
    var id = $("#patientIdText").text();

    console.log(id);
    console.log(medhis);

    $.ajax("/api/patients/" + id, {
      type: "POST",
      data: {
        data: medhis,
        PatientId: id,
      }
    }).then(function() {

      alert("Patient medical data added.")

      location.reload();

    });
  })


});
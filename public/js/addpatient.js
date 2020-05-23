$(document).ready(function() {

  $("#addPatientForm").on("submit", function() {

    event.preventDefault();

    var patientName = $("#patientName").val().trim()

    // Capitalize every first letter in a word.
    // patientName.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    // patientName.replace(/(^\w|\s\w)/g, m => m.toUpperCase());

    // Capitalize every first letter and makesure the rest is lowercase.
    patientName = patientName.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())

    var doctorID = $("#patientDoctor").val()

    $.ajax("/api/patients/" + doctorID, {
      type: "POST",
      data: {
        name: patientName,
        DoctorId: doctorID,
      }
    }).then(function() {

      alert("New Patient has been added.")

      location.reload();

    });
  });




  // Ending
});
$(document).ready(function () {

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


    // Toggle 2nd dropdown menu after first menu change
    $("#searchMethod").on("change", function () {
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
    $("#searchPatientID, #searchPatientName, #searchPatientDoctorID").on("change", function () {
        $(".divSearchSubmitButton").show();
    });


    // Get all form data
    $("#searchForm").on("submit", function () {

        event.preventDefault();

        var form = document.getElementById("searchForm");
        var formData = new FormData(form);
        var newformObj = {};

        for (var [key, value] of formData.entries()) {
            newformObj[key] = value;
        }
        var id;
        var docPatients = "";

        // $("#docSearchResults").html("");

        if (formData.get('searchPatientID')) {
            id = formData.get('searchPatientID')
        } else if (formData.get('searchPatientName')) {
            id = formData.get('searchPatientName')
        } else if (formData.get('searchPatientDoctorID')) {
            id = formData.get('searchPatientDoctorID')
            $.get("/api/patients/doc/" + id).then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var li = `<li> Patient ID: <b>${data[i].id}</b> Patient Name: <b>${data[i].name}</b></li>`
                    docPatients += li
                    $("#docSearchResults").html(docPatients);
                }
            });
            $(".divSearchSubmitButton").hide();
            $("#patientSearchResults").hide();
            $("#docSearchResults").show();
            $("#searchPatientDoctorID").val("");
            return;
        }

        $.get("/api/patients/" + id).then(function (data) {

            $("#docSearchResults").hide();
            var docID = data[0].DoctorId;

            $("#patientIdText").text(`${data[0].id}`);
            $("#patientNameText").text(`${data[0].name}`);
            $("#patientMedText").text(`${data[0].medicalHistory}`);

            $.get("/api/doctors/" + docID).then(function (data) {
                $("#patientDocText").text(`${data[0].name}`)
            });

            $("#patientSearchResults").show();
            // $("#divSearchResults").append().html(`<ul><li> ID: ${data[0].id} </li><li> Name: ${data[0].name} </li><li> MedHis: ${data[0].medicalHistory} </li></ul>`);
        });

        console.log(newformObj);

        $("#searchPatientID").val("")
        $("#searchPatientName").val("")
        $("#searchPatientDoctorID").val("")
        $(".divSearchSubmitButton").hide();

        // $("#searchForm").reset();
        // document.getElementById('searchForm').reset();
    });
});
var config = {
    apiKey: "AIzaSyAaOXON8rHYaE2b0chc7c7JE70GgST9iWg",
    authDomain: "train-activity-2af39.firebaseapp.com",
    databaseURL: "https://train-activity-2af39.firebaseio.com",
    projectId: "train-activity-2af39",
    storageBucket: "gs://train-activity-2af39.appspot.com",
    messagingSenderId: "222882568398",
};

firebase.initializeApp(config);

var database = firebase.database()

//Add new Train info to Table of current trains

$("#add-train").on("click", function () {
    event.preventDefault();

    var newTrainName = $("#new-train").val().trim()
    var newDestination = $("#new-destination").val().trim()
    var newTime = $("#new-time").val().trim()
    var newFrequency = $("#new-frequency").val().trim()

    var newTrain = {
        trainName: newTrainName,
        destination: newDestination,
        time: newTime,
        frequency: newFrequency
    }

    database.ref().push(newTrain);

    $("#new-train").val("");
    $("#new-destination").val("");
    $("#new-time").val("");
    $("#new-frequency").val("");
})

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var newTrainName = childSnapshot.val().trainName;
    var newDestination = childSnapshot.val().destination;
    var newTime = childSnapshot.val().time;
    var newFrequency = childSnapshot.val().frequency;

    var newRow = $("<tr>").append(
        $("<td>").text(newTrainName),
        $("<td>").text(newDestination),
        $("<td>").text(newFrequency),
        $("<td>").text(newTime),
        $("<td>").text( Math.floor(Math.random() * Math.floor(60)))
      );

      $("#train-table > tbody").append(newRow)


})

//Calculate when the next train will arrive(arrival time and minutes away) for each train.

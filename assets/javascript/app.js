// Initialize Firebase
var config = {
    apiKey: "AIzaSyC3cC_7wEdvD9mB8Y3QxB1iq2xMxfl8rlM",
    authDomain: "myfirebaseproject-d1d78.firebaseapp.com",
    databaseURL: "https://myfirebaseproject-d1d78.firebaseio.com",
    projectId: "myfirebaseproject-d1d78",
    storageBucket: "myfirebaseproject-d1d78.appspot.com",
    messagingSenderId: "360110593043"
  };
  firebase.initializeApp(config);
  
  
  $(document).ready(function () {
    var database = firebase.database();
  
    // Create Variables
    var trainName = " ";
    var destination = " ";
    var trainTimeInput = 0;
    var frequencyInput = 0;
  
    $("#submitbutton").on("click", function (event) {
      event.preventDefault();
   
      trainName = $("#trainName").val().trim();
      destination = $("#destination").val().trim();
      trainTimeInput = moment($("#trainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
      frequencyInput = $("#frequency").val().trim();
  
      // Firebase
      var newTrain = {
        name: trainName,
        destination: destination,
        trainTime: trainTimeInput,
        frequency: frequencyInput
      } 
      database.ref().push(newTrain);
  
      $("#trainName").val("");
      $("#destination").val("");
      $("#trainTime").val("");
      $("#frequency").val("");
  
    });
    
    database.ref().on("child_added", function (childSnapshot, prevChildKey) {
  
      // Firebase variables
      var firebaseName = childSnapshot.val().name;
      var firebaseDestination = childSnapshot.val().destination;
      var firebaseTrainTimeInput = childSnapshot.val().trainTime;
      var firebaseFrequency = childSnapshot.val().frequency;
  
      // Conversion Rates
      var firstTimeConverted = moment(firebaseTrainTimeInput, "hh:mm").subtract(1, "years");
      var diffTime = moment().diff(moment.unix(firstTimeConverted), "minutes");
      var timeRemainder = diffTime % firebaseFrequency;
      var minutes = firebaseFrequency - (-timeRemainder);
      var nextTrainArrival = moment().add(minutes, "minutes").format("hh:mm");
   
      $("#trainList").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
  
    });
  });
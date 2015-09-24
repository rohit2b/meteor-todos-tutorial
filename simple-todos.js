// Collections are Meteor's way of storing persistent data
// Creating a new collection is done with the following line. On the server, 
// this sets up a MongoDB collection called my-collection; on the client, 
// this creates a cache connected to the server collection.
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      // Show newest tasks at the top
      return Tasks.find({}, {sort: {createdAt: -1}});
      // This commented out statement returns list in order stored in array
      // return Tasks.find({});
    }
  });
 
  Template.body.events({
    // Add to listen to the submit event on the form.
    // We are listening to the submit event on any element that matches 
    // the CSS selector .new-task.
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // event.target is our form element.
      // Get value from form element
      var text = event.target.text.value;

      // Inspect event object on console
      console.log(event);

      // Insert a task into the collection
      // Assign any properties to the task object, such as the time created, 
      // since we don't ever have to define a schema for the collection.
      // Being able to insert anything into the database from the client isn't 
      // very secure.
      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });

      // Clear form to prepare for another new 
      event.target.text.value = "";
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

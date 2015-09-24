// Collections are Meteor's way of storing persistent data
// Creating a new collection is done with the following line. On the server, 
// this sets up a MongoDB collection called my-collection; on the client, 
// this creates a cache connected to the server collection.
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

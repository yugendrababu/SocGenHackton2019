let mongoose = require( "mongoose" );

const server = "localhost:27017",
    database = "mydb";

mongoose.connect( `mongodb://${server}/${database}`, { "useNewUrlParser": true } );

let schema = new mongoose.Schema( {
    "id": Number,
    "name": String,
    "age": Number,
    "address": String
},
{ "collection": "test" } );

module.exports = mongoose.model( "test", schema );

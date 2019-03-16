let mongoose = require( "mongoose" );

const server = "localhost:27017",
    database = "swiftDb";

mongoose.connect( `mongodb://${server}/${database}`, { "useNewUrlParser": true } );

let DataSchema = new mongoose.Schema( {
    ":20": String,
    ":21": String,
    ":22A": String,
    ":22C": String,
    ":94A": String,
    ":82": String,
    ":87": String,
    ":77H": String,
    ":30T": String,
    ":30V": String,
    ":36": String,
    ":32B": String,
    ":53": String,
    ":56": String,
    ":57": String,
    ":58": String,
    ":33B": String,
    ":72": String,
//18 fields
} ,
{ "collection": "swiftData" }
);

module.exports = mongoose.model( "Matching", DataSchema );

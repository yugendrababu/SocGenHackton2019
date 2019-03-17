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
    ":82A": String,
    ":82D": String,
    ":82J": String,
    ":87": String,
    ":77H": String,
    ":30T": String,
    ":30V": String,
    ":36": String,
    ":32B": String,
    ":53": String,
    ":53A": String,
    ":53D": String,
    ":53J": String,
    ":56": String,
    ":56A": String,
    ":56D": String,
    ":56J": String,
    ":57": String,
    ":57A": String,
    ":57D": String,
    ":57J": String,
    ":58": String,
    ":58A": String,
    ":58D": String,
    ":58J": String,
    ":33B": String,
    ":72": String,
    "company": String,
    "status": String,
    "matchRef": String
// 18 fields
},
{ "collection": "swiftData" }
);

module.exports = mongoose.model( "Matching", DataSchema );

let express = require( "express" ),
    app = express(),
    ApiRoute = require( "./routes/Api" ),
    path = require( "path" ),
    bodyParser = require( "body-parser" );

app.use( bodyParser.json() );

app.use( ( req, res, next ) => {
    console.log( `${new Date().toString()} => ${req.originalUrl}`, req.body );
    next();
} );

app.use( "/", ApiRoute );
app.use( express.static( "public" ) );

// Handler for 404 - Resource Not Found
app.use( ( req, res, next ) => {
    res.status( 404 ).send( "Nothing here" );
} );

// Handler for Error 500
app.use( ( err, req, res, next ) => {
    console.error( err.stack );
    res.sendFile( path.join( __dirname, "../public/500.html" ) );
} );

const PORT = process.env.PORT || 3000;

app.listen( PORT, () => console.info( `Server has started on ${PORT}` ) );

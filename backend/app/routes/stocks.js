let StocksModel = require( "../models/stocks.model" ),
    tools = require( "../tools/tools" ),
    async = require( "async" ),
    express = require( "express" ),
    router = express.Router();
const math = require( "mathjs" );

// => To get total stock archives count in db
// localhost:3000/stocks/count
router.get( "/stock/api/stocks/count", ( req, res ) => {
    StocksModel
        .countDocuments( {}, ( err, count ) => {
            if( count ) {
                res.status( 200 ).send( { "count": count } );
            }else {
                res.status( 500 ).send( { "error": "error" } );
            }
        } );

} );

//  => To get stock archives list - based on date with pagination
// localhost:3000/stocks/archives?field=date&limit=50&offset=20
// localhost:3000/stocks/archives?field=date&limit=50&offset=20&symbol=NAVI
router.get( "/stock/api/stocks/archives", ( req, res ) => {
    let field = req.query.field,
        limit = Number( req.query.limit ),
        offset = Number( req.query.offset ),
        symbol = req.query.symbol;

    if( field && limit ) {
        let stockName = symbol ? { "symbol": symbol } : {};

        StocksModel
            .find( stockName )
            .limit( limit )
            .sort( { [ field ]: -1 } )
            .skip( offset )
            .exec( ( err, data ) => {
                if( data ) {
                    res.status( 200 ).send( data );
                }else {
                    res.status( 500 ).send( err );
                }
            } );
    }
} );

//  => To get stock archives list - based on date with pagination
// localhost:3000/stocks/bestPerformers
router.get( "/stock/api/stocks/bestPerformers", ( req, res ) => {
    StocksModel
        .find( { "stockName": { "$exists": true } } )
        .sort( { "rating": -1 } )
        .exec( ( err, data ) => {
            if( data ) {
                res.status( 200 ).send( data );
            }else {
                res.status( 500 ).send( err );
            }
        } );
} );

module.exports = router;

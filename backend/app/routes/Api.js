let matchingModel = require( "../models/matching.model" ),
    async = require( "async" ),
    express = require( "express" ),
    router = express.Router();
const math = require( "mathjs" );

// localhost:3000/stocks/swift/stats
router.get( "/matching/api/swift/stats", ( req, res ) => {
    matchingModel
        .countDocuments( {}, ( err, count ) => {
            if( count ) {
                matchingModel
                    .find( { "status": "matched" } )
                    .count()
                    .exec( ( err, matchedCount ) => {
                        if( matchedCount ) {
                            matchingModel
                                .find( { "status": "notMatched" } )
                                .count()
                                .exec( ( err, notMatchedCount ) => {
                                    if( notMatchedCount ) {
                                        res.status( 200 ).send( [ { "name": "Total results", "value": count }, { "name": "matched", "value": matchedCount }, { "name": "notMatched", "value": notMatchedCount } ] );
                                    }else {
                                        res.status( 500 ).send( err );
                                    }
                                } );
                        }else {
                            res.status( 500 ).send( err );
                        }
                    } );
            }else {
                res.status( 500 ).send( { "error": "error" } );
            }
        } );

} );


router.get( "/matching/api/swift/archives", ( req, res ) => {
    let field = req.query.field,
        limit = Number( req.query.limit ),
        offset = Number( req.query.offset ),
        category = req.query.category;

    if( field && limit ) {
        if ( category.includes( "Total" ) ) {
            category = undefined;
        }
        let match = category ? { "status": category } : {};

        matchingModel
            .find( match )
            .limit( limit )
            .sort( { [ "matchRef" ]: -1 } )
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


module.exports = router;

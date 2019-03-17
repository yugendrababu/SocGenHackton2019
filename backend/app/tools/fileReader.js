const clientOneToManySample = "../data/ClientOneToManySample/",
    sgOneToManySample = "../data/SgOneToManySample/",
    clientOneToOneMatchingSampleData = "../data/ClientOneToOneMatchingSampleData/",
    sgOneToOneMatchingSampleData = "../data/SgOneToOneMatchingSampleData/",
    fs = require( "fs" ),
    LineByLineReader = require( "line-by-line" ),
    path = require( "path" ),
    matchingModel = require( "../models/matching.model" ),

    dirs = [

        { "company": "client", "path": clientOneToManySample },
        { "company": "sg", "path": sgOneToManySample },
        { "company": "client", "path": clientOneToOneMatchingSampleData },
        { "company": "sg", "path": sgOneToOneMatchingSampleData }
    ],


    readDirectory = ( dir ) => {
        fs.readdir( dir.path, ( err, files ) => {
            files.forEach( ( file ) => {
                readData( file, dir.path, dir.company );
            } );
        } );
    },

    readData = ( file, dir, company ) => {
        let filePath = path.join( __dirname, `${dir}${file}` ),
            record = {},
            firstline = true;

        lr = new LineByLineReader( filePath );

        lr.on( "error", ( err ) => {
            // 'err' contains error object
        } );

        lr.on( "line", ( line ) => {

            lr.pause();
            if( firstline ) {
                firstline = false;
                lr.resume();
            }else if ( line.includes( "-}" ) ) {
                lr.resume();
            }else{
                let temp = line.substring( 1 ),
                    keyIndex = temp.search( ":" ),
                    key = line.substring( 0, keyIndex + 1 ),
                    value = line.substring( keyIndex + 2 );

                record[ key ] = value;
                lr.resume();
            }

        } );

        lr.on( "end", () => {
            // All lines are read, file is closed now.
            record.company = company;
            let dataRecord = new matchingModel( record );

            dataRecord.save( ( err, data ) => {
                if ( err ) {
                    return console.error( err );
                }
                console.log( `${dataRecord[ ":20" ] } saved to swiftData collection.` );
            } );
        } );
    };

dirs.forEach( ( dir ) => {
    readDirectory( dir );
} );

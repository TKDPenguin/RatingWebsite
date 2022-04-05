//set up the server
const express = require( "express" );
const app = express();
const port = 8080;

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/index.html" );
} );

// define a route for the stuff inventory page
app.get( "/inventory", ( req, res ) => {
    res.sendFile( __dirname + '/views/inventory.html' );
} );

// define a route for the item detail page
app.get( "/inventory/edit", ( req, res ) => {
    res.sendFile( __dirname + '/views/edit.html' );
} );

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );
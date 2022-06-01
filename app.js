//set up the server
const express = require( "express" );
const res = require("express/lib/response");
const app = express();
const port = 8080;
const logger = require("morgan");
const db = require("./db/db_pool");

// COnfigure express to parse URL-encoded POST request bodies
app.use(express.urlencoded({extended : false}))

//Configure Express to use EJS
app.set('views', __dirname + '/views');
app.set("view engine", 'ejs');

// define middleware that logs all incoming requests
app.use(logger("dev"));

// new middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'))

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.render('index');
} );

const read_ratings_all_sql =`
    SELECT
        id, name, rating, description
    FROM
        ratings
`

// define a route for the stuff inventory page
app.get( "/inventory", ( req, res ) => {
    db.execute(read_ratings_all_sql, (error, results) => {
        if (error)
            res.status(500).send(error); //Internal server error
        else   
            res.render("inventory", {stuff : results})
    })
} );

const read_ratings_item_sql =`
    SELECT
        id, name, rating, description
    FROM
        ratings
    WHERE
        id = ?
`

// define a route for the item detail page
app.get( "/inventory/edit/:id", ( req, res ) => {
    db.execute(read_ratings_item_sql, [req.params.id], (error, results) => {
        if (error)
            res.status(500).send(error)
        else if (results.length == 0)
            res.status(404).send(`No item found with id = ${req.params.id}`)
        else {
            let data = results[0];
            res.render('edit', data);
        }
            
    });
} );

const delete_ratings_sql = `
    DELETE
    FROM
        ratings
    WHERE
        id = ?`
        
app.get("/inventory/edit/:id/delete", (req, res) => {
    db.execute(delete_ratings_sql, [req.params.id], (error, results) => {
        if (error) res.status(500).send(error)
        else {
            res.redirect('/inventory')
        }
    })
})

const create_ratings_sql = `
INSERT INTO ratings
    (name, rating, description)
VALUES
    (?, ?, ?)`

app.post("/inventory", (req, res) => {
    db.execute(create_ratings_sql, [req.body.name, req.body.rating, req.body.description], (error, results) => {
        if (error)
            res.status(500).send(error);
        else {
            res.redirect(`/inventory/edit/${results.insertId}`)
        }
    })
})

const update_pw_sql = `
    UPDATE
        ratings
    SET
        name = ?,
        rating = ?,
        description = ?
    WHERE
        id = ?
`;

app.post('/inventory/edit/:id', ( req, res ) => {
    db.execute(update_pw_sql, [req.body.name, req.body.rating, req.body.description, req.params.id], ( error, results ) => {
        if (error) res.status(500).send(error);
        else res.redirect(`/inventory/edit/${req.params.id}`);
    });
});

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );
// (Re)Sets up the database, including a little bit of sample data
const db = require("./db_connection");

/**** Delete existing table, if any ****/

const drop_ratings_table_sql = "DROP TABLE IF EXISTS `ratings`;"

db.execute(drop_ratings_table_sql);

/**** Create "stuff" table (again)  ****/

const create_ratings_table_sql = `
    CREATE TABLE ratings (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(45) NOT NULL,
        rating VARCHAR(5) NOT NULL,
        description VARCHAR(150) NULL,
        PRIMARY KEY (id)
    );
`
db.execute(create_ratings_table_sql);

/**** Create some sample items ****/

const insert_ratings_table_sql = `
    INSERT INTO stuff 
        (name, rating, description) 
    VALUES 
        (?, ?, ?);
`
db.execute(insert_ratings_table_sql, ['Jack', '5/10', 'He is a terrible friend who is not supportive and is not fun to talk to.']);

db.execute(insert_ratings_table_sql, ['Parth', '10/10', null]);

/**** Read the sample items inserted ****/

const read_ratings_table_sql = "SELECT * FROM stuff";

db.execute(read_ratings_table_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'stuff' initialized with:")
        console.log(results);
    }
);

db.end();
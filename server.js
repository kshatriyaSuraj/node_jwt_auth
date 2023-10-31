const express = require("express");
const cors = require("cors");
const db = require("./app/models");

const Role = db.role;

const app = express();

const corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse request for content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended : true }));

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to suraj application."});
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

// Database
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });
db.sequelize.sync().then(() => {
    console.log("Connected to databse");
}).catch((error) => {
    console.log(`Failed to connect to databse : ${error}`);
})

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}
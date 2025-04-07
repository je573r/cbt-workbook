require("dotenv").config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();

const cors = require("cors"); 
const {sql} = require("./config/db");

// Security middleware
const helmet = require("helmet"); 

// Logs requests
const morgan = require("morgan"); 

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts middleware
app.use(expressLayouts);

// Define the default layout
app.set('layout', 'layout'); // This looks for 'views/layout.ejs'

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));


app.use("/", require("./routes/indexRoutes"));
app.use("/auth", require("./routes/authRoutes"));


(async () => {
    try {
        const result = await sql`SELECT NOW() AS current_time`;
        console.log("Current Time:", result[0].current_time);
    } catch (error) {
        console.error("Query error:", error);
    }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

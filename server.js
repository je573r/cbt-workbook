require("dotenv").config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();

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
app.use(express.json());

app.use("/", require("./routes/indexRoutes"));
app.use("/auth", require("./routes/authRoutes"));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

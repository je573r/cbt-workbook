const { sql } = require("./db");

const testConnection = async () => {
    try {
        const result = await sql`SELECT NOW() AS current_time;`;
        console.log(" Connected to database! Current Time:", result[0].current_time);
    } catch (error) {
        console.error(" Database connection failed:", error);
    }
};

testConnection();

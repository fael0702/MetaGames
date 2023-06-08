const {Pool} = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "rafael07022003",
    host: "localhost",
    port: 5432
})

pool.query(``)
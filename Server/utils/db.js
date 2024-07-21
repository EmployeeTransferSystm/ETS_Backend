import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeemg"
})

con.connect(function(err) {
    if(err) {
        console.log("databse connection error")
    } else {
        console.log("databse Connected")
    }
})

export default con;

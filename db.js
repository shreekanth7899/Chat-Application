const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Test@123',
    database: 'chatApp',
    port: '3306'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

module.exports = connection;

// const { MongoClient } = require('mongodb');

// const uri = 'mongodb://localhost:27017/chatApp';

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MongoDB:', err);
//         return;
//     }
//     console.log('Connected to MongoDB');
// });

// module.exports = client;

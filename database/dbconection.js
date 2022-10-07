const mongoose = require('mongoose');

const dbServer = process.env.DB_SERVER;

const connect  = async() =>{

    try {
       const client = await mongoose.connect(dbServer);
      return client;
        
    } catch (error) {
        console.error(error);
        throw new Error('Connection error');
    }
};

module.exports = {connect}; 
const mongoose = require('mongoose');
const { config } = require('../config');

if (!config.databaseUrl) throw new Error('.env DB_URL does not set')
mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},
    err => {
        if (!err) {
            console.log('Connected')
        }else {
            console.log('Error while connecting to DB:' + JSON.stringify(err, undefined, 2))
        } 
    })
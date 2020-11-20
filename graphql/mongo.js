const mongoose = require('mongoose');
const { config } = require('../config');

if (!config.databaseUrl) throw new Error('.env DATABASE_URL does not set')
mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true},
    err => {
        if (!err) {
            console.log('Connected')
        }else {
            console.log('Error while connecting to DB:' + JSON.stringify(err, undefined, 2))
        } 
    })
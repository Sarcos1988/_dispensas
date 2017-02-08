'use strict'

var mongoose = require('mongoose');

class Database{

    constructor(){
        this.url = 'mongodb://localhost/_dispensas_';
    }

    init(){
        mongoose.connect(this.url);
        // connect to mongoDB database on modulus.io
    }
}

module.exports = Database
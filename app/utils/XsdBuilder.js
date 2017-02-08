'use strict'
const express = require('express');
const builder = require('xmlbuilder');
const bodyParser = require('body-parser');

class XsdBuilder{

    constructor(){
        this.xml = '';
        this.xsdBuilderExpress = express();
    }

    exportXsd(){
        var feed = builder.create(this.xml, { encoding: 'utf-8' });
        return feed.end({ pretty: true })
    }

    parse(){
        // parse application/x-www-form-urlencoded
        this.xsdBuilderExpress.use(bodyParser.urlencoded({extended: false}))
        // parse application/json
        this.xsdBuilderExpress.use(bodyParser.json())
    }

    renderize(xml){
        this.xsdBuilderExpress.use(function (req, res) {
            res.setHeader('Content-Type', 'text/plain')
            res.write(xml)
            res.end(JSON.stringify())
        });
    }

}

module.exports = XsdBuilder;

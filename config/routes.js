'use strict'

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const soap = require('soap');
const endpoints = require('../app/route');

class Routes {
    constructor () {
        this.app = new express();

        // view engine setup
        this.app.set('views', path.join(__dirname, '../src/views'));
        this.app.set('view engine', 'pug');
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, '../public')));
    }

    setRouteWeb (route, controllerName) {
        var pathController = require('../app/controllers/'+controllerName+'Controller');
        this.app.use(route, pathController);
    }


    setRouteWebService (route, controllerName) {
        this.app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));

        var pathController = require('../app/controllers/TestController');
        var controller = new pathController();

        soap.listen(this.app, route, controller.setService(), controller.setAttach());
    }

    getRoutes () {
        endpoints.web.forEach(value => {
            this.setRouteWeb(value.url, value.controller);
        });

        endpoints.service.forEach(value => {
            this.setRouteWebService(value.url, value.controller);
        });
    }
}

module.exports = Routes;

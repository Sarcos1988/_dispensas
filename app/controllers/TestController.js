'use strict'
const path = require('path');

class TestController{

    setService () {

        return {
            service : {
                Hello_Service: {
                    Hello_Port: {
                        // You can also inspect the original `req`
                        sayHello: function (args, callback, headers, req) {
                            console.log('SOAP sayHello request from ' + req.connection.remoteAddress);
                            return {
                                greeting: "Hola " + args.firstName
                            };
                        }
                    }
                }
            }
        };
    }

    setAttach () {
        var xml = require('fs').readFileSync(path.join(__dirname, '../ws/helloService.wsdl'), 'utf8');
        return xml;
    }

}

module.exports = TestController

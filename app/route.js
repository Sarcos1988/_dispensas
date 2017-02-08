var endpoints = {
    web: [
        {
            url : '/',
            controller: 'Index'
        },
    ],

    service: [
        {
            url : '/wsdl',
            controller: 'TestController'
        }
    ],
};

module.exports = endpoints;
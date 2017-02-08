'use strict'
var XsdBuilder = require( '../utils/XsdBuilder' );

class RecetaRequest extends XsdBuilder{

    constructor(){
        super();
        this.setRequest();
    }

    getRequest(){
        return this.exportXsd();
    }

    setRequest(){
        this.xml =  {
            'xs:schema': {
                '@xmlns:xs': 'http://www.w3.org/2001/XMLSchema',
                'xs:element': {
                    '@name':'receta',
                    'xs:complexType': {
                        'xs:sequence':{
                            'xs:element': [
                                {
                                    '@name':'fecha',
                                    '@type':'xs:date'
                                },
                                {
                                    '@name':'fechaDispensa',
                                    '@type':'xs:date'
                                },
                                {
                                    '@name':'medicamento',
                                    '@type':'xs:string'
                                }
                            ]
                        }
                    }
                }
            }
        };
    }
}

module.exports = RecetaRequest;
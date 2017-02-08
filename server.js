'use strict'

const Routes = require('./config/routes');
const debug = require('debug')('myapp:server');
const http = require('http');
const Database = require('./config/database');

class Server {
    constructor () {
        this.app = new Routes();

        this.port = this.normalizePort(process.env.PORT || '3000');
        this.app.app.set('port', this.port);
        this.Instanceserver = null;
        this._db = new Database();
        this._db.init();
    }

    /***
     * Create HTTP server.
     * @returns {*}
     */
    getInstance () {
        return this.Instanceserver = http.createServer(this.app.app);
    }

    /**
     * Listen on provided port, on all network interfaces.
     */
    listen () {
        this.getInstance().listen(this.port, this.app.getRoutes());
        this.getInstance().on('error', this.onError);
        this.getInstance().on('listening', this.onListening);
    }

    /**
     * Normalize a port into a number, string, or false.
     */
    normalizePort(val) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */
    onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    onListening() {
        var addr = this.getInstance().address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }
}

module.exports = Server
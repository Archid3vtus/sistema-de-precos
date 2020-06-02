const {createSocket} = require('dgram');

class ServerAdapter{
    constructor(address, port){
        this.server = createSocket('udp4');
    }

    on(operation, callback){
        this.server.on(operation, callback);
    }

    bind(port){
        this.server.bind(port);
    }

    send(msg, port, address, callback){
        this.server.send(msg, port, address, callback);
    }

    sendJSON(object, port, address, callback){
        let data = Buffer.from(JSON.stringify(object));

        this.send(data, port, address, callback);
    }

    get(){
        return this.server;
    }
}

module.exports = ServerAdapter;
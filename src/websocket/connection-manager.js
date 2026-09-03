class ConnectionManager{
    constructor(){
        this.connections=new Set();
    }

    add(socket){
        this.connections.add(socket);
    }

    remove(socket){
        this.connections.delete(socket);
    }

    has(socket) {
    return this.connections.has(socket);
}
    getAll(){
        return this.connections;
    }

    count(){
        return this.connections.size;
    }
}

module.exports=ConnectionManager;
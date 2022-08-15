class Database {
    instance: {};
    storage: Storage;
    constructor() {
        this.instance = {};
        this.storage = window.localStorage;
    }
}

export default Database;

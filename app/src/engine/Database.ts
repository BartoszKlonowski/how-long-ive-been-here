class Database {
    storage: Storage;
    constructor() {
        this.storage = window.localStorage;
    }
}

export default Database;

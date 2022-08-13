class Database {
    constructor() {
        this.instance = {};
        this.storage = window.localStorage;
    }
}

export default Database;

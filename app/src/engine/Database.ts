class Database {
    storage: Storage;
    constructor() {
        this.storage = window.localStorage;
    }

    writeTimeSpent(domain: string, timeSpentInSeconds: number) {
        if (domain.length === 0) {
            return;
        }
        try {
            const timeSpentObject = this.storage.getItem("timeSpent");
            if (timeSpentObject && timeSpentObject.length && timeSpentObject !== "{}") {
                const timeSpentMap = new Map<string, number>(JSON.parse(timeSpentObject));
                timeSpentMap.set(domain, timeSpentInSeconds);
                this.storage.setItem("timeSpent", JSON.stringify(Array.from(timeSpentMap.entries())));
            } else {
                this.storage.setItem(
                    "timeSpent",
                    JSON.stringify(Array.from(new Map([[domain, timeSpentInSeconds]]).entries()))
                );
            }
        } catch (exception) {
            console.error(`ERROR: `, exception);
        }
    }

    readTimeSpent(domain?: string): number | Map<string, number> {
        if (domain !== undefined) {
            try {
                const timeSpentObject = this.storage.getItem("timeSpent");
                const timeSpentMap =
                    timeSpentObject && timeSpentObject !== "{}"
                        ? new Map<string, number>(JSON.parse(timeSpentObject))
                        : new Map<string, number>([]);
                return timeSpentMap.get(domain) || 0;
            } catch (exception) {
                console.error("ERROR: ", exception);
                return 0;
            }
        } else {
            try {
                const timeSpentObject = this.storage.getItem("timeSpent");
                const timeSpentMap =
                    timeSpentObject && timeSpentObject !== "{}"
                        ? new Map<string, number>(JSON.parse(timeSpentObject))
                        : new Map<string, number>([]);
                return timeSpentMap;
            } catch (exception) {
                console.error("ERROR: ", exception);
                return new Map<string, number>([]);
            }
        }
    }

    writePreviousDomain(domain: string) {
        try {
            this.storage.setItem("previousDomain", domain);
        } catch (exception) {
            console.error("ERROR: ", exception);
        }
    }

    readPreviousDomain(): string {
        try {
            return this.storage.getItem("previousDomain") || "";
        } catch (exception) {
            console.error("ERROR: ", exception);
            return "";
        }
    }

    writeLastActive(domain: string, date: Date) {
        try {
            const lastActiveObject = this.storage.getItem("lastActive");
            if (lastActiveObject && lastActiveObject.length && lastActiveObject !== "{}") {
                const lastActiveMap = new Map<string, Date>(JSON.parse(lastActiveObject));
                lastActiveMap.set(domain, date);
                this.storage.setItem("lastActive", JSON.stringify(Array.from(lastActiveMap.entries())));
            } else {
                this.storage.setItem(
                    "lastActive",
                    JSON.stringify(Array.from(new Map<string, Date>([[domain, date]]).entries()))
                );
            }
        } catch (exception) {
            console.error("ERROR: ", exception);
        }
    }

    readLastActive(domain: string): Date {
        try {
            const lastActiveObject = this.storage.getItem("lastActive");
            const lastActiveMap =
                lastActiveObject && lastActiveObject !== "{}"
                    ? new Map<string, Date>(JSON.parse(lastActiveObject))
                    : new Map<string, Date>([]);
            return new Date(lastActiveMap.get(domain) || new Date());
        } catch (exception) {
            console.error("ERROR: ", exception);
            return new Date();
        }
    }
}

export default Database;

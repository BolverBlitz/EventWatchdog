const NodeEvents = require('node:events');

class Watchdog extends NodeEvents {
    #timeout_time;
    #check_interval;
    #debug;
    #store = {};

    /**
     * Watchdgog constructor
     * @param {Number} timeout | Timeout in seconds 
     * @param {Number} [check_interval] | Check interval in seconds
     * @param {Boolean} [debug] | Debug mode
     */
    constructor(timeout, check_interval = 600, debug = false) {
        super();
        this.#timeout_time = timeout * 1000 || 60 * 1000;
        this.#check_interval = check_interval * 1000;
        this.#debug = debug;

        setInterval(() => {
            this.#check();
        }, this.#check_interval);
    }

    #logdebug(message) {
        if(process.log){
            process.log.debug(message);
        } else {
            console.debug(message);
        }
    }

    #check() {
        const now = Date.now();
        for (let monitor in this.#store) {
            if(this.#debug) this.#logdebug(`Monitor ${monitor} last update: ${now - this.#store[monitor].lastUpdate}ms ago. Timeout is: ${this.#store[monitor].timeout}ms`);
            if (now - this.#store[monitor].lastUpdate > this.#store[monitor].timeout && !this.#store[monitor].isTimeout) {
                this.#store[monitor].isTimeout = true;
                this.emit('timeout', {monitor: monitor, offline_since: this.#store[monitor].lastUpdate});
            }
        }
    }

    updateMonitor(MonitorName) {
        if (this.#store[MonitorName]) {
            this.#store[MonitorName].lastUpdate = Date.now();
            this.#store[MonitorName].isTimeout = false;
        } else {
            throw error('Monitor not found');
        }
    }

    addMonitor(MonitorName) {
        if (!this.#store[MonitorName]) {
            this.#store[MonitorName] = {
                lastUpdate: Date.now(),
                timeout: this.#timeout_time,
                isTimeout: false
            };
        }
    }

    removeMonitor(MonitorName) {
        if (this.#store[MonitorName]) {
            delete this.#store[MonitorName];
        }
    }

    getMonitorStatus(MonitorName) {
        if (this.#store[MonitorName]) {
            return this.#store[MonitorName].isTimeout;
        }
    }

    setTimeout = (timeout) => {
        this.#timeout_time = timeout * 1000;
    }
}

module.exports = Watchdog;
/**
 * @class MiningMachine
 * @description Represents a mining machine with monitoring and restart capabilities.
 * 
 * Adheres to:
 * - **Open-Closed Principle**: Allows extensions for specific mining models.
 * - **Liskov Substitution Principle**: Enables subclass interchangeability.
 */
export class MiningMachine {
    #ipAddress;
    #hashRate;
    #temperature;
    #model;
    #status;
    #highTemperatureMode;
    #alerts; // List of alert messages

    /**
     * Defines the high-temperature threshold for alerts.
     * Can be overridden by subclasses.
     * @constant {number}
     */
    static TEMPERATURE_THRESHOLD = 80;

    /**
     * Constructs a new MiningMachine instance.
     * 
     * @param {string} ipAddress - The IP address of the mining machine.
     * @param {number} hashRate - The hashrate in TH/s.
     * @param {number} temperature - The current temperature in °C.
     * @param {string} model - The model identifier of the mining machine.
     * @param {string} status - The operational status.
     * @param {boolean} highTemperatureMode - Indicates if high-temperature protection is active.
     */
    constructor(ipAddress, hashRate, temperature, model, status, highTemperatureMode) {
        this.#ipAddress = ipAddress;
        this.#hashRate = Number(hashRate) || 0;;
        this.#temperature = temperature;
        this.#model = model;
        this.#status = status;
        this.#highTemperatureMode = highTemperatureMode;
        this.#alerts = []; // Store alert messages
    }

    /**
     * @function monitorStatus()
     * @returns {string} - The current status report.
     * Monitors and reports the machine's operational status.
     */
    monitorStatus() {
        return `Machine ${this.#model} at ${this.#ipAddress} is currently ${this.#status}.
                Hashrate: ${this.#hashRate} TH/s. 
                Temperature: ${this.#temperature}°C.
                Alerts: ${this.#alerts.length > 0 ? this.#alerts.join(", ") : "No alerts"}`;
    }
    
    /**
     * @function restart()
     * @returns {Promise<boolean>} - Resolves `true` if restart succeeds, `false` otherwise.
     * Simulates a mining machine restart asynchronously.
     */
    async restart() {
        console.log(`Restarting machine ${this.#model} at IP ${this.#ipAddress}...`);
        this.#status = "Restarting";

        return new Promise((resolve) => {
            setTimeout(() => {
                const success = Math.random() > 0.1; // 90% success rate
                this.#status = success ? "Operational" : "Failed";
                resolve(success);
            }, 2000); // Simulated restart delay
        });
    }

    /**
     * @function checkTemperature()
     * @returns {void} - No return value.
     * Checks for high temperature and triggers an alert if necessary.
     * Updates the high-temperature mode status.
     * If temperature exceeds threshold, adds an alert.
     * 
     * 
     */
    checkTemperature() {
        if (this.#temperature > MiningMachine.TEMPERATURE_THRESHOLD) {
            if (!this.#highTemperatureMode) {
                this.#highTemperatureMode = true;
                const alertMessage = `High temperature alert! Machine ${this.#model} at ${this.#ipAddress} is at ${this.#temperature}°C.`;
                
                console.log(alertMessage);
                this.addAlert(alertMessage);
            }
        } else {
            this.#highTemperatureMode = false; // Reset if temperature returns to normal
        }
    }
    
    /**
     * @function addAlert()
     * @param {string} message - The alert message.
     * @returns {void}
     * Adds an alert message to the alert list.
     */
    addAlert(message) {
        this.#alerts.push(message);
    }
    get ipAddress() {
        return this.#ipAddress;
    }

    get hashRate() {
        return this.#hashRate;
    }

    get temperature() {
        return this.#temperature;
    }

    get model() {
        return this.#model;
    }

    get status() {
        return this.#status;
    }

    get highTemperatureMode() {
        return this.#highTemperatureMode;
    }
}

/**
 * @description Manages and monitors mining machines.
 * 
 * Implements:
 * - **Singleton Pattern**: Ensures only one instance manages all mining machines.
 * - **Encapsulation**: Uses private fields to protect data integrity.
 */
export class MonitoringSystem {
    static #instance; // Private static instance for Singleton

    #miningMachines;
    #faultType;
    #firmwareVersion;
    #overheatedMachines;

    /**
     * Constructs the monitoring system.
     * Ensures only one instance exists (Singleton Pattern).
     */
    constructor() {
        if (!MonitoringSystem.#instance) {
            this.#miningMachines = [];
            this.#faultType = null; // Default: No faults
            this.#firmwareVersion = "v1.0.0"; // Default firmware version
            this.#overheatedMachines = [];
            MonitoringSystem.#instance = this;
        }
        return MonitoringSystem.#instance;
    }
    /**
     * @function  getMiningMachines
     * @returns {Array} - List of all mining machines.
     * Retrieves all monitored mining machines.
     */
    getMiningMachines() {
        return this.#miningMachines;
    }
    /**
     * @function getOverheatedMachines
     * @returns {Array} - List of overheated mining machines.
     * Retrieves all overheated mining machines.
     */
    getOverheatedMachines() {
        return this.#overheatedMachines;
    }

    /**
     * @function addMachine
     * @param {Object} machine - The mining machine to be monitored.
     * @returns {void}
     * Adds a mining machine to monitoring.
     */
    addMachine(machine) {
        if (!this.#miningMachines.some(m => m.ipAddress === machine.ipAddress)) {
            this.#miningMachines.push(machine);
            console.log(` Machine ${machine.model} with IP ${machine.ipAddress} added successfully.`);
        } else {
            console.log(`Machine with IP ${machine.ipAddress} is already in the system.`);
        }
    }

    /**
     * @function monitorTemperature
     * @returns {void}
     * Monitors temperature and updates overheated machines.
     */
    monitorTemperature() {
        this.#overheatedMachines = this.#miningMachines.filter(machine => machine.temperature > 80);
        if (this.#overheatedMachines.length > 0) {
            console.log(`⚠ Warning: ${this.#overheatedMachines.length} machines are overheating!`);
        }
    }

   /**
     * @function faultDiagnosis
     * @returns {void}
     * Diagnoses machine faults and sets the fault type.
     */
    faultDiagnosis() {
        const faultyMachines = this.#miningMachines.filter(machine => machine.status === "Failed");
        if (faultyMachines.length > 0) {
            this.#faultType = "Hardware Failure"; // Example fault type
            console.log(`Detected ${faultyMachines.length} machines with faults. Fault Type: ${this.#faultType}`);
        } else {
            this.#faultType = null;
        }
    }

   /**
     * @function firmwareUpdate
     * @param {string} newVersion - The new firmware version.
     * @returns {void}
     * Updates the firmware for all mining machines.
     */
    firmwareUpdate(newVersion) {
        if (typeof newVersion !== "string" || !newVersion.trim()) {
            console.error("Invalid firmware version provided.");
            return;
        }
        if (this.#firmwareVersion === newVersion) {
            console.log(`Firmware is already up-to-date (version: ${newVersion}).`);
            return;
        }
        console.log(`Updating firmware to version ${newVersion}...`);
    }
    /**
     * @function  getMachines
     * @returns {Array} - List of all mining machines.
     */
    getMachines() {
        return this.#miningMachines;
    }
    /**
     * @function clearMachines
     *  
     */
    clearMachines() {
        this.#miningMachines = [];
    }   
}


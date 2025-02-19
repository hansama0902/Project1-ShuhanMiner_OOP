/**
 * @class RestartOperation
 * @description Manages batch restart operations for mining machines.
 * 
 * This class provides functionality to:
 * - Select machines for restart.
 * - Execute batch restart operations asynchronously.
 * - Track restart time, duration, success count, and failure count.
 * - Provide detailed feedback on restart results.
 */
export class RestartOperation {
    /**
     * @constructor
     * @param {MiningMachine[]} selectedMachines - List of mining machines to restart.
     * 
     * @property {MiningMachine[]} #selectedMachines - The list of selected machines for restart.
     * @property {string} #restartStatus - The current restart operation status (`"Pending"`, `"Completed"`).
     * @property {Date|null} #restartTime - The timestamp when the restart operation begins.
     * @property {number} #restartDuration - The time taken for the restart operation (in milliseconds).
     * @property {number} #successfulRestarts - Number of machines successfully restarted.
     * @property {number} #failedRestarts - Number of machines that failed to restart.
     */
    #selectedMachines;
    #restartTime;
    #restartDuration;
    #successfulRestarts;
    #failedRestarts;

    constructor(selectedMachines = []) {
        this.#selectedMachines = selectedMachines;
        this.#restartTime = null;
        this.#restartDuration = 0;
        this.#successfulRestarts = 0;
        this.#failedRestarts = 0;
    }

    /**
     * @function selectMachines()
     * @param {MiningMachine[]} machines - An array of mining machines to restart.
     * @returns {void}
     * Updates the list of mining machines selected for restart.
     */
    selectMachines(machines) {
        this.#selectedMachines = machines;
    }

    /**
     * @function executeRestart()
     * @returns {Promise<void>}
     * Executes the restart operation for all selected machines asynchronously.
     * - Records the start time of the operation.
     * - Measures the total time taken for the restart process.
     * - Tracks the number of successful and failed restarts.
     */
    async executeRestart() {
        console.log("Executing restart for selected machines...");
        this.#restartTime = new Date(); // Capture the start time of the restart operation
        const startTime = performance.now(); // Start high-precision timer

        let successCount = 0;
        let failureCount = 0;

        // Execute all restarts asynchronously
        await Promise.all(
            this.#selectedMachines.map(async (machine) => {
                try {
                    const result = await machine.restart(); // Assume `restart()` returns a Promise<boolean>
                    result ? successCount++ : failureCount++;
                } catch (error) {
                    console.error(`Error restarting ${machine.name}:`, error);
                    failureCount++;
                }
            })
        );

        const endTime = performance.now();
        this.#restartDuration = endTime - startTime; // Compute total duration in milliseconds

        this.#successfulRestarts = successCount;
        this.#failedRestarts = failureCount;
    }

    /**
     * @function provideFeedback()
     * @returns {string} - A summary of the restart operation.
     * Provides detailed feedback on the restart operation.
     * 
     * - Includes restart timestamp.
     * - Reports the count of successful and failed restarts.
     * - Displays the duration of the restart process in seconds.
     */
    provideFeedback() {
        const timeString = this.#restartTime
            ? RestartOperation.formatDate(this.#restartTime)
            : "N/A";

        return `Restart completed at ${timeString}. 
                Successful: ${this.#successfulRestarts}, 
                Failed: ${this.#failedRestarts}, 
                Duration: ${(this.#restartDuration / 1000).toFixed(2)} seconds.`;
    }

    /**
     * Formats a date into a human-readable string.
     * 
     * @param {Date} date - The date object to format.
     * @returns {string} - Formatted date string.
     */
    static formatDate(date) {
        return date.toLocaleString("en-US", { timeZone: "UTC" });
    }
}

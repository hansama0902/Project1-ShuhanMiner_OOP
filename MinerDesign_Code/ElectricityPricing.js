import Alert from "./Alert.js";

/**
 * @class ElectricityPricing
 * @description Monitors electricity price fluctuations and triggers alerts if thresholds are exceeded.
 * 
 * Implements:
 * - **Encapsulation**: Uses private fields for data protection.
 */
export default class ElectricityPricing {
    #currentPrice;
    #costThreshold;
    #priceHistory;

    /**
     * @constructor
     * @param {number} initialPrice - The initial electricity price.
     * @param {number} costThreshold - The maximum acceptable price before triggering an alert.
     */
    constructor(initialPrice, costThreshold) {
        this.#currentPrice = initialPrice;
        this.#costThreshold = costThreshold;
        this.#priceHistory = [initialPrice];
    }

    /**
     * Updates the electricity price and checks for fluctuations.
     * @param {number} newPrice - The updated electricity price.
     * @param {User[]} users - List of users to notify if an alert is triggered.
     */
    monitorFluctuations(newPrice, users) {
        this.#currentPrice = newPrice;
        this.#priceHistory.push(newPrice);

        console.log(`⚡ Electricity Price Updated: $${newPrice.toFixed(2)}`);

        if (newPrice > this.#costThreshold) {
            this.#triggerShutdownAlert(users);
        }
    }

    /**
     * Triggers an alert when electricity cost exceeds the threshold.
     * @param {User[]} users - List of users to notify.
     * @private
     */
    #triggerShutdownAlert(users) {
        console.log("🔔 ElectricityPricing triggering Alert...");
        const alert = new Alert(
            "Electricity Pricing",
            "Critical",
            new Date(),
            "ElectricityPricing"
        );
        console.log("Created Alert instance...");
        alert.trigger(users);
        console.log("Alert.trigger() called!");
    }
    


    /**
     * Displays the current electricity price.
     */
    displayPrice() {
        console.log(`Current Electricity Price: $${this.#currentPrice.toFixed(2)}`);
    }

    /**
     * Retrieves price history.
     * @returns {number[]} - The list of past electricity prices.
     */
    getPriceHistory() {
        return [...this.#priceHistory];
    }
}

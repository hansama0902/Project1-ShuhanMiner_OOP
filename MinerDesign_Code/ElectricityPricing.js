/**
 * @class ElectricityPricing
 * @description Monitors electricity price fluctuations and triggers alerts if thresholds are exceeded.
 * 
 * Implements:
 * - **Encapsulation**: Uses private fields for data protection.
 */
import { Alert } from "./Alert.js";
export class ElectricityPricing {
    #currentPrice;
    #costThreshold;
    #priceHistory;

    /**
     * @constructor
     * @param {number} initialPrice - The initial electricity price.
     * @param {number} costThreshold - The maximum acceptable price before triggering an alert.
     * @param {number[]} priceHistory - The history of electricity prices.
     */
    constructor(initialPrice, costThreshold) {
        this.#currentPrice = initialPrice;
        this.#costThreshold = costThreshold;
        this.#priceHistory = [initialPrice];
    }

    /**
     * @function monitorFluctuations()
     * @param {number} newPrice - The updated electricity price.
     * @param {User[]} users - List of users to notify if an alert is triggered.
     * @returns {void}
     * Updates the electricity price and checks for fluctuations.
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
     * @function triggerShutdownAlert()
     * @param {User[]} users - List of users to notify.
     * @private
     * @returns {void}
     * Triggers an alert when electricity cost exceeds the threshold.
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
     * @function displayPrice()
     * @returns {void}
     * Displays the current electricity price.
     */
    displayPrice() {
        console.log(`Current Electricity Price: $${this.#currentPrice.toFixed(2)}`);
    }

    /**
     * @function getPriceHistory()
     * @returns {number[]} - The list of past electricity prices.
     * Retrieves price history.
     */
    getPriceHistory() {
        return [...this.#priceHistory];
    }
}

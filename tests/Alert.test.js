/**
 * AI Usage:
 * Model: ChatGPT 4o
 * Prompts: 
 * Help me design a test suite for the Alert class.
 * How it was used: I used the generated code to design a test suite for class.
 */ 
import { jest } from "@jest/globals";
import { Alert} from "../MinerDesign_Code/Alert.js";
import { User } from "../MinerDesign_Code/User.js";

describe("Alert Class Tests", () => {
    let alert;
    let mockUser1, mockUser2;
    let mockTimestamp;

    beforeEach(() => {
        mockTimestamp = new Date("2025-02-18T12:00:00Z");

        mockUser1 = new User("user1", "admin");
        mockUser2 = new User("user2", "engineer");

        
        jest.spyOn(mockUser1, "receiveNotification");
        jest.spyOn(mockUser2, "receiveNotification");

        alert = new Alert("Temperature", "Critical", mockTimestamp, "MiningMachine");
    });

    test("Should initialize with correct properties", () => {
        const details = alert.retrieveDetails();
        expect(details.type).toBe("Temperature");
        expect(details.level).toBe("Critical");
        expect(details.timestamp).toEqual(mockTimestamp);
        expect(details.triggeredBy).toBe("MiningMachine");
        expect(details.notifiedUsers).toEqual([]); 
    });

    test("Should trigger the alert and notify users", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

        alert.trigger([mockUser1, mockUser2]);

      
        expect(consoleSpy).toHaveBeenCalledWith("Alert Triggered: Temperature - Level: Critical");

        consoleSpy.mockRestore();
    });


    test("Should notify users and update the notified list", () => {
        alert.notifyUsers([mockUser1, mockUser2]);

       
        expect(mockUser1.receiveNotification).toHaveBeenCalledWith(
            expect.objectContaining({ 
                content: "Alert: Temperature - Level: Critical",
                timestamp: mockTimestamp
            })
        );
        expect(mockUser2.receiveNotification).toHaveBeenCalledWith(
            expect.objectContaining({ 
                content: "Alert: Temperature - Level: Critical",
                timestamp: mockTimestamp
            })
        );


        const details = alert.retrieveDetails();
        expect(details.notifiedUsers).toContain(mockUser1.getUserId());
        expect(details.notifiedUsers).toContain(mockUser2.getUserId());
    });

   
    test("Should return correct alert details", () => {
        alert.notifyUsers([mockUser1]);
        const details = alert.retrieveDetails();

        expect(details).toEqual({
            type: "Temperature",
            level: "Critical",
            timestamp: mockTimestamp,
            triggeredBy: "MiningMachine",
            notifiedUsers: [mockUser1.getUserId()], 
        });
    });

  
    test("Should not notify invalid users", () => {
        const invalidUser = { userId: "fakeUser", receiveNotification: jest.fn() };
        alert.notifyUsers([mockUser1, invalidUser]);

        expect(mockUser1.receiveNotification).toHaveBeenCalledWith(
            expect.objectContaining({ 
                content: "Alert: Temperature - Level: Critical",
                timestamp: mockTimestamp
            })
        );
        expect(alert.retrieveDetails().notifiedUsers).toContain(mockUser1.getUserId());

        expect(invalidUser.receiveNotification).not.toHaveBeenCalled();
        expect(alert.retrieveDetails().notifiedUsers).not.toContain("fakeUser");
    });
});




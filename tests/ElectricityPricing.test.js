/**
 * AI Usage:
 * Model: ChatGPT 4o
 * Prompts: 
 * Help me design a test suite for the ElectricityPricing class.
 * How it was used: I used the generated code to design a test suite for class.
 */ 
import { jest } from "@jest/globals";
import { ElectricityPricing} from "../MinerDesign_Code/ElectricityPricing.js";
import { User } from "../MinerDesign_Code/User.js";

// **使用 `jest.unstable_mockModule()` 来 Mock `Alert.js`**
jest.mock("../MinerDesign_Code/Alert.js", () => {
    return {
        default: jest.fn().mockImplementation(() => ({
            trigger: jest.fn(() => console.log("✅ Jest Mock Alert.trigger() called!"))
        }))
    };
});


// **动态导入 `Alert.js`**
const { default: Alert } = await import("../MinerDesign_Code/Alert.js");

describe("ElectricityPricing Class Tests", () => {
    let electricityPricing;
    let mockUser1, mockUser2;

    beforeEach(() => {
        mockUser1 = new User("user1", "admin");
        mockUser2 = new User("user2", "engineer");

        // 创建 `ElectricityPricing` 实例
        electricityPricing = new ElectricityPricing(0.10, 0.15);
    });

    /**
     * 测试 `ElectricityPricing` 是否正确初始化
     */
    test("Should initialize with correct properties", () => {
        expect(electricityPricing.getPriceHistory()).toEqual([0.10]);
    });

    /**
     * 测试 `monitorFluctuations()` 是否正确更新价格
     */
    test("Should update electricity price and store in history", () => {
        electricityPricing.monitorFluctuations(0.12, []);
        expect(electricityPricing.getPriceHistory()).toEqual([0.10, 0.12]);

        electricityPricing.monitorFluctuations(0.14, []);
        expect(electricityPricing.getPriceHistory()).toEqual([0.10, 0.12, 0.14]);
    });

    /**
     * 测试 `monitorFluctuations()` 是否在电价超出阈值时触发 `Alert`
     */
    test("Should trigger an alert when price exceeds threshold", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    
        electricityPricing.monitorFluctuations(0.16, [mockUser1, mockUser2]);
    
        console.log("🔥 Checking logs:", consoleSpy.mock.calls);
    
        consoleSpy.mockRestore();
    });
    

    /**
     * 测试 `displayPrice()` 是否正确输出当前价格
     */
    test("Should display the current electricity price", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
        
        electricityPricing.displayPrice();
        
        expect(consoleSpy).toHaveBeenCalledWith("Current Electricity Price: $0.10");

        electricityPricing.monitorFluctuations(0.14, []);
        electricityPricing.displayPrice();

        expect(consoleSpy).toHaveBeenCalledWith("Current Electricity Price: $0.14");

        consoleSpy.mockRestore();
    });
});



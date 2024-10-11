import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { remote } from 'webdriverio';

@Injectable()
export class AppiumService {
    private driver: WebdriverIO.Browser;
    private appiumBaseUrl: string = 'http://localhost:4723'; // Base URL for Appium server


    /**
     * Executes the specified test on the selected device.
     */

    async executeOnDevice(deviceType: 'android' | 'ios', executionType: 'apk' | 'script', script?: string) {
        let options;
        let executionResult = { success: false, message: '', data: null };

        try {
            // Define the base capabilities for Android or iOS
            if (deviceType === 'android') {
                options = {
                    hostname: 'localhost',
                    port: 4723,
                    // path: '/session',
                    capabilities: {
                        platformName: 'Android',
                        'appium:deviceName': 'emulator-5554',
                        'appium:automationName': 'UiAutomator2',
                        'appium:app': executionType === 'apk' ? '/path/to/your/android/app.apk' : undefined,
                        "appium:appPackage": "com.google.android.gm",
                        "appium:appActivity": "com.google.android.gm.ConversationListActivityGmail"
                    },
                };
            } else if (deviceType === 'ios') {
                options = {
                    hostname: 'localhost',
                    port: 4723,
                    // path: '/session',
                    capabilities: {
                        platformName: 'iOS',
                        'appium:deviceName': 'iPhone Simulator',
                        'appium:automationName': 'XCUITest',
                        'appium:app': executionType === 'apk' ? '/path/to/your/ios/app.app' : undefined,
                    },
                };
            }

            // Initialize WebDriverIO session with Appium
            this.driver = await remote(options);

            if (executionType === 'apk') {
                console.log(`Running APK on ${deviceType} device...`);
                await this.driver.pause(5000); // Simulate interaction with the app
                executionResult = { success: true, message: 'APK executed successfully', data: null };
            } else if (executionType === 'script' && script) {
                console.log(`Executing script on ${deviceType} device...`);
                await this.runDynamicScript(script);
                executionResult = { success: true, message: 'Script executed successfully', data: 'Test Completed' };
            }
        } catch (error) {
            console.error(`Execution failed on ${deviceType}:, error.message`);
            executionResult = { success: false, message: error.message, data: null };
        }
        // } finally {
        //     if (this.driver) {
        //         await this.driver.deleteSession();
        //     }
        // }

        return executionResult;
    }

    /**
     * Executes a dynamically passed script.
     */
    private async runDynamicScript(script: string) {
        try {
            // The script string will be evaluated in this context
            eval(script);
        } catch (error) {
            console.error('Error executing script:', error.message);
            throw error;
        }
    }
    /**
        * Fetches active sessions from the Appium server.
        * This can give details about devices that are currently running an Appium session.
        */
    async getActiveAppiumSessions(): Promise<any[]> {
        try {
            const response = await axios.get(`${this.appiumBaseUrl}/sessions`);
            return response.data.value; // Returns the list of active sessions
        } catch (error) {
            console.error('Error fetching active Appium sessions:', error);
            return [];
        }
    }

    async getAppiunStatus(): Promise<any[]> {
        try {
            const response = await axios.get(`${this.appiumBaseUrl}/status`);
            return response.data.value; // Returns the list of active sessions
        } catch (error) {
            console.error('Error fetching active Appium sessions:', error);
            return [];
        }
    }


}
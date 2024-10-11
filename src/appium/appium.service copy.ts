import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { exec } from 'child_process';  // To execute shell commands
import { remote } from 'webdriverio';

@Injectable()
export class AppiumService {
    private driver: WebdriverIO.Browser;
    private appiumBaseUrl: string = 'http://localhost:4723'; // Base URL for Appium server


    /**
     * Executes the specified test on the selected device.
     */
    // async executeOnDevice(deviceType: 'android' | 'ios', executionType: 'apk' | 'script', script?: string) {
    //     let options;
    //     let executionResult = { success: false, message: '', data: null };

    //     try {
    //         // Define the base capabilities for Android or iOS
    //         if (deviceType === 'android') {
    //             options = {
    //                 port: 4723,
    //                 capabilities: {
    //                     platformName: 'Android',
    //                     deviceName: 'emulator-5554',
    //                     automationName: 'UiAutomator2',
    //                     app: executionType === 'apk' ? '/path/to/your/android/app.apk' : undefined, // Only use the APK path if testing
    //                 },
    //             };
    //         } else if (deviceType === 'ios') {
    //             options = {
    //                 port: 4723,
    //                 capabilities: {
    //                     platformName: 'iOS',
    //                     deviceName: 'iPhone Simulator',
    //                     automationName: 'XCUITest',
    //                     app: executionType === 'apk' ? '/path/to/your/ios/app.app' : undefined, // Only use the app path if testing
    //                 },
    //             };
    //         }

    //         // Initialize WebDriverIO session with Appium
    //         this.driver = await remote(options);

    //         if (executionType === 'apk') {
    //             console.log(`Running APK on ${deviceType} device...`);
    //             await this.driver.pause(5000); // Simulate interaction with the app
    //             executionResult = { success: true, message: 'APK executed successfully', data: null };
    //         } else if (executionType === 'script') {
    //             console.log(`Executing script on ${deviceType} device...`);
    //             const result = await this.driver.execute(() => {
    //                 return eval(script); // This is where your script logic runs
    //             });
    //             executionResult = { success: true, message: 'Script executed successfully', data: result };
    //         }
    //     } catch (error) {
    //         console.error(`Execution failed on ${deviceType}:`, error.message);
    //         executionResult = { success: false, message: error.message, data: null };
    //     } finally {
    //         if (this.driver) {
    //             await this.driver.deleteSession();
    //         }
    //     }

    //     return executionResult;
    // }
    // async executeOnDevice(deviceType: 'android' | 'ios', executionType: 'apk' | 'script', script?: string) {
    //     let options;
    //     let executionResult = { success: false, message: '', data: null };

    //     try {
    //         // Define the base capabilities for Android or iOS
    //         if (deviceType === 'android') {
    //             options = {
    //                 hostname: 'localhost',
    //                 port: 4723,
    //                 path: '/session',  // Updated to Appium v2.x format
    //                 capabilities: {
    //                     platformName: 'Android',
    //                     'appium:deviceName': 'emulator-5554', // Added appium: prefix
    //                     'appium:automationName': 'UiAutomator2', // Added appium: prefix
    //                     'appium:app': executionType === 'apk' ? '/path/to/your/android/app.apk' : undefined, // Added appium: prefix
    //                 },
    //             };
    //         } else if (deviceType === 'ios') {
    //             options = {
    //                 hostname: 'localhost',
    //                 port: 4723,
    //                 path: '/session',  // Updated to Appium v2.x format
    //                 capabilities: {
    //                     platformName: 'iOS',
    //                     'appium:deviceName': 'iPhone Simulator', // Added appium: prefix
    //                     'appium:automationName': 'XCUITest', // Added appium: prefix
    //                     'appium:app': executionType === 'apk' ? '/path/to/your/ios/app.app' : undefined, // Added appium: prefix
    //                 },
    //             };
    //         }

    //         // Initialize WebDriverIO session with Appium
    //         this.driver = await remote(options);

    //         if (executionType === 'apk') {
    //             console.log(`Running APK on ${deviceType} device...`);
    //             await this.driver.pause(5000); // Simulate interaction with the app
    //             executionResult = { success: true, message: 'APK executed successfully', data: null };
    //         } else if (executionType === 'script') {
    //             console.log(`Executing script on ${deviceType} device...`);
    //             const result = await this.driver.execute(() => {
    //                 return eval(script); // This is where your script logic runs
    //             });
    //             executionResult = { success: true, message: 'Script executed successfully', data: result };
    //         }
    //     } catch (error) {
    //         console.error(`Execution failed on ${deviceType}:`, error.message);
    //         executionResult = { success: false, message: error.message, data: null };
    //     } finally {
    //         if (this.driver) {
    //             await this.driver.deleteSession();
    //         }
    //     }

    //     return executionResult;
    // }

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
            console.error(`Execution failed on ${deviceType}:`, error.message);
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

    /**
    * Runs a script using the specified session ID.
    * @param sessionId The session ID of the existing Appium session.
    * @param script The script to execute.
    */
    async runScriptUsingSessionId(sessionId: string, script: string) {
        let executionResult = { success: false, message: '', data: null };

        try {
            // Make sure the session exists
            const sessionExists = await this.checkSessionExists(sessionId);
            if (!sessionExists) {
                return { success: false, message: `Session with ID ${sessionId} not found`, data: null };
            }

            console.log(`Running script on session ${sessionId}...`);

            // Run the script in the existing session
            const result = await this.runDynamicScriptOnSession(sessionId, script);

            executionResult = { success: true, message: 'Script executed successfully', data: result };
        } catch (error) {
            console.error(`Execution failed on session ${sessionId}:`, error.message);
            executionResult = { success: false, message: error.message, data: null };
        }

        return executionResult;
    }


    /**
     * Check if a session exists by querying the Appium server.
     */
    private async checkSessionExists(sessionId: string): Promise<boolean> {
        try {
            const url = `${this.appiumBaseUrl}/session/${sessionId}`;
            const response = await axios.get(url);
            return response.status === 200;
        } catch (error) {
            console.error(`Error checking session ${sessionId}:`, error.message);
            return false;
        }
    }

    /**
     * Executes a dynamically passed script on the specific session.
     * Uses Appium's `execute` endpoint to run the script in the session.
     */
    private async runDynamicScriptOnSession(sessionId: string, script: string) {
        try {
            const url = `${this.appiumBaseUrl}/session/${sessionId}/execute/sync`;
            const response = await axios.post(url, {
                script,
                args: [],
            });
            return response.data.value; // The result of the script execution
        } catch (error) {
            console.error('Error executing script:', error.message);
            throw error;
        }
    }


}

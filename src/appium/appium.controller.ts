import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppiumService } from './appium.service';

@Controller('appium')
export class AppiumController {
    constructor(private readonly appiumService: AppiumService) { }

    /**
     * Executes either an APK or a script on the specified device.
     * @param deviceType - The type of device (android or ios).
     * @param executionType - The execution type (apk or script).
     * @param script - The script to execute (only required if executionType is 'script').
     * @returns - The result of the execution (success/failure, message, and optional data).
     */
    @Post('execute')
    async executeOnDevice(
        @Body('deviceType') deviceType: 'android' | 'ios',
        @Body('executionType') executionType: 'apk' | 'script',
        @Body('script') script?: string,  // Script is optional and only required for executionType 'script'
    ) {
        // Validate request body
        if (!deviceType || !executionType) {
            return {
                success: false,
                message: 'Missing required parameters: deviceType and executionType are required',
                data: null,
            };
        }

        // Execute based on device type and execution type (APK or Script)
        const result = await this.appiumService.executeOnDevice(deviceType, executionType, script);

        // Return the result from AppiumService
        return result;
    }

    @Get('sessions')
    async getConnectedDevices() {
        const devices = await this.appiumService.getActiveAppiumSessions();
        return devices;
    }

    @Get('status')
    async getSTATUS() {
        const devices = await this.appiumService.getAppiunStatus();
        return devices;
    }

}

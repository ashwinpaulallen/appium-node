import { Module } from '@nestjs/common';
import { AppiumService } from './appium.service';
import { AppiumController } from './appium.controller';

@Module({
    providers: [AppiumService],
    controllers: [AppiumController],
})
export class AppiumModule { }

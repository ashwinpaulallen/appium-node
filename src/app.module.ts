import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AppiumService } from './appium/appium.service';
import { AppiumController } from './appium/appium.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/appium'),
  ],
  controllers: [AppController, AppiumController],
  providers: [AppService, AppiumService],
})
export class AppModule { }

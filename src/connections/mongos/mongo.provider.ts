import { DynamicModule, Provider } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";


export const DatabaseConnection: DynamicModule = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async () => {
    return {
      uri: process.env['AFX_MONGO_URI'],
      dbName: process.env['AFX_MONGO_DBNAME'],
      pass: process.env['AFX_MONGO_PSW'],
      user: process.env['AFX_MONGO_USER'],
      maxPoolSize: 50
    }
  }
})
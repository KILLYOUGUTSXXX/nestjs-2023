import { Module } from "@nestjs/common";
import { DatabaseConnection } from './mongo.provider'

@Module({
  imports: [DatabaseConnection],
  exports: [DatabaseConnection]
})
export class MainMongoModules {}
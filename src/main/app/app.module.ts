import { Module } from "@nestjs/common";
import { AppControllers } from "./app.controller";
import { AppServices } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "@common-schemas/mongo/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'cl_users', schema: UserSchema  } ])
  ],
  controllers: [AppControllers],
  providers: [AppServices]
})
export class AppModules {}

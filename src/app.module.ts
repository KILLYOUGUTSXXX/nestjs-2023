import { MiddlewareConsumer, Module, NestModule, Provider, Type } from '@nestjs/common';
import { RouterModule } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware, InitMiddleware, ProtectMiddleware, RequestBodyMiddleware, ResponseMiddleware } from "@middlewares";
import routerConfig from "./app.router.ts";
import { destructModuleFromRoutes } from "@utilities/func.util";
import { ValidationRoute } from '@globals/validation-route.global';
import { MainMongoModules } from './connections/mongos/mongo.module.js';


// init base director
global.__basedir = __dirname

const { dstModules, dstChecks } = destructModuleFromRoutes(routerConfig)

const InitRouteValidationConfig: Provider = {
  provide: 'ValidationRequestConfigs',
  inject: [ValidationRoute],
  async useFactory (validationRoute: ValidationRoute) {
    validationRoute.registerValidations(dstChecks)
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`.env.${process.env.NEST_ENV}`], isGlobal: true }),
    ...dstModules,
    RouterModule.register(routerConfig),
    MainMongoModules
  ],
  controllers: [],
  providers: [
    ValidationRoute,
    InitRouteValidationConfig
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(InitMiddleware, ResponseMiddleware, RequestBodyMiddleware, AuthMiddleware, ProtectMiddleware)
      .forRoutes('*')
  }
}

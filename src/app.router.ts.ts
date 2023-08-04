import { RouteTree, Routes } from '@nestjs/core'
import { TValidateRequest } from '@globals/validation-route.global'
import { AppModules } from '@main/app/app.module'
import { basicProtect } from '@utilities/protect-strategy.util'



type TExcludeRouteChild = Omit<RouteTree, 'children'>
type TCustomChild = { children?: TRouterConfigs[] }
type TValidations = { checks: TValidateRequest }

export type TRouterConfigs = TExcludeRouteChild & TCustomChild & TValidations


export default [
  {
    path: 'api',
    children: [
      {
        path: 'app',
        module: AppModules,
        checks: {
          GET: [
            { code: '01', name: 'Main App 01', logging: true, protect: basicProtect, auth: false },
            { code: '02', name: 'Main App 02', logging: true, suffix: 'hi/:name', auth: false },
            { code: '03', name: 'Main App 03', logging: true, suffix: 'help/:name', auth: true }
          ]
        }
      }
    ]
  }  
] as TRouterConfigs[]
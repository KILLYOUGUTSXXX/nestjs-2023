import { DynamicModule, ForwardReference, Type } from '@nestjs/common'
import { RouteTree } from '@nestjs/core'
import { TRouterConfigs } from 'src/app.router.ts'
import { TCombineOptValidate, TValidateRequest } from '@globals/validation-route.global'


/** Load all modules from routes*/ 
type TDestructRoutes = { 
	dstModules: (Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference<any>)[],
	dstChecks: any
}

function destructCheck (paths: string[], checks: TValidateRequest): { [Path: string]: TValidateRequest } {
	let checkRequest: any = {}
	const currCheck = Object.keys(checks || {})
	
	for (let x in currCheck) {
		const itemLists: TCombineOptValidate[] = (checks[currCheck[x]] || [])
		for (let a in itemLists) {
			const items: TCombineOptValidate = itemLists[a]
			const consistentPath = (typeof items.suffix === 'string' ? [...paths, items.suffix] : paths).join('/')
			checkRequest = Object.assign(checkRequest, { [`${currCheck[x]}@/${consistentPath}`]: items })
			console.log(
				'\x1b[1m\x1b[35m[CLOG]\x1b[0m\x1b[37m Mapped validation', `{/${consistentPath}, ${currCheck[x]}, \x1b[35m${items.code}\x1b[0m}`
			)
		}
	}

	return checkRequest
}


export function destructModuleFromRoutes (routes: TRouterConfigs[] = [], paths: string[] = []): TDestructRoutes {
  return routes.reduce((a: TDestructRoutes, b: TRouterConfigs) => {
		let obj: any = null
		const currCheck = Object.keys((b.checks || {}))
    if(Array.isArray(b.children) && b.children.length > 0) {
			const childs = destructModuleFromRoutes(b.children as TRouterConfigs[], [...paths, b.path])
			obj = { module: childs.dstModules, check: { ...childs.dstChecks } }
		} else if (b.module || currCheck.length > 0) { 
			obj = {
				module: b.module ? [b.module] : [],
				check: currCheck.length > 0 ? destructCheck([...paths, b.path], b.checks) : {}
			}
		}

		return {
			dstModules: Array.isArray(obj.module) ? [...a.dstModules, ...obj.module] : a.dstModules,
			dstChecks: obj.check ? {...a.dstChecks, ...obj.check} : a.dstChecks
		} as TDestructRoutes
  }, { dstModules: [], dstChecks: {} } as TDestructRoutes)
}
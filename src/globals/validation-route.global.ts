import { Injectable } from "@nestjs/common";
import { Request, IJwtPayload } from "@utilities/helper-type.util";
import { NextFunction } from "express"
import { RequestMethod } from "@nestjs/common"

export interface IProtectProps {
  /** Able to consuming authentication payload (only work if status of "auth" is true) */
  authPayload: IJwtPayload,
  /** Able to consuming request payload */
  requestPayload: Request
}

// Global typeof Option Validate
type OptValidateX = {
  /** Name of route.*/
  suffix?: string[] | string

  /** Name of route.*/
  name: string

  /**
   Code of route, the "Code" must be unique
  */
  code: string

  /** If set to "true", the logs would be save to DB (Default: true)*/
  logging?: boolean

  /** If set to "false" the request would not be authenticated with (Default: true).*/
  auth?: boolean

  /** To protect the routes, when the return is "false" the request would be return error 403.*/
  protect?: ((props: IProtectProps, next: NextFunction) => void | null)
}


// only use in GET methods
type OptValidateA = {}

// use in except of GET methods
type OptValidateB = {
  /** The max of size body in Megabyte (MB).*/
  maxBodySize?: number 
}

export interface TCombineOptValidate extends OptValidateX, OptValidateA, OptValidateB {}

export type TValidateRequest = {
  [Px in keyof typeof RequestMethod]: {
    [Ox in keyof (OptValidateX & (Px extends 'GET' ? OptValidateA : OptValidateB))]
      : (OptValidateX & (Px extends 'GET' ? OptValidateA : OptValidateB))[Ox]
  }[]
}



@Injectable()
export class ValidationRoute {
  private validations: any = {}

  get () {
    return this.validations
  }

  registerValidations (values: any) {
    this.validations = Object.assign(this.validations, values)
  }

  verifyRoutes (req: Request): TCombineOptValidate {
    const mappingKeys = Object.keys(this.validations)
    const foundUrl = mappingKeys.filter(a => {
      const _key = a.replace(/\:[a-zA-Z0-9_-]+/g, '([a-zA-Z0-9_-]+)')
      return `${req.method}@${req.baseUrl}`.match(new RegExp(`^${_key}$`, 'g'))
    })[0]
    const settings = ((this.validations[foundUrl] || null) || {})
    return settings
  }
}


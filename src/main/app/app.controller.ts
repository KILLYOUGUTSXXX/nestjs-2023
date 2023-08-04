import { Controller, Get, Param, Req, Res } from "@nestjs/common";
import { Request, Response } from "@utilities/helper-type.util";
import { AppServices } from "./app.service";




@Controller()
export class AppControllers {
  constructor (
    private readonly appServices: AppServices
  ) {}

  @Get()
  callMe (
    @Req() req: Request,
    @Res() res: Response
  ) {

    return this.appServices.callMe()
      .then(ok => {
        return res.asJson(200, {
          message: 'OK',
          data: {
            data: ok
          }
        })
      })
      .catch(er => res.asJson(200, {
          message: 'Failed to calling me.'
        }, { detail: er.message })
      )
  }

  @Get('hi/:name')
  callMeHi (
    @Req() req: Request,
    @Res() res: Response,
    @Param('name') name: string
  ) {

    return this.appServices.callMe(name)
      .then(ok => {
        return res.asJson(200, {
          message: 'OK',
          data: {
            data: ok
          }
        })
      })
      .catch(er => res.asJson(200, {
          message: 'Failed to calling me.'
        }, { detail: er.message })
      )
  }

  @Get('help/:name')
  callMeHelp (
    @Req() req: Request,
    @Res() res: Response,
    @Param('name') name: string
  ) {

    return this.appServices.callMe(name)
      .then(ok => {
        return res.asJson(200, {
          message: 'OK',
          data: {
            data: ok
          }
        })
      })
      .catch(er => res.asJson(200, {
          message: 'Failed to calling me.'
        }, { detail: er.message })
      )
  }
}
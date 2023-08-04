import { Injectable } from "@nestjs/common"




@Injectable()
export class AppServices {
  async callMe (name?: string) {
    return  'Hallllllooooo $NAME ...... '.replace(/\$NAME/g, (name || ''))
  }
}
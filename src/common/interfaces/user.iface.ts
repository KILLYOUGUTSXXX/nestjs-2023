import UserDTO from "@common-dtos/user.dto";
import { TransposeClassDTO } from "@utilities/helper-type.util";


export interface IUsers extends Readonly<TransposeClassDTO<UserDTO>> {
  readonly is_admin: boolean
  readonly created_at: number
}
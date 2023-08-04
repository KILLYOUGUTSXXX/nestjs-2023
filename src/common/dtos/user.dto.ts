import { User } from "@common-schemas/mongo/user.schema";
import { IsNotEmpty, IsString } from "class-validator";

export default class UserDTO implements Partial<User> {
  @IsString()
  @IsNotEmpty()
  readonly user_name: string
}
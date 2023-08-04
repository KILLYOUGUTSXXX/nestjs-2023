import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: false, versionKey: false, collection: 'cl_users' })
export class User {
  @Prop({ required: true, unique: true })
  user_name: string;

  @Prop({ default: false  })
  is_admin: boolean;

  @Prop({ default: false, required: true })
  created_at: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

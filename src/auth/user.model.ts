import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserModel {
  _id: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  passwordHash: string;
}
export const UserSchema = SchemaFactory.createForClass(UserModel);

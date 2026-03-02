
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class user extends Document {
  @Prop({ isRequired: true, unique: true })
  username: string;

  @Prop({ isRequired: true })
  password: string;

  @Prop({ isRequired: true, unique: true })
  email: string;

  @Prop({ isRequired: true })
  role: string;

  @Prop({ default: null })
  refresh_token?: string;

  @Prop({ default: null })
  refresh_expires?: Date;

  @Prop({ default: false, select: false })
  is_deleted: boolean;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ isRequired: true })
  city: string;

  @Prop({ isRequired: true })
  state: string;

  @Prop({ isRequired: true })
  zip_code: number;

  @Prop({ select: false, default: null })
  passResetToken?: string;

  @Prop({ default: null })
  passResetExpires?: Date;
}

export const UserSchema = SchemaFactory.createForClass(user);

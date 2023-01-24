import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';

@Schema({ timestamps: true, _id: true })
export class ReviewModel {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop({ type: Types.ObjectId })
  productId: ObjectId;
}
export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);

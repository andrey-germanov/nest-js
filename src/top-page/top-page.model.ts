import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class RabotaUAData {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;
}

export class TopPageAdvantage {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

@Schema({ timestamps: true })
export class TopPageModel {
  @Prop()
  _id: string;

  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop({ unique: true })
  alias: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop({ type: () => RabotaUAData })
  rabotaUA: RabotaUAData;

  @Prop({ type: () => [TopPageAdvantage] })
  advanteges: TopPageAdvantage[];

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop({ type: () => [String] })
  tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);

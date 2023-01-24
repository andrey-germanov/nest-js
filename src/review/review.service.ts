import { Injectable } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReviewDTO } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review')
    private readonly reviewModel: Model<ReviewModel>,
  ) {}
  create(dto: CreateReviewDTO): Promise<ReviewModel> {
    return this.reviewModel.create(dto);
  }

  delete(id: string): Promise<ReviewModel | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  findByProduct(productId: string): Promise<ReviewModel[]> {
    return this.reviewModel.find({ productId }).exec();
  }

  deleteByProductId(productId: string) {
    return this.reviewModel.deleteMany({ productId }).exec();
  }

  getAllReview() {
    return this.reviewModel.find();
  }
}

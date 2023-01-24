import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDTO } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review-constans';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  create(@Body() dto: CreateReviewDTO) {
    return this.reviewService.create(dto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if (!deletedDoc)
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    this.reviewService.delete(deletedDoc._id);
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProduct(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllReview() {
    return this.reviewService.getAllReview();
  }
}

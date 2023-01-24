// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateReviewDTO } from '../src/review/dto/create-review.dto';
import { Types, connect, disconnect } from 'mongoose';

const productId = new Types.ObjectId().toHexString();
const mockDto: CreateReviewDTO = {
  title: 'title',
  description: 'description',
  name: 'german',
  rating: 2,
  productId,
};
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST)', async (done) => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(mockDto)
      .expect(201)
      .expect(createdId)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
        done();
      });
  });

  afterAll(() => {
    disconnect();
  });
});

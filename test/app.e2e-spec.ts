import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('/category (GET)', () => {
    return request(app.getHttpServer())
        .get('/category')
        .expect(200)
        .expect([]);
  });
  it('/category/1 (GET)', () => {
    return request(app.getHttpServer())
        .get('/category/1')
        .expect(200)
        .expect('');
  });
  it('/category (POST)', () => {
    return request(app.getHttpServer())
        .post('/category')
        .send({name: 'Новая категория'})
        .expect(201)
        .expect(res => {
          expect(res.body).toEqual(
              expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String)
              })
          )
        })
  });
    it('/category (GET)', () => {
        return request(app.getHttpServer())
            .get('/category')
            .expect(200)
            .expect([{
                id: expect.any(Number),
                name: 'Новая категория'
            }]);
    });
    it('/category/1 (GET)', () => {
        return request(app.getHttpServer())
            .get('/category')
            .expect(200)
            .expect([{
                id: expect.any(Number),
                name: 'Новая категория'
            }]);
    });
    it('/category/1 (DELETE)', () => {
        return request(app.getHttpServer())
            .delete('/category/1')
            .expect(200);
    });
    it('/category (GET)', () => {
        return request(app.getHttpServer())
            .get('/category')
            .expect(200)
            .expect([]);
    });

  afterAll((done) => {
    app.close();
    done();
  });
});

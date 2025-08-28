import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { Repository } from 'typeorm';

describe('Authentication Flow (e2e)', () => {
  let app: INestApplication;
  let usersRepository: Repository<User>;

  const testUser = {
    email: `test.e2e@${Date.now()}.com`,
    password: 'password123',
  };
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    usersRepository = moduleFixture.get<Repository<User>>(
      getRepositoryToken(User),
    );
  });

  beforeEach(async () => {
    await usersRepository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  it('1. [POST /users/register] - should register a new user successfully', () => {
    return request(app.getHttpServer())
      .post('/users/register')
      .send(testUser)
      .expect(201)
      .then((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.email).toEqual(testUser.email);
        expect(res.body.password).toBeUndefined();
      });
  });

  it('2. [POST /users/register] - should fail to register a user with a duplicate email', async () => {
    await usersRepository.save(testUser);
    return request(app.getHttpServer())
      .post('/users/register')
      .send(testUser)
      .expect(409);
  });

  it('3. [POST /auth/login] - should log in a user and return a JWT', async () => {
    await request(app.getHttpServer()).post('/users/register').send(testUser);

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(testUser)
      .expect(200);

    expect(res.body.access_token).toBeDefined();
    expect(typeof res.body.access_token).toBe('string');
    authToken = res.body.access_token;
  });

  it('4. [GET /auth/profile] - should allow access to a protected route with a valid token', async () => {
    expect(authToken).toBeDefined();

    const res = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(res.body).toBeDefined();
    expect(res.body.email).toEqual(testUser.email);
  });

  it('5. [GET /auth/profile] - should deny access to a protected route without a token', () => {
    return request(app.getHttpServer()).get('/auth/profile').expect(401);
  });
});

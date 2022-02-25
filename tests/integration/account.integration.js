import { expect } from 'chai';
import request from 'supertest';
import app from '../../index';

describe('Account APIs', () => {
  describe('Create Account', () => {
    it('should throw error if body is empty', (done) => {
      request(app)
        .post('/v1/account/create')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
          expect(res.body.code).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('email is required');
          done();
        });
    });

    it('create account successfully', (done) => {
      request(app)
        .post('/v1/account/create')
        .set('Accept', 'application/json')
        .send({
          first_name: 'test',
          last_name: 'user',
          email: 'test@gmail.com',
          password: 'password',
        })
        // .expect(201)
        .end((err, res) => {
          expect(res.body.code).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Account created successfully');
          done();
        });
    });

    it('should throw error if email already exist', (done) => {
      request(app)
        .post('/v1/account/create')
        .set('Accept', 'application/json')
        .send({
          first_name: 'test',
          last_name: 'user',
          email: 'test@gmail.com',
          password: 'password',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.code).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Account already exists');
          done();
        });
    });
  });

  describe('Login Account', () => {
    it('should throw error if body is empty', (done) => {
      request(app)
        .post('/v1/account/login')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
          expect(res.body.code).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('email is required');
          done();
        });
    });

    it('should throw error if email does not exist', (done) => {
      request(app)
        .post('/v1/account/login')
        .set('Accept', 'application/json')
        .send({
          email: 'test11@gmail.com',
          password: 'password',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.code).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Invalid credentials');
          done();
        });
    });

    it('should throw error if password is invalid', (done) => {
      request(app)
        .post('/v1/account/login')
        .set('Accept', 'application/json')
        .send({
          email: 'test@gmail.com',
          password: 'passwordss',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.code).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Invalid credentials');
          done();
        });
    });

    it('login account successfully', (done) => {
      request(app)
        .post('/v1/account/login')
        .set('Accept', 'application/json')
        .send({
          email: 'test@gmail.com',
          password: 'password',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.code).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('User logged in successfully');
          done();
        });
    });
  });
});

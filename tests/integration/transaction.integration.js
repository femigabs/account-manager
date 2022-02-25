import { expect } from 'chai';
import request from 'supertest';
import app from '../../index';
import { db } from '../../src/config';

describe('Transfer APIs', () => {
  let token = '';
  let token2 = '';

  before(async () => {
    await db.raw(`
        INSERT INTO accounts(
            account, first_name, last_name, email, password
        ) VALUES (1025606233, 'test1', 'user1', 'test1@gmail.com', 
        '$2b$10$BFYzdM2VT0XKxD56FD3bQupxU/pIbAeTMR64vlSmWSYIM7YJ.MXEm')
    `);
    await db.raw(`
        INSERT INTO accounts(
            account, first_name, last_name, email, password
        ) VALUES (1023970643, 'test2', 'user2', 'test2@gmail.com', 
        '$2b$10$BFYzdM2VT0XKxD56FD3bQupxU/pIbAeTMR64vlSmWSYIM7YJ.MXEm')
    `);
  });

  before('Login User1', (done) => {
    request(app)
      .post('/v1/account/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test1@gmail.com',
        password: 'password',
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.code).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('User logged in successfully');
        token = res.body.data.token;
        done();
      });
  });

  before('Login User2', (done) => {
    request(app)
      .post('/v1/account/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test2@gmail.com',
        password: 'password',
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.code).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('User logged in successfully');
        token2 = res.body.data.token;
        done();
      });
  });

  describe('Add Fund', () => {
    it('should throw error if token is not provided', (done) => {
      request(app)
        .post('/v1/transaction/deposit')
        .set('Accept', 'application/json')
        .send({
          user_account: 1025606233,
          amount: 10000,
        })
        .expect(401)
        .end((err, res) => {
          expect(res.body.code).to.equal(401);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Authorization token is required');
          done();
        });
    });

    it('should throw error if body is empty', (done) => {
      request(app)
        .post('/v1/transaction/deposit')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
          expect(res.body.code).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('user_account is required');
          done();
        });
    });

    it('create account successfully', (done) => {
      request(app)
        .post('/v1/transaction/deposit')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          user_account: 1025606233,
          amount: 10000,
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.code).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Account funded successfully');
          done();
        });
    });

    it('should throw error if account is invalid', (done) => {
      request(app)
        .post('/v1/transaction/deposit')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          user_account: 1021814983,
          amount: 10000,
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.code).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Invalid user account number');
          done();
        });
    });
  });

  describe('Withdrawal Fund', () => {
    it('should throw error if token is not provided', (done) => {
      request(app)
        .post('/v1/transaction/withdraw')
        .set('Accept', 'application/json')
        .send({
          user_account: 1025606233,
          amount: 1000,
        })
        .expect(401)
        .end((err, res) => {
          expect(res.body.code).to.equal(401);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Authorization token is required');
          done();
        });
    });

    it('should throw error if body is empty', (done) => {
      request(app)
        .post('/v1/transaction/withdraw')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
          expect(res.body.code).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('user_account is required');
          done();
        });
    });

    it('create account successfully', (done) => {
      request(app)
        .post('/v1/transaction/withdraw')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          user_account: 1025606233,
          amount: 1000,
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.code).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Account withdrawal was successful');
          done();
        });
    });

    it('should throw error if account is invalid', (done) => {
      request(app)
        .post('/v1/transaction/deposit')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          user_account: 1021814983,
          amount: 10000,
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.code).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Invalid user account number');
          done();
        });
    });
  });

  describe('Transfer Fund', () => {
    it('should throw error if token is not provided', (done) => {
      request(app)
        .post('/v1/transaction/transfer')
        .set('Accept', 'application/json')
        .send({
          user_account: 1025606233,
          receiver_account: 1023970643,
          amount: 1000,
        })
        .expect(401)
        .end((err, res) => {
          expect(res.body.code).to.equal(401);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Authorization token is required');
          done();
        });
    });

    it('should throw error if body is empty', (done) => {
      request(app)
        .post('/v1/transaction/transfer')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
          expect(res.body.code).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('user_account is required');
          done();
        });
    });

    it('should throw error if user account is invalid', (done) => {
      request(app)
        .post('/v1/transaction/transfer')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          user_account: 1025606233,
          receiver_account: 1023970643,
          amount: 100000,
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.code).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Insufficient balance');
          done();
        });
    });

    it('should throw error if user account is invalid', (done) => {
      request(app)
        .post('/v1/transaction/transfer')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          user_account: 1021814983,
          receiver_account: 1023970643,
          amount: 1000,
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.code).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Invalid user account number');
          done();
        });
    });

    it('should throw error if user account is invalid', (done) => {
      request(app)
        .post('/v1/transaction/transfer')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          user_account: 1025606233,
          receiver_account: 1022622753,
          amount: 1000,
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.code).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Invalid receiver account number');
          done();
        });
    });

    it('should throw error if user account is invalid', (done) => {
      request(app)
        .post('/v1/transaction/transfer')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          user_account: 1023970643,
          receiver_account: 1025606233,
          amount: 1000,
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.code).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Account not associated to user');
          done();
        });
    });

    it('create account successfully', (done) => {
      request(app)
        .post('/v1/transaction/transfer')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          user_account: 1025606233,
          receiver_account: 1023970643,
          amount: 1000,
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.code).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Transfer was successful');
          done();
        });
    });
  });
});

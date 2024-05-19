import express from 'express';
import { appDataSource } from '../datasource.js';
import Account from '../entities/account.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(Account)
    .find({})
    .then(function (accounts) {
      res.json({ accounts: accounts });
    });
});

router.post('/new', function (req, res) {
  const accountRepository = appDataSource.getRepository(Account);
  const newAccount = accountRepository.create({
    name: req.body.name,
    password: req.body.password,
  });

  accountRepository
    .insert(newAccount)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: 'Account with name "${newAccount.name}" already exists',
        });
      } else {
        res.status(500).json({ message: 'Error while creating the Account' });
      }
    });
});

router.get('/:name', function (req, res) {
  appDataSource
    .getRepository(Account)
    .find({ name: req.params.name })
    .then(function (accounts) {
      res.json({ accounts: accounts });
    });
});

router.delete('/:accountId', function (req, res) {
  appDataSource
    .getRepository(Account)
    .delete({ id: req.params.accountId })
    .then(function () {
      res.status(204).json({ message: 'Account successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the Account' });
    });
});

export default router;
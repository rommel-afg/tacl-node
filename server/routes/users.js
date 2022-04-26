import express from 'express'
const router = express.Router();

import { getAll, createUser } from '../controllers/UserController'

/* GET users listing. */
router.get('/', getAll);

router.post('/', createUser)

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/usersController');

router.get('/', controller.getUsers);
router.post('/',controller.createUser);
router.put('/:id',controller.updateUserById);
router.delete('/:id',controller.deleteUserById);

module.exports = router;
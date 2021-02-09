const { Router} = require('express')
const router = Router()
const { renderSignUpForm, signUp, renderSignin, signin, logout } = require('../controllers/user.controller');

router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', signUp);

router.get('/users/signin', renderSignin);

router.post('/signin', signin);

router.get('/users/logout', logout);



module.exports = router;

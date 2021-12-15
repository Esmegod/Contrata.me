const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validadorCampos');


const { validarJWT } = require('../../middlewares/validarJWT');

const { entrar, renovar, registrar } = require('../../controllers/empresa/auth');

const router = Router();

router.post(
  '/crear',
  [ // middlewares
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('rfc', 'El rfc es obligatorio').isLength({ min: 13, max: 13 }),
    check('passwordCreate', 'El password es obligatorio y debe de tener al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
  ],
  registrar
);

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio y debe ser al menos de 6 caracteres').isLength({ min: 6 }),
    validarCampos
  ],
  entrar
);

router.get('/renovar', validarJWT, renovar);

module.exports = router;

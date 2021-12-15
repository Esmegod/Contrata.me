const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../../middlewares/validadorCampos'); 
const { validarJWT } = require('../../middlewares/validarJWT'); 
const { registrar, entrar, renovar } = require('../../controllers/estudiante/auth');

const router = Router();

// Ruta para registrar: /api/auth/estudiante/registrar
router.post(
  '/registrar',
  [ // middlewares
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('apellido_paterno','El apellido paterno es obligatorio').not().isEmpty(),
    check('apellido_materno','El apellido materno obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('confirmPasswordCreate','El password es obligatorio y debe de tener al menos 6 caracteres').isLength({ min: 6 }),
    check('semestre','El semestre es obligatorio').not().isEmpty(),
    check('sexo','El sexo es obligatorio').not().isEmpty(),
    validarCampos
  ],
  registrar  
);

// Ruta para login: /api/auth/estudiante/
router.post(
  '/',
  [
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio y debe ser al menos de 6 caracteres').isLength({ min: 6 }),
    validarCampos
  ],
  entrar
);

// Ruta para renovar: /api/auth/estudiante/renovar
router.get( '/renovar', validarJWT, renovar );

module.exports = router;

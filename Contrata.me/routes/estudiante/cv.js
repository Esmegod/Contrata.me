const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../../middlewares/validadorCampos');
const { validarJWT } = require('../../middlewares/validarJWT');
const { registrar, consultar, eliminar } = require('../../controllers/estudiante/curriculum');

const router = Router();

// Ruta para consultar: /api/auth/estudiante/cv/:id
router.get(
  ['/','/:id'],
  [ // middlewares
    validarJWT
  ],
  consultar  
);

// Ruta para crear (cuando no esta creado): /api/auth/estudiante/cv/crear
router.post(
  '/crear',
  [ // middlewares
    validarJWT,
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('tecnologias','Debes incluir al menos una tecnologia').isArray({ min: 1 }),
    check('idiomas','Debes incluir al menos un idioma').isArray({ min: 1 }),
    check('formacionAcademica','Debes incluir al menos una formacion academica').not().isEmpty(),
  ],
  registrar
);
/*
// Ruta para actualizar el cv (cuando ya esta creado): /api/auth/estudiante/cv/actualizar
router.put(
  '/actualizar',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(''),
    check('apellido_paterno', 'El apellido paterno es obligatorio').not().isEmpty(''),
    check('apellido_materno', 'El apellido materno es obligatorio').not().isEmpty(''),
    check('email', 'El email es obligatorio').not().isEmpty(''),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(''),
    check('formacion_academica','Debes incluir al menos una formacion academica').isArray({ min: 1 }),
    validarCampos
  ],
  actualizar
);
*/
// Ruta para eliminar el cv (cuando esta creado): /api/auth/estudiante/cv/eliminar
router.delete(
  '/eliminar',
  [
    validarJWT
  ],
  eliminar
);

module.exports = router;

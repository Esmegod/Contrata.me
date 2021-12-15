const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validadorCampos');


const { validarJWT } = require('../../middlewares/validarJWT');

const { actulizar, eliminar, gitHub } = require('../../controllers/estudiante/info');

const router = Router();

router.put(
    '/actualizar',
    [ // middlewares
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido_paterno', 'El apellido paterno es obligatorio').not().isEmpty(),
        check('apellido_materno', 'El apellido materno obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio y debe de tener al menos 6 caracteres').isLength({ min: 6 }),
        check('semestre', 'El semestre es obligatorio').not().isEmpty(),
        check('sexo', 'El sexo es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actulizar
);

router.put('/git', validarJWT, gitHub)

router.post(
    '/eliminar',
    [
        validarJWT,
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    eliminar
)

module.exports = router;

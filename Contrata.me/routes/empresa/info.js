const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validadorCampos');


const { validarJWT } = require('../../middlewares/validarJWT');

const { actulizar, eliminar } = require('../../controllers/empresa/info');

const router = Router();

router.post(
    '/actualizar',
    [ // middlewares
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('rfc', 'El rfc es obligatorio').isLength({ min: 13, max: 13 }),
        validarCampos
    ],
    actulizar
);

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

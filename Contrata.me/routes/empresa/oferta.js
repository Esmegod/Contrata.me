const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validadorCampos');


const { validarJWT } = require('../../middlewares/validarJWT');

const { crear, actualizar, eliminar, consultar, consultarById, consultarAll } = require('../../controllers/empresa/oferta');

const router = Router();

router.get(['/', '/:id'], validarJWT, consultar)

router.get('/find/:id', validarJWT, consultarById)

router.get('/ofertas/all', validarJWT, consultarAll)

router.post(
    '/crear',
    [ // middlewares
        validarJWT,
        check('titulo', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('puesto', 'El puesto es obligatorio').not().isEmpty(),
        check('sueldo', 'El sueldo es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crear
);

router.put('/actualizar',
    [
        validarJWT,
        check('ofertaId').not().isEmpty(),
        check('titulo', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('puesto', 'El puesto es obligatorio').not().isEmpty(),
        check('sueldo', 'El sueldo es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizar
)


router.delete('/eliminar',
    [
        validarJWT,
        check('ofertaId').not().isEmpty(),
        validarCampos
    ],
    eliminar
)

module.exports = router;

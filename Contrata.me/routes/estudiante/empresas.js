const { Router } = require('express');
const { validarJWT } = require('../../middlewares/validarJWT');
const { getAllEmpresas, getEmpresaById } = require('../../controllers/estudiante/empresas');

const router = Router();

router.get('/', validarJWT, getAllEmpresas);

router.get('/:id', validarJWT, getEmpresaById)

module.exports = router;
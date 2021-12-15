const { Router } = require('express');
const { validarJWT } = require('../../middlewares/validarJWT');
const { getAllStudents, getStudentById } = require('../../controllers/empresa/estudiantes');

const router = Router();

router.get('/', validarJWT, getAllStudents);
router.get('/:id', validarJWT, getStudentById);

module.exports = router;
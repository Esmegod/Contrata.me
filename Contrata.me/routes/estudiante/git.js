const { Router } = require('express');
const { validarJWT } = require('../../middlewares/validarJWT');
const { getAllRepos } = require('../../controllers/estudiante/git');

const router = Router();

router.get('/', validarJWT, getAllRepos);

module.exports = router;
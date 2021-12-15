const jwt = require('jsonwebtoken');

const Estudiante = require('../models/estudiante/Estudiante');
const Empresa = require('../models/empresa/Empresa');

const validarJWT = async (req, res, next) => {

  const token = req.header('x-token');

  if (!token) {
    return res.status(400).json({
      success: false,
      msg: 'No hay token en la peticion'
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;

    const estudiante = await Estudiante.findById( uid );
    const empresa =  await Empresa.findById( uid );

    if (!estudiante && !empresa ){
      return res.status(400).json({
	success:false,
	msg: 'El usuario al que pertenece el token no existe'
      });
    }

    if (estudiante)
      req.estudiante = estudiante;
    else if (empresa)
      req.empresa = empresa;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: 'Token no valido'
    });
  }
}

module.exports = {
  validarJWT
}

const bcrypt = require('bcryptjs');
const { crearJWT } = require('../../helpers/jwt');
const Empresa = require('../../models/empresa/Empresa');

const registrar = async (req, res) => {
  const { email, passwordCreate } = req.body;
  try {

    // Se comprueba si el usuario ya existe
    let empresa = await Empresa.findOne({ email });
    if (empresa) {
      return res.status(400).json({
        success: false,
        msg: 'El correo ya ha sido registrado con otra cuenta'
      });
    }

    empresa = new Empresa(req.body);

    // cifrar password
    const salt = bcrypt.genSaltSync();
    let date = new Date()
    empresa.created_at = date
    empresa.updated_at = date
    empresa.password = bcrypt.hashSync(passwordCreate, salt);

    // guardar usuario en la base de datos
    await empresa.save();

    // CRear token
    const token = await crearJWT(empresa.id, empresa.name);

    res.status(201).json({
      success: true,
      uid: empresa.id,
      name: empresa.name,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: 'Por favor comuniquese con el administrador'
    });
  }
};

const entrar = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Se comprueba si el usuario ya existe
    // si no existe, se regresa un status 400.
    const user = await Empresa.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: 'Usuario o password incorrectos'
      });
    }
    // validar password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        msg: 'Password incorrecta'
      });
    }

    // crear token
    const token = await crearJWT(user.id, user.name);

    res.json({
      success: true,
      uid: user.id,
      name: user.name,
      token,
      user
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
      msg: 'Por favor, comuniquese con el administrador'
    });
  }
};

const renovar = async (req, res) => {
  const { uid, name } = req;
  const token = await crearJWT(uid, name);
  res.json({
    success: true,
    token
  });
};

module.exports = {
  registrar,
  entrar,
  renovar,
}

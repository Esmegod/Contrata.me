const bcrypt = require('bcryptjs');
const { crearJWT } = require('../../helpers/jwt');
const Estudiante = require('../../models/estudiante/Estudiante');
const CV = require('../../models/estudiante/Curriculum');
const { Octokit } = require("@octokit/rest");
const { GitRepo } = require('../../dto/GitRepo');
const registrar = async (req, res) => {
  console.log(req.body)
  const { email, confirmPasswordCreate } = req.body;
  try {

    // Se comprueba si el usuario ya existe
    let estudiante = await Estudiante.findOne({ email });
    if (estudiante) {
      return res.status(400).json({
        success: false,
        msg: 'El correo ya ha sido registrado con otra cuenta'
      });
    }

    estudiante = new Estudiante(req.body);

    // cifrar password
    const salt = bcrypt.genSaltSync();
    estudiante.password = bcrypt.hashSync(confirmPasswordCreate, salt);

    // guardar usuario en la base de datos
    await estudiante.save();

    // CRear token
    const token = await crearJWT(estudiante.id, estudiante.name);

    let cv = await CV.findOne({ email });
    res.status(201).json({
      success: true,
      uid: estudiante.id,
      name: estudiante.name,
      token,
      cv
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
    const user = await Estudiante.findOne({ email });

    const octokit = new Octokit();

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
    let cv = await CV.findOne({ email });

    let data = null
    let repos = []

    if (user.gitUser) {
      data = await octokit.rest.repos.listForUser({
        username: user.gitUser,
        type: "all",
        sort: "created",
        direction: "desc",
      }).then(({ data }) => { return data })

      data.forEach(repo => {
        repos.push(new GitRepo(repo.name, repo.html_url, repo.language, repo.description))
      });

    }
    res.json({
      success: true,
      uid: user.id,
      name: user.name,
      token,
      user,
      cv,
      repos
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

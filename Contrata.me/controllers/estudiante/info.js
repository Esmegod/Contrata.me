const bcrypt = require('bcryptjs');
const Estudiante = require('../../models/estudiante/Estudiante');
const { Octokit } = require("@octokit/rest");
const { GitRepo } = require('../../dto/GitRepo')
const actulizar = async (req, res) => {
    const { email, password } = req.body;
    try {

        // Se comprueba si el usuario ya existe
        const salt = bcrypt.genSaltSync();
        let p = bcrypt.hashSync(password, salt);
        req.body.password = p
        req.body.updated_at = new Date()
        let estudiante = await Estudiante.findOneAndUpdate({ email: email }, req.body)

        res.status(200).json({
            success: true,
            uid: estudiante.id,
            name: estudiante.name,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'No se pudo actualizar los datos, intenta más tarde'
        });
    }
};

const gitHub = async (req, res) => {
    if (!req.estudiante) {
        return res.status(500).json({
            success: false,
            msg: 'No se pudo actualizar los datos, intenta más tarde'
        });
    }

    try {
        let email = req.estudiante.email
        let estudiante = await Estudiante.findOneAndUpdate({ email }, req.body);

        estudiante = await Estudiante.findOne({ email })

        const octokit = new Octokit();
        let data = null
        let repos = []

        if (estudiante.gitUser) {
            data = await octokit.rest.repos.listForUser({
                username: estudiante.gitUser,
                type: "all",
                sort: "created",
                direction: "desc",
            }).then(({ data }) => { return data })

            data.forEach(repo => {
                repos.push(new GitRepo(repo.name, repo.html_url, repo.language, repo.description))
            });

        }

        res.status(200).json({
            success: true,
            estudiante,
            repos
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'No se pudo actualizar los datos, intenta más tarde'
        });
    }

}

const eliminar = async (req, res) => {
    const { email } = req.body;

    try {
        let estudiante = await Estudiante.findOneAndUpdate({ email: email, deleted_at: null }, { updated_at: new Date(), deleted_at: new Date() })
        res.status(200).json({
            success: true,
            email: estudiante.email,
            deleted_at: estudiante.deleted_at
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Ocurrió un error al eliminar la cuenta'
        })
    }
}

module.exports = {
    actulizar,
    eliminar,
    gitHub
}

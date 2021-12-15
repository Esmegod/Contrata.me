const Estudiante = require('../../models/estudiante/Estudiante');
const { Octokit } = require("@octokit/rest");
const { GitRepo } = require('../../dto/GitRepo')
const getAllRepos = async (req, res) => {
    try {


        if (!req.estudiante) {
            res.status(500).json({
                success: false,
                msg: 'Por favor comuniquese con el administrador'
            });
        }
        const { email } = req.estudiante
        // Se comprueba si el usuario ya existe
        const estudiante = await Estudiante.findOne({ email })

        const octokit = new Octokit();
        let data = null
        let repos = []

        if (estudiante.gitUser) {
            data = await octokit.rest.repos.listForUser({
                username: estudiante.gitUser,
                type: "all",
                sort: "created",
                direction: "desc",
            }).then(({ data }) => { console.log(data);return data })

            data.forEach(repo => {
                repos.push(new GitRepo(repo.name, repo.html_url, repo.language, repo.description))
            });

        }


        res.status(200).json({
            success: true,
            repos
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: 'No se pudo actualizar los datos, intenta más tarde'
        });
    }
};



module.exports = {
    getAllRepos
}
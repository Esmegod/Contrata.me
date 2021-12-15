const Empresa = require('../../models/empresa/Empresa');
const Estudiante = require('../../models/estudiante/Estudiante');
const CV = require('../../models/estudiante/Curriculum')
const { Octokit } = require("@octokit/rest");
const { GitRepo } = require('../../dto/GitRepo')

const getAllStudents = async (req, res) => {
    try {
        // Se comprueba si el usuario ya existe
        const estudiantes = await Estudiante.find().exec()

        res.status(200).json({
            success: true,
            estudiantes: estudiantes
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: 'No se pudo actualizar los datos, intenta más tarde'
        });
    }
};

const getStudentById = async (req, res) => {
    try {
        let id = req.params.id
        if (!id) {
            return res.status(500).json({
                success: false,
                msg: "No se encontró el estudiante"
            })
        }
        // Se comprueba si el usuario ya existe
        const estudiante = await Estudiante.findOne({ _id: id })
        const cv = await CV.findOne({ estudiante })

        const octokit = new Octokit();

        let repos = []

        if (estudiante.gitUser) {
            let data = await octokit.rest.repos.listForUser({
                username: estudiante.gitUser,
                type: "all",
                sort: "created",
                direction: "desc",
            }).then(({ data }) => { return data }).catch(err => {
                console.log("err =>",err);
                return res.status(200).json({
                    success: true,
                    user: estudiante,
                    cv,
                });
            });

            data.forEach(repo => {
                repos.push(new GitRepo(repo.name, repo.html_url, repo.language, repo.description))
            });

        }

        res.status(200).json({
            success: true,
            user: estudiante,
            cv,
            repos
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: 'No se pudieron encontrar los datos, intenta más tarde'
        });
    }
}


module.exports = {
    getAllStudents,
    getStudentById
}

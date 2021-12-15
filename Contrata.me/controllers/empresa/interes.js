const Empresa = require('../../models/empresa/Empresa');
const Estudiante = require('../../models/estudiante/Estudiante');

const crear = async (req, res) => {
    if (!req.empresa && !req.estudiante) {
        return res.status(500).json({
            success: false,
            msg: 'Ocurrió un error al consultar las ofertas'
        })
    }
    let email = null
    if (req.empresa) {
        email = req.empresa.email;
    }

    if (req.estudiante) {
        if(!req.params.id){
            return res.status(500).json({
                success: false,
                msg: 'No se encontró la empresa'
            })
        }
        let e = await Empresa.findOne({ _id: req.params.id })
        email = e.email
    }

    try {

        let empresa = await Empresa.findOne({ email });

        return res.status(200).json({
            success: true,
            ofertas
        })

    } catch (error) {
        console.log(error);
        returnres.status(500).json({
            success: false,
            msg: 'Ocurrió un error al consultar las ofertas'
        })
    }

}

module.exports = {
    crear,
}
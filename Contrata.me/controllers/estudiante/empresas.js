const Empresa = require('../../models/empresa/Empresa');

const getAllEmpresas = async (req, res) => {
    try {
        // Se comprueba si el usuario ya existe
        const empresas = await Empresa.find().exec()

        res.status(200).json({
            success: true,
            empresas: empresas
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: 'No se pudo actualizar los datos, intenta más tarde'
        });
    }
};

const getEmpresaById = async (req, res) => {
    try {
        let id = req.params.id
        if (!id) {
            return res.status(500).json({
                success: false,
                msg: "No se encontró la empresa"
            })
        }
        // Se comprueba si el usuario ya existe
        const empresa = await Empresa.findOne({ _id: id })

        return res.status(200).json({
            success: true,
            empresa: empresa
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: 'No se pudieron encontrar los datos, intenta más tarde'
        });
    }
}


module.exports = {
    getAllEmpresas,
    getEmpresaById
}

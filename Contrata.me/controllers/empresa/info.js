const bcrypt = require('bcryptjs');
const Empresa = require('../../models/empresa/Empresa');

const actulizar = async (req, res) => {
    const { email } = req.body;
    try {

        // Se comprueba si el usuario ya existe
        req.body.updated_at = new Date()
        let empresa = await Empresa.findOneAndUpdate({ email }, req.body)
        empresa = await Empresa.findOne({ email })
        console.log(empresa)
        return res.status(200).json({
            success: true,
            uid: empresa.id,
            name: empresa.name,
            empresa
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: 'No se pudo actualizar los datos, intenta más tarde'
        });
    }
};

const eliminar = async (req, res) => {
    const { email } = req.body;

    try {
        let empresa = await Empresa.findOneAndUpdate({ email: email, deleted_at: null }, { updated_at: new Date(), deleted_at: new Date() })
        res.status(200).json({
            success: true,
            email: empresa.email,
            deleted_at: empresa.deleted_at
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
    eliminar
}

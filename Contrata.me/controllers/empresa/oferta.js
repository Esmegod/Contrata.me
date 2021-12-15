const Empresa = require('../../models/empresa/Empresa');
const Oferta = require('../../models/empresa/Oferta');

const consultar = async (req, res) => {
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
        if (!req.params.id) {
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

        let ofertas = await Oferta.find({ empresa: empresa._id }).exec()
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

const consultarAll = async (req, res) => {
    if (!req.estudiante) {
        return res.status(500).json({
            success: false,
            msg: 'Ocurrió un error al consultar las ofertas'
        })
    }

    try {

        let ofertas = await Oferta.find().exec()

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

const consultarById = async (req, res) => {
    if (!req.empresa && !req.estudiante) {
        return res.status(500).json({
            success: false,
            msg: 'Ocurrió un error al consultar la ofertas'
        })
    }

    let id = req.params.id;

    try {

        let oferta = await Oferta.findOne({ _id: id })
        let empresa = await Empresa.findOne({ empresa: oferta.empresa })
        return res.status(200).json({
            success: true,
            empresa,
            oferta
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Ocurrió un error al consultar la ofertas'
        })
    }

}

const crear = async (req, res) => {
    if (!req.empresa) {
        res.status(500).json({
            success: false,
            msg: 'Ocurrió un error al crear la oferta'
        })
    }
    const { email } = req.empresa;

    try {

        let empresa = await Empresa.findOne({ email })
        req.body.empresa = empresa._id
        req.body.created_at = new Date()
        req.body.updated_at = new Date()

        let oferta = new Oferta(req.body)
        await oferta.save()
        res.status(200).json({
            success: true,
            oferta
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Ocurrió un error al eliminar la cuenta'
        })
    }
}

const actualizar = async (req, res) => {
    if (!req.empresa) {
        res.status(500).json({
            success: false,
            msg: 'Ocurrió un error al actualizar la oferta'
        })
    }

    try {

        req.body.updated_at = new Date()
        let ofertaId = req.body.ofertaId
        req.body.ofertaId = null;
        let oferta = await Oferta.findOneAndUpdate({ _id: ofertaId }, req.body)
        oferta = await Oferta.findOne({ _id: ofertaId })
        res.status(200).json({
            success: true,
            oferta
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Ocurrió un error al eliminar la cuenta'
        })
    }
}

const eliminar = async (req, res) => {
    if (!req.empresa) {
        res.status(500).json({
            success: false,
            msg: 'Ocurrió un error al eliminar la oferta'
        })
    }

    try {


        let ofertaId = req.body.ofertaId
        if (!ofertaId) {
            return res.status(500).json({
                success: false,
                msg: "No se encontró la oferta"
            })
        }
        req.body.updated_at = new Date()
        req.body.deleted_at = new Date()
        req.body.ofertaId = null;
        let oferta = await Oferta.findOneAndUpdate({ _id: ofertaId, deleted_at: null }, req.body)
        oferta = await Oferta.findOne({ _id: ofertaId, deleted_at: null })
        if (!oferta) {
            res.status(200).json({
                success: false,
                msg: "No existe la oferta"
            })
        }
        res.status(200).json({
            success: true,
            oferta
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Ocurrió un error al eliminar la cuenta'
        })
    }
}

module.exports = {
    crear,
    actualizar,
    eliminar,
    consultar,
    consultarById,
    consultarAll
}
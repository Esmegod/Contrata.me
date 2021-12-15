const CV = require('../../models/estudiante/Curriculum');
const Estudiante = require('../../models/estudiante/Estudiante');

const consultar = async (req, res) => {

    if (req.params.id) {
        let id = req.params.id
        let estudiante = await Estudiante.findOne({ _id: id })
        console.log("estudiante", estudiante)
        let cv = await CV.findOne({ estudiante: estudiante._id })
        return res.status(200).json({
            success: true,
            type: "Empresa",
            cv
        })
    }
    if (!req.estudiante) {
        res.status(500).json({
            success: false,
            msg: 'Por favor comuniquese con el administrador'
        });
    }
    const { email } = req.estudiante
    if (!email) {
        res.status(500).json({
            success: false,
            msg: 'Por favor comuniquese con el administrador'
        });
    }
    let cv = await CV.findOne({ email })
    return res.status(200).json({
        success: true,
        cv,
        type: "Estudiante"
    });

}

const registrar = async (req, res) => {
    console.log(req.body)
    const { formacionAcademica, telefono, tecnologias, idiomas, descripcion, direccion } = req.body;
    const { nombre, apellido_paterno, apellido_materno, email, _id } = req.estudiante
    try {
        let cv = await CV.findOne({ email });
        let toSaveCv = {
            estudiante: _id,
            nombre: nombre,
            apellido_paterno: apellido_paterno,
            apellido_materno: apellido_materno,
            descripcion: descripcion,
            direccion: direccion,
            email: email,
            telefono: telefono,
            tecnologias: tecnologias,
            idiomas: idiomas,
            formacionAcademica: formacionAcademica,
            updated_at: new Date()

        }

        if (cv) {
            cv = await CV.findOneAndUpdate({ email: email }, toSaveCv);
            return res.status(200).json({
                success: true,
                action: "Updated",
                cv
            });
        }

        toSaveCv.created_at = new Date()


        //console.log(req.body);
        cv = new CV(toSaveCv)

        await cv.save();


        res.status(200).json({
            success: true,
            action: "Created",
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

const eliminar = async (req, res) => {
    const { email } = req.estudiante
    try {
        let cv = await CV.findOneAndUpdate({ email, deleted_at: null },
            {
                updated_at: new Date(),
                deleted_at: new Date()
            });

        res.status(200).json({
            success: true,
            action: "Deleted",
            cv
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Por favor comuniquese con el administrador'
        });
    }
}

module.exports = {
    registrar,
    eliminar,
    consultar
}

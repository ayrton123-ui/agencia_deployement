const Sequelize=require("sequelize")
const db=require("../config/dataBase")

const Viaje=db.define('viajes',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    titulo:{
        type:Sequelize.STRING
    },
    precio:{
        type:Sequelize.STRING
    },
    fecha_ida:{
        type:Sequelize.DATE
    },
    fecha_vuelta:{
        type:Sequelize.DATE
    },
    imagen:{
        type:Sequelize.STRING
    },
    descripcion:{
        type:Sequelize.STRING
    },
    disponibles:{
        type:Sequelize.STRING
    }
})
module.exports=Viaje
/*Como lucen los datos que estamos guardando */
import {DataTypes} from 'sequelize'
import {sequelize} from '../db.js'

export const Task = sequelize.define('tasks',{
    _id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    title:{
        type:DataTypes.STRING,
        
    },
    description:{
        type:DataTypes.STRING,
    },
    
},{
    timestamps: true
},

)
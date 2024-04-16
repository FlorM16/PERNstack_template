/*Como lucen los datos que estamos guardando */
import {DataTypes} from 'sequelize'
import {sequelize} from '../db.js'
import {Task} from '../models/task.model.js'

export const User = sequelize.define('users',{
    _id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    username:{
        type:DataTypes.STRING,
        allowNull: false,
        
    },
    email:{
        type:DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
        
    },
    
},{
    timestamps: true
}
);

User.hasMany(Task, {
    foreignKey: 'userId',
    sourceKey: '_id',
  });

  Task.belongsTo(User, { 
    foreignKey: 'userId', 
    targetId: '_id',
});
'use strict';
module.exports = (sequelize, DataTypes) => {
    let user = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        userID: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validator:{
                len:[2,8]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validator:{
                len:[6,10]
            }
        }
    });
    return user;
};
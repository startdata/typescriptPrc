'use strict';
module.exports = (sequelize, DataTypes) => {
    let user = sequelize.define("user", {
        name: {
            type: DataTypes.STRING(50),
            allowNull:true
        },
        userID: {
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: true
        }
    });
    return user;
};
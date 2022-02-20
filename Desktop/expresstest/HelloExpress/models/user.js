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
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return user;
};
'use strict';
// 없어도 무방

const { QueryInterface } = require("sequelize/types");
const { Sequelize } = require("../models");

module.exports = {
    up: (QueryInterface.creatTable('users',{
        name:{
            type: Sequelize.STRING,
            allowNull:true
        },
        userID:{
            type: Sequelize.STRING,
            allowNull:true
        },
        password:{
            ttpe: Sequelize.STRING,
            allowNull:true
        }
    }))
}


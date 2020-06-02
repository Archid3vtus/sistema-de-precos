'use strict';
module.exports = (sequelize, DataTypes) => {
  const precos = sequelize.define('precos', {
    type: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    lat: DataTypes.DOUBLE,
    lon: DataTypes.DOUBLE
  }, {});
  precos.associate = function(models) {
    // associations can be defined here
  };
  return precos;
};
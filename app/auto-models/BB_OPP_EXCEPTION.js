/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_OPP_EXCEPTION', {
    exception_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    exception_host: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lastmod_user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastmod_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'BB_OPP_EXCEPTION'
  });
};

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_DATA_CENTER', {
    data_center_code: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    data_center_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_active: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    health_code: {
      type: 'CHAR(1)',
      allowNull: false,
      defaultValue: 'G'
    },
    health_details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    health_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_user: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'setup'
    },
    lastmod_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastmod_user: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'setup'
    }
  }, {
    tableName: 'BB_DATA_CENTER'
  });
};

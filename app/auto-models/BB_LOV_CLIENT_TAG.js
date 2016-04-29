/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_LOV_CLIENT_TAG', {
    lov_list: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lov_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lov_comment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    display_order: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
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
    tableName: 'BB_LOV_CLIENT_TAG'
  });
};

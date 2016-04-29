/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_PROJECT_ORIGIN_TAG', {
    origin_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    origin_tag: {
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: 'BB_PROJECT_ORIGIN_TAG'
  });
};

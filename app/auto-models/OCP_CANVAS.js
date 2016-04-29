/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OCP_CANVAS', {
    canvas_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    canvas_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    canvas_order: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    created_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastmod_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'OCP_CANVAS'
  });
};

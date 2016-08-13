/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OCP_DEFAULT_CANVAS', {
    canvas_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    canvas_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    canvas_order: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    parent_canvas_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    icon_class: {
      type: DataTypes.STRING,
      allowNull: true
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
    tableName: 'OCP_DEFAULT_CANVAS'
  });
};

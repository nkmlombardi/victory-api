/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OCP_WIDGET_INSTANCE_PARAM', {
    widget_instance_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    widget_param_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    widget_param_value: {
      type: DataTypes.TEXT,
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
    tableName: 'OCP_WIDGET_INSTANCE_PARAM'
  });
};

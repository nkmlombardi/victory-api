/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OCP_DEFAULT_WIDGET_INSTANCE', {
    widget_instance_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    canvas_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    widget_config_file: {
      type: DataTypes.STRING,
      allowNull: false
    },
    widget_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    full_screen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    widget_height: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    widget_width: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    widget_x_location: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    widget_y_location: {
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
    tableName: 'OCP_DEFAULT_WIDGET_INSTANCE'
  });
};

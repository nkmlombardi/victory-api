/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_OLPD_PARAM', {
    bb_olpd_param_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pa_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pa_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pa_default_val: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pa_required: {
      type: DataTypes.ENUM('no','yes'),
      allowNull: true
    },
    pa_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pa_multiple_instance: {
      type: DataTypes.ENUM('no','yes'),
      allowNull: true
    },
    pa_order: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    pa_param_for: {
      type: DataTypes.ENUM('cl','pr'),
      allowNull: true,
      defaultValue: 'cl'
    }
  }, {
    tableName: 'BB_OLPD_PARAM'
  });
};

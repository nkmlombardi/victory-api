/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_ONELINK_PHYSICAL', {
    dev_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    unix_hostname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    colo_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    os: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    servicetag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hdd: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ram: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    cpu: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Unknown'
    },
    warrantyexpire: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'BB_ONELINK_PHYSICAL'
  });
};

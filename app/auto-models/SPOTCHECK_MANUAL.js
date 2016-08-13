/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SPOTCHECK_MANUAL', {
    manual_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    manual_target: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    manual_status: {
      type: DataTypes.ENUM('QUEUED','WAITING','RUNNING','DONE'),
      allowNull: true
    },
    manual_time_start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    manual_time_end: {
      type: DataTypes.DATE,
      allowNull: true
    },
    manual_project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'SPOTCHECK_MANUAL'
  });
};

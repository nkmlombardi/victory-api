/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SPOTCHECK_SMTCONTROL', {
    smt_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    smt_folder: {
      type: DataTypes.STRING,
      allowNull: true
    },
    smt_requested_by: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    smt_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'SPOTCHECK_SMTCONTROL'
  });
};

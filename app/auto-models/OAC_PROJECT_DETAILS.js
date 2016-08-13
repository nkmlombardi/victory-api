/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OAC_PROJECT_DETAILS', {
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    project_notes: {
      type: 'BLOB',
      allowNull: false
    }
  }, {
    tableName: 'OAC_PROJECT_DETAILS'
  });
};

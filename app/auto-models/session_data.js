/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('session_data', {
    session_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      primaryKey: true
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    session_data: {
      type: 'BLOB',
      allowNull: false
    },
    session_expire: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'session_data'
  });
};

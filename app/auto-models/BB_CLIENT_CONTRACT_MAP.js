/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_CLIENT_CONTRACT_MAP', {
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    contract_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    contract_filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contract_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'setup'
    },
    created_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'BB_CLIENT_CONTRACT_MAP'
  });
};

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_CLIENT_CONTRACT', {
    contract_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    contract_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    agreement: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contract_currency_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contract_notes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contract_client_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quote_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_dead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    created_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_user: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'setup'
    },
    lastmod_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastmod_user: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'setup'
    }
  }, {
    tableName: 'BB_CLIENT_CONTRACT'
  });
};

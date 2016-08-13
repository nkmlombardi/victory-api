/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OLPD_TICKET', {
    olpd_ticket_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ti_file: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ti_status: {
      type: DataTypes.ENUM('oldsubmbit','new','newsubmit','complete','to_delete','cancel','to_delete_c'),
      allowNull: true
    },
    ti_docid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ti_subid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ti_lang: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ti_created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ti_updated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ti_comment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'BB_PROJECT',
        key: 'project_id'
      }
    }
  }, {
    tableName: 'OLPD_TICKET'
  });
};

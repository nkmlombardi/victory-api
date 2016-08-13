/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('BB_USER', {
        ldap_username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uber_user: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_superuser: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        is_allowed_lcp: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        is_allowed_contract: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pd_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
        lcp_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
        oac_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
        oac_secret_agent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
        oac_qa: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tpt_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tpt_phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tpt_phone_ext: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gmail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        skype: {
            type: DataTypes.STRING,
            allowNull: true
        },
        avatar_filename: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'default.jpg'
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
        tableName: 'BB_USER'
    });
};

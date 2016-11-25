/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('members_with_details', {
    member_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    info_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    body_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    session_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_committee: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'members_with_details',
    timestamps: false
  });
};

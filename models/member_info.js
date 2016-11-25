/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member_info', {
    info_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    body_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'bodies',
        key: 'body_id'
      }
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
    tableName: 'member_info',
    timestamps: false
  });
};

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('members', {
    member_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    info_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'member_info',
        key: 'info_id'
      }
    },
    body_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'bodies',
        key: 'body_id'
      }
    },
    session_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'sessions',
        key: 'session_id'
      }
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'members',
    timestamps: false
  });
};

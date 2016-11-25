/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('motions', {
    motion_id: {
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
    session_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'sessions',
        key: 'session_id'
      }
    },
    moving_member_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'members',
        key: 'member_id'
      }
    },
    seconding_member_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'members',
        key: 'member_id'
      }
    },
    motion_num: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    meeting_num: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    votes_favor: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    votes_against: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    votes_abstentions: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'motions',
    timestamps: false
  });
};

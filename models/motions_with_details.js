/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('motions_with_details', {
    motion_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    body_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    session_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    body_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    legislation_prefix: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year_num: {
      type: DataTypes.INTEGER(11),
      allowNull: false
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
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    moving_member_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    moving_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    moving_position: {
      type: DataTypes.STRING,
      allowNull: true
    },
    seconding_member_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    seconding_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seconding_position: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'motions_with_details',
    timestamps: false
  });
};

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sessions', {
    session_id: {
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
    year_num: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    start_year: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    end_year: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'sessions',
    timestamps: false
  });
};

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bodies', {
    body_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    legislation_prefix: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'bodies',
    timestamps: false
  });
};

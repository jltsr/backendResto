const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('type_m', {
    type_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'type_m',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "type_m_pkey",
        unique: true,
        fields: [
          { name: "type_id" },
        ]
      },
    ]
  });
};

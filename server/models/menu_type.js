const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu_type', {
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'menu',
        key: 'menu_id'
      }
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'type_m',
        key: 'type_id'
      }
    }
  }, {
    sequelize,
    tableName: 'menu_type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "menu_type_pkey",
        unique: true,
        fields: [
          { name: "menu_id" },
          { name: "type_id" },
        ]
      },
    ]
  });
};

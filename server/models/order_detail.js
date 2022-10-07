const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_detail', {
    order_detail_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'orders',
        key: 'order_id'
      }
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'menu',
        key: 'menu_id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'order_detail',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "order_detail_pkey",
        unique: true,
        fields: [
          { name: "order_detail_id" },
        ]
      },
    ]
  });
};

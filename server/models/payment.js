const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment', {
    payment_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'orders',
        key: 'order_id'
      }
    },
    sub_total: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    payment_date_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    discon: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pajak: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_payment_: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'payment',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "payment_pkey",
        unique: true,
        fields: [
          { name: "payment_id" },
        ]
      },
    ]
  });
};

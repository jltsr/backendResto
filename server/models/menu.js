const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu', {
    menu_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama_menu: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    harga: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gambar: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'menu',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "menu_pkey",
        unique: true,
        fields: [
          { name: "menu_id" },
        ]
      },
    ]
  });
};

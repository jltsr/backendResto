import Sequelize  from "sequelize";
import config from '../config/config'

const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    dialect : 'postgres',
    pool : {
      max : 5,
      min : 0,
      acquire : 30000,
      idle : 10000
    }
  }
)

var DataTypes = require("sequelize").DataTypes;
var _carts = require("./carts");
var _menu = require("./menu");
var _menu_type = require("./menu_type");
var _order_detail = require("./order_detail");
var _orders = require("./orders");
var _payment = require("./payment");
var _roles = require("./roles");
var _type_m = require("./type_m");
var _user_role = require("./user_role");
var _users = require("./users");

function initModels(sequelize) {
  var carts = _carts(sequelize, DataTypes);
  var menu = _menu(sequelize, DataTypes);
  var menu_type = _menu_type(sequelize, DataTypes);
  var order_detail = _order_detail(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var payment = _payment(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var type_m = _type_m(sequelize, DataTypes);
  var user_role = _user_role(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  menu.belongsToMany(type_m, { as: 'type_id_type_ms', through: menu_type, foreignKey: "menu_id", otherKey: "type_id" });
  roles.belongsToMany(users, { as: 'user_id_users', through: user_role, foreignKey: "role_id", otherKey: "user_id" });
  type_m.belongsToMany(menu, { as: 'menu_id_menus', through: menu_type, foreignKey: "type_id", otherKey: "menu_id" });
  users.belongsToMany(roles, { as: 'role_id_roles', through: user_role, foreignKey: "user_id", otherKey: "role_id" });
  carts.belongsTo(menu, { as: "menu", foreignKey: "menu_id"});
  menu.hasMany(carts, { as: "carts", foreignKey: "menu_id"});
  menu_type.belongsTo(menu, { as: "menu", foreignKey: "menu_id"});
  menu.hasMany(menu_type, { as: "menu_types", foreignKey: "menu_id"});
  order_detail.belongsTo(menu, { as: "menu", foreignKey: "menu_id"});
  menu.hasMany(order_detail, { as: "order_details", foreignKey: "menu_id"});
  order_detail.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order_detail, { as: "order_details", foreignKey: "order_id"});
  payment.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(payment, { as: "payments", foreignKey: "order_id"});
  user_role.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(user_role, { as: "user_roles", foreignKey: "role_id"});
  menu_type.belongsTo(type_m, { as: "type", foreignKey: "type_id"});
  type_m.hasMany(menu_type, { as: "menu_types", foreignKey: "type_id"});
  carts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(carts, { as: "carts", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  user_role.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_role, { as: "user_roles", foreignKey: "user_id"});

  return {
    carts,
    menu,
    menu_type,
    order_detail,
    orders,
    payment,
    roles,
    type_m,
    user_role,
    users,
  };
}
const models = initModels(sequelize);
export default models
export {sequelize}
/*
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
*/
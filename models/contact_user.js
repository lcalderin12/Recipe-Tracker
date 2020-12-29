module.exports = function(sequelize, DataTypes) {
  var EmailObject = sequelize.define("EmailObject", {
    name: DataTypes.STRING,
    contactInfo: DataTypes.STRING,
    category: DataTypes.STRING,
    content: DataTypes.TEXT,
  });
  return EmailObject;
};
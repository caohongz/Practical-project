module.exports = (app) => {
  const Sequelize = app.Sequelize;
  const Teacher = app.model.define("teacher", {
    id: {
      type: Sequelize.INTEGER,
      autoIncreament: true,
      allowNull: false,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    schoolname: Sequelize.STRING,
  });
  Teacher.associate = function () {
    app.model.Teacher.belongsTo(app.model.School, { foreignKey: "schoolid" });
  };

  return Teacher;
};

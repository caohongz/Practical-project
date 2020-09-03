module.exports = (app) => {
  const Sequelize = app.Sequelize;
  const School = app.model.define("school", {
    id: {
      type: Sequelize.INTEGER,
      autoIncreament: true,
      allowNull: false,
      primaryKey: true,
    },
    schoolname: Sequelize.STRING,
    schooltype: Sequelize.STRING,
    schoolsubtype: Sequelize.STRING,
    schoolcode: Sequelize.INTEGER,
  });
  School.associate = function () {
    app.model.School.hasMany(app.model.Student, { foreignKey: "schoolid" });
    app.model.School.hasMany(app.model.Teacher, { foreignKey: "schoolid" });
    app.model.School.hasMany(app.model.Examcentre, { foreignKey: "schoolid" });
  };

  return School;
};

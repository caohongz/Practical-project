module.exports = (app) => {
  const Sequelize = app.Sequelize;
  const Student = app.model.define("student", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    idcardnum: Sequelize.STRING,
    phone: Sequelize.STRING,
    gender: Sequelize.STRING,
    schoolname: Sequelize.STRING,
    email: Sequelize.STRING,
  });
  Student.associate = function () {
    app.model.Student.belongsTo(app.model.School, { foreignKey: "schoolid" });
    app.model.Student.hasMany(app.model.Application, {
      foreignKey: "studentid",
    });
    app.model.Student.hasMany(app.model.Examcentre, {
      foreignKey: "studentid",
    });
    app.model.Student.hasMany(app.model.Application, {
      foreignKey: "studentid",
    });
  };
  return Student;

  // User.findByLogin = function* (login) {
  //   return yield this.findOne({
  //     where: {
  //       login: login,
  //     },
  //   });
  // };
  // User.prototype.logSignin = function* () {
  //   yield this.update({ last_sign_in_at: new Date() });
  // };
};

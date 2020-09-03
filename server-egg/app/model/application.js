module.exports = (app) => {
  const Sequelize = app.Sequelize;
  const Application = app.model.define("application", {
    id: {
      type: Sequelize.INTEGER,
      autoIncreament: true,
      allowNull: false,
      primaryKey: true,
    },
    status: Sequelize.INTEGER,
  });
  Application.associate = function () {
    app.model.Application.belongsTo(app.model.Student, {
      foreignKey: "studentid",
    });
    app.model.Application.belongsTo(app.model.Subject, {
      foreignKey: "subjectid",
    });
    app.model.Application.hasOne(app.model.Examcentre, {
      foreignKey: "appid",
    });
  };

  return Application;
};

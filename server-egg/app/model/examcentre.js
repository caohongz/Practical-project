module.exports = (app) => {
  const Sequelize = app.Sequelize;
  const Examcentre = app.model.define("examcentre", {
    id: {
      type: Sequelize.INTEGER,
      autoIncreament: true,
      allowNull: false,
      primaryKey: true,
    },
    ticketnum: Sequelize.INTEGER,
  });
  Examcentre.associate = function () {
    app.model.Examcentre.belongsTo(app.model.Student, {
      foreignKey: "studentid",
    });
    app.model.Examcentre.belongsTo(app.model.Application, {
      foreignKey: "appid",
    });
    app.model.Examcentre.belongsTo(app.model.School, {
      foreignKey: "schoolid",
    });
  };

  return Examcentre;
};

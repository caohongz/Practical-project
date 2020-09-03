module.exports = (app) => {
  const Sequelize = app.Sequelize;
  const Subject = app.model.define("subject", {
    id: {
      type: Sequelize.INTEGER,
      autoIncreament: true,
      allowNull: false,
      primaryKey: true,
    },
    subjectname: Sequelize.STRING,
  });
  Subject.associate = function () {
    app.model.Subject.hasMany(app.model.Application, {
      foreignKey: "subjectid",
    });
  };

  return Subject;
};

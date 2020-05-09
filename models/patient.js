module.exports = function (sequelize, DataTypes) {
  var Patient = sequelize.define("Patient", {


    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medicalHistory: {
      type: DataTypes.TEXT,
      allowNull: false,
    }

  });

  Patient.associate = function (models) {
    Patient.belongsTo(models.Doctor, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return Patient;
};
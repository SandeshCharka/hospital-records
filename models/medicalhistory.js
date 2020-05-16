module.exports = function(sequelize, DataTypes) {
  var medicalhistory = sequelize.define("medicalhistory", {

    data: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

  });

  medicalhistory.associate = function(models) {
    medicalhistory.belongsTo(models.Patient, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return medicalhistory;
};
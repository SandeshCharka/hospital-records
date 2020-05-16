module.exports = function(sequelize, DataTypes) {
  var Patient = sequelize.define("Patient", {


    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });

  Patient.associate = function(models) {
    Patient.belongsTo(models.Doctor, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  Patient.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Patient.hasMany(models.medicalhistory, {
      onDelete: "cascade"
    });
  };

  return Patient;
};
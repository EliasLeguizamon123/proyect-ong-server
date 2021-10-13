'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrganizationLink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrganizationLink.belongsTo(models.Organization,{
        foreignKey: "organizationId", 
        onDelete: "CASCADE",
				as: "createdBy"
      })
    }
  };
  OrganizationLink.init({
    socialNetwork: DataTypes.STRING,
    link: DataTypes.STRING,
    organizationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrganizationLink',
  });
  return OrganizationLink;
};
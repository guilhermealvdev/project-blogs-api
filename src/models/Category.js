module.exports = (sequelize, DataTypes) => sequelize.define(
  'Category',
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'categories', // Talvez precise mudar para category? Algum req mais a frente pode pedir! Atenção!
    timestamps: false,
    underscored: true, // Para o displayName ficar display_name
  },
);


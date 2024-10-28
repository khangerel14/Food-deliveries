import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

type CategoryAttributes = {
  id?: number;
  name: string;
  parentId?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, 'id'> {}

export class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public declare id: number;
  public declare name: string;
  public declare parentId: number;

  public declare readonly createdAt: Date;
  public declare readonly updatedAt: Date;

  public parentCategory?: Category;
  public children?: Category[];
}

export const categoryModel = (sequelize: Sequelize): typeof Category => {
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      timestamps: true,
    }
  );

  return Category;
};

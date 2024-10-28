import { Sequelize, DataTypes, Model, Optional, Association } from 'sequelize';
import { User } from './user';
import { Cart } from './cart';

type OrderAttributes = {
  id?: number;
  email: string;
  district:
    | 'Хан уул'
    | 'Чингэлтэй'
    | 'Баянзүрх'
    | 'Сонгино хайрхан'
    | 'Багануур'
    | 'Сүхбаатар';
  khoroo: string;
  phoneNumber: number;
  createdAt?: Date;
  updatedAt?: Date;
};

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

export class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public declare id: number;
  public declare email: string;
  public declare district:
    | 'Хан уул'
    | 'Чингэлтэй'
    | 'Баянзүрх'
    | 'Сонгино хайрхан'
    | 'Багануур'
    | 'Сүхбаатар';
  public declare khoroo: string;
  public declare phoneNumber: number;

  public declare readonly createdAt: Date;
  public declare readonly updatedAt: Date;

  public static associations: {
    cart: Association<Order, Cart>;
    user: Association<Order, User>;
  };

  public static associate(models: { Cart: typeof Cart; User: typeof User }) {
    Order.belongsTo(models.User, { foreignKey: 'auth0Id', as: 'user' });
    Order.hasMany(models.Cart, { foreignKey: 'auth0Id', as: 'carts' });
  }
}

// Define the Order model
export const orderModel = (sequelize: Sequelize): typeof Order => {
  try {
    Order.init(
      {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        district: {
          type: DataTypes.ENUM(
            'Хан уул',
            'Чингэлтэй',
            'Баянзүрх',
            'Сонгино хайрхан',
            'Багануур',
            'Сүхбаатар'
          ),
          allowNull: false,
        },
        khoroo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
        timestamps: true,
      }
    );

    return Order;
  } catch (error) {
    console.error('Error defining the Order model:', error);
    throw error;
  }
};

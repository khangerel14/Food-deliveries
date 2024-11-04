import { Request, Response } from 'express';
import db from '../model/index.js';

const { Order, Cart } = db;

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, khoroo, district, phoneNumber } = req.body;

    if (!email || !khoroo || !district || !phoneNumber) {
      return res.status(400).send({ message: 'Мэдээлэл дутуу байна.' });
    }

    const order = { email, khoroo, district, phoneNumber };

    const data = await Order.create(order);

    return res.status(201).send(data);
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).send({
      message: (error as Error).message || 'Захиалга үүсгэхэд алдаа гарсан.',
    });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const num = await Order.destroy({ where: { id } });
    if (num === 1) {
      res.status(200).send({
        message: 'Захиалга амжилттай устгагдлаа!',
      });
    } else {
      res.status(404).send({
        message: `Захиалга олдсонгүй id=${id}!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Захиалга устгахад алдаа гарлаа id=' + id,
    });
  }
};

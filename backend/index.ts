import express, { Express } from 'express';
import { connection } from './src/postgresql.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoute from './src/router/user.route.js';
import foodRoute from './src/router/food.route.js';
import orderRoute from './src/router/order.route.js';
import cartRoute from './src/router/cart.route.js';
import categoryRoute from './src/router/category.route.js';
import qpayRoutes from './src/router/qpay.route.js';
import { createAdmin } from './src/controller/userController.js';
import userRoutes from './src/router/userRoutes.js';

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

createAdmin();

const PORT = 8000;

connection();

app.use('/api/qpay', qpayRoutes);
userRoute(app);
foodRoute(app);
orderRoute(app);
cartRoute(app);
categoryRoute(app);
userRoutes(app);

app.listen(PORT, 'localhost', () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;

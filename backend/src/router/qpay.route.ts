import express, { Response, Request } from 'express';
import { createQpayInvoice } from '../../utils/qpay/invoice.js';
import { checkInvoiceQpay } from '../../utils/qpay/invoice.js';
import { INVOICE_STATUS } from '../../utils/consts.js';

const router = express.Router();

router.post('/create-invoice', async (req, res) => {
  try {
    const { amount, user_id, code, invoice_id } = req.body;

    if (!amount || !user_id || !code || !invoice_id) {
      return res.status(400).json({
        status: 'error',
        message:
          'Missing required fields: amount, user_id, code, or invoice_id',
      });
    }

    const result = await createQpayInvoice({
      amount,
      user_id,
      code,
      invoice_id,
    });
    console.log(result);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    console.error('Error creating invoice:', error);

    res.status(500).json({
      status: 'error',
      message: 'Failed to create invoice. Please try again.',
    });
  }
});

router.post('/checkout-invoice', async (req: Request, res: Response) => {
  const { invoice_id, status }: { invoice_id: string; status: INVOICE_STATUS } =
    req.body;

  try {
    const invoiceStatus = await checkInvoiceQpay(invoice_id, status);
    res.status(200).json({ invoiceStatus });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;

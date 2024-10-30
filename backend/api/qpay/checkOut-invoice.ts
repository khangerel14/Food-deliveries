import type { NextApiRequest, NextApiResponse } from 'next';
import { checkInvoiceQpay } from '../../utils/qpay/invoice';
import { INVOICE_STATUS } from '../../utils/consts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const {
        invoice_id,
        status,
      }: { invoice_id: string; status: INVOICE_STATUS } = req.body;

      const updatedStatus = await checkInvoiceQpay(invoice_id, status);

      return res.status(200).json({ status: updatedStatus });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error checking invoice', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

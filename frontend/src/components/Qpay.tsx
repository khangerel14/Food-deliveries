import { useEffect, useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type InvoiceData = {
  invoice_id: string;
  qr_text: string;
  qr_image: string;
};

type Invoice = {
  data: InvoiceData;
};

export const InvoiceDisplay = () => {
  const [inv, setInv] = useState<Invoice | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedInv = localStorage.getItem('invoice');
    if (storedInv) {
      setInv(JSON.parse(storedInv));
    }
  }, []);

  if (!inv) {
    return <p>No invoice data available</p>;
  }

  const checkOut = async () => {
    const checkoutData = {
      invoice_id: 'invoice_12345',
      status: 'pending',
    };

    const loadingToastId = toast.loading('It is pending...');

    try {
      const response = await axios.post(
        'http://localhost:8000/api/qpay/checkout-invoice',
        checkoutData
      );

      setTimeout(() => {
        toast.dismiss(loadingToastId);
        toast.error('Unpaid');
      }, 2000);

      return response.data;
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error('An error occurred during checkout');
      console.log('Checkout Error:', error);
    }
  };
  const qrImg = inv.data?.qr_image;

  const back = () => {
    router.push('order', { scroll: false });
  };
  return (
    <div className='py-20 mx-auto flex flex-col items-center w-[1230px] max-xl:px-12 h-[600px] justify-center'>
      <div className='flex justify-between items-center w-[1230px] py-20'>
        <button className='flex items-center gap-2' onClick={back}>
          <KeyboardBackspaceIcon />
          Back
        </button>
        <Toaster position='top-right' />
        <button
          className='p-2 px-3 rounded-full bg-[#F91944] text-white'
          onClick={checkOut}
        >
          checkout Qpay
        </button>
      </div>
      <div>
        <h1>Qpay</h1>
      </div>
      <p>Scan below QR code from your bank application</p>
      {qrImg && <img src={`data:image/png;base64,${qrImg}`} alt='QR Code' />}
    </div>
  );
};

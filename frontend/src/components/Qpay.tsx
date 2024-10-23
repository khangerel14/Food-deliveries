import { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
<<<<<<< HEAD
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
=======
import toast, { Toaster } from "react-hot-toast";
>>>>>>> 78db383 (Qpay)
import { useRouter } from "next/navigation";

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
    const storedInv = localStorage.getItem("invoice");
    if (storedInv) {
      setInv(JSON.parse(storedInv));
    }
  }, []);

  if (!inv) {
    return <p>No invoice data available</p>;
  }

<<<<<<< HEAD
=======
  const checkOut = () => {
    toast.error("Not paid!");
  };

>>>>>>> 78db383 (Qpay)
  const qrImg = inv.data?.qr_image;

  const back = () => {
    router.push("order", { scroll: false });
  };
  return (
<<<<<<< HEAD
    <div className="py-20 mx-auto flex flex-col items-center w-[1230px] max-xl:px-12 h-96 justify-center">
      <div className="flex justify-start w-[1230px]">
        <button className="flex items-center gap-2" onClick={back}>
          <KeyboardBackspaceIcon />
          back
        </button>
      </div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Qpay</DialogTitle>
            <DialogDescription>
              Scan below QR code from your bank application
            </DialogDescription>
            {qrImg && (
              <img src={`data:image/png;base64,${qrImg}`} alt="QR Code" />
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
=======
    <div className="py-20 mx-auto flex flex-col items-center w-[1230px] max-xl:px-12 h-[600px] justify-center">
      <div className="flex justify-between items-center w-[1230px] py-20">
        <button className="flex items-center gap-2" onClick={back}>
          <KeyboardBackspaceIcon />
          Back
        </button>
        <Toaster position="top-right" />
        <button
          className="p-2 px-3 rounded-full bg-[#d52e1f] text-white"
          onClick={checkOut}
        >
          checkout
        </button>
      </div>
      <div>
        <h1>Qpay</h1>
      </div>
      <p>Scan below QR code from your bank application</p>
      {qrImg && <img src={`data:image/png;base64,${qrImg}`} alt="QR Code" />}
>>>>>>> 78db383 (Qpay)
    </div>
  );
};

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import { fCurrency } from 'src/utils/format-number';
import { useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: 'solid #000',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

export type ProductItemProps = {
  id: string; 
  imgUrl: string;
  name: string;
  description: string;
  price: number;
  assessment: number; 
  categoryId: number;
};

export function ProductItem({ product }: { product: ProductItemProps }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [img, setImg] = useState(product.imgUrl);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [assessment, setAssessment] = useState(product.assessment);

  const updateFood = async (id: string): Promise<void> => {
    try {
      const updatedProduct = {
        img,
        name,
        description,
        assessment,
        price,
      };

      const response = await axios.put(`http://localhost:8000/api/foods/put/${id}`, updatedProduct);
      setOpen(false)
      return response.data;
    } catch (error) {
      console.log("updating error", error);
      return error
    }
  };

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.imgUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = <Typography variant="subtitle1">{fCurrency(product.price)}</Typography>;

  return (
    <>
      <Card>
        <Box sx={{ pt: '100%', position: 'relative' }}>{renderImg}</Box>
        <Stack spacing={2} sx={{ p: 3 }}>
          <Stack display='flex'>
            {product.name}
            <Typography>{product.assessment}</Typography>
          </Stack>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            {renderPrice}
            <Button onClick={handleOpen}>Update</Button>
          </Box>
        </Stack>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography>Picture:</Typography>
            <OutlinedInput type='text' value={img} onChange={(e) => setImg(e.target.value)} placeholder='Product Picture' fullWidth/>
          </Box>
          <Box>
            <Typography>Name:</Typography>
            <OutlinedInput
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              fullWidth
              />
          </Box>
          <Box>
            <Typography>Description:</Typography>
            <OutlinedInput
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product Description"
              fullWidth
              sx={{ mt: 2 }}
              />
          </Box>
          <Box>
            <Typography>Price:</Typography>
            <OutlinedInput
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Product Price"
              fullWidth
              sx={{ mt: 2 }}
              />
          </Box>
          <Box>
            <Typography>Assessment:</Typography>
            <OutlinedInput
              type="number"
              value={assessment}
              onChange={(e) => setAssessment(Number(e.target.value))}
              placeholder="Product Assessment"
              fullWidth
              sx={{ mt: 2 }}
              />
          </Box>
          <Button variant="outlined" sx={{ width: 160, mt: 1, alignItems: 'flex-end' }} onClick={() => updateFood(product.id)}>Submit</Button>        
        </Box>
      </Modal>
    </>
  );
}

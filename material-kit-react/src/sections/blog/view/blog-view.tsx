import { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import axios from 'axios';
import { DashboardContent } from 'src/layouts/dashboard';

type OrderItem = {
  id: number;
  auth0Id: string;
  foodId: number;
  name: string;
  quantity: number;
  createdAt: string;
};

export function BlogView() {
  const [order, setOrder] = useState<OrderItem[]>([]);

  const fetchOrder = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:8000/api/cart/adminCart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    } else {
      console.log('Invalid token or token is empty');
    }
  }, []);

  const deleteFromCart = useCallback(async (user: string, id: number) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/cart/${user}/${id}`);
      if (response.status === 200) {
        setOrder((prevOrder) =>
          prevOrder.filter((item) => item.auth0Id !== user || item.foodId !== id)
        );
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Order
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="cart table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Auth0 ID</TableCell>
              <TableCell align="center">Food ID</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Created date</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.auth0Id}</TableCell>
                <TableCell align="center">{row.foodId}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => deleteFromCart(row.auth0Id, row.foodId)}>
                    Delete Item
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardContent>
  );
}

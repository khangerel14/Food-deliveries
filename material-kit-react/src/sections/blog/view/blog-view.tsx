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

import axios from 'axios';

import { _posts } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { PostSort } from '../post-sort';
import { PostSearch } from '../post-search';

// ----------------------------------------------------------------------

export function BlogView() {
  const [sortBy, setSortBy] = useState('latest');
  const [order, setOrder] = useState([]);
  const deleteFromCart = async (user: string, id: number) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/cart/${user}/${id}`);
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchOrder = async () => {
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
        console.log("Invalid token or token is empty")
      }
    };
    fetchOrder();
  }, []);

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

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
            {order.map((row: any) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.auth0Id}</TableCell>
                <TableCell align="center">{row.foodId}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
                <TableCell align="right" onClick={() => deleteFromCart(row.auth0Id, row.foodId)}>
                  DeleteBtn
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardContent>
  );
}

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { ProductItem } from '../product-item';
import { ProductSort } from '../product-sort';
import { CartIcon } from '../product-cart-widget';
import { ProductFilters } from '../product-filters';

import type { FiltersProps } from '../product-filters';

type Food = {
  id: number;
  imgUrl: string;
  name: string;
  description: string;
  price: number;
  assessment: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
};

const defaultFilters: FiltersProps = {
  price: '',
  assessment: 'up4Star',
  imgUrl: 'Breakfast',
};

const filterOptions = {
  imgUrl: [
    { value: '', label: 'Breakfast' },
    { value: '', label: 'Soup' },
    { value: '', label: 'Main Course' },
    { value: '', label: 'Dessert' },
  ],
  assessment: [
    { value: 'up4Star', label: '4 Stars & Up' },
    { value: 'up3Star', label: '3 Stars & Up' },
    { value: 'up2Star', label: '2 Stars & Up' },
    { value: 'up1Star', label: '1 Star & Up' },
  ],
  price: [
    { value: 'below', label: 'Below $50' },
    { value: 'between', label: 'Between $50 - $100' },
    { value: 'above', label: 'Above $100' },
  ],
};

export function ProductsView() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [filters, setFilters] = useState<FiltersProps>(defaultFilters);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:8000/api/foods/adminFoods', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setFoods(res.data.foods);
        })
        .catch((error) => {
          console.error('Error fetching foods:', error);
        });
    } else {
      console.log("Invalid token or token is empty")
    }
  }, []);

  const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
    setFilters((prevValue) => ({ ...prevValue, ...updateState }));
  }, []);

  const canReset = Object.keys(filters).some(
    (key) => filters[key as keyof FiltersProps] !== defaultFilters[key as keyof FiltersProps]
  );

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Foods
      </Typography>
      <Grid container spacing={3}>
        {foods.map((food) => (
          <Grid key={food.id} xs={12} sm={6} md={3}>
            <ProductItem product={{ ...food, id: food.id.toString() }} />
          </Grid>
        ))}
      </Grid>
    </DashboardContent>
  );
}

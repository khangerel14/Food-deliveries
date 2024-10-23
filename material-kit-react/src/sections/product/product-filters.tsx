import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export type FiltersProps = {
  price: string; // Current filter value for price (single value)
  assessment: string; // Current filter value for rating
  imgUrl: string; // Selected category
};

type ProductFiltersProps = {
  canReset: boolean; // Flag to indicate if filters can be reset
  openFilter: boolean; // State of the filter drawer
  filters: FiltersProps; // Current filter values
  onOpenFilter: () => void; // Function to open filter drawer
  onCloseFilter: () => void; // Function to close filter drawer
  onResetFilter: () => void; // Function to reset filters
  onSetFilters: (updateState: Partial<FiltersProps>) => void; // Function to update filters
  options: {
    assessment: { value: string; label: string }[]; // Array of available ratings
    imgUrl: { value: string; label: string }[]; // Available categories with labels
    price: { value: string; label: string }[]; // Available price ranges
  };
};

// Main ProductFilters component
export function ProductFilters({
  filters,
  canReset,
  openFilter,
  onSetFilters,
  onOpenFilter,
  onCloseFilter,
  onResetFilter,
  options,
}: ProductFiltersProps) {
  // Render the category filter (formerly 'imgUrl')
  const renderCategory = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Category</Typography>
      <RadioGroup>
        {options.imgUrl.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                checked={filters.imgUrl === option.value}
                onChange={() => onSetFilters({ imgUrl: option.value })}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
    </Stack>
  );

  // Render the price filter
  const renderPrice = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Price</Typography>
      <RadioGroup>
        {options.price.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                checked={filters.price === option.value}
                onChange={() => onSetFilters({ price: option.value })}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
    </Stack>
  );

  // Render the rating filter
  const renderRating = (
    <Stack spacing={1}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Rating
      </Typography>
      {options.assessment.map((option, index) => (
        <Box
          key={option.value}
          onClick={() => onSetFilters({ assessment: option.value })}
          sx={{
            mb: 1,
            gap: 1,
            ml: -1,
            p: 0.5,
            display: 'flex',
            borderRadius: 1,
            cursor: 'pointer',
            typography: 'body2',
            alignItems: 'center',
            '&:hover': { opacity: 0.48 },
            ...(filters.assessment === option.value && {
              bgcolor: 'action.selected',
            }),
          }}
        >
          <Rating readOnly value={4 - index} /> & Up
        </Box>
      ))}
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="ic:round-filter-list" />
          </Badge>
        }
        onClick={onOpenFilter}
      >
        Filters
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, overflow: 'hidden' },
        }}
      >
        <Box display="flex" alignItems="center" sx={{ pl: 2.5, pr: 1.5, py: 2 }}>
          <Typography variant="h6" flexGrow={1}>
            Filters
          </Typography>

          <IconButton onClick={onResetFilter}>
            <Badge color="error" variant="dot" invisible={!canReset}>
              <Iconify icon="solar:refresh-linear" />
            </Badge>
          </IconButton>

          <IconButton onClick={onCloseFilter}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            {renderCategory}
            {renderPrice}
            {renderRating}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
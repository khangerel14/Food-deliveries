'use client'
import Navbar from '@/components/Navbar'
import { Stack, Box, Divider } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel'
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 2,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const names = [
  'BREAKFAST',
  'FOOD',
  'MAIN COURSE',
  'DESSERT',
];


const page = () => {
  const [open, setOpen] = useState(false);
  const [ isAcitve, setIsActive ] = useState(false)
  const [ datas, setDatas ] = useState("");
  const [age, setAge] = useState('');
  const [ input, setInput ] = useState({
    name: ''
  });
  const [ foodInput, setFoodInput ] = useState({
    name: '', 
    image: '',
    ingredients: '',
    price: '',
    discount: '',
    categoryName: ''
  })
  console.log(foodInput);
  
  
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const handleOpen = () => {
    setOpen(!open)
  }
  const handleNew = () => {
    setIsActive(!isAcitve)
  }
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChanged = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(

      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const addCategory = async () => {
    const res = await axios.post('http://localhost:8000/categories', { ...input })
    console.log(res);
  }
  const foodNew = async () => {
    try {
      const res = await axios.post('http://localhost:8000/foods/newfood', { ...foodInput })
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Stack>
      <Navbar />
      <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 1280, marginX: 'auto', lineHeight: 1 }}>
        <Stack sx={{ display: 'flex', flexDirection: 'column', marginY: 5, gap: 3 }}>
          <Button sx={{ justifyContent: 'space-between', border: 1, width: 280, padding: 1, color: 'black', backgroundColor: '#18BA51' }}>Breakfast  <MoreVertIcon /></Button>
          <Button sx={{ justifyContent: 'space-between', border: 1, width: 280, padding: 1, color: 'black', backgroundColor: '#18BA51' }}>Food  <MoreVertIcon /></Button>
          <Button sx={{ justifyContent: 'space-between', border: 1, width: 280, padding: 1, color: 'black', backgroundColor: '#18BA51' }}>Main Course  <MoreVertIcon /></Button>
          <Button sx={{ justifyContent: 'space-between', border: 1, width: 280, padding: 1, color: 'black', backgroundColor: '#18BA51' }}>Dessert  <MoreVertIcon /></Button>
          <Button sx={{ justifyContent: 'start', gap: 1, border: 1, width: 280, padding: 1, color: 'gray', backgroundColor: '#18BA51', alignItems: 'center' }} onClick={handleNew}><AddOutlinedIcon /> Create new category</Button>
          <div>
            <Modal
              open={isAcitve}
              onClose={() => {setIsActive(!isAcitve)}}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'center', fontWeight: 40, fontSize: 26, mb: 2 }}>
                  Create new category
                </Typography>
                <Divider />
                <Typography id="modal-modal-description" sx={{ my: 2 }}>Category new</Typography>
                <TextField id="outlined-basic" label="Хоолны нэр" variant="outlined" sx={{ width: 365, mb: 2 }} onChange={(e) => setInput((prev) => ({ ...prev, name: e.target.value }))}/>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2, mt: 2 }}>
                  <Button sx={{ color: '#696969' }}>Clear</Button>
                  <Button sx={{ color: '#696969' }} onClick={addCategory}>Continue</Button>
                </Box>
              </Box>
            </Modal>
          </div>
        </Stack>
        <Button onClick={handleOpen} sx={{ height: 25, marginY: 5, backgroundColor: '#18BA51', color: 'gray' }}>Add new food</Button>
      </Stack>
      <div>
        <Modal
          open={open}
          onClose={() => {setOpen(!open)}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'center', fontWeight: 40, fontSize: 26 }}>
              Create food
            </Typography>
            <Divider />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>Хоолны нэр</Typography>
            <TextField id="outlined-basic" label="Хоолны нэр" variant="outlined" sx={{ width: 365, mt: 1 }} onChange={(e) => setFoodInput((prev) => ({ ...prev, name: e.target.value }))}/>
            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 1 }}>Хоолны ангилал</Typography>
            <FormControl sx={{ width: 365 }}>
              <InputLabel id="demo-multiple-name-label">Name</InputLabel>
              <Select 
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={personName}
                onChange={handleChanged}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>Хоолны орц</Typography>
            <TextField id="outlined-basic" label="Хоолны орц" variant="outlined" sx={{ width: 365, mt: 1 }} onChange={(e) => setFoodInput((prev) => ({ ...prev, ingredients: e.target.value }))}/>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>Хоолны үнэ</Typography>
            <TextField id="outlined-basic" label="Хоолны үнэ" variant="outlined" sx={{ width: 365, mt: 1 }} onChange={(e) => setFoodInput((prev) => ({ ...prev, price: e.target.value }))}/>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}><Switch {...label} /> Хямдралтай эсэх</Typography>
            <TextField id="outlined-basic" label="" variant="outlined" sx={{ width: 365, mt: 1 }} onChange={(e) => setFoodInput((prev) => ({ ...prev, discount: e.target.value }))}/>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>Хоолны зураг</Typography>
            <input type="image" src="" alt="" onChange={(e) => setFoodInput((prev) => ({ ...prev, image: e.target.value}))}/>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2, mt: 1 }}>
              <Button sx={{ color: '#696969' }}>Clear</Button>
              <Button sx={{ color: '#696969' }} onClick={foodNew}>Continue</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </Stack>
  )
}

export default page
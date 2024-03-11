import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Stack } from '@mui/material'

const Food = () => {
  const [ datas, setDatas ] = useState("")
  const foodNew = async () => {
    try {
      const res = await axios.get("http://localhost:8000/foods/getfood")
      setDatas(res.data)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    foodNew()
  }, [])
  return (
    <Stack>
      {Array.isArray(datas) && datas.map((el, index) => (
        <Box key={index}>
          <Box>Name: {el.name}</Box>
          <Box>Type: {el.ingeredient}</Box>
        </Box>
      ))}
    </Stack>
  )
}

export default Food

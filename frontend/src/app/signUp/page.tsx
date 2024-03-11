"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Stack, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};


const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [ input, setInput ] = React.useState({
      username: '',
      useremail: '',
      password: '',
      address: '',
    }
  )
  const handleOpen = () => {setOpen(true)}
  const handleClose = () => {setOpen(false)}

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const signUp = async (e: any) => {
    try {
      e.preventDefault()
      const res = await axios.post("http://localhost:8000/users/signUp", { ...input })
      console.log(res);
      if (res.data.success === true) {
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000);
      } else if (res.data.success === false) {
        alert("Already existing Username")
        return
      }
    } catch (error) {
      setError("Invalid request");
      console.log(error, "error");
    }
  }
  return (
    <Stack sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <Navbar onClick={handleOpen}/>
      <Stack sx={{ alignItems: "center", marginY: 10, gap: 1 }}>
        <Typography fontSize={30} fontWeight={50}>Бүртгүүлэх</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", width: 384 }}>
          <label htmlFor="">Нэр</label>
          <TextField id="outlined-basic" label="Нэрээ оруулна уу" variant="outlined" onChange={(e) => setInput((prev) => ({ ...prev, username: e.target.value }))}/>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: 384 }}>
          <label htmlFor="">Имэйл</label>
          <TextField id="outlined-basic" label="И-мэйл хаягаа оруулна уу" variant="outlined" onChange={(e) => setInput((prev) => ({ ...prev, useremail: e.target.value }))}/>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: 384 }}>
          <label htmlFor="">Хаяг</label>
          <TextField id="outlined-basic" label="Та хаягаа оруулна уу" variant="outlined" onChange={(e) => setInput((prev) => ({ ...prev, address: e.target.value}))}/>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: 384 }}>
          <label htmlFor="">Нууц үг</label>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
            Нууц үгээ оруулна уу
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Нууц үг" onChange={(e) => setInput((prev) => ({ ...prev, password: e.target.value }))}
            />
          </FormControl>
        </Box>
        <FormControlLabel required control={<Checkbox />} sx={{ marginTop: 4 }} label="Үйлчилгээний нөхцөл зөвшөөрөх" />
        <Button size="medium" sx={{ color: "black", width: 384, padding: 2, borderColor: "#18BA51", border: "1px solid green" }} onClick={signUp}>Бүртгүүлэх</Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack sx={{ display: "flex", justifyContent: "center", width: "screen", alignItems: "center", gap: 3 }}>
            <Box sx={{ fontSize: 25, fontWeight: "semibold" }}>Нэвтрэх</Box>
            <Box sx={{ display: "flex", gap: 1, flexDirection: "column", width: 384 }}>
              <label htmlFor="">Нэр</label>
              <TextField id="outlined-basic" label="И-мэйл хаягаа оруулна уу" variant="outlined" />
            </Box>
            <Box sx={{ display: "flex", gap: 1, flexDirection: "column", width: 384 }}>
              <label htmlFor="">Нууц үг</label>
              <FormControl variant="outlined" sx={{ width: 384 }}>
                <InputLabel htmlFor="outlined-adornment-password">Нууц үгээ оруулна уу</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>}
                label="Нууц үг"/>
                <Button size="small" sx={{ display: "flex", color: "black", justifyContent: "end", width: 145, bgcolor: "#EEEFF2" }}>Нууц үг сэргээх</Button>
              </FormControl>
            </Box>
            <Button size="medium" sx={{ color: "black", width: 384, padding: 2, backgroundColor: "#EEEFF2" }}>Нэвтрэх</Button>
            <Box>Эсвэл</Box>
            <Button size="medium" sx={{ color: "black", width: 384, padding: 2, borderColor: "#18BA51", border: "1px solid green" }}>Бүртгүүлэх</Button>
          </Stack>
        </Box>
      </Modal>
      <Footer />
    </Stack>
  );
};

export default SignUp;
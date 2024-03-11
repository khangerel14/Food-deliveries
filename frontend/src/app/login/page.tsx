"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import axios from "axios";
import LoginModal from "@/components/LoginModal";
import { useRouter } from "next/navigation";
import SelectInput from "@mui/material/Select/SelectInput";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const Page = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState({
    useremail: "",
    password: "",
  });

  const signUp = () => {
    router.push("signUp");
  };
  const forgotPass = () => {
    router.push("/forgotPass");
  };
  const logIn = async (e: any) => {
    try {
      const res = await axios.post("http://localhost:8000/users/logIn", {
        ...input,
      });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Navbar onClick={handleOpen} />
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "screen",
          alignItems: "center",
          gap: 4,
          marginY: 10,
        }}
      >
        <Box sx={{ fontSize: 25, fontWeight: "semibold" }}>Нэвтрэх</Box>
        <Box
          sx={{ display: "flex", gap: 1, flexDirection: "column", width: 384 }}
        >
          <label htmlFor="">Нэр</label>
          <TextField
            id="outlined-basic"
            label="И-мэйл хаягаа оруулна уу"
            variant="outlined"
            onChange={(e) =>
              setInput((prev) => ({ ...prev, useremail: e.target.value }))
            }
          />
        </Box>
        <Box
          sx={{ display: "flex", gap: 1, flexDirection: "column", width: 384 }}
        >
          <label htmlFor="">Нууц үг</label>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Нууц үгээ оруулна уу
            </InputLabel>
            <OutlinedInput
              onChange={(e) =>
                setInput((prev) => ({ ...prev, password: e.target.value }))
              }
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
            />
            <Button
              size="small"
              sx={{ color: "black", justifyContent: "end", width: 145 }}
              onClick={forgotPass}
            >
              Нууц үг сэргээх
            </Button>
          </FormControl>
        </Box>
        <Button
          size="medium"
          sx={{
            color: "black",
            width: 384,
            padding: 2,
            backgroundColor: "#EEEFF2",
          }}
          onClick={logIn}
        >
          Нэвтрэх
        </Button>
        <Box>Эсвэл</Box>
        <Button
          size="medium"
          sx={{
            color: "black",
            width: 384,
            padding: 2,
            borderColor: "#18BA51",
            border: "1px solid green",
          }}
          onClick={signUp}
        >
          Бүртгүүлэх
        </Button>
      </Stack>
      {open && <LoginModal />}
      <Footer />
    </Stack>
  );
};

export default Page;

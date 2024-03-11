import { Stack } from "@mui/material";
import React from "react";
import Modal from "@mui/material/Modal";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const LoginModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Stack position={"absolute"} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', inset: 50 }}>
      rebiuh
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "screen",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Box sx={{ fontSize: 25, fontWeight: "semibold" }}>Нэвтрэх</Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: "column",
                width: 384,
              }}
            >
              <label htmlFor="">Нэр</label>
              <TextField
                id="outlined-basic"
                label="И-мэйл хаягаа оруулна уу"
                variant="outlined"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: "column",
                width: 384,
              }}
            >
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
                  label="Нууц үг"
                />
                <Button
                  size="small"
                  sx={{ color: "black", justifyContent: "end", width: 145 }}
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
            >
              Бүртгүүлэх
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
};

export default LoginModal;

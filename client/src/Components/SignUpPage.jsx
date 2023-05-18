import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Axiosinstance from '../Config/Axiosinstance';
import Swal from 'sweetalert2';




  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        dark: "#000807",
        light: "#ffffff",
        main: "#ffffff",
        contrastText: "#fff",
      },
      secondary: {
        light: "#8F0992",
        main: "#f44336",
        dark: "#2C2C32",
        contrastText: "#000",
      },
    },
  });

function SignUpPage() {
    const navigate=useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      let obj = {
        username: data.get("username"),
        password: data.get("password"),
      };
      if(obj.username&&obj.password){
        Axiosinstance.post('/userSignUp',obj).then((response)=>{
          if (response.data.status==="success") {
            Swal.fire({
              position: 'top-centre',
              icon: 'success',
              title: response.data.message,
              showConfirmButton: false,
              timer: 2000
            }).then(()=>{
              navigate('/login')
            })
          } else {
            toast.error(response.data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          }
        })
      }else{
        toast.error(`OOPS! All fields are required`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
      }
    }

  return (
    <div>
        <ThemeProvider theme={darkTheme}>
          <ToastContainer />
        <CssBaseline />
        <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
            sx={{
                marginTop: 8,
                scrollPaddingBlock: 4,
                display: "flex",
                border: 1,
                borderRadius: 2,
                flexDirection: "column",
                alignItems: "center",
                paddingBottom: 4,
                paddingLeft: 4,
                paddingRight: 4,
            }}
            >
            <Avatar sx={{ m: 4, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
            </Avatar>

           
            <Typography component="h1" variant="h5">
                Signup
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
            >
            <TextField
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                />
                <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                className={'mt-3 mb-2 bg-white text-black hover:bg-black hover:text-white '}
                >
                Sign Up
                </Button>
                <Grid container>
                <Grid item xs>
                    
                </Grid>
                <Grid item>
                    <Link onClick={()=>{navigate('/login')}} variant="body2">
                    {"Already you have a account?"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>

        </Container>
    </ThemeProvider>
    </div>
  )
}

export default SignUpPage
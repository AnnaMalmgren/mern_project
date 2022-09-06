import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Box, Toolbar, Button, Typography } from '@mui/material'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="button"
            color="inherit"
            gutterBottom
            onClick={() => navigate('/home')}
          >
            MERN PROJECT
          </Typography>
          <Button onClick={() => navigate('/signup')} color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar

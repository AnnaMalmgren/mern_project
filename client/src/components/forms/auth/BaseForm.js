import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  FormGroup,
  TextField,
  FormHelperText,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PropTypes from 'prop-types'

const BaseForm = ({ isLogin, url }) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const user = await axios.post(url, {
      email: data.email,
      password: data.password,
    })
    console.log(user)
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      align="center"
      sx={{ marginTop: '1em' }}
    >
      <Paper variant="elevation" elevation={6} sx={{ padding: '0.5em' }}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? 'Login' : 'Sign up'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container mb={5} justifyContent="center" alignItems="center">
            <FormGroup>
              <TextField
                label="Email Address"
                variant="standard"
                margin="normal"
                type="text"
                {...register('email', {
                  required: 'You must specify an email address',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email',
                  },
                })}
                error={!!errors?.email}
              />

              {errors.email && (
                <FormHelperText>{errors.email.message}</FormHelperText>
              )}
              <TextField
                name="password"
                label="Password"
                variant="standard"
                type="password"
                margin="normal"
                {...register('password', {
                  required: 'You must specify a password',
                  minLength: {
                    value: 6,
                    message: 'Password must contain minimum 6 characters',
                  },
                })}
                error={!!errors?.password}
              />
              {errors.password && (
                <FormHelperText>{errors.password.message}</FormHelperText>
              )}
              {!isLogin && (
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  variant="standard"
                  margin="normal"
                  {...register('confirmPassword', {
                    validate: (value) => {
                      if (watch('password') !== value) {
                        return 'Your passwords do no match'
                      }
                    },
                  })}
                  error={!!errors?.confirmPassword}
                />
              )}
              {errors.confirmPassword && (
                <FormHelperText>
                  {errors.confirmPassword.message}
                </FormHelperText>
              )}
            </FormGroup>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
          <Grid
            container
            justify="flex-end"
            sx={{ marginTop: '0.5em', marginBottom: '0.5em' }}
          >
            <Grid item>
              <Button onClick={() => navigate(isLogin ? '/signup' : '/login')}>
                {isLogin
                  ? `Don't have an account? Sign up`
                  : `Already have an account? Sign in`}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default BaseForm

BaseForm.propTypes = {
  url: PropTypes.string,
  isLogin: PropTypes.bool,
}

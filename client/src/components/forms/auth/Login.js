import React from 'react'
import BaseForm from './BaseForm'

const Login = () => {
  return <BaseForm isLogin={true} url={'api/auth/login'} />
}

export default Login

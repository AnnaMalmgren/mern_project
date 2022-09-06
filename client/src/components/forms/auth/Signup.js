import React from 'react'
import BaseForm from './BaseForm'

const Signup = () => {
  return <BaseForm isLogin={false} url={'api/auth/signup'} />
}

export default Signup

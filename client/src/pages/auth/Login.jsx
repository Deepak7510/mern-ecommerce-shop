import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ToastAction } from '@/components/ui/toast'
import { loginSchema } from '@/config/validationSechma.js'
import { useToast } from '@/hooks/use-toast'
import { userLogin } from '@/store/auth-slice'
import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'


const Login = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [error, setError] = useState({})
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function onsubmit(e) {
    e.preventDefault()
    const checkValidation = loginSchema.safeParse(formData);
    if (!checkValidation.success) {
      const error = checkValidation.error.formErrors.fieldErrors;
      setError(error)
      return;
    }

    dispatch(userLogin(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data.payload.message
        });
        setFormData({
          email: '',
          password: ''
        })
      } else {
        toast({
          variant: "destructive",
          title: data.payload.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    }
    )
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight'>Sign in your Account</h1>
        <p className='mt-2'>don't have an account
          <Link className='font-medium ml-2 text-blue-800 hover:underline' to={'/register'}>Register</Link>
        </p>
      </div>
      <form onSubmit={onsubmit}>
        <div className='space-y-2'>
          <div className='space-y-1'>
            <Label htmlFor={"email"} className='text-md'>Email</Label>
            <Input onChange={(e) => handleChange(e)} id="email" name="email" type="email" placeholder="Enter the email" />
            {error.email && <p className='text-red-700'>{error.email[0]}</p>}
          </div>
          <div className='space-y-1'>
            <Label htmlFor={"email"} className='text-md'>Password</Label>
            <Input onChange={(e) => handleChange(e)} id="password" name="password" type="password" placeholder="Enter the password" />
            {error?.password && <p className='text-red-700'>{error.password[0]}</p>}
          </div>
          <Button className='w-full'>Submit</Button>
        </div>
      </form>
    </div>
  )
}
export default Login
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToastAction } from '@/components/ui/toast'
import { registerSchema } from '@/config/validationSechma'
import { useToast } from '@/hooks/use-toast'
import { userRegister } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onsubmit(e) {
    e.preventDefault()
    const checkValidation = registerSchema.safeParse(formData);
    if (!checkValidation.success) {
      const error = checkValidation.error.formErrors.fieldErrors
      setErrors(error);
      return;
    }

     dispatch(userRegister(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data.payload.message
        });
        navigate('/login');
        setFormData({
          name:'',
          email: '',
          password: ''
        })
      } else {
        toast({
          variant: "destructive",
          title: data?.payload?.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    }
    )
  }
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight'>Create new Account</h1>
        <p className='mt-2'>Already have an account
          <Link className='font-medium ml-2 text-blue-800 hover:underline' to={'/login'}>Login</Link>
        </p>
      </div>

      <form onSubmit={onsubmit}>
        <div className='space-y-2'>
          <div className='space-y-1'>
            <Label htmlFor={"userName"} className='text-md'>Name</Label>
            <Input onChange={(e) => handleChange(e)} id="userName" name="userName" type="text" placeholder="Enter the name" />
            {errors.userName && <p className='text-red-700'>{errors.userName[0]}</p>}
          </div>
          <div className='space-y-1'>
            <Label htmlFor={"email"} className='text-md'>Email</Label>
            <Input onChange={(e) => handleChange(e)} id="email" name="email" type="email" placeholder="Enter the email" />
            {errors.email && <p className='text-red-700'>{errors.email[0]}</p>}
          </div>
          <div className='space-y-1'>
            <Label htmlFor={"email"} className='text-md'>Password</Label>
            <Input onChange={(e) => handleChange(e)} id="password" name="password" type="password" placeholder="Enter the password" />
            {errors?.password && <p className='text-red-700'>{errors.password[0]}</p>}
          </div>
          <Button className='w-full'>Submit</Button>
        </div>
      </form>
    </div>
  )
}

export default Register
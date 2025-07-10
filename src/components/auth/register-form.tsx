"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { signUp } from "@/lib/auth-client"
import { toast } from "sonner"

const registerSchema= z.object({
  name : z.string().min(3,'Name must be 3 characters long'),
  email: z.string().email('Please enter a valid email address'),
  password : z.string().min(6,'Password must be 6 character long'),
  confirmPassword : z.string().min(6,'Password must be 6 character long')
}).refine(data=>data.password == data.confirmPassword, {
  message: 'Passowrd do not match',
  path: ['confirmPassword']
})

interface RegisterFormProps{
  onSuccess? : ()=> void
}

type RegisterFormValues = z.infer<typeof registerSchema>

const RegisterForm = ({onSuccess}:RegisterFormProps) => {

   const [isLoading,setIsLoading]=useState(false);

   //initialise form
  const form = useForm<RegisterFormValues>({
    resolver:zodResolver(registerSchema),
    defaultValues : {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
   })

   const onRegisterSubmit = async(values : RegisterFormValues)=>{
    setIsLoading(true)
    try {
      const {error} = await signUp.email({
        name : values.name,
        email:values.email,

        password:values.password
      })

      if (error){
        toast.error('failed  to create account. pls try again')
        return;
      }
       toast.success('your account has been created successfully. pls sign in')
      
       if (onSuccess){
        onSuccess();
       }
    } catch (error) {
      console.log(error);
      
    }finally{
      setIsLoading(false)
    }
   
   }
  return (
   <Form {...form}>
    <form onSubmit={form.handleSubmit(onRegisterSubmit)} className="space-y-4">
      <FormField
      control={form.control}
      name="name"
      render={({field})=>(
        <FormItem>
          <FormLabel>
            Name
          </FormLabel>
          <FormControl>
            <Input  placeholder="Enter your name" {...field}/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
      />
      <FormField
      control={form.control}
      name="email"
      render={({field})=>(
        <FormItem>
          <FormLabel>
            Email
          </FormLabel>
          <FormControl>
            <Input  placeholder="Enter your Email" {...field}/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
      />
      <FormField
      control={form.control}
      name="password"
      render={({field})=>(
        <FormItem>
          <FormLabel>
            Passoword
          </FormLabel>
          <FormControl>
            <Input type="password" placeholder="Enter your Password" {...field}/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
      />
      <FormField
      control={form.control}
      name="confirmPassword"
      render={({field})=>(
        <FormItem>
          <FormLabel>
            Confirm Password
          </FormLabel>
          <FormControl>
            <Input type="password" placeholder="Enter your Password again" {...field}/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
      />
      <Button type="submit" className="w-full" disabled={isLoading}>
      {
        isLoading ? 'Creating Account..' : 'Create Account'
      }
      </Button>
    </form>
   </Form>
  )
}

export default RegisterForm
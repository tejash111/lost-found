"use client"

import { act, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"

const AuthLayout = () => {

    const [activeTab,setActiveTab]=useState('login')

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
        <div className="w-full max-w-md p-5 bg-card rounded-lg shadow-sm border">
            <h1 className="text-2xl text-center mb-6 text-gray-600">Welcome</h1>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-4 w-full">
                    <TabsTrigger value="login">
                        Login
                    </TabsTrigger>
                    <TabsTrigger value="register" >
                        Register
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                <LoginForm/>
                </TabsContent>
                <TabsContent value="register">
                <RegisterForm onSuccess={()=>setActiveTab('login')}/>
                </TabsContent>
            </Tabs>
        </div>
    </div>
  )
}

export default AuthLayout
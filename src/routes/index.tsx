import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { SignIn } from '../screens/SignIn' 

import { useAuth } from '../hooks/auth'
import { AuthRoutes } from './auth.routes'

export function Routes() {
   const { user } = useAuth()

   return (
      <NavigationContainer>
         { user.id ? <AuthRoutes /> : <SignIn /> }
      </NavigationContainer>
   )
}
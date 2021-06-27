import React from 'react'
import { RectButton } from 'react-native-gesture-handler'
import { View, Text, Alert } from 'react-native'
import { useAuth } from '../../hooks/auth'
import { Avatar } from '../Avatar'

import { styles } from './styles'

export function Profile() {
   const { user, signOut } = useAuth()

   function handleSignOut() {
      Alert.alert('Logout', 'Deseja sair da aplicação?',
      [{
         text: 'Não',
         style: 'cancel'
      },
      { 
         text: 'Sim',
         onPress: () => signOut()
      }])
   }

   return (
      <View style={styles.container}>
         <RectButton onPress={handleSignOut}>
            <Avatar urlImage={user.avatar}/>
         </RectButton>
         <View>
            <View style={styles.user}>
               <Text style={styles.greetings}>Olá, </Text>
               <Text style={styles.username}>{ user.firstname }</Text>
            </View>
            <Text style={styles.message}>Hoje é dia de vitória!</Text>
         </View>

      </View>
   )
}
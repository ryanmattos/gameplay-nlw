import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Profile } from '../../components/Profile'
import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CategorySelect'
import { ListHeader } from '../../components/ListHeader'
import { Appointment } from '../../components/Appointment'
import { ListDivider } from '../../components/ListDivider'
import { Background } from '../../components/Background'

import { styles } from './styles'

export function Home() {
   const [category, setCategory] = useState('')
   const navigation = useNavigation()


   const appointments = [
      { 
         id: '1', 
         guild: {
            id: '1',
            name: 'Cavaleiros de Helena',
            icon: null,
            owner: true
         },
         category: '1',
         date: '30/06 às 20:40h',
         description: 'Brota lá bro'
      },
      { 
         id: '2', 
         guild: {
            id: '1',
            name: 'Cavaleiros de Helena',
            icon: null,
            owner: true
         },
         category: '1',
         date: '30/06 às 20:40h',
         description: 'Brota lá bro'
      }
   ]

   function handleCategorySelect(categoryId: string) {
      categoryId === category ? setCategory('') : setCategory(categoryId)
   }

   function handleAppointmentDetails() {
      navigation.navigate('AppointmentDetails')
   }

   function handleAppointmenteCreate() {
      navigation.navigate('AppointmentCreate')
   }

   return (
      <Background>
         <View style={styles.header}>
            <Profile />
            <ButtonAdd onPress={handleAppointmenteCreate}/>
         </View>
   
         <CategorySelect 
            categorySelected={category}
            setCategory={handleCategorySelect}
         />

         <ListHeader title="Partidas agendadas" subtitle="total 2"/>
         
         <FlatList 
               data={appointments}
               keyExtractor={item => item.id}
               renderItem={({ item }) => (
                  <Appointment 
                     data={item}
                     onPress={handleAppointmentDetails}
                  />
               )}
               contentContainerStyle={{paddingBottom: 69}}
               ItemSeparatorComponent={() => <ListDivider />}
               style={styles.matches}
               showsVerticalScrollIndicator={false}
            />
      </Background>
   )
}
import React, { useState, useCallback } from 'react'
import { View, Text, FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Profile } from '../../components/Profile'
import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CategorySelect'
import { ListHeader } from '../../components/ListHeader'
import { Appointment, AppointmentProps } from '../../components/Appointment'
import { ListDivider } from '../../components/ListDivider'
import { Background } from '../../components/Background'
import { Load } from '../../components/Load'

import { COLLECTION_APPOINTMENTS } from '../../config/storage'

import { styles } from './styles'

export function Home() {
   const [category, setCategory] = useState('')
   const [loading, setLoading] = useState(true) 
   const [appointments, setAppointments] = useState<AppointmentProps[]>([])
   const navigation = useNavigation()

   function handleCategorySelect(categoryId: string) {
      categoryId === category ? setCategory('') : setCategory(categoryId)
   }

   function handleAppointmentDetails(guildSelected: AppointmentProps) {
      navigation.navigate('AppointmentDetails', { guildSelected })
   }

   function handleAppointmenteCreate() {
      navigation.navigate('AppointmentCreate')
   }

   async function fetchAppointments() {
      const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)

      const storage: AppointmentProps[] = response ? JSON.parse(response) : []

      if(category) {
         setAppointments(storage.filter(item => item.category === category))
      } else {
         setAppointments(storage)
      }

      setLoading(false)
   }

   useFocusEffect(useCallback(() => {
      fetchAppointments()
   }, [category]))

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

         {
            loading ? <Load /> :
            <>
               <ListHeader title="Partidas agendadas" subtitle={`total ${appointments.length}`}/>
            
               <FlatList 
                     data={appointments}
                     keyExtractor={item => item.id}
                     renderItem={({ item }) => (
                        <Appointment 
                           data={item}
                           onPress={() => handleAppointmentDetails(item)}
                        />
                     )}
                     contentContainerStyle={{paddingBottom: 69}}
                     ItemSeparatorComponent={() => <ListDivider />}
                     style={styles.matches}
                     showsVerticalScrollIndicator={false}
               />
            </>
         }
         
      </Background>
   )
}
import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native'

import { Profile } from '../../components/Profile'
import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CategorySelect'
import { ListHeader } from '../../components/ListHeader'
import { Appointment } from '../../components/Appointment'
import { ListDivider } from '../../components/ListDivider'

import { styles } from './styles'

export function Home() {
   const [category, setCategory] = useState('')

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

   return (
      <View>
         <View style={styles.header}>
            <Profile />
            <ButtonAdd />
         </View>
   
         <CategorySelect 
            categorySelected={category}
            setCategory={handleCategorySelect}
         />

         <View style={styles.content}>
            <ListHeader title="Partidas agendadas" subtitle="total 2"/>

            <FlatList 
               data={appointments}
               keyExtractor={item => item.id}
               renderItem={({ item }) => (
                  <Appointment data={item}/>
               )}
               ItemSeparatorComponent={() => <ListDivider />}
               style={styles.matches}
               showsVerticalScrollIndicator={false}
            />
         </View>
      </View>
   )
}
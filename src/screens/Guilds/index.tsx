import React from 'react'
import { View, FlatList } from 'react-native'

import { Guild, GuildProps } from '../../components/Guild'
import { ListDivider } from '../../components/ListDivider'

import { styles } from './styles'

interface Props {
   handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({handleGuildSelect}: Props) {
   const guilds = [
      { 
         id: '1',
         name: 'Cavaleiros de Helena',
         icon: 'sei n',
         owner: true
      },
      { 
         id: '2',
         name: 'Xuxa Careca',
         icon: null,
         owner: true
      }
   ]
   
   return (
      <View style={styles.container}>
         <FlatList 
            data={guilds}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
               <Guild 
                  data={item}
                  onPress={() => handleGuildSelect(item)}
               />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.guilds}
         />
      </View>
   )
}
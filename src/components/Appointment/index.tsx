import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { RectButton, RectButtonProps} from 'react-native-gesture-handler'
import { View, Text } from 'react-native'

import { GuildIcon } from '../GuildIcon'

import { GuildProps } from '../Guild'

import PlayerSvg from '../../assets/player.svg'
import CalendarSvg from '../../assets/calendar.svg'

import { categories } from '../../utils/categories'
import { theme } from '../../global/styles/theme'
import { styles } from './styles'
export interface AppointmentProps {
   id: string;
   guild: GuildProps;
   category: string;
   date: string;
   description: string;
}

interface Props extends RectButtonProps {
   data: AppointmentProps;
}

export function Appointment({ data, ...rest }: Props) {
   const [category] = categories.filter(item => item.id === data.category)
   const { owner } = data.guild
   const { primary, on, secondary50, secondary70 } = theme.colors

   return (
      <RectButton {...rest}>
         <View style={styles.container}>
            <LinearGradient style={styles.guildIconContainer} colors={[secondary50, secondary70]}>
               <GuildIcon />
            </LinearGradient>
            <View style={styles.content}>
               <View style={styles.header}>
                  <Text style={styles.title}>
                     { data.guild.name }
                  </Text>
                  <Text style={styles.category}>
                     { category.title }
                  </Text>
               </View>

               <View style={styles.footer} >
                  <View style={styles.dateInfo}>
                     <CalendarSvg />
                     <Text style={styles.date}>
                        { data.date }
                     </Text>
                  </View>

                  <View style={styles.playersInfo}>
                     <PlayerSvg fill={ owner ? primary : on }/>

                     <Text style={[styles.player, { color: owner ? primary : on }]}>
                        { owner ? 'Chefia' : 'Plebe'}
                     </Text>
                  </View>
               </View>
            </View>
         </View>
      </RectButton>
   )
}
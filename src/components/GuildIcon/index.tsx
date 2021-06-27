import React from 'react'
import { Image, View } from 'react-native'

import DiscordSvg from '../../assets/discord.svg'

import { styles } from './styles'

const { CDN_IMAGE } = process.env

interface Props {
   guildId: string;
   iconId: string | null;
}

export function GuildIcon({ guildId, iconId}: Props) {
   const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`
   // const uri = 'http://pm1.narvii.com/6427/1aa160baa0c1d44c5b3350999ef2b66abba6be41_00.jpg'
   return (
      <View style={styles.container}>
         {
         iconId ?
         <Image source={{ uri }} style={styles.image} resizeMode="cover" />
         :
         <DiscordSvg width={40} height={40} />
         }
      </View>
      
   )
}
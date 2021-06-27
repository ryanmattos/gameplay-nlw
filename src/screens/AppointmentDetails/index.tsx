import React, { useState, useEffect } from 'react'
import { ImageBackground, Text, View, FlatList, Alert, Share, Platform } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'
import { Fontisto } from '@expo/vector-icons'
import * as Linking from 'expo-linking'

import { Background } from '../../components/Background'
import { Header } from '../../components/Header'
import { ListDivider } from '../../components/ListDivider'
import { ListHeader } from '../../components/ListHeader'
import { Member, MemberProps } from '../../components/Member'
import { ButtonIcon } from '../../components/ButtonIcon'
import { Load } from '../../components/Load'

import BannerImg from '../../assets/banner.png'

import { AppointmentProps } from '../../components/Appointment'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

import { api } from '../../services/api'

interface Params {
   guildSelected: AppointmentProps;
}

interface GuildWidget {
   id: string;
   name: string;
   instant_invite: string;
   members: MemberProps[];
   presence_count: number;
}

export function AppointmentDetails() {
   const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget)
   const [loading, setLoading] = useState(true)

   const route = useRoute()
   const { guildSelected } = route.params as Params

   async function fetchGuildWidget() {
      try {
         const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`)

         setWidget(response.data)
      } catch (err) {
         Alert.alert('Houve um problema', `Não foi possível acessar as configrações do servidor \n Por favor, verifique se o widget está habilitado`)
      } finally {
         setLoading(false)
      }
   }

   function handleShareInvatation() {
      if (!widget.instant_invite) {
         Alert.alert("Convite não encontrado", "Certifique-se de que este servidor possui um convite instantâneo configurado.")
      } else {
         const message = Platform.OS === 'ios' ?
         `Junte-se a ${guildSelected.guild.name}` :
         widget.instant_invite

         Share.share({
            message,
            url: widget.instant_invite
         })
      }
   }

   function handleOpenGuild() {
      if(!widget.instant_invite) {
         Alert.alert("Convite não encontrado", "Peça para um administrador configurar o instant invite nas configurações de widget do servidor.")
      } else {
         Linking.openURL(widget.instant_invite)
      }
   }

   useEffect(() => {
      fetchGuildWidget()
   }, [])

   return (
      <Background>
         <Header 
            title="Detalhes"
            action={
               <BorderlessButton onPress={handleShareInvatation}>
                  <Fontisto 
                     name="share"
                     size={20}
                     color={theme.colors.primary}
                  />
               </BorderlessButton>
            }
         />

         <ImageBackground 
            source={BannerImg}
            style={styles.banner}
         >
            <View style={styles.bannerContent}>
               <Text style={styles.title}>{ guildSelected.guild.name }</Text>
               <Text style={styles.subtitle}>
                  { guildSelected.description }
               </Text>
            </View>
            
         </ImageBackground>
         <ListHeader
            title="Jogadores"
            subtitle={loading ? 'Total ?' : `Total ${widget.members.length}`}
         />

         { 
            loading ? <Load /> :
         
            <FlatList 
               data={widget.members}
               keyExtractor={item => item.id}
               renderItem={({item}) => (
                  <Member data={item}/>
               )}
               ItemSeparatorComponent={() => <ListDivider isCentered />}
                  style={styles.members}
            />
         }
         
         
         <View style={styles.footer}>
            <ButtonIcon title="Entrar na Partida" onPress={handleOpenGuild}/>
         </View>
      </Background>
   )
}
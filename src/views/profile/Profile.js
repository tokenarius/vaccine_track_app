import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Input from '../../reuseables/Input'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import PrefHandler from '../../data/local/PrefHandler';
import Helper from '../../utils/Helper'
import { useFocusEffect } from '@react-navigation/native'

export default function Profile({ navigation }) {
    const [hivCheck, setHivCheck] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')

    const prefHandler = new PrefHandler()

    useEffect(() => {
        prefHandler.getSession((userInfo) => {
            setName(userInfo.userInfo?.name)
            setEmail(userInfo.userInfo?.email)
            setAge(userInfo.userInfo?.age)
            setHivCheck(userInfo.userInfo?.hivCheck)
        })
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            prefHandler.getSession((userInfo) => {
                setName(userInfo.userInfo?.name)
                setEmail(userInfo.userInfo?.email)
                setAge(userInfo.userInfo?.age)
                setHivCheck(userInfo.userInfo?.hivCheck)
            })
        })
    );


    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ marginTop: 20, marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name='left' size={25} color={'#000'} />
                </TouchableOpacity>
                <Text style={{ flex: 1, marginRight: 40, textAlign: 'center', color: '#000', fontFamily: "OpenSans-Bold", fontSize: 18, }}>פרופיל משתמש</Text>
            </View>

            <View style={{ marginTop: 34 }}>
                <View style={{ marginTop: 13 }}>
                    <Input title={'שם'} val={email} />
                </View>

                <View style={{ marginTop: 13 }}>
                    <Input title={'שם משפחה'} val={name} />
                </View>

                <View style={{ marginTop: 13 }}>
                    <Input bgStyle={{
                        width: 85,
                        alignSelf: 'flex-end'
                    }} title={'גיל'} val={age} />
                </View>
            </View>

            <View style={{ alignSelf: 'flex-end', marginRight: 20, marginTop: 34, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#000', fontFamily: "OpenSans-Medium", fontSize: 16, marginRight: 10 }}>אני חי עם HIV</Text>
                <TouchableOpacity onPress={() => setHivCheck(!hivCheck)} style={{}}>
                    <MaterialCommunityIcons name={hivCheck ? 'checkbox-marked-outline' : 'checkbox-blank-outline'} style={{}} size={32} color={'#000'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
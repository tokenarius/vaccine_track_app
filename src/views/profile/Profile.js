import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Input from '../../reuseables/Input'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Button from '../../reuseables/Button'
import PrivacyPolicy from '../privacypolicy/PrivacyPolicy'
import PrefHandler from '../../data/local/PrefHandler';
import Helper from '../../utils/Helper'

export default function Profile({ navigation }) {
    const [hivCheck, setHivCheck] = useState(false)
    const [privacyCheck, setPrivacyCheck] = useState(false)
    const [privacyScreen, setPrivacyScreen] = useState(false)

    const prefHandler = new PrefHandler()
    const helper = new Helper()

    // ----- Logout Function --------//
    const LogoutFunc = () => {
        prefHandler.deleteSession((onResult) => {
            navigation.navigate('Signup')
            helper.showToast('Sucessfully Logout!', 'red')
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>

            <View style={{ marginTop: 38, marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name='left' size={25} color={'#000'} />
                </TouchableOpacity>
                <Text style={{ flex: 1, marginRight: 40, textAlign: 'center', color: '#000', fontFamily: "OpenSans-Bold", fontSize: 18, }}>פרופיל משתמש</Text>
            </View>

            <View style={{ marginTop: 34 }}>
                <View style={{ marginTop: 13 }}>
                    <Input title={'שם'} />
                </View>

                <View style={{ marginTop: 13 }}>
                    <Input title={'שם משפחה'} />
                </View>

                <View style={{ marginTop: 13 }}>
                    <Input bgStyle={{
                        width: 85,
                        alignSelf: 'flex-end'
                    }} title={'גיל'} />
                </View>
            </View>

            <View style={{ alignSelf: 'flex-end', marginRight: 20, marginTop: 34, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#000', fontFamily: "OpenSans-Medium", fontSize: 16, marginRight: 10 }}>אני חי עם HIV</Text>
                <TouchableOpacity onPress={() => setHivCheck(!hivCheck)} style={{}}>
                    <MaterialCommunityIcons name={hivCheck ? 'checkbox-marked-outline' : 'checkbox-blank-outline'} style={{}} size={32} color={'#000'} />
                </TouchableOpacity>
            </View>

            {/* <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
                <View style={{ alignSelf: 'center', marginRight: 20, marginTop: 34, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => { setPrivacyScreen(true) }}>
                        <Text style={{ color: '#000', fontFamily: "OpenSans-Bold", fontSize: 16, marginRight: 5 }}>לתנאי השימוש</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#000', fontFamily: "OpenSans-Medium", fontSize: 16, marginRight: 10 }}>אני מסכים</Text>
                    <TouchableOpacity onPress={() => setPrivacyCheck(!privacyCheck)} style={{}}>
                        <MaterialCommunityIcons name={privacyCheck ? 'checkbox-marked-outline' : 'checkbox-blank-outline'} style={{}} size={32} color={'#000'} />
                    </TouchableOpacity>
                </View>

                <Button title={'כניסה'} onPress={() => { navigation.navigate('PrivacyPolicy') }} />
            </View> */}
            <Button title={'Just To check Screen Design'} onPress={() => { navigation.navigate('Settings') }} bgStyle={{ marginTop: 40 }} />
            <Button title={'Logout'} onPress={() => { LogoutFunc() }} bgStyle={{ marginTop: 40 }} />
        </View>
    )
}
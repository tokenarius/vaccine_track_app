import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Input from '../../reuseables/Input'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Button from '../../reuseables/Button'
import PrivacyPolicy from '../privacypolicy/PrivacyPolicy'
import PrefHandler from '../../data/local/PrefHandler'
import Helper from '../../utils/Helper'

export default function Signup({ navigation }) {
    const [hivCheck, setHivCheck] = useState(false)
    const [privacyCheck, setPrivacyCheck] = useState(false)
    const [privacyScreen, setPrivacyScreen] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')

    const prefHandle = new PrefHandler()
    const helper = new Helper()

    useEffect(() => {
        prefHandle.getSession((onResult) => { console.log(onResult) })
    }, [])


    // Register User to Local ///
    const HandleLocal = () => {
        if (email == '') {
            helper.showToast('Please Enter Email!', 'red')
            return;
        } if (name == '') {
            helper.showToast('Please Enter Name!', 'red')
            return;
        } if (age == '') {
            helper.showToast('Please Enter Age!', 'red')
            return;
        } if (hivCheck == false) {
            helper.showToast('Please Agree HIV!', 'red')
            return;
        } if (privacyCheck == false) {
            helper.showToast('Please Agree PrivacyPolicy!', 'red')
            return;
        }
        const userData = [
            'email', email,
            'name', name,
            'age', age,
        ]

        prefHandle.createSession(userData,
            (onSucess) => {
                console.log('Stored')
                navigation.navigate('Profile')
                helper.showToast('Sucessfully Registered!', 'green')
            },
            (error) => {
                console.log(error)
                helper.showToast(error, 'red')
            }
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {privacyScreen && <PrivacyPolicy onPress={() => { setPrivacyScreen(false) }} />}

            <Text style={{ textAlign: 'center', color: '#000', fontFamily: "OpenSans-Bold", fontSize: 18, marginTop: 38 }}>טופס הרשמה</Text>

            <View style={{ marginTop: 34 }}>
                <View style={{ marginTop: 13 }}>
                    <Input title={'שם'} onChange={(txt) => { setEmail(txt) }} />
                </View>

                <View style={{ marginTop: 13 }}>
                    <Input title={'שם משפחה'} onChange={(txt) => { setName(txt) }} />
                </View>

                <View style={{ marginTop: 13 }}>
                    <Input bgStyle={{
                        width: 85,
                        alignSelf: 'flex-end'
                    }} title={'גיל'} onChange={(txt) => { setAge(txt) }} />
                </View>
            </View>

            <View style={{ alignSelf: 'flex-end', marginRight: 20, marginTop: 34, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#000', fontFamily: "OpenSans-Medium", fontSize: 16, marginRight: 10 }}>אני חי עם HIV</Text>
                <TouchableOpacity onPress={() => setHivCheck(!hivCheck)} style={{}}>
                    <MaterialCommunityIcons name={hivCheck ? 'checkbox-marked-outline' : 'checkbox-blank-outline'} style={{}} size={32} color={'#000'} />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
                <View style={{ alignSelf: 'center', marginRight: 20, marginTop: 34, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => { setPrivacyScreen(true) }}>
                        <Text style={{ color: '#000', fontFamily: "OpenSans-Bold", fontSize: 16, marginRight: 5 }}>לתנאי השימוש</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#000', fontFamily: "OpenSans-Medium", fontSize: 16, marginRight: 10 }}>אני מסכים</Text>
                    <TouchableOpacity onPress={() => setPrivacyCheck(!privacyCheck)} style={{}}>
                        <MaterialCommunityIcons name={privacyCheck ? 'checkbox-marked-outline' : 'checkbox-blank-outline'} style={{}} size={32} color={'#000'} />
                    </TouchableOpacity>
                </View>

                <Button title={'כניסה'} onPress={() => { HandleLocal() }} />
            </View>
        </View>
    )
}
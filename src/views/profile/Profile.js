import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Input from '../../reuseables/Input'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import PrefHandler from '../../data/local/PrefHandler';
import Helper from '../../utils/Helper'
import { useFocusEffect } from '@react-navigation/native'
import Button from '../../reuseables/Button'

export default function Profile({ navigation }) {
    const [hivCheck, setHivCheck] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [data, setData] = useState([])
    const [privacyCheck, setPrivacyCheck] = useState(false)


    // ------- Validation States -------------//
    const [emailVal, setEmailVal] = useState(false)
    const [nameVal, setNameVal] = useState(false)
    const [ageVal, setAgeVal] = useState(false)
    const [hivVal, setHivVal] = useState(false)
    const [privacypolicyVal, setPrivacypolicyVal] = useState(false)

    const prefHandler = new PrefHandler()
    const helper = new Helper()

    useEffect(() => {
        FetchData()
    }, []);

    const FetchData = () => {
        prefHandler.getSession((userInfo) => {
            setEmail(userInfo.userInfo.email)
            setName(userInfo.userInfo.name)
            setAge(userInfo.userInfo.age)
            setHivCheck(userInfo.userInfo.hivCheck)
            setData(userInfo.userInfo.data)
        })
    }


    // Register User to Local ///
    const HandleLocal = () => {
        let valid = true;

        if (email == '') {
            setEmailVal(true)
            valid = false
        }
        if (name == '') {
            setNameVal(true)
            valid = false
        }
        if (age == '') {
            setAgeVal(true)
            valid = false
        }

        if (email == '' || name == '' || age == '') {
            return
        }
        const body = ({
            name: name,
            email: email,
            age: age,
            hivCheck: hivCheck,
            data: data,
        });

        if (valid == true) {
            prefHandler.createSession(body,
                (onSucess) => {
                    FetchData()
                    console.log(onSucess)
                    helper.showToast('הנתונים עודכנו', 'green')
                },
                (error) => {
                    console.log(error)
                    helper.showToast(error, 'red')
                }
            )
        }
    }

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
                    <Input title={'שם'} val={email} onChange={(txt) => { setEmail(txt) + setEmailVal(false) }} bgStyle={emailVal ? { borderWidth: 1, borderColor: 'red' } : null} />
                    {emailVal ? <Text style={{ color: '#FF4040', fontFamily: "OpenSans-Medium", fontSize: 12, marginRight: 20 }}>נא להזין שם</Text> : null}
                </View>

                <View style={{ marginTop: 13 }}>
                    <Input title={'שם משפחה'} val={name} onChange={(txt) => { setName(txt) + setNameVal(false) }} bgStyle={nameVal ? { borderWidth: 1, borderColor: 'red' } : null} />
                    {nameVal ? <Text style={{ color: '#FF4040', fontFamily: "OpenSans-Medium", fontSize: 12, marginRight: 20 }}>נא להזין שם משפחה</Text> : null}
                </View>

                <View style={{ marginTop: 13 }}>
                    <Input title={'גיל'} onChange={(txt) => { setAge(txt) + setAgeVal(false) }}
                        keyboardType={'number-pad'}
                        val={age}
                        bgStyle={ageVal ? {
                            borderWidth: 1, borderColor: 'red', width: 85,
                            alignSelf: 'flex-end'
                        } : {
                            width: 85,
                            alignSelf: 'flex-end'
                        }} />
                    {ageVal ? <Text style={{ color: '#FF4040', fontFamily: "OpenSans-Medium", fontSize: 12, marginRight: 20 }}>נא להזין גיל</Text> : null}
                </View>
            </View>

            <View style={{ alignSelf: 'flex-end', marginRight: 20, marginTop: 34, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#000', fontFamily: "OpenSans-Medium", fontSize: 16, marginRight: 10 }}>אני חי עם HIV</Text>
                <TouchableOpacity onPress={() => setHivCheck(!hivCheck)} style={{}}>
                    <MaterialCommunityIcons name={hivCheck ? 'checkbox-marked-outline' : 'checkbox-blank-outline'} style={{}} size={32} color={'#000'} />
                </TouchableOpacity>
            </View>


            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
                <Button title={'שמירת שינויים'} onPress={() => { HandleLocal() }} />
            </View>
        </View>
    )
}           
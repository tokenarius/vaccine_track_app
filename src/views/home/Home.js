import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import PrefHandler from '../../data/local/PrefHandler'
import { useFocusEffect } from '@react-navigation/native'
import Input from '../../reuseables/Input'
import LoadingPage from '../../reuseables/LoadingPage'

export default function Home({ navigation }) {
    const [colorsShow, setColorsShow] = useState(false)
    const [vaccineDetails, setVaccineDetails] = useState(false)
    const [note, setNote] = useState(false)
    const [noteCheck, setNoteCheck] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [selectedIndex, setSelectedIndex] = useState([-1])
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [hivCheck, setHivCheck] = useState(false)
    const [selectedOpenBox, setselectedOpenBox] = useState(-1)
    const [inputValue, setinputValue] = useState("")
    const [inputValueIndex, setinputValueIndex] = useState(-1)

    const prefHandle = new PrefHandler()

    useEffect(() => {
        setLoading(true)
        prefHandle.getSession((onSucess) => {
            setData(onSucess.userInfo.data)
            setEmail(onSucess.userInfo.email)
            setName(onSucess.userInfo.name)
            setAge(onSucess.userInfo.age)
            setHivCheck(onSucess.userInfo.hivCheck)
            setLoading(false)
        })
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            prefHandle.getSession((onSucess) => {
                setData(onSucess.userInfo.data)
                setData(onSucess.userInfo.data)
                setEmail(onSucess.userInfo.email)
                setName(onSucess.userInfo.name)
                setAge(onSucess.userInfo.age)
                setHivCheck(onSucess.userInfo.hivCheck)
            });

        }, [])
    );


    const StoreNote = (item) => {
        setData(prevState => {
            const newState = prevState.map(obj => {

                if (obj.id === item.id) {
                    return { ...obj, note: inputValue };
                }

                return obj;
            });

            const body = ({
                name: name,
                email: email,
                age: age,
                hivCheck: hivCheck,
                data: newState,
            });

            prefHandle.createSession(body,
                (onSucess) => {
                    console.log(onSucess)
                },
                (error) => {
                    console.log(error)
                }
            )
            return newState;
        });
    }


    const StoreDose = (item, valueToAssign, valueToUSe) => {
        setData(prevState => {
            const newState = prevState.map(obj => {

                if (obj.id === item.id) {
                    return { ...obj, [valueToAssign]: valueToUSe };
                }

                return obj;
            });

            const body = ({
                name: name,
                email: email,
                age: age,
                hivCheck: hivCheck,
                data: newState,
            });

            prefHandle.createSession(body,
                (onSucess) => {
                    console.log(onSucess)
                },
                (error) => {
                    console.log(error)
                }
            )
            return newState;
        });
    }

    const VaccineView = ({ item, index }) => {
        return (
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginRight: 20, }}>
                    <Text style={{ color: '#000', fontFamily: "OpenSans-Medium", marginRight: 5, fontSize: 14, backgroundColor: '#F2F3F7', flex: 1, marginHorizontal: 20, padding: 15, borderRadius: 5, textAlign: 'right' }}>{item.title}</Text>
                    <View style={{ backgroundColor: item.color, padding: 10, borderRadius: 45 }} />
                </View>


                <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginLeft: 16, marginRight: 43 }}>

                    {item.dosebox3 == true ?
                        < TouchableOpacity style={{ backgroundColor: '#F2F3F7', width: 92, padding: 15, borderRadius: 5, marginRight: 10 }} onPress={() => {
                            StoreDose(item, "dose1", !item?.dose1)
                        }}>
                            {item?.dose1 ?
                                <AntDesign name={'checkcircleo'} size={18} color={'#000'} style={{ alignSelf: 'center' }} />
                                :
                                <Text style={{ color: '#000', fontFamily: "OpenSans-Medium", marginRight: 5, fontSize: 14, textAlign: 'center' }}>?????? 3</Text>}
                        </TouchableOpacity>
                        : null
                    }

                    {item.dosebox2 == true ?
                        <TouchableOpacity style={{ backgroundColor: '#F2F3F7', width: 92, padding: 15, borderRadius: 5, marginRight: 10 }} onPress={() => { StoreDose(item, "dose2", !item?.dose2) }}>
                            {item?.dose2 ?
                                <AntDesign name={'checkcircleo'} size={18} color={'#000'} style={{ alignSelf: 'center' }} />
                                :
                                <Text style={{ color: '#000', fontFamily: "OpenSans-Medium", marginRight: 5, fontSize: 14, textAlign: 'center' }}>?????? 2</Text>}
                        </TouchableOpacity>
                        : null}

                    {item.dosebox1 == true ?
                        <TouchableOpacity style={{ backgroundColor: '#F2F3F7', width: 92, padding: 15, borderRadius: 5 }} onPress={() => { StoreDose(item, "dose3", !item?.dose3) }}>
                            {item?.dose3 ?
                                <AntDesign name={'checkcircleo'} size={18} color={'#000'} style={{ alignSelf: 'center' }} />
                                :
                                <Text style={{ color: '#000', fontFamily: "OpenSans-Medium", marginRight: 5, fontSize: 14, textAlign: 'center' }}>?????? 1</Text>}
                        </TouchableOpacity>
                        : null}
                </View>

                {
                    (item.note != "" && selectedIndex != index) &&
                    <Input bgStyle={{ marginRight: 30 }} multiline={true} edit={noteCheck} val={item.note} onChange={(txt) => { }} />
                }
                {
                    note && index == selectedIndex ?
                        <View>
                            <Input bgStyle={{ marginRight: 28 }} multiline={true} edit={noteCheck}
                                val={(inputValue != "" && inputValueIndex == index) ? inputValue : item.note}
                                onEndEditing={() => {
                                    if (inputValue == false) {
                                        setNote(false)
                                        setNoteCheck(false)
                                        setSelectedIndex(index)
                                    }
                                }}
                                onChange={(txt) => {
                                    setinputValue(txt)
                                    setinputValueIndex(index)
                                }} />
                            {noteCheck ?
                                <TouchableOpacity style={{ marginTop: 5, padding: 5 }} onPress={() => {

                                    setNoteCheck(false)
                                    if (inputValue != "") {
                                        StoreNote(item)
                                    }
                                }}>
                                    <AntDesign name={'checkcircleo'} size={25} color={'#000'} style={{ marginLeft: 20 }} />
                                </TouchableOpacity>
                                :
                                null
                            }
                        </View>
                        :
                        null
                }
                <View style={{ marginLeft: 20, marginRight: 47, marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                    <View style={{}}>
                        <TouchableOpacity activeOpacity={.3} style={{ flexDirection: 'row', alignItems: 'center', }} onPress={() => {
                            if (selectedOpenBox == index) {
                                setselectedOpenBox(-1)
                                setSelectedIndex(-1)
                                setVaccineDetails(false)
                            } else {
                                setselectedOpenBox(index)
                                setSelectedIndex(index)
                                setVaccineDetails(true)
                            }
                        }}>
                            <Text style={{ color: '#000', fontFamily: "OpenSans-Bold", marginRight: 6, fontSize: 14, }}>?????????? ????????</Text>
                            {vaccineDetails && index == selectedIndex ?
                                <Image source={require('../../assets/logos/up.png')} resizeMode="center" style={{ height: 13, width: 13 }} />
                                :
                                <Image source={require('../../assets/logos/down.png')} resizeMode="center" style={{ height: 13, width: 13 }} />
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={{}}>
                        <TouchableOpacity activeOpacity={.3} style={{ flexDirection: 'row', alignItems: 'center', }} onPress={() => setNote(true) + setSelectedIndex(index) + setNoteCheck(true)}>
                            {(item.note == "" && selectedIndex != index) &&
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: '#000', fontFamily: "OpenSans-Bold", marginRight: 6, fontSize: 14, }}>?????????? ????????</Text>
                                    <Image source={require('../../assets/logos/Plus.png')} style={{ height: 13, width: 13 }} />
                                </View>
                            }

                            {((item.note != "" && selectedIndex != index) || (note && index == selectedIndex)) &&
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: '#000', fontFamily: "OpenSans-Bold", marginRight: 6, fontSize: 14, }}>?????????? ????????</Text>
                                    <Image source={require('../../assets/logos/Edit.png')} style={{ height: 15, width: 15 }} />
                                </View>
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    selectedOpenBox == index &&
                    <View style={{ marginLeft: 20, marginRight: 47, paddingBottom: 20, backgroundColor: '#F2F3F7', borderRadius: 5, marginTop: 15 }}>
                        <View style={{ marginTop: 20, marginRight: 20 }}>
                            <Text style={{ color: '#000', fontFamily: "OpenSans-Bold", marginRight: 6, fontSize: 14, }}>???????? ?????????? ??????????????????</Text>
                            <Text style={{ color: '#000', fontFamily: "OpenSans-Medium", marginRight: 6, fontSize: 14, marginLeft: 20, textAlign: 'right' }}>{item.decs1}</Text>
                        </View>

                        <View style={{ marginTop: 20, marginRight: 20 }}>
                            <Text style={{ color: '#000', fontFamily: "OpenSans-Bold", marginRight: 6, fontSize: 14, }}>?????? ???????? ????????????</Text>
                            <Text style={{ color: '#000', fontFamily: "OpenSans-Medium", marginRight: 6, fontSize: 14, marginLeft: 20, textAlign: 'right' }}>{item.decs2}</Text>
                        </View>

                        <View style={{ marginTop: 20, marginRight: 20 }}>
                            <Text style={{ color: '#000', fontFamily: "OpenSans-Bold", marginRight: 6, fontSize: 14, }}>???????? ?????? ?????? ???????? ?????? ??????????</Text>
                            <Text style={{ color: '#000', fontFamily: "OpenSans-Medium", marginRight: 6, fontSize: 14, marginLeft: 20, textAlign: 'right' }}>{item.decs3}</Text>
                        </View>

                        <View style={{ marginTop: 20, marginRight: 20 }}>
                            <Text style={{ color: '#000', fontFamily: "OpenSans-Bold", marginRight: 6, fontSize: 14, }}>???????? ????????</Text>
                            <Text style={{ color: '#000', fontFamily: "OpenSans-Medium", marginRight: 6, fontSize: 14, marginLeft: 20, textAlign: 'right' }}>{item.decs4}</Text>
                        </View>
                    </View>
                }

                <View
                    style={{
                        borderBottomColor: '#EAECF0',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginHorizontal: 20,
                        marginTop: 20,
                    }}
                />
            </View >
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {loading && <LoadingPage />}
            <View style={{ elevation: 5, backgroundColor: '#fff' }}>
                <Text style={{ textAlign: 'center', color: '#000', fontFamily: "OpenSans-Bold", fontSize: 18, marginTop: 20, marginBottom: 13 }}>???????? ????????????????</Text>
            </View>

            <View style={{ marginTop: 28 }}>
                <TouchableOpacity activeOpacity={.3} style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }} onPress={() => setColorsShow(!colorsShow)}>
                    <AntDesign name={colorsShow ? 'caretup' : 'caretdown'} size={14} color={'#000'} style={{ marginRight: 6 }} />
                    <Text style={{ color: '#000', fontFamily: "OpenSans-Bold", marginRight: 20, fontSize: 14, }}>???????? ??????????</Text>
                </TouchableOpacity>
            </View>

            {colorsShow ?
                <View style={{ borderWidth: 1, marginTop: 9, marginHorizontal: 20, borderRadius: 5, borderColor: '#EFF0F2' }}>
                    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginRight: 20 }}>
                        <Text style={{ color: '#000', fontFamily: "OpenSans-Medium", marginRight: 5, fontSize: 14, }}>?????????? ???????????? ???????????????? ???????? ?????? ???? ??????????</Text>
                        <View style={{ backgroundColor: '#EBA9C1', padding: 8, borderRadius: 45 }} />
                    </View>

                    <View style={{ marginTop: 19, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginRight: 20 }}>
                        <Text style={{ color: '#000', fontFamily: "OpenSans-Medium", marginRight: 5, fontSize: 14, }}>?????????? ???????????? ?????????? ???? HIV</Text>
                        <View style={{ backgroundColor: '#376BA5', padding: 8, borderRadius: 45 }} />
                    </View>

                    <View style={{ marginTop: 19, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginRight: 20, marginBottom: 20 }}>
                        <Text style={{ color: '#000', fontFamily: "OpenSans-Medium", marginRight: 5, fontSize: 14, }}>?????????? ???????????? ????????</Text>
                        <View style={{ backgroundColor: '#009E69', padding: 8, borderRadius: 45 }} />
                    </View>
                </View>
                :
                null}

            <View
                style={{
                    borderBottomColor: '#EAECF0',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginHorizontal: 20,
                    marginTop: 20
                }}
            />
            {
                console.log("-------->>> flat list data---->>>>" + JSON.stringify(data))
            }
            <View style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    renderItem={VaccineView}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}
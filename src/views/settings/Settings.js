import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown';

export default function Settings({ navigation }) {
    const countries = ['עברית', 'English'];

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Text style={{ textAlign: 'center', color: '#000', fontFamily: "OpenSans-Bold", fontSize: 18, marginTop: 20 }}>תפריט</Text>

            <View style={{
                marginTop: 50,
                marginRight: 20
            }}>
                <Text style={{ color: '#000', fontSize: 16, }}>שפת האפליקציה</Text>
                <SelectDropdown
                    data={countries}
                    buttonStyle={{
                        width: 205,
                        borderRadius: 5,
                        marginTop: 5,
                        marginRight: 17,
                        alignSelf: 'flex-end',
                    }}
                    buttonTextStyle={{
                        fontSize: 14,
                        textAlign: 'right',
                        marginRight: 20,
                        color: 'grey',
                    }}
                    defaultButtonText={'עברית'}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                    }}
                />
            </View>

            <View style={{ marginTop: 33 }}>
                <View
                    style={{
                        borderBottomColor: '#EAECF0',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginHorizontal: 20
                    }}
                />

                <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
                    <Text style={{ marginRight: 20, color: '#000', fontFamily: "OpenSans-Medium", fontSize: 16, marginTop: 18 }}>פרופיל משתמש</Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    borderBottomColor: '#EAECF0',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginHorizontal: 20,
                    marginTop: 23
                }}
            />

            <TouchableOpacity>
                <Text style={{ marginRight: 20, color: '#000', fontFamily: "OpenSans-Medium", fontSize: 16, marginTop: 18 }}>התנתקות</Text>
            </TouchableOpacity>

            <View
                style={{
                    borderBottomColor: '#EAECF0',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginHorizontal: 20,
                    marginTop: 23,
                    flex: 1
                }}
            />
            <Text style={{ textAlign: 'center', color: '#000', fontFamily: "OpenSans-Medium", fontSize: 16, marginTop: 18 }}>גרסא 0.1</Text>
            <Text style={{ textAlign: 'center', color: '#000', fontFamily: "OpenSans-Bold", fontSize: 16, marginTop: 18, marginBottom: 30 }}>תנאי השימוש</Text>
        </View>
    )
}
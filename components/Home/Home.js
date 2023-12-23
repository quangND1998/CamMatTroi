import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import Payoo from '../../payoo';

const merchantId = "1457"
const HomeScreen = ({ navigation, route }) => {
    const envDevelopment = 0;
    const envProduction = 1;
    const langVietNam = 0;
    const langEnglish = 1;
    const cashAmount = 50000;

    _callPayment = () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "CyberCash": cashAmount, "ShopID": merchantId, "Token": "", "UserID": "" });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://sdk-sbb.payoo.vn/api/v2/Order", requestOptions)
            .then(response => response.text())
            .then(result => {

                var jsonResult = JSON.parse(result);
                var orderInfo = jsonResult.OrderInfo;
                var checkSum = jsonResult.CheckSum;

                let sdkConfig = {};
                sdkConfig.MerchantId = "1457";
                sdkConfig.MerchantShareKey = "zOj06Gt3/sM35Hu4ukt2TkMiRmoOQsZ+g5qu9W1+cw/2YVwkWQv2Xto0FBfofkdjG36Ekgb4GzNsXQq1+eRsJg==";

                sdkConfig.Environment = envDevelopment;
                sdkConfig.Language = langVietNam;

                sdkConfig.PayooCashAmount = cashAmount;
                // sdkConfig.SupportedMethods = 2;
                // sdkConfig.BankCode = "ABB";
                sdkConfig.AppCode = "Payoo";

                // sdkConfig.CustomerEmail = "email@email.com";
                // sdkConfig.CustomerPhone = "0911223344";

                Payoo.pay(sdkConfig, orderInfo, checkSum, (data) => console.log('PayooResponse', data));
            })
            .catch(error => console.log('error', error));
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={_callPayment} style={{ padding: 20, borderColor: "gray", borderWidth: 1 }}>
                <Text>Start PayooPaymentSDK</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    cardcontainer: {
        flex: 1
    }
})


export default HomeScreen;
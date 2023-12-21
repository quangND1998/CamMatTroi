/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
} from 'react-native';
import Payoo from './payoo'

const merchantId = "1457"
export default function App() {

    envDevelopment = 0;
    envProduction = 1;
    langVietNam = 0;
    langEnglish = 1;
    cashAmount = 50000;

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
        <View style={
            { flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <TouchableOpacity onPress={_callPayment} style={
                { padding: 20, borderColor: "gray", borderWidth: 1 }} >
                <Text>Start PayooPaymentSDK</Text>
            </TouchableOpacity>
        </View>
    );
};
//import liraries
import React, { Component, useState } from 'react';
import { View, StyleSheet, ToastAndroid, Keyboard, TextInput } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Icon, ZStack, Image, HStack, VStack, Pressable, useToast, AspectRatio } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { loginAction, logoutAction } from '../../store/actions/auth';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { getToken } from '../../common/asynStorage'
import { useLogin } from '../../context/LoginProvider';
import Spinner from 'react-native-loading-spinner-overlay';
import { Eye, EyeSlash } from 'iconsax-react-native';
// create a component
const Login = ({ navigation }) => {
    const { setIsLoggedIn, profile } = useLogin();
    const toast = useToast();
    const [show, setShow] = useState(true)
    const [spinner, setSpinner] = useState(false)
    const [state, setSate] = React.useState({ code: '', password: '' });
    const login = useSelector(state => state.login);
    const dispatch = useDispatch();

    const changeCode = (value) => {
        setSate(prevState => {
            return { ...prevState, code: value }
        })
    }
    const changePassword = (value) => {
        setSate(prevState => {
            return { ...prevState, password: value }
        })
    }
    const submitHandler = () => {
        console.log(state)
        setSpinner(true);
        dispatch(loginAction(
            state.code, state.password,
            () => {
                toast.show({
                    title: "Login successfully",
                    // status: "success",
                    description: "Thanks for signing up with us."
                })
                // console.log(navigation)
                setIsLoggedIn(true)
                Keyboard.dismiss();
                setSpinner(false);

            },
            () => {
                toast.show({
                    title: "Something went wrong, please try again!",
                    // status: "error",
                    description: "Something went wrong, please try again!"
                })
                setIsLoggedIn(false)
                setSpinner(false);
            },
        ));
    }
    return (
        <Stack alignItems="center" className="relative h-full" >
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View class="bottom-0 h-full">
                <Image source={require('../../assets/images/banner3_login.png')} class="m-auto bottom-0 absolute " alt="" />
            </View>
            <Box className="ion-padding mt-[60px] absolute top-0 left-0 w-full h-full">
                <View class="mb-5 pb-5 logo ">
                    <Image source={require('../../assets/images/logo2.png')} class="m-auto" alt="" />
                </View>
                <TextInput onChangeText={changeCode} className="bg-gray-50 border border-[#F78F43] text-gray-900 text-sm rounded-lg " placeholder="Mã HĐ/SĐT" />

                <View class="my-3 relative flex items-center">
                    <TextInput secureTextEntry={show} className="bg-gray-50 border border-[#F78F43] text-gray-900 text-sm rounded-lg  " onChangeText={changePassword} placeholder="Password" />

                </View>
                <View class="absolute bottom-5 right-4 px-2.5 py-1.5">
                    {show == false ? <Eye color="#F78F43" variant="Outline" size={25} onPress={() => setShow(true)} /> : <EyeSlash color="#F78F43" variant="Outline" size={25} onPress={() => setShow(false)} />}
                    <Text className="text-[#F78F43] ">{show}</Text>
                </View>
                <Button className="w-full mt-6 text-white bg-[#F78F43] focus:text-[#F78F43] rounded-xl" size='md' text="submit" onPress={submitHandler}>Login</Button>
            </Box>

        </Stack >
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});

//make this component available to the app
export default Login;

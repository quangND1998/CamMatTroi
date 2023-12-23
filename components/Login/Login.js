//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid, Keyboard } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Spinner, Input, Icon, ZStack, Image, HStack, VStack, Pressable, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { loginAction, logoutAction } from '../../store/actions/auth';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { getToken } from '../../common/asynStorage'
import { useLogin } from '../../context/LoginProvider';
// create a component
const Login = ({ navigation }) => {
    const { setIsLoggedIn, profile } = useLogin();
    const toast = useToast();
    const [state, setSate] = React.useState({ show: false, code: '', password: '' });
    const login = useSelector(state => state.login);
    const dispatch = useDispatch();
    const handleClick = () => {
        setSate(prevState => {
            return { ...prevState, show: !state.show }
        })
        console.log(state)
    }
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

            },
            () => {
                toast.show({
                    title: "Something went wrong, please try again!",
                    // status: "error",
                    description: "Something went wrong, please try again!"
                })
                setIsLoggedIn(false)
            },
        ));
    }
    return (
        <Stack space={4} w="100%" alignItems="center">
            <Text>Login</Text>
        
            <Input w={{
                base: "75%",
                md: "25%"
            }} onChangeText={changeCode} placeholder="Mã HĐ/SĐT" />
            <Input type={state.show ? "text" : "password"} w={{
                base: "75%",
                md: "25%"
            }} onChangeText={changePassword} placeholder="Password" />
            <Button size='md' text="submit" onPress={submitHandler}>Login</Button>
        </Stack>
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
});

//make this component available to the app
export default Login;

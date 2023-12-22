import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/Login/Login';
import { useLogin } from '../context/LoginProvider';
import DrawerNavigator from './DrawerNavigator';
const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen initialRouteName="Login" name="Login" component={Login} />
        </Stack.Navigator>
    );
}


const MainNavigator = () => {
    const { isLoggedIn } = useLogin();
    return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />;
};
export default MainNavigator;
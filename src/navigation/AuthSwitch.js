// NavigationActions is super critical
import { NavigationActions, createSwitchNavigator, createAppContainer } from 'react-navigation'
// these are literally whatever you want, standard components
// but, they are sitting in the root of the stack
import Register from '../components/Auth/Register'
import Login from '../components/Auth/Login'
// this is an example of a nested view, you might see after logging in
import Home from '../components/Home' // index.js file
import MainTab from './MainTab';


export const AuthSwitch = createSwitchNavigator({
    // Splash: {
    //     screen: Splash
    // },
    Register: {
        screen: Register
    },
    MainTab: {
        screen: MainTab 
    },                    
    Login: {
        screen: Login
    },
    // ForgottenPassword: {
    //     screen: ForgottenPassword
    // },
}, {
    headerMode: 'none',
    initialRouteName: 'Login'
})

export default AuthSwitchNavigator = createAppContainer(AuthSwitch);

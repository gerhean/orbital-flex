// NavigationActions is super critical
import { NavigationActions, createStackNavigator, createAppContainer } from 'react-navigation'
// these are literally whatever you want, standard components
// but, they are sitting in the root of the stack
import Register from '../components/Auth/Register'
import Login from '../components/Auth/Login'
// this is an example of a nested view, you might see after logging in
import Home from '../components/Home' // index.js file


export const RootStack = createStackNavigator({
    // Splash: {
    //     screen: Splash
    // },
    Register: {
        screen: Register
    },
    Login: {
        screen: Login
    },
    // ForgottenPassword: {
    //     screen: ForgottenPassword
    // },
    Home: {
        screen: Home 
    }                       
}, {
    headerMode: 'none'
})

export default MainNavigator = createAppContainer(RootStack);

import React, { Component } from "react";
 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StockScreen from "./StockScreen";

const Stack = createStackNavigator();

class MainScreen extends Component {
    render() {
        return(
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="StockScreen" component={StockScreen} />
            </Stack.Navigator>  
        );
    }

}   

export default MainScreen;
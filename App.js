import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login,Register,ForgetPassword,Home,Notifications } from './app/screens';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

function App() {
  return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: Platform.OS == 'ios' ? true : false}} >
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name='forgetPassword' component={ForgetPassword} />
          <Stack.Screen name='home' component={Home} />
          <Stack.Screen name='notification' component={Notifications}/>
        </Stack.Navigator>
      </NavigationContainer>
    
  );
}

export default App;







import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/login';
import Register from './app/screens/register';
import ForgetPassword from './app/screens/forgetPassword';
import Home from './app/screens/home';

const Stack = createNativeStackNavigator();

function App() {
  return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name='forgetPassword' component={ForgetPassword} />
          <Stack.Screen name='home' component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    
  );
}

export default App;







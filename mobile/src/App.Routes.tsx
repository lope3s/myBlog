import React from 'react';
import Login from '../src/scenes/Login';
import Register from '../src/scenes/Resgister';
import InnerAppPagination from '../src/scenes/InnerAppPagination';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStoreState} from 'easy-peasy';
import {IMainModel, IUserModel} from '../src/Types';

const Stack = createNativeStackNavigator();

const Router: React.FC = () => {
  const {user} = useStoreState<IMainModel, IUserModel>(
    state => state.userModel,
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user.isLogged ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="InnerAppPagination"
            component={InnerAppPagination}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

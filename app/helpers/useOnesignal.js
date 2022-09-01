import React, {createContext, useContext, useEffect} from 'react';
import OneSignal from 'react-native-onesignal';
// import * as RootNavigation from '../../src/Navigation/RootNavigation';

const OnesignalContext = createContext(null);

export const OnesignalProvider = ({children}) => {
  OneSignal.setAppId(global.ONESIGNAL_KEY); // Put ONESIGNAL_KEY Here.

  useEffect(() => {
    OneSignal.setNotificationOpenedHandler((openedEvent) => {
      const {notification} = openedEvent;
      handleNotification(notification.additionalData);
    });

    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    // This will provide Token for the 1st Time after installation, after that it won't get called.
    OneSignal.addSubscriptionObserver(async (event) => {
      if (event.to.isSubscribed) {
        const state = await OneSignal.getDeviceState();
        global.notificationToken = state.userId;
      }
    });

    // This will provide token after it is registered successfully.
    async function initiateOnesignal() {
      const {userId} = await OneSignal.getDeviceState();
      global.notificationToken = userId;
    }
    initiateOnesignal();
    return () => {
      OneSignal.clearHandlers();
    };
  }, []);

  const myiOSPromptCallback = (permission) => {
    OneSignal.getDeviceState().then(({userId}) => {
      global.notificationToken = userId;
    });
  };

  const handleNotification = (result) => {
    let data = result;
    console.log(data);
    // if (
    //   [
    //     'order_accepted',
    //     'order_ready',
    //     'order_completed',
    //     'order_cancelled',
    //     'order_message',
    //   ].includes(data?.type)
    // ) {
    //   global.notificationData = {order: data?.details};
    //   global.notificationType = data.type;
    //   RootNavigation.navigate('OrderModal');
    // }
  };
  //ONESIGNAL ENDS

  return (
    <OnesignalContext.Provider value={{}}>{children}</OnesignalContext.Provider>
  );
};

export default () => useContext(OnesignalContext);
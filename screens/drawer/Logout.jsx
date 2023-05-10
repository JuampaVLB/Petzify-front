import React from "react";
import { View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Logout = () => {
  const navigation = useNavigation();

  
  return <View>{YesOrNo()}</View>;
};

export default Logout;

{
  /* <AlertNotificationRoot>
<View>
  <Button
    title={'dialog box'}
    onPress={() =>
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'Congrats! this is dialog box success',
        button: 'close',
      })
    }
  />
</View>
</AlertNotificationRoot> */
}

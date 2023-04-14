import {View, Text, StyleSheet, Image} from 'react-native';
import Touchable from '@c/TouchableOpacity';
import avator from '@assets/images/default_avatar.png';
import colors from '@const/colors';
const Account = () => {
  return (
    <View>
      <View style={styles.container}>
        <Image source={avator} style={styles.avatar} />
        <View style={styles.loginContainer}>
          <Touchable>
            <Text style={styles.loginBtn}>立即登录</Text>
          </Touchable>
          <Text style={styles.subtitle}>登录后同步所有记录</Text>
        </View>
      </View>
    </View>
  );
};
export default Account;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  loginContainer: {
    paddingHorizontal: 20,
  },
  loginBtn: {
    width: 80,
    height: 25,
    color: colors.primary,
    borderColor: colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  subtitle: {
    marginVertical: 10,
    color: '#999',
  },
});

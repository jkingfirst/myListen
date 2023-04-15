import {View, Text, StyleSheet, Image} from 'react-native';
import Touchable from '@c/TouchableOpacity';
import defautAvator from '@assets/images/default_avatar.png';
import colors from '@const/colors';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {ModalRootStackNavigation} from '@t/navigation';
const mapStateToProps = ({user}: RootState) => ({
  user: user.user,
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  navigation: ModalRootStackNavigation;
}
const Account = (props: IProps) => {
  const {user, navigation} = props;
  const handleToLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <View>
      <View style={styles.container}>
        {user ? (
          <View>
            <Text>用户</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <Image source={defautAvator} style={styles.avatar} />
            <View style={styles.loginContainer}>
              <Touchable style={styles.loginBtn} onPress={handleToLogin}>
                <Text style={styles.loginBtnText}>立即登录</Text>
              </Touchable>
              <Text style={styles.subtitle}>登录后同步所有记录</Text>
            </View>
          </View>
        )}
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
    borderColor: colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  loginBtnText: {
    color: colors.primary,
  },
  subtitle: {
    marginVertical: 10,
    color: '#999',
  },
});

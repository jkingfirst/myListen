import {View, Text, StyleSheet, Image} from 'react-native';
import Touchable from '@c/TouchableOpacity';
import defautAvator from '@assets/images/default_avatar.png';
import colors from '@const/colors';
import {useSelector, useDispatch} from 'react-redux';
import {ModalRootStackNavigation} from '@t/navigation';
import {RootState} from '@m/index';
import Authenticate from '@p/Authenticate';
interface IProps {
  navigation: ModalRootStackNavigation;
}
const Account = (props: IProps) => {
  const {user} = useSelector(({user}: RootState) => user);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({
      type: 'user/logout',
    });
  };
  return (
    <View>
      <View style={styles.container}>
        <Authenticate>
          <View style={styles.container}>
            <Image
              source={{
                uri: user?.avatar,
              }}
              style={styles.avatar}
            />
            <View style={styles.loginContainer}>
              <Text style={styles.subtitle}>{user && user?.name}</Text>
              <Touchable style={styles.loginBtn} onPress={logout}>
                <Text style={styles.loginBtnText}>退出登录</Text>
              </Touchable>
            </View>
          </View>
        </Authenticate>
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

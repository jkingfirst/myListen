import {View, Text, Image, StyleSheet} from 'react-native';
import {ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@m/index';
import defautAvator from '@assets/images/default_avatar.png';
import Touchable from '@c/TouchableOpacity';
import colors from '@const/colors';
import {navigate} from '@u/rootNavigation';

interface IProps {
  children: ReactNode;
  isAuthorized?: boolean;
  noMatch?: () => JSX.Element;
}
const Authenticate = (props: IProps) => {
  const {children, isAuthorized, noMatch} = props;
  const {user} = useSelector(({user}: RootState) => user);
  const handleToLogin = () => {
    navigate('Login');
  };
  const getMatch = () => {
    if (
      noMatch &&
      Object.prototype.toString.call(noMatch) === '[Object function]'
    ) {
      return noMatch();
    }
    return (
      <View style={styles.container}>
        <Image source={defautAvator} style={styles.avatar} />
        <View style={styles.loginContainer}>
          <Touchable style={styles.loginBtn} onPress={handleToLogin}>
            <Text style={styles.loginBtnText}>立即登录</Text>
          </Touchable>
          <Text style={styles.subtitle}>登录后同步所有记录</Text>
        </View>
      </View>
    );
  };
  return <View>{isAuthorized || user ? <>{children}</> : getMatch()}</View>;
};
export default Authenticate;
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

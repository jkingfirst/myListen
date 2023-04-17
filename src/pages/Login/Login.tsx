import {View, Text, ScrollView, StyleSheet, TextInput} from 'react-native';
import colors from '@const/colors';
import {Formik, Field} from 'formik';
import Touchable from '@c/TouchableOpacity';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {login} from '@api/user';
import {navigationRef} from '@u/rootNavigation';
import XFiled from '@c/XFiled';
import {object, string} from 'yup';
const mapStateToProps = ({loading}: RootState) => ({
  loading: loading.effects['user/login'],
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface LoginProps extends ModelState {}
interface IForm {
  account: string;
  password: string;
}
const validateSchema = object({
  account: string().required('请输入账号'),
  password: string().required('请输入密码'),
});
const Login = (props: LoginProps) => {
  const {dispatch} = props;
  const form: IForm = {
    account: '',
    password: '',
  };
  const submit = (values: IForm) => {
    console.log(values, '+++++++');
    dispatch({
      type: 'user/login',
      payload: values,
    });
  };
  const goBack = () => {
    console.log(navigationRef.isReady(), '回退🚀');
    if (!navigationRef.isReady()) {
      navigationRef.goBack();
    }
  };
  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Text style={styles.logo}>听书</Text>
      <Formik
        initialValues={form}
        va
        onSubmit={submit}
        validationSchema={validateSchema}>
        {({handleSubmit}) => {
          return (
            <View>
              <Field
                name={'account'}
                component={XFiled}
                placeholder={'输入账号'}
              />
              <Field
                name={'password'}
                component={XFiled}
                placeholder={'输入登录密码'}
              />
              <Touchable onPress={handleSubmit} style={styles.loginBtn}>
                <Text style={styles.loginText}>登录</Text>
              </Touchable>
            </View>
          );
        }}
      </Formik>
      <Touchable onPress={goBack}>
        <Text>阿牛</Text>
      </Touchable>
    </ScrollView>
  );
};
export default connector(Login);
const styles = StyleSheet.create({
  logo: {
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40,
    marginTop: 40,
  },
  loginBtn: {
    marginHorizontal: 10,
    marginVertical: 50,
    borderWidth: 2,
    height: 40,
    borderRadius: 20,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

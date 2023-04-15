import {View, Text, ScrollView, StyleSheet, TextInput} from 'react-native';
import colors from '@const/colors';
import {Formik} from 'formik';
import Touchable from '@c/TouchableOpacity';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {login} from '@api/user';
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
  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Text style={styles.logo}>听书</Text>
      <Formik initialValues={form} onSubmit={submit}>
        {({values, handleBlur, handleChange, handleSubmit}) => {
          return (
            <View>
              <TextInput
                placeholder={'请输入用户名'}
                value={values.account}
                onChangeText={handleChange('account')}
                onBlur={handleBlur('account')}
              />
              <TextInput
                placeholder={'请输入登录密码'}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry={true}
              />
              <Touchable onPress={handleSubmit}>
                <Text>登录</Text>
              </Touchable>
            </View>
          );
        }}
      </Formik>
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
});

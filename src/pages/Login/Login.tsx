import {View, Text, ScrollView, StyleSheet} from 'react-native';
import colors from '@const/colors';

const Login = () => {
  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Text style={styles.logo}>听书</Text>
    </ScrollView>
  );
};
export default Login;
const styles = StyleSheet.create({
  logo: {
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
});

import {Text, TextInput, View, TextInputProps, StyleSheet} from 'react-native';
import {FormikProps, FieldInputProps} from 'formik';
interface IProps extends TextInputProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
}
const XFiled = (props: IProps) => {
  const {field, form, ...reset} = props;
  return (
    <View style={styles.container}>
      <TextInput
        {...reset}
        style={styles.input}
        value={form.values[field.name]}
        onChangeText={form.handleChange(field.name)}
        onBlur={form.handleBlur(field.name)}
        secureTextEntry={true}
      />
      <View>
        <Text style={styles.error}>
          {form.touched[field.name] && <>{form.errors[field.name]}</>}
        </Text>
      </View>
    </View>
  );
};
export default XFiled;
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  error: {
    position: 'absolute',
    color: 'red',
    marginTop: 5,
    marginLeft: 10,
    fontSize: 12,
  },
});

import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
export default function Touchable(props: TouchableOpacityProps) {
  return <TouchableOpacity activeOpacity={0.8} {...props} />;
}

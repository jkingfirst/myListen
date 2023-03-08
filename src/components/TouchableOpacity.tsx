import { TouchableOpacity, TouchableOpacityProps } from "react-native";
export default function Touchable(props: TouchableOpacityProps){
  return <TouchableOpacity activeOpacity={.8} {...props}/>
}

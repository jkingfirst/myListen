import {useState} from 'react';
import {Button, View, Text} from 'react-native';

export default function Test() {
  const [count, setCount] = useState(0);
  console.log(count, '++++++');
  const handleFirst = () => {
    setCount(count => count + 1);
  };
  const handleSecond = () => {
    console.log(count, '______');
  };
  return (
    <View>
      <Text>{count}</Text>
      <Button title={'按钮1'} onPress={handleFirst} />
      <Button title={'按钮2'} onPress={handleSecond} />
    </View>
  );
}

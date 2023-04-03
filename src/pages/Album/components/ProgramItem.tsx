import {View, Text, StyleSheet} from 'react-native';
import {IProgram} from '@t/album';
import Touchable from '@c/TouchableOpacity';
import IconFont from '@assets/iconfont';
interface IProps {
  item: IProgram;
  index: number;
  goDetail: (item: IProgram) => void;
}
export default function ProgramItem(props: IProps) {
  const {item, index, goDetail} = props;
  const onPress = (item: IProgram) => {
    goDetail(item);
  };
  return (
    <Touchable onPress={() => onPress(item)} key={item.id} style={styles.item}>
      <Text style={styles.serial}>{index + 1}</Text>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.info}>
          <View style={styles.iconView}>
            <IconFont name="icon-play" color="#939393" />
            <Text style={styles.iconText}>{item.playVolume}</Text>
          </View>
          <View style={styles.iconView}>
            <IconFont name="icon-duration" color="#939393" />
            <Text style={styles.iconText}>{item.duration}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.date}>{item.date}</Text>
    </Touchable>
  );
}
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginHorizontal: 25,
  },
  serial: {
    fontSize: 14,
    color: '#838383',
    fontWeight: '800',
  },
  title: {
    fontWeight: '500',
    marginBottom: 15,
  },
  info: {
    flexDirection: 'row',
  },
  iconView: {
    flexDirection: 'row',
    marginRight: 10,
  },
  iconText: {
    marginHorizontal: 5,
    color: '#939393',
  },
  date: {
    color: '#939393',
  },
});

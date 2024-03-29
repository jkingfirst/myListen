import {View, Text, StyleSheet, Image} from 'react-native';
import {IChannel} from '@t/home';
import Touchable from '@c/TouchableOpacity';
import IconFont from '@assets/iconfont';
interface ChannelItemProps {
  data: IChannel;
  goAlbum: (item: IChannel) => void;
}
export default function ChannelItem(props: ChannelItemProps) {
  const {data, goAlbum} = props;
  const onPress = (item: IChannel) => {
    goAlbum(item);
  };
  return (
    <Touchable onPress={() => onPress(data)}>
      <View style={styles.container}>
        <Image source={{uri: data.image}} style={styles.image} />
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {data.title}
          </Text>
          <Text style={styles.remark} numberOfLines={2}>
            {data.remark}
          </Text>
          <View style={styles.bottom}>
            <View style={styles.playedView}>
              <IconFont name="icon-home" size={14} />
              <Text style={styles.number}>{data.played}</Text>
            </View>
            <View style={styles.playingView}>
              <IconFont name="icon-home" size={14} />
              <Text style={styles.number}>{data.playing}</Text>
            </View>
          </View>
        </View>
      </View>
    </Touchable>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    // elevation: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#dedede',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  remark: {
    backgroundColor: '#f8f8f8',
    padding: 5,
    marginBottom: 5,
  },
  bottom: {
    flexDirection: 'row',
  },
  playedView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  playingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    marginLeft: 5,
  },
});

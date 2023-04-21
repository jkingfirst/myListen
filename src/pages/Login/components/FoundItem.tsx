import {View, Text, StyleSheet} from 'react-native';
import {IFound} from '@t/found';
import Video from 'react-native-video';
interface IProps {
  data: IFound;
  pause: boolean;
  setCurrentId: (id: string) => void;
}
export default function FoundItem(props: IProps) {
  const {data, pause, setCurrentId} = props;
  const onPlaybackRateChange = ({playbackRate}: {playbackRate: number}) => {
    if (playbackRate === 1) {
      setCurrentId(data.id);
    }
  };
  return (
    <View>
      <Video
        style={styles.video}
        source={{
          uri: data.videoUrl,
        }}
        onPlaybackRateChange={onPlaybackRateChange}
        controls={true}
        paused={pause}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  video: {
    height: 200,
    marginVertical: 10,
  },
});

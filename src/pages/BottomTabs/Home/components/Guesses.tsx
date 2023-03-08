import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {useMount} from '@u/customHooks';
import {Guess} from '@t/home';
import Touchable from '@c/TouchableOpacity';
import IconFont from '@assets/iconfont';
const mapPropsToState = ({home}: RootState) => ({
  guesses: home.guesses,
});
const connector = connect(mapPropsToState);
type StateModel = ConnectedProps<typeof connector>;
const Guesses = (props: StateModel) => {
  const {dispatch, guesses} = props;
  const getGuessList = () => {
    dispatch({
      type: 'home/fetchGuess',
    });
  };
  const renderItem = ({item}: {item: Guess}) => {
    return (
      <Touchable style={styles.item}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text numberOfLines={2}>{item.title}</Text>
      </Touchable>
    );
  };
  const keyExtractor = (item: Guess) => item.image;
  useMount(getGuessList);
  return (
    <View style={styles.flatWrapper}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <IconFont name={'icon-favorite'} size={14} />
          <Text>猜你喜欢</Text>
        </View>
        <View style={styles.headerRight}>
          <Text>更多</Text>
          <IconFont name={'icon-more'} size={14} />
        </View>
      </View>
      <FlatList
        numColumns={3}
        keyExtractor={keyExtractor}
        data={guesses}
        renderItem={renderItem}
      />
      <Touchable style={styles.footer} onPress={getGuessList}>
        <IconFont name={'icon-refresh'} size={18} />
        <Text>刷新</Text>
      </Touchable>
    </View>
  );
};
export default connector(Guesses);
const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 16,
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
  },
  flatWrapper: {
    margin: 16,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    marginHorizontal: 6,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});

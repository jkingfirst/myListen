import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ListRenderItemInfo,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {RootStackNavigation} from '@t/navigation';
import {ConnectedProps, connect} from 'react-redux';
import {RootState} from '@m/index';
import Carousel from '@p/BottomTabs/Home/components/Carousels';
import Guesses from '@p/BottomTabs/Home/components/Guesses';
import {IChannel} from '@t/home';
import {useMount} from '@u/customHooks';
import {itemHeight} from '@p/BottomTabs/Home/components/Carousels';
import ChannelItem from '@p/BottomTabs/Home/components/Channel/ChannelItem';
const mapStateToProps = ({home, loading}: RootState) => ({
  carousels: home.carousels,
  channels: home.channels,
  hasMore: home.pagination.hasMore,
  loading: loading.effects['home/fetchChannel'],
  gradientVisible: home.gradientVisible,
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface HomeProps extends ModelState {
  navigation: RootStackNavigation;
}
function Home(props: HomeProps) {
  const [refresh, setRefresh] = useState(false);
  const {channels, dispatch, loading, hasMore, gradientVisible} = props;
  useMount(() => {
    dispatch({
      type: 'home/fetchChannel',
    });
    dispatch({
      type: 'home/fetchCarousel',
    });
  });
  const renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem data={item} />;
  };
  const getHeader = () => {
    return (
      <View>
        <Carousel />
        <Guesses />
      </View>
    );
  };
  const getFooter = () => {
    if (!hasMore) {
      return (
        <View style={styles.end}>
          <Text>-我是有底线的-</Text>
        </View>
      );
    }
    if (loading && hasMore && channels.length > 0) {
      return (
        <View style={styles.loading}>
          <Text>正在加载中...</Text>
        </View>
      );
    }
    return <View />;
  };
  const getEmpty = () => {
    return (
      <View style={styles.empty}>
        <Text>暂无数据</Text>
      </View>
    );
  };
  const onRefresh = () => {
    setRefresh(true);
    dispatch({
      type: 'home/fetchHomeData',
      callback: () => {
        setRefresh(false);
      },
    });
  };
  const onEndReached = () => {
    console.log('底部加载');
    if (loading || !hasMore) {
      return;
    }
    dispatch({
      type: 'home/fetchChannel',
    });
  };
  const onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y;
    const newGradientVisible = itemHeight > offsetY;
    if (gradientVisible !== newGradientVisible) {
      dispatch({
        type: 'home/setState',
        payload: {
          gradientVisible: newGradientVisible,
        },
      });
    }
  };
  return (
    <View>
      <FlatList
        ListHeaderComponent={getHeader}
        ListFooterComponent={getFooter}
        ListEmptyComponent={getEmpty}
        data={channels}
        renderItem={renderItem}
        refreshing={refresh}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        onScroll={onScroll}
      />
    </View>
  );
}
export default connector(Home);
const styles = StyleSheet.create({
  end: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  background: {
    backgroundColor: '#fff',
  },
});

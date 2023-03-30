import {
  TabView,
  TabBar,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';
import Summary from '@p/Album/components/Summary';
import ProgramList from '@p/Album/components/ProgramList';
import {useState} from 'react';
import {StyleSheet, Platform} from 'react-native';
import colors from '@const/colors';
interface IRoute {
  title: string;
  key: string;
}
const renderScene = ({route}: {route: IRoute}) => {
  switch (route.key) {
    case 'summary': {
      return <Summary />;
    }
    case 'programList': {
      return <ProgramList />;
    }
  }
};
const Tab = () => {
  const [index, setIndex] = useState(1);
  const [routes] = useState<IRoute[]>([
    {key: 'summary', title: '简介'},
    {key: 'programList', title: '列表'},
  ]);
  const renderTabBar = (
    props: SceneRendererProps & {navigationState: NavigationState<IRoute>},
  ) => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        tabStyle={styles.tabStyle}
        labelStyle={styles.labelStyle}
        style={styles.tabBar}
        indicatorStyle={styles.indicator}
      />
    );
  };
  return (
    <TabView
      renderScene={renderScene}
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};
export default Tab;
const styles = StyleSheet.create({
  tabStyle: {
    width: 100,
  },
  labelStyle: {
    color: '#333',
  },
  tabBar: {
    backgroundColor: 'transparent',
    ...Platform.select({
      android: {
        elevation: 0,
      },
    }),
  },
  indicator: {
    backgroundColor: colors.primary,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderColor: '#fff',
  },
});

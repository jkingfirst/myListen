import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {Index} from '@p/index';
import {TopTabsParamsList} from '@t/navigation';
import colors from '@const/colors';
import CustomTobBar from '@n/components/customTobBar';
import {StyleSheet} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {ICategory} from '@t/category';
import {createModel} from '@conf/dva';
const mapStateToProps = (state: RootState) => {
  // console.log(JSON.stringify(props), '你好');
  return {
    gradientVisible: state.home.gradientVisible,
    myCategories: state.category.myCategories,
  };
};
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
export interface TopBarProps extends ModelState {}
const Tab = createMaterialTopTabNavigator<TopTabsParamsList>();
const TopTabs = (props: TopBarProps) => {
  const {gradientVisible, myCategories} = props;
  const renderTabBar = (props: MaterialTopTabBarProps) => {
    return <CustomTobBar {...props} />;
  };
  let textColor = '#333';
  if (gradientVisible) {
    textColor = '#fff';
  }
  const renderCategory = (item: ICategory) => {
    createModel(item.id);
    return (
      <Tab.Screen
        key={item.id}
        name={item.id}
        component={Index}
        options={{
          tabBarLabel: item.name,
        }}
        initialParams={{
          namespace: item.id,
        }}
      />
    );
  };
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      sceneContainerStyle={styles.sceneContainer}
      screenOptions={{
        lazy: true,
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 80,
          backgroundColor: 'transparent',
        },
        tabBarStyle: {
          backgroundColor: 'transparent',
        },
        tabBarIndicatorStyle: {
          width: 20,
          height: 5,
          marginLeft: 30,
          borderRadius: 2,
          backgroundColor: colors.primary,
        },
        tabBarActiveTintColor: gradientVisible ? textColor : colors.primary,
        tabBarInactiveTintColor: colors.black,
      }}>
      {myCategories.map(renderCategory)}
    </Tab.Navigator>
  );
};
export default connector(TopTabs);
const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: 'transparent',
  },
});

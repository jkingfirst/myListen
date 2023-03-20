import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Touchable from '@c/TouchableOpacity';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {ICategory} from '@t/category';
import {useEffect, useState} from 'react';
import _ from 'lodash';
import CategoryItem from '@p/Category/components/CategoryItem';
import {RootStackNavigation} from '@t/navigation';
import {useMount} from '@u/customHooks';
import HeaderRight from '@p/Category/components/components/HeaderRight';

const mapStateToProps = ({category}: RootState) => ({
  isEdit: category.isEdit,
  myCategories: category.myCategories,
  allCategories: category.allCategories,
});
type CategoryMode = ConnectedProps<typeof connector>;
interface CategoryProps extends CategoryMode {
  navigation: RootStackNavigation;
}
const connector = connect(mapStateToProps);
const Category = (props: CategoryProps) => {
  const {myCategories, allCategories, navigation, dispatch, isEdit} = props;
  const [pageMyCategories, setPageMyCategories] = useState(myCategories);
  const [pageAllCategories, setPageAllCategories] = useState(allCategories);
  let categoryGroups = _.groupBy(pageAllCategories, item => item.classify);
  useMount(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight handleBtn={handleBtn} />,
    });

    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: false,
      },
    });
  });
  const handleBtn = () => {
    dispatch({
      type: 'category/toggleEdit',
      payload: {
        myCategories,
      },
    });
  };
  const handleEdit = (item: ICategory) => {
    if (item.id === 'vip' || item.id === 'home') {
      return false;
    }
    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: true,
      },
    });
  };
  const handleSelect = (item: ICategory) => {
    if (!isEdit || item.id === 'vip' || item.id === 'home') {
      return false;
    }
    if (pageMyCategories.includes(item)) {
      const idx = pageMyCategories.findIndex(
        (classify: ICategory) => item.id === classify.id,
      );
      pageMyCategories.splice(idx, 1);
      setPageAllCategories([item, ...pageAllCategories]);
      setPageMyCategories(pageMyCategories);
    } else {
      const idx = pageAllCategories.findIndex(
        (classify: ICategory) => item.id === classify.id,
      );
      pageAllCategories.splice(idx, 1);
      setPageMyCategories([...pageMyCategories, item]);
      setPageAllCategories(pageAllCategories);
    }
  };
  const renderItem = (item: ICategory) => {
    const disabled = item.id === 'home' || item.id === 'vip';
    return (
      <Touchable
        key={item.id}
        onLongPress={() => handleEdit(item)}
        onPress={() => handleSelect(item)}>
        <CategoryItem
          data={item}
          isEdit={isEdit}
          selected={pageMyCategories.includes(item)}
          disabled={disabled}
        />
      </Touchable>
    );
  };
  return (
    <ScrollView style={styles.categoryContainer}>
      <Text style={styles.classifyName}>我的分类</Text>
      <View style={styles.classifyView}>
        {pageMyCategories.map(renderItem)}
      </View>
      <View>
        {Object.keys(categoryGroups).map(item => {
          console.log(item, 'key');
          return (
            <View key={item}>
              <Text style={styles.classifyName}>{item}</Text>
              <View style={styles.classifyView}>
                {categoryGroups[item].map(renderItem)}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};
export default connector(Category);
const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    backgroundColor: '#f3f6f6',
    paddingHorizontal: 5,
  },
  classifyName: {
    fontSize: 14,
    marginVertical: 10,
  },
  classifyView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

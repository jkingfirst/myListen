import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import Touchable from '@c/TouchableOpacity';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {ICategory} from '@t/category';
import {useCallback, useEffect, useState} from 'react';
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

  const assembleAllCategories = pageAllCategories
    .map(allCategoryItem => {
      if (pageMyCategories.every(item => item.id !== allCategoryItem.id)) {
        return allCategoryItem;
      }
    })
    .filter(item => item !== undefined);
  console.log(assembleAllCategories, '🚀');
  let categoryGroups = _.groupBy(assembleAllCategories, item => item.classify);
  // 保存
  const handleBtn = () => {
    dispatch({
      type: 'category/toggleEdit',
      payload: {
        myCategories: pageMyCategories,
      },
    });
  };
  useMount(() => {
    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: false,
      },
    });
  });
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight handleBtn={handleBtn} />,
    });
  }, [navigation, handleBtn]);
  useEffect(() => {}, [pageMyCategories]);
  // 长按编辑
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
  // 增删
  const handleSelect = (item: ICategory) => {
    if (!isEdit || item.id === 'vip' || item.id === 'home') {
      return false;
    }
    if (pageMyCategories.includes(item)) {
      const idx = pageMyCategories.findIndex(
        (classify: ICategory) => item.id === classify.id,
      );
      setPageAllCategories(pre => [item, ...pre]);
      setPageMyCategories(pre => {
        pre.splice(idx, 1);
        return pre;
      });
    } else {
      const idx = pageAllCategories.findIndex(
        (classify: ICategory) => item.id === classify.id,
      );
      setPageMyCategories(pre => [...pre, item]);
      setPageAllCategories(pre => {
        pre.splice(idx, 1);
        return pre;
      });
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

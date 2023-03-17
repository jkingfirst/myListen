import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {ICategory} from '@t/category';
import {useState} from 'react';
import _ from 'lodash';
import CategoryItem from '@p/Category/components/CategoryItem';

const mapStateToProps = ({category}: RootState) => ({
  myCategories: category.myCategories,
  allCategories: category.allCategories,
});
type CategoryMode = ConnectedProps<typeof connector>;
interface CategoryProps extends CategoryMode {}
const connector = connect(mapStateToProps);
const Category = (props: CategoryProps) => {
  const {myCategories, allCategories} = props;
  const [localCategories, setMyCategories] = useState(myCategories);
  const categoryGroups = _.groupBy(allCategories, item => item.classify);
  const renderItem = (item: ICategory) => {
    return <CategoryItem data={item} />;
  };
  return (
    <ScrollView style={styles.categoryContainer}>
      <Text style={styles.classifyName}>我的分类</Text>
      <View style={styles.classifyView}>{localCategories.map(renderItem)}</View>
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

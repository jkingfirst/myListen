import {View, Text} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {ICategory} from '@t/category';
const mapStateToProps = ({category}: RootState) => ({
  myCategories: category.myCategories,
  allCategories: category.allCategories,
});
type CategoryMode = ConnectedProps<typeof connector>;
interface CategoryProps extends CategoryMode {}
const connector = connect(mapStateToProps);
const Category = (props: CategoryProps) => {
  const {myCategories, allCategories} = props;
  console.log(allCategories, myCategories, '*******************');
  const renderItem = (item: ICategory) => {
    return (
      <View key={item.id}>
        <Text>{item.name}</Text>
      </View>
    );
  };
  return (
    <View>
      <Text>我的分类</Text>
      <View>{myCategories.map(renderItem)}</View>
      <Text>所有分类</Text>
      <View>{allCategories.map(renderItem)}</View>
    </View>
  );
};
export default connector(Category);

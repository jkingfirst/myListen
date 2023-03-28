import {View, Text, FlatList, ListRenderItemInfo} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {IProgram} from '@t/album';
import ProgramItem from '@p/Album/components/ProgramItem';
import {zipWith} from 'lodash';
const mapStateToProps = ({album}: RootState) => ({
  list: album.list,
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface ListProps extends ModelState {}
const ProgramList = (props: ListProps) => {
  const {list} = props;
  const keyExtractor = (item: IProgram) => {
    return item.id;
  };
  const goDetail = (item: IProgram) => {
    console.log(item);
  };
  const renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
    return <ProgramItem item={item} index={index} goDetail={goDetail} />;
  };
  return (
    <View>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};
export default connector(ProgramList);

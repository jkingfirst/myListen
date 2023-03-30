import {View, Text, FlatList, ListRenderItemInfo} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {IProgram} from '@t/album';
import ProgramItem from '@p/Album/components/ProgramItem';
import {ModalRootStackNavigation} from '@t/navigation';
import {useNavigation} from '@react-navigation/native';
const mapStateToProps = ({album}: RootState) => ({
  list: album.list,
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface ListProps extends ModelState {
  navigation: ModalRootStackNavigation;
}
const ProgramList = (props: ListProps) => {
  const navigation = useNavigation<ModalRootStackNavigation>();
  const {list} = props;
  const keyExtractor = (item: IProgram) => {
    return item.id;
  };
  const goDetail = (item: IProgram) => {
    navigation.push('Play', {
      id: item.id,
    });
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

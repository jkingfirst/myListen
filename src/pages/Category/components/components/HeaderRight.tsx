import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
const mapStateToProps = ({category}: RootState) => ({
  isEdit: category.isEdit,
});
const connector = connect(mapStateToProps);
type modelState = ConnectedProps<typeof connector>;
interface IProp extends modelState {
  handleBtn: () => void;
}
const HeaderRight = function (props: IProp) {
  console.log('hello');
  const {isEdit} = props;
  return (
    <HeaderButtons>
      <Item
        title={isEdit ? '完成' : '编辑'}
        color={'#333'}
        onPress={props.handleBtn}
      />
    </HeaderButtons>
  );
};
export default connector(HeaderRight);

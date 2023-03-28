import {Fragment} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
const mapStateToProps = ({album}: RootState) => ({
  introduction: album.introduction,
});
type ModelState = ConnectedProps<typeof connector>;
interface SummaryProp extends ModelState {}
const connector = connect(mapStateToProps);
const Summary = (props: SummaryProp) => {
  const {introduction} = props;
  // const re = new RegExp('\\\\n', 'g');
  // const newIntroduction = introduction.replace(re, "{'\n'}");
  // console.log(newIntroduction, '**********👌');
  const newIntroduction = introduction.split('\\n');
  return (
    <View style={styles.container}>
      {newIntroduction.map((item, index) => {
        return (
          <Fragment key={index}>
            <Text>{item}</Text>
          </Fragment>
        );
      })}
    </View>
  );
};
export default connector(Summary);
const styles = StyleSheet.create({
  container: {
    fontSize: 14,
    color: '#999',
    padding: 10,
  },
});

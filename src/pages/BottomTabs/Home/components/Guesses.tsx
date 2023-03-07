import { View, Text, FlatList,Image, StyleSheet } from "react-native";
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {useMount} from '@u/customHooks'
const mapPropsToState = ({home}: RootState) => ({
  guesses: home.guesses,
});
const connector = connect(mapPropsToState);
type StateModel = ConnectedProps<typeof connector>
const Guesses = (props: StateModel) => {
  const {dispatch, guesses} = props;
  const getGuessList=()=>{
    dispatch({
      type: 'home/fetchGuess'
    })
  }
  const renderItem = ({item})=>{
    return(<View style={styles.item}>
      <Image source={{uri:item.image}} style={styles.image} />
      <Text numberOfLines={2}>{item.title}</Text>
    </View>)
  }
  useMount(getGuessList)
  return (
    <View style={styles.flatWrapper}>
      <FlatList numColumns={3} keyExtractor={item=>item.image} data={guesses} renderItem={renderItem} />
    </View>
  );
};
export default connector(Guesses);
const styles = StyleSheet.create({
  flatWrapper:{
    margin:16,
    backgroundColor:'#fff'
  },
  item:{
    flex:1,
    marginHorizontal:6,
    marginVertical:10,
  },
  image:{
    width:'100%',
    height:100,
    borderRadius:8,
    marginBottom:10,
  }
})

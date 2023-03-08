import { FlatList, ListRenderItemInfo } from "react-native";
import {connect,ConnectedProps} from 'react-redux'
import { RootState } from "@m/index";
import ChannelItem from "@p/BottomTabs/Home/components/Channel/ChannelItem";
import { useMount } from "@u/customHooks";
import { IChannel } from "@t/home";
const mapPropsToState = ({home}:RootState)=>({
  channels: home.channels
})
const connector = connect(mapPropsToState)
interface ChannelProps extends ConnectedProps<typeof connector> {}
const Channel = (props: ChannelProps)=>{
  const {channels,dispatch} = props
  const getChannelList=()=>{
    dispatch({
      type: 'home/fetchChannel'
    })
  }
  const handleItem = (data: IChannel[])=>{
    console.log(data);
  }
  useMount(getChannelList)
  const renderItem=({item}:ListRenderItemInfo<IChannel>)=>{
    return (<ChannelItem data={item} />)
  }

  return <FlatList data={channels} renderItem={renderItem}/>
}
export default connector(Channel)

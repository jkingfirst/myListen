import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ListRenderItemInfo} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useMount} from '@u/customHooks';
import {IFound} from '@t/found';
import FoundItem from '@p/Login/components/FoundItem';
export default function Found() {
  const dispatch = useDispatch();
  const [list, setList] = useState<IFound[]>([]);
  const [currentId, setCurrentId] = useState('');
  useMount(() => {
    dispatch({
      type: 'found/getFoundList',
      cb: (list: IFound[]) => {
        console.log(list, '🚀🚀🚀🚀🚀');
        setList(list);
      },
    });
  });
  const setCurrentPlayId = (id: string) => {
    setCurrentId(id);
  };
  const renderItem = ({item}: ListRenderItemInfo<IFound>) => {
    return (
      <FoundItem
        data={item}
        pause={item.id !== currentId}
        setCurrentId={setCurrentPlayId}
      />
    );
  };
  const keyExtractor = (item: IFound) => item.id;
  return (
    <View>
      <View>
        <Text>{currentId}</Text>
      </View>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

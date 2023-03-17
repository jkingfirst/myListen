import {ICategory} from '@t/category';
import {StyleSheet, Text, View} from 'react-native';
import {viewWidth} from '@u/tools';

interface Iprop {
  data: ICategory;
}
export default function CategoryItem(props: Iprop) {
  const {data} = props;
  return (
    <View key={data.id} style={styles.classifyContainer}>
      <View style={styles.textContent}>
        <Text numberOfLines={1}>{data.name}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  classifyContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: (viewWidth - 10) / 4,
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  textContent: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
});

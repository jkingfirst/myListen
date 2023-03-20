import {ICategory} from '@t/category';
import {StyleSheet, Text, View} from 'react-native';
import {viewWidth} from '@u/tools';

interface Iprop {
  data: ICategory;
  isEdit: boolean;
  selected: boolean;
  disabled?: boolean;
}
export default function CategoryItem(props: Iprop) {
  const {data, isEdit, disabled, selected} = props;
  return (
    <View key={data.id} style={styles.classifyContainer}>
      <View style={[styles.textContent, disabled && styles.disabled]}>
        <Text numberOfLines={1}>{data.name}</Text>
        {isEdit && !disabled && (
          <View style={styles.icon}>
            <Text style={styles.iconText}>{selected ? '-' : '+'}</Text>
          </View>
        )}
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
  disabled: {
    backgroundColor: '#ccc',
  },
  icon: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f86442',
    borderRadius: 8,
  },
  iconText: {
    color: '#fff',
    lineHeight: 15,
  },
});

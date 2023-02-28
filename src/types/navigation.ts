import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
type StackPage = 'BottomTabs' | 'Detail';
export type RootStackParamsList = Record<StackPage, undefined>;
export type RootStackNavigation =
  NativeStackNavigationProp<RootStackParamsList>;

type BottomTabsPage = 'Index' | 'Listen' | 'Found' | 'Account';
export type BottomTabsParamsList = Record<BottomTabsPage, undefined>;

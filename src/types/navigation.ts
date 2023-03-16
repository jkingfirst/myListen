import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes} from '@const/routes';
type StackPage = 'BottomTabs' | 'Detail' | 'Category';
export type RootStackParamsList = Record<StackPage, undefined>;
export type RootStackNavigation =
  NativeStackNavigationProp<RootStackParamsList>;
type BottomTabsPage =
  | Routes.HOME
  | Routes.LISTEN
  | Routes.FOUND
  | Routes.ACCOUNT;
export type BottomTabsParamsList = Record<BottomTabsPage, undefined>;

type TopTabsPage = 'index';
export type TopTabsParamsList = Record<TopTabsPage, undefined>;
type a = Record<string, null>;
const b: a = {a: null};

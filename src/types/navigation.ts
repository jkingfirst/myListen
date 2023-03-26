import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes} from '@const/routes';
type StackPage = 'BottomTabs' | 'Album' | 'Category';
export type RootStackParamsList = {
  BottomTabs: undefined;
  Album: {
    item: {
      title: string;
      id: string;
      image: string;
    };
  };
  Category: undefined;
};
export type RootStackNavigation =
  NativeStackNavigationProp<RootStackParamsList>;
type BottomTabsPage =
  | Routes.HOME
  | Routes.LISTEN
  | Routes.FOUND
  | Routes.ACCOUNT;
export type BottomTabsParamsList = Record<BottomTabsPage, undefined>;

type TopTabsPage = string;
export type TopTabsParamsList = Record<TopTabsPage, {namespace: string}>;

import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes} from '@const/routes';
export type ModelRootStackParamsList = {
  Root: undefined;
  Play: {
    id: string;
  };
};

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
export type ModalRootStackNavigation =
  NativeStackNavigationProp<ModelRootStackParamsList>;
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

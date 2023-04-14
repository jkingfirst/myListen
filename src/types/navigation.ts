import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {StackNavigationProp} from '@react-navigation/stack';

export type ModelRootStackParamsList = {
  Root: undefined;
  Play: {
    id?: string;
  };
  Login: undefined;
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
export type BottomTabsParamsList = {
  TopTabs: undefined;
  listen: undefined;
  playButton: undefined;
  found: undefined;
  account: undefined;
};
export type BottomTabNavigation =
  NativeStackNavigationProp<BottomTabsParamsList>;
type TopTabsPage = string;
export type TopTabsParamsList = Record<TopTabsPage, {namespace: string}>;
export type GlobalScreenNavigationProp =
  StackNavigationProp<ModelRootStackParamsList>;

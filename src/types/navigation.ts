import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
export type ModelRootStackParamsList = {
  Root: undefined;
  Play: {
    id?: string;
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

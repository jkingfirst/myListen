import {createNavigationContainerRef} from '@react-navigation/native';
const navigationRef = createNavigationContainerRef();
const navigate = (name: string, params: any) => {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name, params);
  }
};
const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
};
export {navigationRef, navigate, goBack};

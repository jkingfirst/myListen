import {TabView, SceneMap} from 'react-native-tab-view';
import Summary from '@p/Album/components/Summary';
import ProgramList from '@p/Album/components/ProgramList';
import {useState} from 'react';
interface IRoute {
  title: string;
  key: string;
}
const renderScene = ({route}: {route: IRoute}) => {
  switch (route.key) {
    case 'summary': {
      return <Summary />;
    }
    case 'programList': {
      return <ProgramList />;
    }
  }
};
const Tab = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState<IRoute[]>([
    {key: 'summary', title: '简介'},
    {key: 'programList', title: '列表'},
  ]);
  return (
    <TabView
      renderScene={renderScene}
      navigationState={{index, routes}}
      onIndexChange={setIndex}
    />
  );
};
export default Tab;

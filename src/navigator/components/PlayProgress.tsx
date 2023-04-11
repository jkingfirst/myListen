import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {ReactNode} from 'react';
import colors from '@const/colors';
const mapStateToProps = ({player}: RootState) => ({
  currentTime: player.currentTime,
  duration: player.duration,
});
type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  children: ReactNode;
}
const connector = connect(mapStateToProps);
const PlayProgress = (props: IProps) => {
  const {children, duration, currentTime} = props;
  const fill = duration ? (currentTime / duration) * 100 : 0;
  return (
    <AnimatedCircularProgress
      size={42}
      width={2}
      fill={fill}
      tintColor={colors.primary}
      backgroundColor={colors.bgColor}>
      {() => <>{children}</>}
    </AnimatedCircularProgress>
  );
};
export default connector(PlayProgress);

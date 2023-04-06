/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconMusic: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M950.857143 128v640q0 28.571429-19.428572 50.857143t-49.142857 34.571428-59.142857 18.285715-55.142857 6-55.142857-6-59.142857-18.285715-49.142857-34.571428-19.428572-50.857143 19.428572-50.857143 49.142857-34.571428 59.142857-18.285715 55.142857-6q60 0 109.714286 22.285715V373.714286L438.857143 509.142857v405.142857q0 28.571429-19.428572 50.857143t-49.142857 34.571429-59.142857 18.285714T256 1024t-55.142857-6-59.142857-18.285714-49.142857-34.571429-19.428572-50.857143 19.428572-50.857143 49.142857-34.571428 59.142857-18.285714T256 804.571429q60 0 109.714286 22.285714V274.285714q0-17.714286 10.857143-32.285714t28-20.285714l475.428571-146.285715q6.857143-2.285714 16-2.285714 22.857143 0 38.857143 16t16 38.857143z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconMusic.defaultProps = {
  size: 18,
};

IconMusic = React.memo ? React.memo(IconMusic) : IconMusic;

export default IconMusic;

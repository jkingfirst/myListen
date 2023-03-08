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

let IconMore: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M390.948571 897.462857a53.028571 53.028571 0 0 1-38.765714-16.091428 54.491429 54.491429 0 0 1 0-77.531429l288.914286-288.914286-288.914286-288.914285a54.491429 54.491429 0 0 1 0-77.531429 55.222857 55.222857 0 0 1 77.531429 0l365.714285 365.714286-365.714285 365.714285a54.125714 54.125714 0 0 1-38.765715 17.554286z"
        fill={getIconColor(color, 0, '#161616')}
      />
    </Svg>
  );
};

IconMore.defaultProps = {
  size: 18,
};

IconMore = React.memo ? React.memo(IconMore) : IconMore;

export default IconMore;

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

let IconDuration: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M511.1 295.1c-119.5 0-216.8 97.3-216.8 216.8s97.3 216.8 216.8 216.8 216.8-97.3 216.8-216.8-97.3-216.8-216.8-216.8z m127.2 254h-135c-4.4 0-8.4-2.3-11.4-6-3.7-3.1-6-7-6-11.4v-135c0-9.6 10.8-17.5 24-17.5s24 7.9 24 17.5v104.4h104.4c9.6 0 17.4 10.8 17.4 24s-7.8 24-17.4 24z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M511.1 63.9c-247.4 0-448 200.6-448 448s200.6 448 448 448 448-200.6 448-448-200.6-448-448-448z m0 740.7c-161.4 0-292.7-131.3-292.7-292.7s131.3-292.7 292.7-292.7 292.7 131.3 292.7 292.7-131.3 292.7-292.7 292.7z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconDuration.defaultProps = {
  size: 18,
};

IconDuration = React.memo ? React.memo(IconDuration) : IconDuration;

export default IconDuration;

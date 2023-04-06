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

let IconPause: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m0-938.666667C277.333333 85.333333 85.333333 277.333333 85.333333 512s192 426.666667 426.666667 426.666667 426.666667-192 426.666667-426.666667S746.666667 85.333333 512 85.333333z"
        fill={getIconColor(color, 0, '#374151')}
      />
      <Path
        d="M392.533333 733.866667c-25.6 0-42.666667-17.066667-42.666666-42.666667V332.8c0-25.6 17.066667-42.666667 42.666666-42.666667s42.666667 17.066667 42.666667 42.666667v354.133333c0 25.6-17.066667 46.933333-42.666667 46.933334zM631.466667 733.866667c-25.6 0-42.666667-17.066667-42.666667-42.666667V332.8c0-25.6 17.066667-42.666667 42.666667-42.666667s42.666667 17.066667 42.666666 42.666667v354.133333c0 25.6-21.333333 46.933333-42.666666 46.933334z"
        fill={getIconColor(color, 1, '#374151')}
      />
    </Svg>
  );
};

IconPause.defaultProps = {
  size: 18,
};

IconPause = React.memo ? React.memo(IconPause) : IconPause;

export default IconPause;

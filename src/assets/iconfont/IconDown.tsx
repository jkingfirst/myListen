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

let IconDown: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M467.231 780.553 19.669 332.991c-24.753-24.752-24.753-64.788 0-89.541 24.681-24.682 64.788-24.753 89.541 0l402.792 402.791L914.793 243.45c24.682-24.682 64.788-24.753 89.541 0 24.753 24.752 24.681 64.788 0 89.541L556.771 780.553C532.02 805.234 491.984 805.234 467.231 780.553z"
        fill={getIconColor(color, 0, '#272636')}
      />
    </Svg>
  );
};

IconDown.defaultProps = {
  size: 18,
};

IconDown = React.memo ? React.memo(IconDown) : IconDown;

export default IconDown;

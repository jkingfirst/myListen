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

let IconHome: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1030 1024" width={size} height={size} {...rest}>
      <Path
        d="M996.7104 441.97888 609.4336 38.8096C585.36448 13.77792 553.20064 0 518.72256 0S452.08064 13.77792 428.01664 38.8096L40.73984 441.97888c-39.9616 41.61536-34.816 77.58336-28.2112 92.61056 4.70528 10.65984 20.60288 39.9616 66.39616 39.9616l56.76544 0 0 310.15936c0 70.41536 50.56 136.71936 122.41408 136.71936l65.14688 0L422.9632 1021.42976l0-72.87808 0-255.36c0-35.19488-5.32992-54.79936 30.61248-54.79936l65.14688 0 65.14688 0c35.93728 0 30.61248 19.60448 30.61248 54.79936l0 255.36 0 72.87808 99.71712 0 65.152 0c71.84896 0 122.40384-66.304 122.40384-136.71936l0-310.15936 56.77056 0c45.77792 0 61.68576-29.30176 66.39616-39.9616C1031.53664 519.56736 1036.672 483.59424 996.7104 441.97888z"
        fill={getIconColor(color, 0, '#686868')}
      />
    </Svg>
  );
};

IconHome.defaultProps = {
  size: 18,
};

IconHome = React.memo ? React.memo(IconHome) : IconHome;

export default IconHome;

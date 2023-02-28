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

let IconWodeWode: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M521.798086 543.293888c149.770748 0 271.746924-121.976177 271.746925-271.746925S671.568834 0 521.798086 0 250.051162 121.976177 250.051162 271.746924s121.976177 271.546963 271.746924 271.546964zM942.115993 775.248584c-19.396212-41.591877-46.990822-79.184534-81.983988-111.778168-70.386253-65.387229-164.567858-102.979887-258.14958-102.979887h-160.168717c-93.781683 0-187.763327 37.592658-258.14958 102.979887-34.993165 32.593634-62.587776 70.186292-81.983987 111.778168-20.396016 43.791447-30.793986 89.782464-30.793986 137.173209 0 61.587971 49.990236 111.578207 111.578207 111.578207h678.867409c61.587971 0 111.578207-49.990236 111.578208-111.578207-0.199961-47.390744-10.397969-93.581722-30.793986-137.173209z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconWodeWode.defaultProps = {
  size: 18,
};

IconWodeWode = React.memo ? React.memo(IconWodeWode) : IconWodeWode;

export default IconWodeWode;

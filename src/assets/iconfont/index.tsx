/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconShoucangxuanzhong from './IconShoucangxuanzhong';
import IconShouye from './IconShouye';
import IconWodeWode from './IconWodeWode';
import IconFaxian from './IconFaxian';
export { default as IconShoucangxuanzhong } from './IconShoucangxuanzhong';
export { default as IconShouye } from './IconShouye';
export { default as IconWodeWode } from './IconWodeWode';
export { default as IconFaxian } from './IconFaxian';

export type IconNames = 'icon-shoucangxuanzhong' | 'icon-shouye' | 'icon-wode-wode' | 'icon-faxian';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-shoucangxuanzhong':
      return <IconShoucangxuanzhong key="1" {...rest} />;
    case 'icon-shouye':
      return <IconShouye key="2" {...rest} />;
    case 'icon-wode-wode':
      return <IconWodeWode key="3" {...rest} />;
    case 'icon-faxian':
      return <IconFaxian key="4" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;

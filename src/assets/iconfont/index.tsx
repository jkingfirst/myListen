/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconMore from './IconMore';
import IconRefresh from './IconRefresh';
import IconFavorite from './IconFavorite';
import IconListen from './IconListen';
import IconHome from './IconHome';
import IconAccount from './IconAccount';
import IconFound from './IconFound';
export { default as IconMore } from './IconMore';
export { default as IconRefresh } from './IconRefresh';
export { default as IconFavorite } from './IconFavorite';
export { default as IconListen } from './IconListen';
export { default as IconHome } from './IconHome';
export { default as IconAccount } from './IconAccount';
export { default as IconFound } from './IconFound';

export type IconNames = 'icon-more' | 'icon-refresh' | 'icon-favorite' | 'icon-listen' | 'icon-home' | 'icon-account' | 'icon-found';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-more':
      return <IconMore key="1" {...rest} />;
    case 'icon-refresh':
      return <IconRefresh key="2" {...rest} />;
    case 'icon-favorite':
      return <IconFavorite key="3" {...rest} />;
    case 'icon-listen':
      return <IconListen key="4" {...rest} />;
    case 'icon-home':
      return <IconHome key="5" {...rest} />;
    case 'icon-account':
      return <IconAccount key="6" {...rest} />;
    case 'icon-found':
      return <IconFound key="7" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;

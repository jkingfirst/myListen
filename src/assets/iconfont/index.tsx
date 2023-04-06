/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconPause from './IconPause';
import IconEarphone from './IconEarphone';
import IconMessage from './IconMessage';
import IconVoice from './IconVoice';
import IconPrevious from './IconPrevious';
import IconNext from './IconNext';
import IconDown from './IconDown';
import IconPlay from './IconPlay';
import IconMusic from './IconMusic';
import IconDuration from './IconDuration';
import IconMore from './IconMore';
import IconRefresh from './IconRefresh';
import IconFavorite from './IconFavorite';
import IconListen from './IconListen';
import IconHome from './IconHome';
import IconAccount from './IconAccount';
import IconFound from './IconFound';
export { default as IconPause } from './IconPause';
export { default as IconEarphone } from './IconEarphone';
export { default as IconMessage } from './IconMessage';
export { default as IconVoice } from './IconVoice';
export { default as IconPrevious } from './IconPrevious';
export { default as IconNext } from './IconNext';
export { default as IconDown } from './IconDown';
export { default as IconPlay } from './IconPlay';
export { default as IconMusic } from './IconMusic';
export { default as IconDuration } from './IconDuration';
export { default as IconMore } from './IconMore';
export { default as IconRefresh } from './IconRefresh';
export { default as IconFavorite } from './IconFavorite';
export { default as IconListen } from './IconListen';
export { default as IconHome } from './IconHome';
export { default as IconAccount } from './IconAccount';
export { default as IconFound } from './IconFound';

export type IconNames = 'icon-pause' | 'icon-earphone' | 'icon-message' | 'icon-voice' | 'icon-previous' | 'icon-next' | 'icon-down' | 'icon-play' | 'icon-music' | 'icon-duration' | 'icon-more' | 'icon-refresh' | 'icon-favorite' | 'icon-listen' | 'icon-home' | 'icon-account' | 'icon-found';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-pause':
      return <IconPause key="1" {...rest} />;
    case 'icon-earphone':
      return <IconEarphone key="2" {...rest} />;
    case 'icon-message':
      return <IconMessage key="3" {...rest} />;
    case 'icon-voice':
      return <IconVoice key="4" {...rest} />;
    case 'icon-previous':
      return <IconPrevious key="5" {...rest} />;
    case 'icon-next':
      return <IconNext key="6" {...rest} />;
    case 'icon-down':
      return <IconDown key="7" {...rest} />;
    case 'icon-play':
      return <IconPlay key="8" {...rest} />;
    case 'icon-music':
      return <IconMusic key="9" {...rest} />;
    case 'icon-duration':
      return <IconDuration key="10" {...rest} />;
    case 'icon-more':
      return <IconMore key="11" {...rest} />;
    case 'icon-refresh':
      return <IconRefresh key="12" {...rest} />;
    case 'icon-favorite':
      return <IconFavorite key="13" {...rest} />;
    case 'icon-listen':
      return <IconListen key="14" {...rest} />;
    case 'icon-home':
      return <IconHome key="15" {...rest} />;
    case 'icon-account':
      return <IconAccount key="16" {...rest} />;
    case 'icon-found':
      return <IconFound key="17" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;

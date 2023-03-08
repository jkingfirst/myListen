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

let IconFavorite: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1025 1024" width={size} height={size} {...rest}>
      <Path
        d="M935.669676 115.583774C871.255802 51.1699 792.995954 24.681952 709.318118 37.925926c-66.219871 10.23398-133.643739 45.751911-196.853616 102.3398C448.652627 83.677837 381.228759 48.159906 315.008888 37.925926 231.331051 24.681952 153.071204 51.1699 88.65733 115.583774 23.641457 180.599647-7.060483 266.08348 1.367501 355.781305c9.029982 89.095826 55.383892 178.191652 134.245738 257.053498 12.039976 12.039976 55.985891 55.985891 100.533804 100.533804l0 0c53.577895 54.179894 108.359788 108.961787 109.563786 110.165785 0.601999 0.601999 1.203998 0.601999 1.805996 1.203998L511.862503 989.084068l48.761905-48.159906 4.815991-4.213992c9.029982 0 265.481481-267.287478 322.069371-324.477366 78.861846-78.861846 125.215755-167.957672 134.245738-257.053498C1031.387489 266.08348 1000.685549 180.599647 935.669676 115.583774zM147.653215 322.67137c-6.019988 18.059965-9.631981 34.915932-10.835979 47.557907-1.805996 13.845973-13.243974 24.079953-27.089947 24.079953l-1.805996 0c-16.855967 0-30.099941-15.651969-27.089947-32.507937 3.611993-21.069959 9.029982-40.333921 15.049971-57.791887 6.019988-16.253968 25.283951-22.875955 40.333921-14.447972 0 0 0.601999 0 0.601999 0C147.051216 296.183422 151.867207 310.029394 147.653215 322.67137zM364.372792 140.867725c0 13.243974-9.029982 24.681952-22.273956 27.089947-79.463845 13.243974-127.623751 48.159906-158.325691 86.687831-8.427984 10.835979-24.079953 13.845973-36.119929 6.621987 0 0-0.601999 0-0.601999 0-13.845973-8.427984-16.855967-27.691946-7.223986-40.93592 60.199882-78.861846 146.285714-103.543798 192.639624-110.767784 16.855967-2.407995 31.303939 10.23398 31.303939 27.089947L363.770793 140.867725z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconFavorite.defaultProps = {
  size: 18,
};

IconFavorite = React.memo ? React.memo(IconFavorite) : IconFavorite;

export default IconFavorite;
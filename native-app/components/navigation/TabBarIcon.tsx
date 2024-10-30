// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Feathericon from '@expo/vector-icons/Feather';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Feathericon>['name']>) {
  return <Feathericon size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}

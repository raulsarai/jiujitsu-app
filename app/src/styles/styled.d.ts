

import 'styled-components/native';
import { theme } from './theme';

type AppTheme = typeof theme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends AppTheme {}
}
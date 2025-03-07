/// <reference types="react-scripts" />

import { Theme } from './styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

declare module 'framer-motion';
declare module '@emotion/react';
declare module '@emotion/styled'; 
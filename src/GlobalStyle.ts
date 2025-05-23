import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; font-family: sans-serif; background: #eaeaea; }
`;

export const Container = styled.div`
  display: grid;
  grid-template:
    "title title title" auto
    "input input input" auto
    "planned inProgress done" 1fr
    / 1fr 1fr 1fr;
  gap: 1rem;
  width: 90vw;
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;
  padding: 1rem;
`;

export const Title = styled.h1`
  grid-area: title;
  text-align: center;
  margin: 0;
`;
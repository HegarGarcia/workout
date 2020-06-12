import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr minmax(0, 56px);
  grid-template-areas:
    'header'
    'main'
    'footer';

  & > header {
    grid-area: header;
  }

  & > main {
    grid-area: main;
  }

  & > footer {
    grid-area: footer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Container;

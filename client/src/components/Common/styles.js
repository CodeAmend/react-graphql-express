import styled from 'styled-components';


export const Wrapper = styled.main`
  margin-top: 3rem;
  text-align: center;


  h1 {
    position: relative;
  }

  h1::after {
    position: absolute;
    content: '';

    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);

    height: 1px;
    width: 30rem;

    background-color: lightgray;
  }

  p,
  li {
    font-size: 2rem;
  }

  input,
  select,
  textarea {
    padding: 0.4em 0.2em;
    font-size: 2rem;
  }

  a,
  a:link {
    text-decoration: none;
    font-size: inherit;
    font-weight: 100;
  }

  .active {
    font-weight: bold;
  }
`;

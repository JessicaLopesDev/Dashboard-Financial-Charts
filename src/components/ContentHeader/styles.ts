import styled from 'styled-components';

interface ITitleProps {
  lineColor: string;
}

export const Container = styled.div`
  width: 100%;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;

  @media(max-width: 320px) {
    flex-direction: column;
  }
`;

export const Title = styled.h2<ITitleProps>`
  font-size: 30px;
  color: ${props => props.theme.colors.white};

  &::after {
    content: '';
    display: block;
    width: 55px;
    border-bottom: 10px solid ${props => props.lineColor};
  }

  @media(max-width: 420px) {
    font-size: 18px;

    &::after {
    content: '';
    display: block;
    width: 55px;
    border-bottom: 5px solid ${props => props.lineColor};
    }
  }
`;

export const Controllers = styled.div`
  display: flex;

  @media(max-width: 320px) {
    width: 100%;
    justify-content: space-around;
    margin-top: 20px;
  }
`;



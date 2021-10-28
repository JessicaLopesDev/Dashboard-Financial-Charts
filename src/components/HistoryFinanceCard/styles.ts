import styled, { keyframes } from 'styled-components';

interface ITagProps {
  color: string;
}

const animate = keyframes`
  0% {
    transform: translateX(-100px);
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
`;

export const Container = styled.li`
  background-color: ${props => props.theme.colors.tertiary};
  border-radius: 10px;
  margin: 10px 0;
  padding: 12px 10px;
  list-style: none;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  transition: 0.3s;

  position: relative;

  animation: ${animate} 0.5s ease;

  &:hover {
    opacity: 0.7;
    transform: translateX(10px);
  }
`;

export const Tag = styled.div<ITagProps>`
  width: 13px;
  height: 60%;

  background-color: ${props => props.color};

  position: absolute;
  left: 0;
`;

export const CardTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding-left: 10px;

  > span {
    font-size: 22px;
    font-weight: 500;
  }
`;

export const CardAmount = styled.h3`
  
`;




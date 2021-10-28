import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const Filters = styled.div`
  width: 100%;
  margin-bottom: 30px;

  display: flex;
  justify-content: center;

  .tag-filter {
    font-size: 18px;
    font-weight: 500;
    background: none;
    color: ${props => props.theme.colors.white};

    margin: 0 10px;

    opacity: 0.4;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }

  .tag-filter-recurrents::after {
      content: '';
      display: block;
      width: 55px;
      margin: 5px auto;
      border-bottom: 10px solid ${props => props.theme.colors.success};
    }

    .tag-filter-eventual::after {
      content: '';
      display: block;
      width: 55px;
      margin: 5px auto;
      border-bottom: 10px solid ${props => props.theme.colors.warning};
    }

    .tag-actived {
      opacity: 1;
    }
`;

export const Content = styled.main`
  
`;
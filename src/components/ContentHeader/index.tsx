import React from 'react';
import * as S from './styles';

interface IContentHeaderProps {
  title: string;
  lineColor: string;
  children: React.ReactNode
}

const ContentHeader: React.FC<IContentHeaderProps> = ({
  title, lineColor, children
}) => {
  
  return (
    <S.Container >
      <S.Title lineColor={lineColor}>
        {title}
      </S.Title>
      <S.Controllers>
        { children }
      </S.Controllers>
    </S.Container>
  )
}

export default ContentHeader;
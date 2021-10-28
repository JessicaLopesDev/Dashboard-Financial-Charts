import React from 'react';
import * as S from './styles';

interface IMessagBoxProps {
  title: string;
  description: string;
  footerText: string;
  icon: string;
}

const MessageBox: React.FC<IMessagBoxProps> = ({
  title,
  description,
  footerText,
  icon
}) => {
  return (
    <S.Container>
      <header>
        <h2>
          {title} 
          <img src={icon} alt={title} />
        </h2>
        <p>{description}</p>
      </header>

      <footer>
        <span>{footerText}</span>
      </footer>
    </S.Container>
  )
}

export default MessageBox;
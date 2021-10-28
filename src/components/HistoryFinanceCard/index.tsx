import React from 'react';
import * as S from './styles';

interface IHistoryFinanceCardProps {
  tagColor: string;
  title: string;
  subtitle: string;
  amount: string;
}

const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({
  tagColor,
  title,
  subtitle,
  amount
}) => {
  

  return (
    <S.Container >
      <S.Tag color={tagColor} />
      <S.CardTitle>
        <span>{title}</span>
        <small>{subtitle}</small>
      </S.CardTitle>
      <S.CardAmount>{amount}</S.CardAmount>
      
    </S.Container>
  )
}

export default HistoryFinanceCard;
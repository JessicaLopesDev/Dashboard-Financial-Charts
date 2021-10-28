import React, { useMemo } from 'react';
import dollarImg from '../../assets/dollar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';
import * as S from './styles';
import CountUp from 'react-countup';

interface IWalletBoxProps {
  title: string;
  amount: number;
  footerLabel: string;
  icon: 'dollar' | 'arrowUp' | 'arrowDown';
  color: string;
}

const WalletBox: React.FC<IWalletBoxProps> = ({ 
  title,
  amount,
  footerLabel,
  icon,
  color
}) => {

  const iconSelected = useMemo(() => {
    switch (icon) {
      case 'dollar':
        return dollarImg;
      case 'arrowUp':
          return arrowUpImg;
      case 'arrowDown':
        return arrowDownImg;
      default:
        return undefined;
    } 
  },[icon])

  return (
    <S.Container color={color}>
      <span>{title}</span>
      <h1>
        <strong>R$ </strong>
        <CountUp 
          end={amount}
          separator="."
          decimal=","
          decimals={2}
          duration={1.5}
        />
      </h1>
      <small>{footerLabel}</small>
      <img src={iconSelected} alt={title}/>
    </S.Container>
  )
}

export default WalletBox;
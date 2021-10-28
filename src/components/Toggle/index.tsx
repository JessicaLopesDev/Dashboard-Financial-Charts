import React from 'react';
import * as S from './styles';

interface IToggleProps {
  leftLabel: string;
  rightLabel: string;
  checked: boolean;
  onChange(): void;
}

const Toggle: React.FC<IToggleProps> = ({
  leftLabel,
  rightLabel,
  checked,
  onChange
}) => {
  return (
    <S.Container>
      <S.ToggleLable>{leftLabel}</S.ToggleLable>
      <S.ToggleSelector 
        checked={checked}
        uncheckedIcon={false}
        checkedIcon={false}
        onChange={onChange}
      />
      <S.ToggleLable>{rightLabel}</S.ToggleLable>
    </S.Container>
  )
}

export default Toggle;
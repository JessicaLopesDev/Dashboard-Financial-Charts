import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  Cell
} from 'recharts';
import formatCurrency from '../../utils/formatCurrency';
import * as S from './styles';

interface IBarChartBoxProps {
  title: string;
  data: {
    name: string;
    amount: number;
    percent: number;
    color: string;
  }[]
}

const BarChartBox: React.FC<IBarChartBoxProps> = ({ title, data }) => {
  return (
    <S.Container>
      <S.LeftSide>
        <h2>{title}</h2>
        <S.LegendContainer>
          {
            data.map((indicator, index) => (
              <S.Legend 
                color={indicator.color}
                key={index}
              >
                <div>{indicator.percent}%</div>
                <span>{indicator.name}</span>
              </S.Legend>
            ))
          }
        </S.LegendContainer>
      </S.LeftSide>

      <S.RightSide>
        <ResponsiveContainer>
          <BarChart data={data}>
            <Bar dataKey="amount" name="Valor">
              {data.map((indicator, index) => (
                <Cell 
                  key={index}
                  fill={indicator.color}
                  cursor="pointer"
                />
              ))}
            </Bar>
            <Tooltip 
              cursor={{fill: 'none'}} 
              formatter={(value: number) => formatCurrency(Number(value))}/>
          </BarChart>
        </ResponsiveContainer>
      </S.RightSide>
      
    </S.Container>
  )
}

export default BarChartBox;
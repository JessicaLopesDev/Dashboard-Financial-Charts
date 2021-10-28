import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';
import * as S from './styles';

interface IPieChartGraficProps {
  data: {
    name: string;
    value: number;
    percent: number;
    color: string;
  }[];
}

const PieChartGrafic: React.FC<IPieChartGraficProps> = ({ data }) => (
    <S.Container>
      <S.LeftSide>
        <h2>Relação</h2>
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
          <PieChart>
            <Pie 
              data={data}
              dataKey="percent"
            >
              {
                data.map((indicator, index) => (
                  <Cell key={index} fill={indicator.color} />
                ))
              }
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </S.RightSide>
      
    </S.Container>
  )

export default PieChartGrafic;
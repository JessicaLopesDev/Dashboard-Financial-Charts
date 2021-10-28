/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

import * as S from './styles';

interface IRouteParams {
  match: {
    params: {
      type: string;
    }
  }
}

interface IData {
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
  const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente', 'eventual']);

  const movimentType = match.params.type;

  const pageData = useMemo(() => {
    return movimentType === 'entry-balance' ? 
      {
        title: 'Entradas',
        lineColor: '#4E41F0',
        data: gains
      }: {
        title: 'Saídas',
        lineColor: '#E44C4E',
        data: expenses
      }
  },[movimentType]);


  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    const { data } = pageData;
    
    data.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if(!uniqueYears.includes(year)) {
        uniqueYears.push(year)
      }
    });

    return uniqueYears.map(year => {
      return {
        value: year,
        label: year
      }
    });
  },[pageData]);


  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month
      }
    });
  },[]);


  function handleFrequencyClick(frequency: string = 'teste') {
    const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

    if(alreadySelected >= 0) {
      const filtered = frequencyFilterSelected.filter(item => item !== frequency);
      setFrequencyFilterSelected(filtered);
    } else {
      setFrequencyFilterSelected((prev) => [...prev, frequency]);
    }
  }

  function handleMonthSelected(month: string) {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch {
      throw new Error('Invalid month value. Is accept 0 - 12.')
    }
  }

  function handleYearSelected(year: string) {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch {
      throw new Error('Invalid year value. Is accept integer nubers.')
    }
  }

  useEffect(() => {
    const { data } = pageData;

    const filteredData = data.filter(item => {
        const date = new Date(item.date);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        
        return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
    });

    const formattedData = filteredData.map(item => {
      return {
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
      }
    })
    setData(formattedData)
    
  },[pageData, monthSelected, yearSelected, frequencyFilterSelected])

  return (
    <S.Container>
      <ContentHeader 
        title={pageData.title} 
        lineColor={pageData.lineColor} 
      >
        <SelectInput 
          options={months} 
          onChange={(e) => handleMonthSelected(e.target.value)} 
          defaultValue={monthSelected}
        />
        <SelectInput 
          options={years} 
          onChange={(e) => handleYearSelected(e.target.value)} 
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <S.Filters>
        <button 
          type="button"
          className={`tag-filter tag-filter-recurrents
          ${frequencyFilterSelected.includes('recorrente') 
          && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>
        <button 
          type="button"
          className={`tag-filter tag-filter-eventual
          ${frequencyFilterSelected.includes('eventual') 
          && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('eventual')}
        >
          Eventuais
        </button>
      </S.Filters>

      <S.Content>
        {
          data.map((item, index) => (
            <HistoryFinanceCard 
              key={index}
              tagColor={item.tagColor}
              title={item.description}
              subtitle={item.dateFormatted}
              amount={item.amountFormatted}
            />
          ))
        }
      </S.Content>
    </S.Container>
  )
}

export default List;
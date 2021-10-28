import React, { useCallback, useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import listOfMonths from '../../utils/months';

import grinningImg from '../../assets/grinning.png'
import loveImg from '../../assets/love.png'
import scaryImg from '../../assets/scary.png'
import opsImg from '../../assets/ops.png'

import * as S from './styles';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartGrafic from '../../components/PieChartGrafic';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

  const years = useMemo(() => {
    let uniqueYears: number[] = [];
    
    [...expenses, ...gains].forEach(item => {
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
  },[]);


  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month
      }
    });
  },[]);

  const totalGains = useMemo(() => {
    let total: number = 0;

    expenses.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if(month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount)
        } catch {
          throw new Error('Invalid amount. Amount must be number.')
        }
      }
    });
    return total
  },[monthSelected, yearSelected])

  const totalExpenses = useMemo(() => {
    let total: number = 0;

    gains.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if(month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount)
        } catch {
          throw new Error('Invalid amount. Amount must be number.')
        }
      }
    });
    return total
  },[monthSelected, yearSelected])

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;

  },[totalGains, totalExpenses]) 

  const message = useMemo(() => {
    if(totalBalance < 0) {
      return {
        title: "Eita, deu ruim",
        description: "Neste mês você gastou mais do que deveria",
        footerText: "Verifique seus gastos e tente cortar algo desnecessário",
        icon: scaryImg
      }
    }
    else if(totalGains === 0 && totalExpenses === 0) {
      return {
        title: "Op's",
        description: "Neste mês não há entradas ou saídas.",
        footerText: "Parece que você não fez nenhum registro no mês e ano selecionados.",
        icon: opsImg
      }
    }
    else if(totalBalance === 0) {
      return {
        title: "Ufaa",
        description: "Neste mês você gastou exatamente o que ganhou",
        footerText: "Tenha cuidado! No próximo mês tente poupar seu dinheiro",
        icon: grinningImg
      }
    } else {
      return {
        title: "Muito bem",
        description: "Sua carteira está positiva",
        footerText: "Continue assim. Considere investir seu saldo.",
        icon: loveImg
      }
    }

  },[totalBalance, totalExpenses, totalGains]) 
  
  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const gainsPercent = Number(((totalGains / total) * 100).toFixed(1)); 
    const expensePercent = Number(((totalExpenses / total) * 100).toFixed(1)); 

    const data = [
      {
        name:'Entradas',
        value: totalGains,
        percent: gainsPercent ? gainsPercent : 0,
        color: '#E44C4E'
      },
      {
        name:'Saídas',
        value: totalExpenses,
        percent: expensePercent? expensePercent : 0,
        color: '#F7931B'
      }
    ]
    return data;

  },[totalGains, totalExpenses]) 

  const historyData = useMemo(() => {
    return listOfMonths.map((_, index) => {

      let amountEntry = 0;
      gains.forEach(gain => {
        const date = new Date(gain.date);
        const gainMonth = date.getMonth();
        const gainYear = date.getFullYear();

        if(gainMonth === index && gainYear === yearSelected) {
          try {
            amountEntry += Number(gain.amount);   
          } catch {
            throw new Error('amountEntry is invalid. It must be a number')
          }
        }
      });

      let amountOutput = 0;
      expenses.forEach(expense => {
        const date = new Date(expense.date);
        const expenseMonth = date.getMonth();
        const expenseYear = date.getFullYear();

        if(expenseMonth === index && expenseYear === yearSelected) {
          try {
            amountOutput += Number(expense.amount);   
          } catch {
            throw new Error('amountEntry is invalid. It must be a number')
          }
        }
      });

      return {
        monthNumber: index,
        month: listOfMonths[index].substr(0, 3),
        amountEntry,
        amountOutput
      }
    })
    .filter(item => {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
    })

  },[yearSelected])

  const relationExpensesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
    .filter((expense) => {
      const date = new Date(expense.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      return month === monthSelected && year === yearSelected;
    })
    .forEach((expense) => {
      if(expense.frequency === 'recorrente') {
        return amountRecurrent += Number(expense.amount);
      } 
      if(expense.frequency === 'eventual') {
        return amountEventual += Number(expense.amount);
      } 
    });

    const total = amountRecurrent + amountEventual;

    const percentRecurrent= Number(((amountRecurrent / total) *100).toFixed(1));
    const percentEventual = Number(((amountEventual / total) *100).toFixed(1));

    return [
      {
        name:'Recorrente',
        amount: amountRecurrent,
        percent: percentRecurrent  ? percentRecurrent : 0,
        color: '#F7931B'
      },
      {
        name:'Eventuais',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: '#E44C4E'
      }
    ]
  },[monthSelected, yearSelected])

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
    .filter((gain) => {
      const date = new Date(gain.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      return month === monthSelected && year === yearSelected;
    })
    .forEach((gain) => {
      if(gain.frequency === 'recorrente') {
        return amountRecurrent += Number(gain.amount);
      } 
      if(gain.frequency === 'eventual') {
        return amountEventual += Number(gain.amount);
      } 
    });

    const total = amountRecurrent + amountEventual;

    const percentRecurrent= Number(((amountRecurrent / total) *100).toFixed(1));
    const percentEventual = Number(((amountEventual / total) *100).toFixed(1));

    return [
      {
        name:'Recorrente',
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: '#F7931B'
      },
      {
        name:'Eventuais',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: '#E44C4E'
      }
    ]
  },[monthSelected, yearSelected])

  const handleMonthSelected = useCallback((month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch {
      throw new Error('Invalid month value. Is accept 0 - 12.')
    }
  },[]);

  const handleYearSelected = useCallback((year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch {
      throw new Error('Invalid year value. Is accept integer nubers.')
    }
  },[]);

  return (
    <S.Container>
      <ContentHeader title="Dashboard" lineColor='#F7931B' >
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
      <S.Content>
        <WalletBox 
          title="saldo"
          amount={totalBalance}
          footerLabel="atualizado com base nas entradas e saídas"
          icon="dollar"
          color="#4E41F0"
        />
        <WalletBox 
          title="entradas"
          amount={totalGains}
          footerLabel="atualizado com base nas entradas e saídas"
          icon="arrowUp"
          color="#F7931B"
        />
        <WalletBox 
          title="saídas"
          amount={totalExpenses}
          footerLabel="atualizado com base nas entradas e saídas"
          icon="arrowDown"
          color="#E44C4E"
        />
        
        <MessageBox 
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />

        <PieChartGrafic data={relationExpensesVersusGains}/>
        <HistoryBox 
          data={historyData}
          lineColorAmountEntry="#F7931B"
          lineColorAmountOutput="#E44C4E"
        />
        <BarChartBox 
          data={relationGainsRecurrentVersusEventual} 
          title="Entradas" 
        />
        <BarChartBox 
          data={relationExpensesRecurrentVersusEventual} 
          title="Saídas" 
        />
      </S.Content>
    </S.Container>
  )
}

export default Dashboard;
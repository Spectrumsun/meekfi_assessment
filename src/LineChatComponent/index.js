import { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Line } from 'react-chartjs-2';
import {  
  years, 
  carSales,
  dataSets
 } from '../dataset';

 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Car sales data',
    },
  },
};

const selectCar = carSales.map((carSale) => ({ value: carSale, label: carSale }))
const selectYear = years.map((year) => ({ value: year, label: year }));
const animatedComponents = makeAnimated();

const LineChatComponent = () =>  {
  const [resetCarSelection, setResetCarSelection] = useState();
  const [resetYearSelection, setResetYearSelection] = useState();
  const [filterCar, setFilterCar] = useState([]);
  const [filterYear, setFilterYear] = useState([]);
  const [carData, setCarData] = useState(dataSets);

  const handleSelected = (choices, type) => {
    const checkChoice = choices.map(choice => choice.value);
    if(type === 'cars') {
      setFilterCar(checkChoice)
      setResetCarSelection();
    } else {
      setFilterYear(checkChoice)
      setResetYearSelection();
    } 
  };

  const submitFilter = () => {
    if(filterCar.length !== 0) {
      const assSelectedCar = dataSets.filter((carData) => filterCar.includes(carData.product));
        if (filterYear.length !== 0) {
          const yearFilter = assSelectedCar.map((assSelected) => ({
            ...assSelected,
            sales: assSelected.sales.filter((year) => filterYear.includes(year.year))
          }))
          setCarData(yearFilter)
        } else {
          setCarData(assSelectedCar);
        }
      } else {
        if(filterYear.length !== 0) {
          const yearFilter = dataSets.map((assSelected) => ({
            ...assSelected,
            sales: assSelected.sales.filter((year) => filterYear.includes(year.year))
          }))
          setCarData(yearFilter)
        }
      }
  };

  const resetFilter = () => {
    setCarData(dataSets)
    setResetCarSelection(null);
    setResetYearSelection(null);
  };
  
  const lineData = {
    labels: years,
    datasets: carData.map(( { product, sales, borderColor, backgroundColor }) => ({
      label: product,
      data: sales.map(sale => sale.totalAmountSold),
      borderColor,
      backgroundColor,
      pointStyle: 'circle',
      pointRadius: 10,
      pointHoverRadius: 15
    }))
  };
  return (
  <div>
    <div className="container__line-filter-content">
      <div className="container__line-filter">
        <h3>Car</h3>
        <Select 
          options={selectCar} 
          isMulti 
          closeMenuOnSelect={false}
          onChange={(choice) => handleSelected(choice, 'cars')}
          components={animatedComponents}
          value={resetCarSelection}
        />
      </div>
      <div className="container__line-filter">
        <h3>Year</h3>
        <Select 
          options={selectYear} 
          isMulti 
          closeMenuOnSelect={false} 
          onChange={(choice) => handleSelected(choice, 'years')}
          components={animatedComponents}
          value={resetYearSelection}
        />
      </div>
    </div> 
    <button 
      className="container__button container__filter-button" 
      onClick={submitFilter}
    >
      Filter
    </button>
    <button 
      className="container__button container__reset-button"
      onClick={resetFilter}
    >
      Reset
    </button>
    <Line options={options} data={lineData} />
  </div>
  )
};

export default LineChatComponent;

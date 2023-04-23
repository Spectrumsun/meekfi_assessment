import Select from 'react-select';
import { Line } from 'react-chartjs-2';
import {  
  years, 
  carSales,
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
const selectYear = years.map((year) => ({ value: year, label: year }))

const LineChatComponent = ({ 
  handleSelected, 
  submitFilter,
  lineData,
}) =>  (
  <div>
    <div className="container__line-filter-content">
      <div className="container__line-filter">
        <h3>Car</h3>
        <Select 
          options={selectCar} 
          isMulti 
          closeMenuOnSelect={false}
          onChange={(choice) => handleSelected(choice, 'cars')}
        />
      </div>
      <div className="container__line-filter">
        <h3>Year</h3>
        <Select 
          options={selectYear} 
          isMulti 
          closeMenuOnSelect={false} 
          onChange={(choice) => handleSelected(choice, 'years')}
        />
      </div>
    </div> 
    <button 
      className="container__button container__filter-button" 
      onClick={() => submitFilter('filter')}
    >
      Filter
    </button>
    <button 
      className="container__button container__reset-button"
      onClick={() => submitFilter('reset')}
    >
      Reset
    </button>
    <Line options={options} data={lineData} />
  </div>
);

export default LineChatComponent;

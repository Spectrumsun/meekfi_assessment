import Select from 'react-select';
import { Bar } from 'react-chartjs-2';
import {  
  networks, 
  states,
} from '../dataset';

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'GSM usage data',
    },
  },
};

const selectNetwork = networks.map((network) => ({ value: network, label: network }))
const selectState = states.map((state) => ({ value: state, label: state }))

const BarChat = ({ barData, handleSelected, submitPieFilter }) =>  (
  <div>
  <div className='container__line-content'>
    <h3>Cities</h3>
      <Select 
        options={selectState} 
        isMulti 
        closeMenuOnSelect={false} 
        onChange={(choice) => handleSelected(choice, 'cities')}
      />
    <h3>Networks</h3>
    <Select 
      options={selectNetwork} 
      isMulti 
      closeMenuOnSelect={false}
      onChange={(choice) => handleSelected(choice, 'networks')}
    />
  </div>
  <button 
    className="container__button container__filter-button" 
    onClick={() => submitPieFilter('filter')}
  >
    Filter
  </button>
  <button 
    className="container__button container__reset-button" 
    onClick={() => submitPieFilter('reset')}
  >
    Reset
  </button>
  <Bar options={options} data={barData} />
</div>

);

export default BarChat;
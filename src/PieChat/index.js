import { Pie } from 'react-chartjs-2';
import Select from 'react-select';
import { products } from '../dataset';

const selectPhone = products.map((year) => ({ value: year, label: year }))


const PieChat = ({ pieData, handleSelected, submitPieFilter }) => {

  return (
    <div className="container__pie-wrapper">
      <div className="container__pie-content">
        <h3>Smartphone</h3>
        <Select 
          options={selectPhone} 
          isMulti 
          closeMenuOnSelect={false}
          onChange={(choice) => handleSelected(choice, 'phone')}
        />
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
      </div>
      <div className="container__pie-content">
        <Pie data={pieData} />
      </div>

    </div>
  )
}


export default PieChat;
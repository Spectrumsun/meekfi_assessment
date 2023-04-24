import { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Pie } from 'react-chartjs-2';
import Select from 'react-select';
import { products, colorSets } from '../dataset';

const selectPhone = products.map((year) => ({ value: year, label: year }))

const PieChat = () => {
  const [resetProduct, setRestProduct] = useState();
  const [smartPhoneState, setSmartPhoneState] = useState(products);
  
  const handleSelected = (value) => {
    const checkChoice = value.map(choice => choice.value);
    setSmartPhoneState(checkChoice);
    setRestProduct();
  };

  const restFilter = () => {
    setRestProduct(null);
    setSmartPhoneState(products);
  };

  const pieData = {
    labels: smartPhoneState,
    datasets: [
      {
        label: 'Smartphone Market share',
        data: smartPhoneState.map(() => faker.datatype.number({ min: 0, max: 300 })),
        backgroundColor: colorSets.map((colorSet) => colorSet.bG),
        borderColor: colorSets.map((colorSet) => colorSet.bC),
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="container__pie-wrapper">
      <div className="container__pie-content">
        <h3>Smartphone</h3>
        <Select 
          options={selectPhone} 
          isMulti 
          closeMenuOnSelect={false}
          onChange={(choice) => handleSelected(choice, 'phone')}
          value={resetProduct}
        />
        <button 
          className="container__button container__reset-button" 
          onClick={restFilter}
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
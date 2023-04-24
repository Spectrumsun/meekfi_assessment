import  { useState, useRef } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Bar } from 'react-chartjs-2';
import {  
  networks, 
  states,
  networkDatas,
  colorSets
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

const selectNetwork = networks.map((network) => ({ value: network, label: network }));
const selectState = states.map((state) => ({ value: state, label: state }));
const animatedComponents = makeAnimated();

const BarChat = () =>  {
  const [resetCitiesSelection, setResetCitiesSelection] = useState();
  const [resetNetworkSelection, setResetNetworkSelection] = useState();
  const [networkData, setNetworkData] = useState(networkDatas);
  const [networksState, setNetworksState] = useState(networks);
  const [filterNetwork, setFilterNetwork] = useState([]);
  const [filterState, setFilterState] = useState([]);

  const handleSelection  = (value, type) => {
    const checkChoice = value.map(choice => choice.value);
    if (type === 'cities') {
      setFilterNetwork(checkChoice)
      setResetCitiesSelection();
    } else {
      setFilterState(checkChoice);
      setResetNetworkSelection()
    }
  };

  const handleRest = () => {
    setResetCitiesSelection(null);
    setResetNetworkSelection(null)
    setNetworkData(networkDatas);
    setNetworksState(networks)
  }; 

  const submitBarFilter = () => {
    if(filterNetwork.length !== 0) {
      const assSelectedCity = networkDatas.filter((networkData) => filterNetwork.includes(networkData.stateName));
      if (filterState.length !== 0) {
        const gsmFilter = networks.filter((networksState) => filterState.includes(networksState))
        setNetworksState(gsmFilter);
        setNetworkData(assSelectedCity);
      } else {
        setNetworkData(assSelectedCity);
      }
    } else {
      if (filterState.length !== 0) {
        const gsmFilter = networks.filter((networksState) => filterState.includes(networksState))
        setNetworksState(gsmFilter);
      }
    }
  };

  const barData = {
    labels: networksState,
    datasets: networkData.map(({ stateName, networkData }, index) => ({
      label: stateName,
      data: networkData.map((network) => network.totalConnected),
      backgroundColor: colorSets[index].bG,
    }))
  };

  return (
    <div>
      <div className='container__line-content'>
        <h3>Cities</h3>
        <Select 
          options={selectState}
          value = {resetCitiesSelection}
          isMulti 
          closeMenuOnSelect={false} 
          onChange={(value) => handleSelection(value, 'cities')}
          components={animatedComponents}
        />
        <h3>Networks</h3>
        <Select 
          options={selectNetwork} 
          value={resetNetworkSelection}
          isMulti 
          closeMenuOnSelect={false}
          onChange={(value) => handleSelection(value, 'networks')}
          components={animatedComponents}
        />
      </div>
      <button 
        className="container__button container__filter-button" 
        onClick={() => submitBarFilter('filter')}
      >
        Filter
      </button>
      <button 
        className="container__button container__reset-button" 
        onClick={handleRest}
      >
        Reset
      </button>
      <Bar options={options} data={barData} />
    </div>
  )
};

export default BarChat;
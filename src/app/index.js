import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement,
} from 'chart.js';
import {   
  years, 
  dataSets,
  networkDatas,
  networks,
  colorSets,
  products,
 } from '../dataset';
 import LineChatComponent from '../LineChatComponent';
 import BarChatComponent from '../BarChat';
 import PieChatComponent from '../PieChat';

import './index.scss';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  BarElement, 
  LineElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend
);

const App = () => {
  const [carData, setCarData] = useState(dataSets);
  const [networkData, setNetworkData] = useState(networkDatas);
  const [networksState, setNetworksState] = useState(networks);
  const [smartPhoneState, setSmartPhoneState] = useState(products);
  const [filterCar, setFilterCar] = useState([]);
  const [filterYear, setFilterYear] = useState([]);

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

  const barData = {
    labels: networksState,
    datasets: networkData.map(({ stateName, networkData }, index) => ({
      label: stateName,
      data: networkData.map((network) => network.totalConnected),
      backgroundColor: colorSets[index].bG,
    }))
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

  const handleSelected = (choice, type) => {
    const checkChoice = choice.map(choice => choice.value);
    if(type === 'cars') {
      setFilterCar(checkChoice)
    } 
    if(type === 'years') {
      setFilterYear(checkChoice)
    }

    if (type === 'cities') {
      setFilterCar(checkChoice)
    }

    if (type === 'networks') {
      setFilterYear(checkChoice)
    }

    if (type === 'phone') {
      setFilterYear(checkChoice)
    }
  };

  const submitLineFilter = (type) => {
    if(type === 'reset') {
      setCarData(dataSets)
    } else {
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
    }
  };

  const submitBarFilter = (type) => {
    if(type === 'reset') {
      setNetworkData(networkDatas);
      setNetworksState(networks);
    } else {
      if(filterCar.length !== 0) {
        const assSelectedCity = networkDatas.filter((networkData) => filterCar.includes(networkData));
        if (filterYear.length !== 0) {
          const gsmFilter = networksState.filter((networksState) => filterYear.includes(networksState))
          setNetworksState(gsmFilter);
          setNetworkData(assSelectedCity);
        } else {
          setNetworkData(assSelectedCity);
        }
      } else {
        if(filterYear.length !== 0) {
          const gsmFilter = networksState.filter((networksState) => filterYear.includes(networksState))
          setNetworksState(gsmFilter);
        }
      }
    }
  };

  const submitPieFilter = (type) => {
    if(type === 'reset') {
      setSmartPhoneState(products)
    } else {
      if(filterYear.length !== 0) {
        const filterProducts = products.filter((product) => filterYear.includes(product));
        console.log(filterProducts, 'filterProducts')
        setSmartPhoneState(filterProducts);
      }
    }
  };

  return (
    <>
      <nav className="container__navbar">
        <p className="container__navbar-p">Dashboard</p>
      </nav>
      <div className="container">
        <div className="container__dashboard">
          <div className="">
            <LineChatComponent 
              handleSelected={handleSelected} 
              submitFilter={submitLineFilter}
              lineData={lineData}
            />
          </div>
          <hr className="container__hr"/>
          <div className="">
            <BarChatComponent 
              barData={barData}
              handleSelected={handleSelected}
              submitFilter={submitBarFilter}
            />
          </div>
          <hr className="container__hr"/>
          <PieChatComponent 
            pieData={pieData} 
            handleSelected={handleSelected}
            submitPieFilter={submitPieFilter}
          />
        </div>
      </div>
    </>
  );
}

export default App;

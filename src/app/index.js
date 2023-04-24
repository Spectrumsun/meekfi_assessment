import React from 'react';

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

const App = () =>  (
  <>
    <div>
      <nav className="container__navbar">
        <p className="container__navbar-p">Dashboard</p>
      </nav>
      <div className="container">
        <div className="container__dashboard">
          <div className="">
            <LineChatComponent />
          </div>
          <hr className="container__hr"/>
          <div className="">
            <BarChatComponent />
          </div>
          <hr className="container__hr"/>
          <PieChatComponent />
        </div>
      </div>
    </div>
  </>
);

export default App;

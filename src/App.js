import React, { useState, useEffect } from 'react';
import BarChart from './Components/BarChart';
import LineChart from './Components/LineChart';
import PieChart from './Components/PieChart';
import evon from './Components/eve.json';
import './style.css'

function App() {
  const [activeChart, setActiveChart] = useState('bar');

  useEffect(() => {
    // Add or remove classes based on the active chart
    if (activeChart === 'bar') {
      document.body.classList.add('bar-bg');
      document.body.classList.remove('line-bg', 'pie-bg');
    } else if (activeChart === 'line') {
      document.body.classList.add('line-bg');
      document.body.classList.remove('bar-bg', 'pie-bg');
    } else if (activeChart === 'pie') {
      document.body.classList.add('pie-bg');
      document.body.classList.remove('bar-bg', 'line-bg');
    }
  }, [activeChart]);

  const handleNavClick = (chart) => {
    setActiveChart(chart);
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavClick('bar')}>Bar Chart</button>
          </li>
          <li>
            <button onClick={() => handleNavClick('line')}>Line Chart</button>
          </li>
          <li>
            <button onClick={() => handleNavClick('pie')}>Pie Chart</button>
          </li>
        </ul>
      </nav>

      <div>
        {activeChart === 'bar' && <BarChart alertData={evon}  />}
        {activeChart === 'line' && <LineChart alertData={evon} />}
        {activeChart === 'pie' && <PieChart alertData={evon} />}
      </div>
    </div>
  );
}

export default App;

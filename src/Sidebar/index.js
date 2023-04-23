import './index.scss'
import SVGIcon from './SvgIcon';

const Sidebar = ({ setCurrentTab }) => {
  return (
    <div className="sidebar">
      <p className="sidebar__title uppercase">Dashboard</p>
      <div className="flex items-center">
        <ul>
          <li
            onClick={() => setCurrentTab('summary')} 
            className="sidebar__item">
            <SVGIcon />
            <p className="sidebar__text">Summary</p>
          </li>
          <li
            onClick={() => setCurrentTab('line')} 
            className="sidebar__item">
            <SVGIcon />
            <p className="sidebar__text ml-5">Line Chat</p>
          </li>
          <li
            onClick={() => setCurrentTab('bar')} 
            className="sidebar__item">
            <SVGIcon />
            <p className="sidebar__text ml-5">Bar Chat</p>
          </li>
          <li 
            onClick={() => setCurrentTab('pie')}
            className="sidebar__item">
            <SVGIcon />
            <p className="sidebar__text ml-5">Pie Chat</p>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default Sidebar;

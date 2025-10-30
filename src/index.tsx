import { FC } from 'react';
import ReactDOM from 'react-dom/client';

import './global.css';
import NavigationBar from './components/nav-bar/nav-bar';
import MapPanel from './components/map-panel/map-panel';

/**
 * Standard template for all pages, adds in constant navigational elements.
 * @returns 
 */
const StandardPage: FC = () => {
    return (
        <div className='top-level-container'>
            <NavigationBar/>
            <MapPanel />
        </div>
    )
}

const container = document.querySelector('#root');

if(container != null) {
    const root = ReactDOM.createRoot(container);
    root.render(<StandardPage />);
}

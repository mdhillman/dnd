import { FC } from 'react';
import ReactDOM from 'react-dom/client';


import './global.css';
import NavigationBar from './components/nav-bar/nav-bar';
import LandingPage from './components/landing-page/landing-page';

/**
 * Standard template for all pages, adds in constant navigational elements.
 * @returns 
 */
const StandardPage: FC = () => {
    return (
        <>
            <NavigationBar/>
            <LandingPage />
        </>
    )
}

const container = document.querySelector('#root');

if(container != null) {
    const root = ReactDOM.createRoot(container);
    root.render(<StandardPage />);
}

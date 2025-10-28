import { FC } from "react";
import styles from './nav-bar.module.css';

/**
 * 
 * @returns 
 */
const NavigationBar: FC = () => {

    return (
        <div className={styles.container}>
            <p>Navigation Bar Goes Here</p>
        </div>
    );

}

export default NavigationBar;
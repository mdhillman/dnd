import { FC } from "react";
import styles from './nav-bar.module.css';

/**
 * 
 * @returns 
 */
const NavigationBar: FC = () => {

    return (
        <div className={styles.container}>
            {/* <IconButton aria-label="mercator-projection" onClick={() => changeProjection('mercator')}>
                    <MapIcon className={styles.projectionIcon}/>
            </IconButton> */}
        </div>
    );

}

export default NavigationBar;
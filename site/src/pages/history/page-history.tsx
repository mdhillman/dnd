import { FC } from 'react';
import styles from './page-history.module.css';
import { Tooltip } from '@mui/material';

const HistoryPage: FC = () => {
    
    const headerImage = '/images/history.png';

    const openImage = () => {
        if(!headerImage) return;
        window.open(headerImage, '_blank');
    };

    return (
        <div className={styles.container}>
    
            <Tooltip title="Click to view full image" followCursor>
                <img className={styles.headerImage} src={headerImage} alt={headerImage} onClick={openImage}/>
            </Tooltip>

            
            <div className={styles.content}>
                <h1>On the history of Theia: CURRENT YEAR 1491 NA</h1>
            </div>
        </div>
    );
}

export default HistoryPage;
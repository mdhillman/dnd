import Tooltip from '@mui/material/Tooltip';
import styles from './local-maps.module.css';
import { Link } from 'react-router-dom';

export const LocalMapsPage = () => {
    const headerImage = "/dnd/images/home.png";

    const openImage = () => {
        if (!headerImage) return;
        window.open(headerImage, "_blank");
    };

    return (
        <div className={styles.container}>
            <Tooltip title="Click to view full image" followCursor>
                <img
                    className={styles.headerImage}
                    src={headerImage}
                    alt={headerImage}
                    onClick={openImage}
                />
            </Tooltip>

            <div className={styles.content}>
                <h1>Local maps</h1>
                <p>In a world where borders are frequently rewritten by bureaucratic decree and the very 
                    landscape can be altered by the shifting tides of Realmatic Flux, a reliable map is more 
                    than a tool - it is a lifeline. This repository serves as the definitive collection of the 
                    geographical and urban records secured by the party throughout their travels across Theia. 
                    From the soot-stained blueprints of Camorrian industrial hubs to the ancient, hand-drawn 
                    star-charts of Andelain and the high-precision topographical surveys of the Kindred Concord, 
                    these documents represent the hard-won clarity salvaged from the "Gaps" of the New Age. 
                    Scholars at Revelstone remind all travelers: navigate with caution, for while the ink may 
                    be dry, the land itself has been known to have a mind of its own.</p>

                <h2>Maps of countries</h2>
                <p>Country level maps take a lot of resources to produce, as such they're only generally available 
                    from professional Cartographers in nation capitals, and may cost a tidy sum to acquire.
                </p>

                <Link className={styles.link} to="/camorr-map">Camorr</Link>:<br/>
                <span>
                    Produced by the Kindred Concord's own cartographical stewards 
                    at the Halls of Consensus in Revelstone, this map covers the 
                    entirety of Camorr.</span>
                <br/><br/>

                <strong><a href="#">Andelain</a>: </strong><br/>
                <span>
                    This country map is available for purchase at the Cartographer's Guild 
                    within the Halls of Consensus in Revelstone.</span>
                <br/><br/>

                <strong><a href="#">Doriath</a>: </strong><br/>
                <span>
                    This country map is available for purchase at the Cartographer's Guild 
                    within the Halls of Consensus in Revelstone.</span>

                <h2>City & town maps</h2>
                <p>These are generally available for purchase from budding map-makers (or branches of the Cartographer's 
                    Guild if the town is large enough for one) within the desired location.
                </p>

                <strong><a href="#">Revelstone</a>: </strong><br/>
                <span>
                    This city map is available for purchase at the Cartographer's Guild 
                    within the Halls of Consensus in Revelstone.</span>
                <br/><br/>

                <Link className={styles.link} to="/appleby-map">Appleby</Link>:<br/>
                <span>
                    This small cider producing town has no branch of the cartographer's guild, but did recently find a old map
                    within the town's archives.</span>
                <br/><br/>
            </div>
        </div>
    );
};
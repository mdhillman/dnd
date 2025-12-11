import { FC, useEffect, useState } from "react";
import Cubes from "../cubes";
import SplitText from '../split-text/split-text';
import { Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addCodeToCookie } from "../../utilties";

import styles from './landing-page.module.css';

function convertRemToPixels(rem: number) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export const LandingPage: FC = () => {
    const [background, setBackground] = useState<string | null>(null);
    const [foreground, setForeground] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        setBackground(window.getComputedStyle(document.body).getPropertyValue('--background02'));
        setForeground(window.getComputedStyle(document.body).getPropertyValue('--highlight01'));
    }, []);

    const enterSite = (addCookie: boolean) => {
        if(addCookie) addCodeToCookie('accept-cookies');
        navigate('/info');
    }

    return (
        <div className={styles.container}>
            <div className={styles.overlay}>
                <SplitText
                    text="Welcome to the world of Theia"
                    className={styles.heading}
                    splitType="chars"
                    delay={30}
                    duration={2}
                    ease="elastic.out(0.5, 0.3)"
                    tag='h1'
                />
               <SplitText
                    text="Welcome to Theia (thay-uh), a world where reality is merely a strong suggestion & chaos reigns unchecked. Adventurers navigate absurd geography, face eccentric villains, and slowly uncover the truth behind the Spire: where magic goes to die."
                    className={styles.subheading}
                    splitType="words"
                    delay={25}
                    duration={1}
                />

                <div className={styles.buttonContainer}>
                    <Tooltip title='Approve use of cookies & enter the site'>
                        <Button onClick={() => enterSite(true)} size='large' variant="contained">Roll initiative</Button>
                    </Tooltip>
                    <Tooltip title='Enter the site without approving cookies'>
                        <Button onClick={() => enterSite(false)} size='large' variant="outlined">Stealth check</Button>
                    </Tooltip>
                </div>
                
                <p className={styles.footer}>
                    By selecting the 'ROLL INITIATIVE' button, you approve the use of essential cookies to enable critical site functionality.
                    <br/>
                    For more information, and to view the content of the cookies used on this site, please read the site's <a href="/info?content=privacy" target="_blank">Cookie Policy</a>.
                </p>
            </div>

            {background && foreground && (
                <Cubes 
                    gridSize={16}
                    cellGap={convertRemToPixels(3.5)}
                    maxAngle={60}
                    radius={2}
                    borderStyle={`2px dashed ${foreground}`}
                    faceColor={background}
                    autoAnimate={false}
                    rippleOnClick={false}
                />
            )}
        </div>
    );
}
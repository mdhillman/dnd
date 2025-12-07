import { FC, useEffect, useState } from "react";
import styles from './home-page.module.css';
import Cubes from "../cubes";
import SplitText from '../split-text/split-text';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const generateSubHeadings = (lines: string[]) => {

    return lines.map((line, index) => {
        return (
            <SplitText
                key={index}
                text={line}
                className={styles.subheading}
                splitType="chars"
                delay={30}
                duration={2}
                ease="elastic.out(0.5, 0.3)"
                tag='p'
            />
        )
    });
};

export const HomePage: FC = () => {
    const [background, setBackground] = useState<string | null>(null);
    const [foreground, setForeground] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        setBackground(window.getComputedStyle(document.body).getPropertyValue('--background02'));
        setForeground(window.getComputedStyle(document.body).getPropertyValue('--highlight01'));
    }, []);

    const subHeadings = generateSubHeadings([
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Morbi convallis ligula dui, non scelerisque justo convallis non.',
        'Vivamus vel risus elementum'
    ]);

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
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra dapibus imperdiet. Aenean sed lacinia dui."
                    className={styles.subheading}
                    splitType="words"
                    delay={25}
                    duration={1}
                />
                <Button onClick={() => navigate('/')} variant="outlined">Begin your journey</Button>
            </div>

            {background && foreground && (
                <Cubes 
                    gridSize={16}
                    cellGap={45}
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
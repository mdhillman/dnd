import { FC, useState } from "react";
import styles from './info-table.module.css';
import Icon from "@mui/material/Icon";

export interface InfoTableProps {
    images: string[],
    captions: string[],
    keys: string[],
    values: string[],
}

const addLineBreaks = (str: string) =>
    str.split('@').map((subStr) => {
        return (
            <>
                {subStr}
                <br />
            </>
        );
    });

// Component to display images, captions, and table data.
export const InfoTable: FC<InfoTableProps> = ({ images, captions, keys, values }) => {
    const [imageIndex, setImageIndex] = useState<number>(0);
    if (!keys || !values) return null;

    const showPrevArrow = (imageIndex > 0) && (images.length > 1);
    const showNextArrow = (imageIndex < (images.length - 1)) && (images.length > 1);

    const changeImage = (offset: number) => {
        if ((imageIndex + offset >= 0) && ((imageIndex + offset) <= (images.length - 1))) {
            setImageIndex(imageIndex + offset);
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.tableWidget}>

                <img src={`/images/${images[imageIndex]}`} />
                <div className={styles.tableCarousel}>
                    <Icon onClick={() => changeImage(-1)}>{showPrevArrow ? 'arrow_left' : ''}</Icon>
                    <p>{captions[imageIndex]}</p>
                    <Icon onClick={() => changeImage(1)}>{showNextArrow ? 'arrow_right' : ''}</Icon>
                </div>
                <table>
                    <tbody>
                        {keys.map((key, index) =>
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{addLineBreaks(values[index])}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
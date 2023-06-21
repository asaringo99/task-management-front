import React, { FC } from 'react';
import styles from './HazardButton.module.css';

interface HazardButtonProps {
    label: string;
    onClick: () => void;
}

const HazardButton: FC<HazardButtonProps> = ({ label, onClick}) => {

    return (
        <button className={`${styles.button}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default HazardButton;

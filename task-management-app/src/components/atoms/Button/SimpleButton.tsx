import React, { FC } from 'react';
import styles from './SimpleButton.module.css';

interface SimpleButtonProps {
    label: string;
    onClick: () => void;
}

const SimpleButton: FC<SimpleButtonProps> = ({ label, onClick}) => {

    return (
        <button className={`${styles.button}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default SimpleButton;

import React, { FC } from 'react';
import styles from './AddButton.module.css';

interface AddButtonProps {
    label: string;
    onClick: () => void;
    opened?: boolean
}

const AddButton: FC<AddButtonProps> = ({ label, onClick}) => {

    return (
        <button className={`${styles.button}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default AddButton;

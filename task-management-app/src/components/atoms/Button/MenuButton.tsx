import React, { FC } from 'react';
import styles from './MenuButton.module.css';

interface MenuButtonProps {
    label: string;
    onClick: () => void;
    opened?: boolean
}

const MenuButton: FC<MenuButtonProps> = ({ label, onClick, opened }) => {
    return (
        <button className={`${styles.button} ${opened ? styles.dropdownButtonOpen : ''}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default MenuButton;

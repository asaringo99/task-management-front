import React, { FC } from 'react';
import styles from './MenuItem.module.css';

interface MenuItemProps {
    itemName: string;
    onItemClick: () => void;
}

const MenuItem: FC<MenuItemProps> = ({ itemName, onItemClick }) => {
    return (
        <button className={styles.menuItem} onClick={onItemClick}>{itemName}</button>
    );
};

export default MenuItem;

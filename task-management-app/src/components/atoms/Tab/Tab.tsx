import React, { FC } from "react";
import styles from './Tab.module.css';

interface TabProps {
    isActive: boolean;
    name: string;
    onDelete: () => void;
    onClick: () => void;
}

const Tab: FC<TabProps> = ({ isActive, name, onDelete, onClick }) => {
    return (
        <div className={styles.container}>
            <button onClick={onClick} className={`${isActive ? styles.active : ""} ${styles.tabButton}`}>
                <div className={isActive ? styles.activeTab : styles.tab} onClick={onClick}>{ name }{" "}</div>
                <button className={styles.deleteButton} onClick={(e) => {e.stopPropagation(); onDelete();}}>x</button>
            </button>
        </div>
    );
};

export default Tab;

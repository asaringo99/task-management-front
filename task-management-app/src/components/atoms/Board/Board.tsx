import React, { useCallback } from 'react';
import styles from './Board.module.css'

interface BoardProps {
    title: string
    children?: React.ReactNode;
}

const Board: React.FC<BoardProps> = ({ title, children }) => {

    return (
        <>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.board}>
                <div>{children}</div>
            </div>
        </>
    );
};

export default Board;

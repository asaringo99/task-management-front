import React, { FC } from 'react';
import styles from './Board.module.css'

interface BoardProps {
    children?: React.ReactNode;
}

const Board: FC<BoardProps> = ({ children }) => (
    <div className={styles.board}>
        <div>{children}</div>
    </div>
);

export default Board;

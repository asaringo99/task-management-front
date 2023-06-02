"use client"

import React, { FC } from 'react';
import { useDrop } from 'react-dnd';
import Board from '../../atoms/Board/Board';
import AddButton from '../../atoms/Button/AddButton';
import styles from './BoardWithButton.module.css'
import { CARD_TYPE } from '../../types/dndtypes'
import { BoardType } from '../../types/board'

interface BoradWithButtonProps {
    borad: BoardType
    children: React.ReactNode
    addAction: (boardId: string) => void
    onDrop: (cardId: string, boradId: string) => void
}

const BoradWithButton: FC<BoradWithButtonProps> = ( {borad , children, addAction, onDrop }) => {
    const [, drop] = useDrop({
        accept: CARD_TYPE,
        drop: (item: { id: string }) => onDrop(item.id, borad.id),
    });

    return (
        <div ref={drop} className={styles.board}>
            <Board title={borad.title}>
                <div className={styles.addButton}>
                    <AddButton label='+' onClick={() => addAction(borad.id)}/>
                </div>
                <div>
                    {children}
                </div>
            </Board>
        </div>
    );
};

export default BoradWithButton;

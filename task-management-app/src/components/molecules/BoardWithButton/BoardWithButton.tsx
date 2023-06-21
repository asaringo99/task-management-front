"use client"

import React, { FC, useState } from 'react';
import { useDrop } from 'react-dnd';
import Board from '../../atoms/Board/Board';
import AddButton from '../../atoms/Button/SimpleButton';
import styles from './BoardWithButton.module.css'
import { CARD_TYPE } from '../../types/dndtypes'
import { BoardType } from '../../types/board'
import HazardButton from '../../atoms/Button/HazardButton';
import EditableText from '../../atoms/EditableText/EditableText';

interface BoradWithButtonProps {
    borad: BoardType
    children: React.ReactNode
    initialTitle: string
    addAction: (boardId: string) => void
    onDrop: (cardId: string, boradId: string) => void
    onDelete: (boardid: string) => void
    onEdit: (text: string) => void
}

const BoradWithButton: FC<BoradWithButtonProps> = ({ borad, children, initialTitle, addAction, onDrop, onDelete, onEdit}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [, drop] = useDrop({
        accept: CARD_TYPE,
        drop: (item: { id: string }) => onDrop(item.id, borad.id),
    });

    const onTitleClick = () => {
        setIsEditing(true)
    }

    return (
        <div ref={drop} className={styles.board}>
            <div className={styles.hazardButton}>
                <HazardButton label='x' onClick={() => onDelete(borad.id)}/>
            </div>
            <div onClick={onTitleClick} onBlur={() => setIsEditing(false)}>
                <EditableText initialText={initialTitle} isEditing={isEditing} setIsEditing={setIsEditing} onEdit={onEdit}/>
            </div>
            <Board>
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

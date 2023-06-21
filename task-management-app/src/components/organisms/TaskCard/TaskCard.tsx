"use client"

import React, { useState, FC } from 'react';
import { useDrag } from 'react-dnd'
import EditableText from '../../molecules/EditableText/EditableText';
import TaskMenuwithButton from '../../molecules/Menu/TaskMenuWithButton'
import CardFrame from '../../atoms/CardFrame/CardFrame'
import { CARD_TYPE } from '../../types/dndtypes'
import { CardType } from '../../types/card'
import styles from './TaskCard.module.css'
import ApiClient from '@/services/api/client';

interface TaskCardProps {
    card: CardType
    apiClient: ApiClient
    setCards: (value: React.SetStateAction<CardType[]>) => void
}

const TaskCard: FC<TaskCardProps> = ({ card, setCards, apiClient }) => {
    const [isEditing, setIsEditing] = useState(false)

    const onEdit = (card: CardType, content: string) => {
        setCards((prevCards) => prevCards.map((prevCard) => (prevCard.id === card.id ? { ...prevCard, text: content } : prevCard)));
        const joinedPath = `/task/put/${card.id}`
        const payload = {
            'boardid': card.boardId, 
            'contents': content,
        }
        apiClient.put(joinedPath, payload).then(response => {
            console.log(response)
        }).catch(error => {
            console.error(error)
        })
    }

    const[, drag] = useDrag(() => ({
        type: CARD_TYPE,
        item: {id: card.id}
    }))

    return (
        <div className={styles.taskCard} ref={drag} onClick={() => setIsEditing(true)} onBlur={() => setIsEditing(false)}>
            <CardFrame>
                <TaskMenuwithButton menuItems={card.menuItems}/>
                <EditableText initialText={card.text} isEditing={isEditing} onEdit={(content: string) => onEdit(card, content)}/>
            </CardFrame>
        </div>
    );
};

export default TaskCard;

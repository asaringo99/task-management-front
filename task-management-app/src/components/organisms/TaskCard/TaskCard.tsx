"use client"

import React, { useState, FC } from 'react';
import { useDrag } from 'react-dnd'
import EditableText from '../../molecules/EditableText/EditableText';
import TaskMenuwithButton from '../../molecules/Menu/TaskMenuWithButton'
import CardFrame from '../../atoms/CardFrame/CardFrame'
import { CARD_TYPE } from '../../types/dndtypes'
import { CardType } from '../../types/card'

interface TaskCardProps {
    card: CardType
    onEdit: (id: string, content: string) => void
}

const TaskCard: FC<TaskCardProps> = ({ card, onEdit }) => {
    const[, drag] = useDrag(() => ({
        type: CARD_TYPE,
        item: {id: card.id}
    }))

    const [isEditing, setIsEditing] = useState(false)


    return (
        <div ref={drag} onClick={() => setIsEditing(true)} onBlur={() => setIsEditing(false)}>
            <CardFrame>
                    <TaskMenuwithButton menuItems={card.menuItems}/>
                    <EditableText initialText={card.text} isEditing={isEditing} onEdit={(content: string) => onEdit(card.id, content)}/>
            </CardFrame>
        </div>
    );
};

export default TaskCard;

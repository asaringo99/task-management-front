"use client"

import React, { useState, FC } from 'react';
import EditableText from '../../molecules/EditableText/EditableText';
import TaskMenuwithButton from '../../molecules/Menu/TaskMenuWithButton'
import CardFrame from '../../atoms/CardFrame/CardFrame'

interface TaskCardProps {
    id: string
    initialText: string;
    menuItems: { label: string, action: () => void}[];
}

const TaskCard: FC<TaskCardProps> = ({ id, initialText, menuItems }) => {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div onClick={() => setIsEditing(true)} onBlur={() => setIsEditing(false)}>
            <CardFrame>
                    <TaskMenuwithButton menuItems={menuItems}/>
                    <EditableText initialText={initialText} isEditing={isEditing}/>
            </CardFrame>
        </div>
    );
};

export default TaskCard;

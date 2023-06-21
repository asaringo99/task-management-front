'use client'

import React  from 'react';
import KanbanBoard from '../templates/KanbanBoard/KanbanBoard';

export default function App() {
    const initialTitle = 'New Board'
    const initialText = 'Input Contents'
    const initialMenus = [
        { label: "color", action: () => {console.log("color")} },
        { label: "delete", action: () => {console.log("delete")} },
    ]
    return (
        <KanbanBoard initialTitle={initialTitle} initialText={initialText} initialMenus={initialMenus}/>
    )
}
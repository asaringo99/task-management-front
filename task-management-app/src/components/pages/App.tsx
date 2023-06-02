'use client'

import React  from 'react';
import KanbanBoard from '../templates/KanbanBoard/KanbanBoard';
import { BoardType } from '../types/board';
import { CardType } from '../types/card';

const menus = [
    { label: "color", action: () => {console.log("color")} },
    { label: "delete", action: () => {console.log("delete")} },
]

const initialBoards: BoardType[] = [
    {id: '1', title: 'Pending', cardIds: ['1', '2']},
    {id: '2', title: 'Todo', cardIds: ['3', '4', '5']},
    {id: '3', title: 'In Progress', cardIds: []},
    {id: '4', title: 'Closed', cardIds: ['6', '7', '8', '9']},
];

const initialCards: CardType[] = [
    {id: '1', text: 'text1', menuItems: menus},
    {id: '2', text: 'text2', menuItems: menus},
    {id: '3', text: 'text3', menuItems: menus},
    {id: '4', text: 'text4', menuItems: menus},
    {id: '5', text: 'text5', menuItems: menus},
    {id: '6', text: 'text6', menuItems: menus},
    {id: '7', text: 'text7', menuItems: menus},
    {id: '8', text: 'text8', menuItems: menus},
    {id: '9', text: 'text9', menuItems: menus},
];

export default function App() {
    return (
        <KanbanBoard initialBoards={initialBoards} initialCards={initialCards} />
    )
}
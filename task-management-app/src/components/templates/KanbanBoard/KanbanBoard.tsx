'use client'

import React, { useState, FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BoardWithButton from '../../molecules/BoardWithButton/BoardWithButton';
import TaskCard from '../../organisms/TaskCard/TaskCard';
import AddButton from '../../atoms/Button/AddButton';
import { CardType } from '../../types/card'
import { BoardType } from '../../types/board'
import { postData } from '../../../services/api'
import styles from './KanbanBoard.module.css'

interface KanbanBoardProps {
    initialBoards: BoardType[];
    initialCards: CardType[];
}

const KanbanBoard: FC<KanbanBoardProps> = ({ initialBoards, initialCards }) => {
    const[boards, setBoards] = useState<BoardType[]>(initialBoards);
    const[cards, setCards] = useState<CardType[]>(initialCards);

    const editCard = (id: string, content: string) => {
        setCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, text: content } : card)));
    }
    
    const initialTitle = 'New Board'
    const initialText = 'Input Contents'
    const initialMenus = [
        { label: "color", action: () => {console.log("color")} },
        { label: "delete", action: () => {console.log("delete")} },
    ]

    const addBoard = async () => {
        const payload = {'title': initialTitle};
        const response = await postData(payload);
        const id: string = response['id'];
        const newBoard: BoardType = { id: id, title: initialTitle, cardIds: []};
        const newBoardList: BoardType[] = [...boards, newBoard];
        setBoards(newBoardList);
    }
    
    const addCard = async (boardId: string) => {
        const payload = {'title': initialText};
        const response = await postData(payload);
        const id: string = response['id'];
        const newCard: CardType = { id: id, text: initialText, menuItems: initialMenus};
        const newCardList: CardType[] = [newCard, ...cards];
        setCards(newCardList);
        setBoards((prevBoards) => 
            prevBoards.map((board) => (board.id === boardId ? { ...board, cards: [...board.cardIds, newCard.id] } : board))
        );
    }

    const onDrop = (cardId: string, toBoardId: string) => {
        setBoards((prevBoards) =>
            prevBoards.map((board) => ({
                ...board,
                cardIds: board.cardIds.filter((id) => id !== cardId).concat(board.id === toBoardId ? cardId: [])
            }))
        )
    }

    return(
        <>
            <div className={styles.kanbanBoard}>
                <DndProvider backend={HTML5Backend}>
                    {boards.map((board) => (
                        <div>
                            <BoardWithButton
                                key={board.id}
                                borad={board}
                                addAction={addCard}
                                onDrop={onDrop}
                            >
                                {
                                    (cards.filter((card) => board.cardIds.includes(card.id))).map((card) => (
                                        <TaskCard key={card.id} card={card} onEdit={editCard}/>
                                    ))
                                }
                            </BoardWithButton>
                        </div>
                    ))}
                </DndProvider>
                <div className={styles.addBoardButton}>
                    <AddButton label='+' onClick={addBoard}/>
                </div>
            </div>
        </>
    )
}

export default KanbanBoard;

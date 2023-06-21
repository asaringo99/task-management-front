import React, { Children, FC, useEffect } from "react";
import { ApiResponse, DataBoardid, DataTaskCard } from "@/services/api/response";
import BoardWithButton from "../../molecules/BoardWithButton/BoardWithButton";
import ApiClient from "@/services/api/client";
import { BoardType } from "../../types/board";
import { CardType } from "../../types/card";

interface TaskBoardProps {
    apiClient: ApiClient
    initialText: string,
    initialMenus: {label: string, action: () => void}[]
    board: BoardType
    cards: CardType[]
    setCards: React.Dispatch<React.SetStateAction<CardType[]>>
    setBoards: React.Dispatch<React.SetStateAction<BoardType[]>>
    onDelete: (boardid: string) => void
    children: React.ReactNode
}

const TaskBoard: FC<TaskBoardProps> = ({apiClient, initialText, initialMenus, board, cards, setBoards, setCards, onDelete, children}) => {
    const addCard = async (boardId: string) => {
        const path = '/task/create'
        const payload = {
            'contents': initialText,
            'boardid': boardId,
        }
        apiClient.post<ApiResponse<DataTaskCard>>(path, payload).then(response => {
            const newCard: CardType = {id: response.data.data.taskid, boardId: boardId,text: initialText,menuItems: initialMenus}
            console.log(newCard)
            const newCardList: CardType[] = [newCard, ...cards];
            setCards(newCardList);
        }).catch(error => {
            console.error(error)
        })
    }
    
    const onDrop = (cardId: string, toBoardId: string) => {
        setCards((prevCards) =>
            prevCards.map((card) => ({
                ...card,
                boardId: card.id === cardId ? toBoardId : card.boardId
            }))
        )
        const joinedPath = `/task/patch/${cardId}`
        const payload = {'boardid': toBoardId}
        apiClient.put<ApiResponse<DataBoardid>>(joinedPath, payload).catch(error => {console.error(error)})
    }

    const onEdit = (board: BoardType, text: string) => {
        setBoards((prevBoards) => prevBoards.map((prevBoard) => (prevBoard.id === board.id ? { ...prevBoard, status: text } : prevBoard)));
        const joinedPath = `/board/patch/${board.id}`
        const payload = {
            'column': 'status',
            'value': text,
        }
        apiClient.patch(joinedPath, payload).then(response => {
            console.log(response)
        }).catch(error => {
            console.error(error)
        })
    }

    return (
        <>
            <div>
                <BoardWithButton key={board.id} borad={board} initialTitle={board.status} addAction={addCard} onDrop={onDrop} onDelete={onDelete} onEdit={(text: string) => onEdit(board, text)}>
                    {children}
                </BoardWithButton>
            </div>
        </>
    )
}

export default TaskBoard
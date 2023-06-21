'use client'

import React, { useState, useEffect, FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CardType } from '../../types/card'
import { BoardType } from '../../types/board'
import styles from './KanbanBoard.module.css'
import ApiClient from '@/services/api/client';
import { ApiResponse, DataTaskCard, DataTaskBoard, DataBoardid, DataTaskTab } from '@/services/api/response';
import AddBoardButton from '../../organisms/AddBoardButton/AddBoardButton';
import TaskBoard from '../../organisms/TaskBoard/TaskBoard';
import ScrollableContainer from '../../atoms/Container/ScrollableContainer';
import TaskCard from '../../organisms/TaskCard/TaskCard';
import TabContainer from '../../organisms/TabContainer/TabContainer';
import { TabType } from '../../types/tab';

interface KanbanBoardProps {
    initialTitle: string
    initialText: string
    initialMenus: {label: string, action: () => void}[]
}

const KanbanBoard: FC<KanbanBoardProps> = ({ initialTitle, initialText, initialMenus }) => {
    const[activeTabid, setActiveTabid] = useState<number>(-1)
    const [tabs, setTabs] = useState<TabType[]>([]);
    const[boards, setBoards] = useState<BoardType[]>([]);
    const[cards, setCards] = useState<CardType[]>([]);

    const clientEntryPoint = "http://localhost:8080"
    const apiClient = new ApiClient(clientEntryPoint);
    
    useEffect(() => {
        const tabPath = '/tab/get'
        apiClient.get<ApiResponse<DataTaskTab[]>>(tabPath).then(response => {
            const newTabList: TabType[] = response.data.data.map((taskTab) => {
                const tab: TabType = {
                    tabid: taskTab.tabid,
                    isactive: taskTab.isactive,
                    title: taskTab.title,
                }
                return tab
            });
            setTabs(newTabList)
            const activeTab = newTabList.filter((tab) => tab.isactive)
            setActiveTabid(activeTab.length > 0 ? activeTab[0].tabid : newTabList[0].tabid)
        }).catch(error => {console.log(error)})
    }, [])

    useEffect(() => {
        const boardPath = '/board/get'
        apiClient.get<ApiResponse<DataTaskBoard[]>>(boardPath).then(response => {
            const newBoardList: BoardType[] = response.data.data.map((taskBoard) => {
                const board: BoardType = {
                    id: taskBoard.boardid,
                    tabid: taskBoard.tabid,
                    status: taskBoard.status,
                }
                return board
            });
            console.log(newBoardList)
            setBoards(newBoardList)
        }).catch(error => {console.log(error)})
    }, [])

    useEffect(() => {
        const cardPath = '/task/get'
        apiClient.get<ApiResponse<DataTaskCard[]>>(cardPath).then(response => {
            console.log(response.data)
            const newCardList: CardType[] = response.data.data.map((taskCard) => {
                const task: CardType = {
                    id: taskCard.taskid,
                    boardId: taskCard.boardid,
                    text: taskCard.contents,
                    menuItems: initialMenus,
                }
                return task
            })
            setCards(newCardList)
        }).catch(error => {console.log(error)})
    }, [])
    
    const onBoardDelete = (boardid: string) => {
        const boardPath = `/board/delete/${boardid}`
        apiClient.delete<ApiResponse<any>>(boardPath).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
        const newBoardList = boards.filter((board) => board.id !== boardid)
        setBoards(newBoardList)
    }

    return(
        <>
            <h1 className={styles.title}>KANBAN BOARD</h1>
            <TabContainer apiClient={apiClient} activeTabid={activeTabid} setActiveTabid={setActiveTabid} tabs={tabs} setTabs={setTabs}>
                <div className={styles.kanbanBoard}>
                    <DndProvider backend={HTML5Backend}>
                        {(boards.filter((b) => b.tabid === activeTabid)).map((board) => (
                            <div>
                                <TaskBoard apiClient={apiClient} setBoards={setBoards} initialText={initialText} initialMenus={initialMenus} board={board} cards={cards} setCards={setCards} onDelete={onBoardDelete}>
                                    <ScrollableContainer>
                                        {
                                            (cards.filter((card) => board.id === card.boardId)).map((card) => (
                                                <TaskCard key={card.id} card={card} setCards={setCards} apiClient={apiClient}/>
                                            ))
                                        }
                                    </ScrollableContainer>
                                </TaskBoard>
                            </div>
                        ))}
                    </DndProvider>
                    {
                        tabs.length > 0 &&
                            <div className={styles.addBoardButton}>
                                <AddBoardButton initialTitle={initialTitle} tabid={activeTabid} boards={boards} setBoards={setBoards} apiClient={apiClient}/>
                            </div>
                    }
                </div>
            </TabContainer>
        </>
    )
}

export default KanbanBoard;
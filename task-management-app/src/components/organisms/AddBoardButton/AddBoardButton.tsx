import { BoardType } from "../../types/board";
import React, { FC } from "react";
import AddButton from "../../atoms/Button/SimpleButton";
import ApiClient from "@/services/api/client";
import { ApiResponse, DataTaskBoard } from "@/services/api/response";
import styles from "./AddBoardButton.module.css"

interface AddBoardButtonProps {
    apiClient: ApiClient
    initialTitle: string
    tabid: number
    boards: BoardType[]
    setBoards: (value: React.SetStateAction<BoardType[]>) => void
}

const AddBoardButton: FC<AddBoardButtonProps> = ({ initialTitle, tabid, boards, setBoards, apiClient }) => {
    const addBoard = async () => {
        const path = '/board/create'
        const payload = {'status': initialTitle, 'tabid': tabid}
        apiClient.post<ApiResponse<DataTaskBoard>>(path, payload).then(response => {
            const newBoard: BoardType = {
                id: response.data.data.boardid,
                tabid: tabid,
                status: initialTitle,
            };
            const newBoardList: BoardType[] = [...boards, newBoard];
            setBoards(newBoardList);
        }).catch(error => {
            console.error(error)
        })
    }
    return (
        <>
            <div className={styles.button}>
                <AddButton label='+' onClick={addBoard}/>
            </div>
        </>
    )
}

export default AddBoardButton
import React, { FC } from "react";
import styles from "./BoardTitle.module.css"

type BoardTitlePropsType = {
    title: string
}

const BoardTitle: FC<BoardTitlePropsType> = ({ title }) => {
    return (
        <div className={styles.boardTitle}>{title}</div>
    );
};

export default BoardTitle
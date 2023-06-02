import React, { FC } from "react";
import styles from "./Text.module.css"

type TextPropsType = {
    text: string
}

const Text: FC<TextPropsType> = ({ text }) => {
    return (
        <div className={styles.text}>{text}</div>
    );
};

export default Text
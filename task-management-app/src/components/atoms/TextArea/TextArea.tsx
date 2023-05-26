import React, { useRef, useEffect, FC } from "react";
import styles from "./TextArea.module.css"

type TextAreaPropsType = {
    text: string
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea: FC<TextAreaPropsType> = ({ text, onChange }) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    return (
        <textarea ref={textareaRef} value={text} className={styles.textarea} onChange={onChange} autoFocus/>
    );
};

export default TextArea
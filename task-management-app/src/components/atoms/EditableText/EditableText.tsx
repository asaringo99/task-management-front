import React, {useState, FC } from 'react';
import styles from './EditableText.module.css'

interface EditableTextProps {
    initialText: string
    isEditing: boolean
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
    onEdit: (text: string) => void
}

const EditableText: FC<EditableTextProps> = ({initialText, isEditing, setIsEditing, onEdit}) => {

    const [text, setText] = useState(initialText)

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onEdit(event.target.value);
        setText(event.target.value)
    };

    return (
        <div className={styles.container}>
            {
                isEditing ? (
                    <>
                        <textarea value={text} className={styles.textarea} onChange={handleChange} autoFocus/>
                        <div className={styles.checkButton}>
                            <p className={styles.check} style={{color: 'green'}}>o</p>
                            <p className={styles.cancel} style={{color: 'red'}}>x</p>
                        </div>
                    </>
                ) : (
                    <div className={styles.text}>{text}</div>
                )
            }
        </div>
    );
};

export default EditableText;


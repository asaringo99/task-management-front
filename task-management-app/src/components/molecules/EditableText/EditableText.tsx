"use client";

import React, {useState, useRef, useEffect, FC} from 'react';
import Text from "../../atoms/Text/Text"
import TextArea from "../../atoms/TextArea/TextArea"

interface EditableTextProps {
    initialText: string
    isEditing: boolean
    onEdit: (content: string) => void
}

const EditableText: FC<EditableTextProps> = ({initialText, isEditing, onEdit}) => {

    const [text, setText] = useState(initialText)

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onEdit(event.target.value);
        setText(event.target.value)
    };

    return (
        isEditing ? (
            <TextArea text={text} onChange={handleChange}/>
        ) : (
            <Text text={text}/>
        )
    );
};

export default EditableText;

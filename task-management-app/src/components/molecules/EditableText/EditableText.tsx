"use client";

import React, {useState, useRef, useEffect, FC} from 'react';
import Text from "../../atoms/Text/Text"
import TextArea from "../../atoms/TextArea/TextArea"

interface EditableTextProps {
    initialText: string
    isEditing: boolean
}

const EditableText: FC<EditableTextProps> = ({initialText, isEditing}) => {

    const [text, setText] = useState(initialText)

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
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

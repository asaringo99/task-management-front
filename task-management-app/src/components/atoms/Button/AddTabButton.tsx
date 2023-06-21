import React, { FC } from "react";
import styles from "./AddTabButton.module.css"

interface AddTabButtonProps {
    addTab: () => void;
}

const AddTabButton: FC<AddTabButtonProps> = ({ addTab }) => {
    return <button onClick={addTab} className={styles.addButton}>+</button>;
};

export default AddTabButton;
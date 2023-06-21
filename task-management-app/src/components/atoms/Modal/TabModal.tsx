import React, { useState, FC } from "react";
import Modal from 'react-modal'
import styles from './TabModal.module.css';

interface TabModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onTab: (name: string) => void;
}

const TabModal: FC<TabModalProps> = ({ isOpen, onRequestClose, onTab }) => {
    const [tabName, setTabName] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if(tabName.length === 0){
            setError(true)
            return
        }
        onTab(tabName);
        setTabName('');
        onRequestClose();
    };
    
    const onClick = () => {
        setTabName('');
        onRequestClose();
    }
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTabName(e.target.value)
        setError(false)
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.modal}
            overlayClassName={styles.overlay}
            shouldCloseOnOverlayClick
        >
            <button onClick={onClick} className={styles.closeButton}>x</button>
            <div className={styles.createBoard}>
                New Kanban Board
            </div>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <input 
                    type="text"
                    value={tabName}
                    onChange={onChange}
                    className={`${styles.formContainer} ${error ? styles.error : ""}`}
                    placeholder={error ? "空白のまま作成できません" : "タブの名前を入力してください"}
                />
                <button type="submit" className={styles.createButton}>Create</button>
            </form>
        </Modal>
    );
};

export default TabModal;

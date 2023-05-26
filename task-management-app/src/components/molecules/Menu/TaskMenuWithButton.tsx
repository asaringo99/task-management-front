import React, { useState, useEffect, useRef, FC } from 'react';
import MenuButton from '../../atoms/MenuButton/MenuButton'
import MenuItem from '../../atoms/MenuItem/MenuItem'
import styles from './TaskMenuWithButton.module.css';

interface TaskMenuWithButtonProps {
    menuItems: { label: string, action: () => void}[]
}

const TaskMenuWithButton: FC<TaskMenuWithButtonProps> = ({menuItems}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, true);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, []);


    return (
        <div className={styles.dropdown} ref={ref}>
            <div className={styles.buttonPosition}>
                <MenuButton label='︙' onClick={() => setIsOpen(!isOpen)} opened={isOpen}/>
            </div>
            {isOpen && (
                <ul className={styles.dropdownMenu}>
                    {menuItems.map((item, index) => 
                        <li key={index} className={styles.dropdownItem}>
                            <MenuItem itemName={item.label} onItemClick={item.action}/>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default TaskMenuWithButton;

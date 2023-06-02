import React, { FC } from 'react';
import styles from './Load.module.css';

interface LoadingPageProps {
    text: string
}

const LoadingPage: FC<LoadingPageProps> = ({ text }) => {
    return (
        <div className={styles.container}>
            <div className={styles.loadingMessage}>{text}</div>
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
            </div>
        </div>
    );
};

export default LoadingPage;

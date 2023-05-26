"use client";

import React, { FC } from 'react';
import styles from './CardFrame.module.css';

interface CardFrameProps {
    children?: React.ReactNode;
}

const CardFrame: FC<CardFrameProps> = ({ children }) => {
    return (
        <div className={styles.cardFrame}>{children}</div>
    );
};

export default CardFrame;
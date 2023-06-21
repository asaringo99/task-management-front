import React, { FC } from "react";
import styles from './ScrollableContainer.module.css'

type ScrollableContainerProps = {
    children: React.ReactNode
}

const ScrollableContainer: FC<ScrollableContainerProps> = ({ children }) => {
    return <div className={styles.container}>{children}</div>
}

export default ScrollableContainer
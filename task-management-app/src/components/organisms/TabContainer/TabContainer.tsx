import React, { FC, useEffect, useState } from "react";
import styles from './TabContainer.module.css';
import AddTabButton from '../../atoms/Button/AddTabButton';
import Tab from '../../atoms/Tab/Tab';
import TabModal from '../../atoms/Modal/TabModal'
import ApiClient from "@/services/api/client";
import { ApiResponse, DataTaskTab } from "@/services/api/response";
import { TabType } from "../../types/tab";

interface TabInfo {
    id: number;
    name: string;
}

interface TabContainerProps {
    apiClient: ApiClient
    children: React.ReactNode
    activeTabid: number
    tabs: TabType[]
    setActiveTabid: React.Dispatch<React.SetStateAction<number>>
    setTabs: React.Dispatch<React.SetStateAction<TabType[]>>
}

const TabContainer: FC<TabContainerProps> = ({ apiClient, activeTabid, children, tabs, setActiveTabid, setTabs }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addTab = (name: string) => {
        const path = '/tab/create'
        const payload = {'isactive': false, 'title': name}
        apiClient.post<ApiResponse<DataTaskTab>>(path, payload).then(response => {
            const newTab: TabType = {
                tabid: response.data.data.tabid,
                isactive: false,
                title: name,
            };
            const newTabList: TabType[] = [...tabs, newTab];
            setTabs(newTabList);
            setActiveTabid(newTabList.length === 1 ? newTabList[0].tabid : activeTabid)
        }).catch(error => {
            console.error(error)
        })
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const deleteTab = (id: number) => {
        const newTabs = tabs.filter(tab => tab.tabid !== id)
        setTabs(newTabs);
        if (activeTabid === id) {
            const firstTabid = newTabs.length > 0 ? newTabs[0].tabid : -1
            setActiveTabid(firstTabid);
        }
        const path = `/tab/delete/${id}`
        apiClient.delete<ApiResponse<any>>(path).then(response => {
            console.log(response)
        }).catch(error => {
            console.error(error)
        })
    };

    return (
        <>
            <div className={styles.container}>
                <TabModal isOpen={isModalOpen} onRequestClose={closeModal} onTab={addTab}/>
                <div className={styles.tabs}>
                    {tabs.map(tab => (
                        <Tab 
                        key={tab.tabid}
                        isActive={activeTabid === tab.tabid}
                        name={tab.title}
                        onDelete={() => deleteTab(tab.tabid)}
                        onClick={() => setActiveTabid(tab.tabid)}
                        />
                        ))}
                </div>
                <AddTabButton addTab={openModal} />
            </div>
            <div className={styles.tabContainer}>
                {children}
            </div>
        </>
    );
};

export default TabContainer;
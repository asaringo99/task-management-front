export interface CardType {
    id: string;
    boardId: string;
    text: string
    menuItems: { label: string, action: () => void}[];
}
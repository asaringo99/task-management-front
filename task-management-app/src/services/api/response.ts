export interface ApiResponse<T> {
    status: string;
    data: T;
}

export interface DataTaskTab {
    tabid: number,
    userid: string,
    isactive: boolean,
    title: string
}

export interface DataTaskBoard {
    boardid: string,
    userid: string,
    tabid: number,
	priority: number,
	status: string,
}

export interface DataTaskCard {
    taskid: string,
    userid: string
    boardid: string,
    priority: number,
    contents: string,
}

export interface DataBoardid {
    boardid: string,
}

export interface DataLogin {
    token: string
}
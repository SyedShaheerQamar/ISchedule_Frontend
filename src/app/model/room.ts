export interface Course {
    id: number | null | undefined;
    courseName: string | null | undefined;
    startTime: string | null | undefined;
    endTime: string | null | undefined;
    days: any;
    roomNumber : string | null | undefined
}

export interface Room {
    id: number | null | undefined;
    roomName: string;
    course: string | null | undefined;
}


export interface Job {
    id: number;
    name: string;
    jobClass: string;
    cron: string;
    active: boolean;
    createdOn: Date;
    lastExecutedOn: Date;
}
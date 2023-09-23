import {Website} from "@/app/core/dto/Website";
import {City} from "@/app/core/dto/City";


export class Job {
    constructor(
        public id: number | null,
        public name: string,
        public jobClass: string,
        public cron: string,
        public active: boolean,
        public createdOn: Date,
        public lastExecutedOn: Date,
        public website?: Website,
        public cities?: City[]

    ) {}
}
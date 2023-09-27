import {Agent} from "@/app/core/dto/Agent";
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
        public agent?: Agent,
        public cities?: City[]
    ) {}
}
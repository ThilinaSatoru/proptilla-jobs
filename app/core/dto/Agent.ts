export class Agent {
    constructor(
        public id: number | null,
        public name: string,
        public url: string,
        public refNo: string,
        public status: string,
        public logo: string
    ) {
    }
}
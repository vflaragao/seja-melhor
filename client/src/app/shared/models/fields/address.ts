export class Address {
    complement?: string;
    
    constructor (
        public cep?: string,
        public district?: string,
        public street?: string,
        public number?: string,
        public state?: string,
        public city?: string
    ) {}
}

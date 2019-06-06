import { OrderInfo } from './OrderInfo';

export class OrderShipping extends OrderInfo {
    constructor() {
        super();
        this.IsFullyShipped=false;
        this.Weight=0;
    }
    public IsFullyShipped: boolean;
    public Weight: number;
}
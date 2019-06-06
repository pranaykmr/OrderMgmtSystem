import { OrderInfo } from './OrderInfo';

export class OrderShipping extends OrderInfo {
    constructor() {
        super();
        this.IsFullyShipped=false;
    }
    public IsFullyShipped: boolean;
}
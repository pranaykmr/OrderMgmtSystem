import { ShippingDetails } from './ShippingDetails';
import { Guid } from 'guid-typescript';

export class ShippingOrderDetails extends ShippingDetails {
    constructor() {
        super();
        this.FactoryPrice = 0;
        this.TotalValue = 0;
        this.ShippingModeName = "";
        this.BuyerName = "";
        this.ShippedByName = "";
        this.FactoryName = "";
        this.ShipDate = null;
    }
    public FactoryPrice: number;
    public TotalValue: number;
    public ShipDate: Date;
    public BuyerId: Guid;
    public BuyerName: string;
    public ShippingModeName: string;
    public ShippedByName: string;
    public FactoryName: string;
}
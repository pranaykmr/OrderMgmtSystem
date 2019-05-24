
export class OrderInfo {
    constructor() {
        this.OrderNo = null;
        this.StyleNo = "";
        this.Quantity = 0;
        this.Delivery = null;
        this.FactoryId = "";
        this.FactoryName = "";
        this.PushraseOrderNo = null;
        this.ShippingModeId = "";
        this.ShippingModeName = "";
        this.PriceFOB = null;
        this.FactoryPrice = null;
        this.TotalValue = null;
        this.ShipDate = null;
        this.BuyerId = "";
        this.BuyerName = "";
    }
    public OrderNo: string;
    public StyleNo: string;
    public Quantity: number;
    public Delivery: Date;
    public FactoryId: string;
    public FactoryName: string;
    public PushraseOrderNo: string;
    public ShippingModeId: string;
    public ShippingModeName: string;
    public PriceFOB: number;
    public FactoryPrice: number;
    public TotalValue: number;
    public ShipDate: Date;
    public BuyerId: string;
    public BuyerName: string;
}
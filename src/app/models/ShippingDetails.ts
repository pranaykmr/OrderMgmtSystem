export class ShippingDetails {
    constructor() {
        this.Order_No = "";
        this.PO_No = "";
        this.Invoice_No = "";
        this.Shipping_Date = null;
        this.Weight = 0;
        this.ShippedById = "";
        this.ShippingModeId = "";
        this.Advised = null;
        this.Quantity = 0;
        this.Consigned_To = null;
    }
    public Order_No: string;
    public PO_No: string;
    public Invoice_No: string;
    public Shipping_Date: Date;
    public Weight: number;
    public ShippedById: string;
    public ShippingModeId: string;
    public Advised: Date;
    public Quantity: number;
    public Consigned_To: string;
}

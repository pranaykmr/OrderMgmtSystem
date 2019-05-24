export class Order{
    constructor(){
        this.Order_No = null;
        this.Style_No = "";
        this.Quantity = 0;
        this.Delivery = null;
        this.Factory_Id = "";
        this.Purchase_Order_No = null;
        this.ShippingMode_Id = null;
        this.Price_FOB = null;
        this.Factory_Price = null;
        this.Total_Value = 0;
        this.Ship_Date = null;
        this.BuyerId = "";
    }
    public Order_No : string;
    public Style_No : string;
    public Quantity : Number;
    public Delivery : Date;
    public Factory_Id : string;
    public Purchase_Order_No : string;
    public ShippingMode_Id : string;
    public Price_FOB : any;
    public Factory_Price : any;
    public Total_Value : Number;
    public Ship_Date : Date;
    public BuyerId : string;
}
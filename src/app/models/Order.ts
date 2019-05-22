export class Order{
    constructor(){
        this.Order_No = 0;
        this.Style_No = "";
        this.Quantity = 0;
        this.Delivery = null;
        this.Factory_Id = "";
        this.Purchase_Order_No = 0;
        this.ShippingMode_Id = null;
        this.Price_FOB = null;
        this.Factory_Price = null;
        this.Total_Value = false;
        this.Ship_Date = null;
        this.BuyerId = "";
    }
    public Order_No : Number;
    public Style_No : string;
    public Quantity : Number;
    public Delivery : Date;
    public Factory_Id : string;
    public Purchase_Order_No : Number;
    public ShippingMode_Id : string;
    public Price_FOB : any;
    public Factory_Price : any;
    public Total_Value : any;
    public Ship_Date : Date;
    public BuyerId : string;
}
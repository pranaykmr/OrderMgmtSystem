        export class Users{
            constructor(){
                this.UserName = "";
                this.Password = "";
                this.IsActive = false;
                this.ActiveToken = null;
            }
            public UserName : string;
            public Password : string;
            public IsActive : boolean;
            public ActiveToken : string;
            public IsDeleted: boolean;
            }
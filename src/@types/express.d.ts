declare namespace Express{
    export interface Request{
        user:{
            id:string
            isAdmin:string
        }
        product:{
            id:string
        }

    }
}
import { Request, Response, NextFunction } from "express";

export const checkFields = (fields: string[]) => (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    
    const mapMissingFields = fields.filter(key => {
        if (!Object.keys(req.body).includes(key)){
            return key
        }
    })

    if (mapMissingFields.length){
        return res.status(400).send({message: "Os seguintes campos estão faltando", fields: mapMissingFields}).end()
    }
    next()
}
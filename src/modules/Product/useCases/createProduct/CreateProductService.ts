import AppError from "../../../../helpers/error/AppError"
import Product from "../../infra/model/Product"

interface Request {
    title: string,
    desc: string,
    categories: object,
    size: object,
    color: object,
    price: number,
    inStock: boolean
}
/**
 * [] correção de upload de imagem - FireBase ou S3
 * [] salvar o link apenas no bando de dados
 * [] salvar a quantidade de estoque obrigatóriamente
 * [] dar saída a cada venda
 */
export class CreateProductsService {
   public async execute({title, desc, categories, size, color, price, inStock}: Request){

        const checkProductTitleExists = await Product.findOne({title})
        const img = "https://www.google.com.br/logos/google.jpg";
        if (checkProductTitleExists) {
            throw new AppError('Title already used', 409)
        }
        const newProduct = new Product({
            title,
            desc,
            img,
            categories,
            size,
            color,
            price,
            inStock
        })
        if (newProduct) {
            const createNewProduct = await newProduct.save()
            return createNewProduct
        } else {
            throw new AppError("Not possible to create a product", 401)
        }
   }
}
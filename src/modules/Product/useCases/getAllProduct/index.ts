import { GetAllProductsController } from "./GetAllProductsController"
import { GetAllProductsService } from "./GetAllProductsService"


const getAllProductsService = new GetAllProductsService()
export const getAllProductsController = new GetAllProductsController(getAllProductsService)
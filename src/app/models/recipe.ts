import { Ingredients } from "./ingredients";

export interface Recipe {
    id?: string;
    title: string;
    description: string;
    ingredients: Ingredients[];
    instruction: string;
    image?: string;
}

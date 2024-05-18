import { Meal } from "../enums/meal"

export interface Recipe {
    id: string;
    name: string
    details: {
        suitableForMeals: Meal[],
        ingredients: string[],
        steps: string[],
        photos: string[]
        or: string[]
    }
}
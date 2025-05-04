export interface Product {
    id: number;
    title: string;
    price: number;  // Modifié pour être un type number plutôt qu'une valeur fixe
    description: string;
    category: string;
    image: string;
    rating?: {      // Rend l'objet rating optionnel avec "?"
        rate: number;
        count: number;
    };
}
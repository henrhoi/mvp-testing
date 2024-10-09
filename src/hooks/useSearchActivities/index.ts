import { options } from "./constants";


export const useSearchActivites = (searchTerm: string) => {
    return searchTerm.length ? options.filter((option) => option.label.includes(searchTerm.toLowerCase()) || option.category.includes(searchTerm.toLowerCase())) : options;
}


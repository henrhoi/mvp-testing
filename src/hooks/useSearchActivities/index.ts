import { useMemo } from "react";
import { options } from "./constants";


export const useSearchActivites = (searchTerm: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return useMemo(() => {
        const mappedOptions = options.map((option) => option.label + " - " + option.category)
        if (lowerCaseSearchTerm === "")  {
            return mappedOptions;
        }
        const relevantOptions = [...mappedOptions.filter((label) => label.toLowerCase().includes(lowerCaseSearchTerm))]
        console.log("# Search results #");
        console.log("Search term: ", searchTerm);
        for (const option of relevantOptions) {
            console.log(option);
        }
        console.log("#################");
        return relevantOptions;
    }
    , [lowerCaseSearchTerm, searchTerm]);
}



import type { IFilter } from "@/Filter/js/Filter";
import type { SortState } from "@/Handsontable/js/ModelDefinition";

export class Helper {
    static prepareUrl = (url: string, dataFilter: IFilter | null = null, sort: SortState | null = null) => {
        const hostname = window.remoteUrl; // např. 'localhost'

        const baseUrl = `${hostname}`;

        const urlObj = new URL(url, baseUrl || window.location.origin);
        const searchParams = new URLSearchParams(urlObj.search);

        // if (dataFilter) {
        //     for (const [key, obj] of Object.entries(dataFilter.items)) {
        //         if (obj.filters?.length) {
        //             searchParams.set(key, JSON.stringify({ filters: obj.filters }));
        //         }
        //     }
        // }

        searchParams.set("count", "1000");

        if (sort && sort.column) {
            if (sort.direction === "desc") {
                searchParams.set("sort", `-${sort.column}`);
            } else {
                searchParams.set("sort", sort.column);
            }
        }

        urlObj.search = searchParams.toString();

        return urlObj.toString();
    };
}

import axios from "axios";

import { ModelDefinitionColumn } from "@/Handsontable/js/ModelDefinitionColumn";
import type { ModelDefinitionState } from "@/Handsontable/js/ModelDefinition";
import {ModelDefinitionRelation} from "@/Handsontable/js/ModelDefinitionRelation";

export function useModelDefinitionLoader() {
    const loadModelDefinition = async (id: string | null): Promise<ModelDefinitionState | undefined> => {
        if (!id) return undefined;

        let url = window.remoteUrl + '/admin/sheets/get-definition';

        try {
            const response = await axios.get(url, {
                params: { id: id },
            });

            let state: ModelDefinitionState = {
                id: response.data.id,
                name: response.data.name,
                dataUrl: response.data.dataUrl,
                columns: [],
                relations: [],
                isLoaded: true,
                sort: {
                    column: null,
                    direction: "asc",
                },
                joinChain: '',
            };

            if (response.data.columns) {
                // response.data.columns = response.data.columns.map((obj: {}) => ({
                //     ...obj,
                //     useInSheet: false,
                // }));


                    response.data.columns.forEach((column: any) => {
                        state.columns?.push(new ModelDefinitionColumn(column));
                    });

            }

            if (response.data.relations){
                response.data.relations.forEach((relation: any) => {
                    state.relations?.push(new ModelDefinitionRelation(relation));
                });
            }

            return state;
        } catch (e) {
            console.error(e);
            return undefined;
        }
    };

    return { loadModelDefinition };
}

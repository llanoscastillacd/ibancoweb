import { Tipo } from "../utils/tipo.enum";
import { Opcion } from "./opcion";

export interface ConfiguracionTipos {
    data: Map<Tipo, Opcion[]> ;
}

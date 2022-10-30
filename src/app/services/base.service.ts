import { HttpClient } from '@angular/common/http';

export abstract class BaseService<T> {

    private readonly SERVER_URL = 'http://localhost:8080/api/';

    /**
     * Defines the REST Ressource, e.g. players. Needed for method {@method this.getAPIUrl} to work.
     */
    protected abstract getRESTRessource(): string;

    /**
     * Contains the server URL and the defined REST ressource
     */
    getAPIUrl(): string {
        return this.SERVER_URL + this.getRESTRessource();
    }

}

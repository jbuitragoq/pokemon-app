import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { environment } from 'src/environments/environment';

describe('ListsService', () => {
    let service: PokemonService;
    let mock: HttpTestingController;

    const mockPokemon = {
        name: "Alakazam",
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/065.png",
        attack: 79,
        defense: 61,
        hp: 55,
        type: "Eléctrico",
        idAuthor: 1
    };
    const mockResponseList = [{
        id: 35,
        name: "Alakazam",
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/065.png",
        attack: 79,
        defense: 61,
        hp: 55,
        type: "Eléctrico",
        idAuthor: 1
    }];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(PokemonService);
        mock = TestBed.inject(HttpTestingController);
    });

    beforeEach(() => {
        jest.resetAllMocks();
        mock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // getPokemonById

    it('getPokemonById: should return the information of the pokemon associated to the sent id', () => {
        const mockParam = 1;
        const sUrl = `${environment.pokemonApi}/${mockParam}`;
        let resp = {};

        service.getPokemonById(mockParam).subscribe((response: any) => resp = response);
        const req = mock.expectOne(sUrl);
        req.flush(mockResponseList[0]);

        expect(req.request.method).toBe('GET');
        expect(req.request.url).toEqual(sUrl);
        expect(resp).toEqual(mockResponseList[0]);
    });

    // getPokemonByIdAuthor

    it('getPokemonByIdAuthor: should return the list of pokemon associated with the submitted authors id', () => {
        const mockParam = 2;
        const sUrl = `${environment.pokemonApi}/?idAuthor=${mockParam}`;
        let resp = {};

        service.getPokemonByIdAuthor(mockParam).subscribe((response: any) => resp = response);
        const req = mock.expectOne(sUrl);
        req.flush(mockResponseList);

        expect(req.request.method).toBe('GET');
        expect(req.request.url).toEqual(sUrl);
        expect(resp).toEqual(mockResponseList);
    });

    // createPokemon

    it('createPokemon: should save the pokemon information sent and return the same along with a new id', () => {
        const sUrl = `${environment.pokemonApi}`;
        let resp = {};

        service.createPokemon(mockPokemon).subscribe((response: any) => resp = response);
        const req = mock.expectOne(sUrl);
        req.flush(mockResponseList[0]);

        expect(req.request.method).toBe('POST');
        expect(req.request.url).toEqual(sUrl);
        expect(req.request.body).toEqual(mockPokemon);
        expect(resp).toEqual(mockResponseList[0]);
    });

    // updatePokemon

    it('updatePokemon: should update the information of the pokemon sent and return the same information', () => {
        const sUrl = `${environment.pokemonApi}/${mockResponseList[0].id}`;
        let resp = {};

        service.updatePokemon(mockResponseList[0]).subscribe((response: any) => resp = response);
        const req = mock.expectOne(sUrl);
        req.flush(mockResponseList[0]);

        expect(req.request.method).toBe('PUT');
        expect(req.request.url).toEqual(sUrl);
        expect(req.request.body).toEqual(mockResponseList[0]);
        expect(resp).toEqual(mockResponseList[0]);
    });

    // deletePokemon

    it('deletePokemon: should delete the pokemon referenced by the sent id and return null', () => {
        const mockParam = 1;
        const sUrl = `${environment.pokemonApi}/${mockParam}`;
        let resp = {};

        service.deletePokemon(mockParam).subscribe((response: any) => resp = response);
        const req = mock.expectOne(sUrl);
        req.flush(null);

        expect(req.request.method).toBe('DELETE');
        expect(req.request.url).toEqual(sUrl);
        expect(resp).toEqual("Pokemon deleted");
    });

    it('deletePokemon: should try to delete the pokemon referenced by the sent id and return an error message', () => {
        const mockParam = 1;
        const mockResponse = "Pokemon not found";
        const sUrl = `${environment.pokemonApi}/${mockParam}`;
        let resp = {};

        service.deletePokemon(mockParam).subscribe((response: any) => resp = response);
        const req = mock.expectOne(sUrl);
        req.flush(mockResponse);

        expect(req.request.method).toBe('DELETE');
        expect(req.request.url).toEqual(sUrl);
        expect(resp).toEqual(mockResponse);
    });

});
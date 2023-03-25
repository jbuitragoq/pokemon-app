import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpGenericService } from 'src/app/core/services/http-generic/http-generic.service';
import { PokemonModel } from 'src/app/core/models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {

  constructor(private httpGenericService: HttpGenericService) {}

  getPokemonById(id: number): Observable<PokemonModel[]> {
    const sUrl = `${environment.pokemonApi}/${id}`;
    return this.httpGenericService.get<PokemonModel[]>(sUrl);
  }

  getPokemon(idAuthor: number): Observable<PokemonModel[]> {
    const sUrl = `${environment.pokemonApi}/?idAuthor=${idAuthor}`;
    return this.httpGenericService.get<PokemonModel[]>(sUrl);
  }

  createPokemon(pokemon: PokemonModel): Observable<PokemonModel[]> {
    const sUrl = `${environment.pokemonApi}`;
    return this.httpGenericService.post<PokemonModel[]>(sUrl, pokemon);
  }

  updatePokemon(pokemon: PokemonModel): Observable<PokemonModel[]> {
    const sUrl = `${environment.pokemonApi}/${pokemon.id}`;
    return this.httpGenericService.put<PokemonModel[]>(sUrl, pokemon);
  }

  deletePokemon(id: number): Observable<string> {
    const sUrl = `${environment.pokemonApi}/${id}`;
    return this.httpGenericService.delete(sUrl);
  }
}

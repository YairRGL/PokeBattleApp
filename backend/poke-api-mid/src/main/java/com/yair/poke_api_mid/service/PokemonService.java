package com.yair.poke_api_mid.service;

import java.util.Map;

public interface PokemonService {
    Map<String, Object> getPokemonList(int offset, int limit);
    Object getPokemonDetails(String id);
    Object searchPokemonByName(String name);
}

package com.yair.poke_api_mid.controller;

import com.yair.poke_api_mid.service.PokemonServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/pokemon")
public class PokemonController {

    // DI
    private final PokemonServiceImpl pokemonService;

    public PokemonController(PokemonServiceImpl pokemonService) {
        this.pokemonService = pokemonService;
    }

    @GetMapping
    public Map<String, Object> getPokemonList(
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "20") int limit) {
        return pokemonService.getPokemonList(offset, limit);
    }

    @GetMapping("/{id}")
    public Object getPokemonDetails(@PathVariable String id) {
        return pokemonService.getPokemonDetails(id);
    }

    @GetMapping("/search")
    public Object searchPokemonByName(@RequestParam String name) {
        return pokemonService.searchPokemonByName(name);
    }
}
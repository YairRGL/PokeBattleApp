package com.yair.poke_api_mid.service;

import com.yair.poke_api_mid.util.LogsUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class PokemonServiceImpl implements PokemonService {

    @Value("${pokeapi.base-url:https://pokeapi.co/api/v2}")
    private String baseUrl;
    private final RestTemplate restTemplate;
    private final LogsUtil logsUtil;
    private final CacheManager cacheManager;

    public PokemonServiceImpl(RestTemplate restTemplate, LogsUtil logsUtil, CacheManager cacheManager) {
        this.restTemplate = restTemplate;
        this.logsUtil = logsUtil;
        this.cacheManager = cacheManager;
    }

    @Override
    @Cacheable(value = "pokemonList", key = "#offset + '-' + #limit")
    public Map<String, Object> getPokemonList(int offset, int limit) {
        String url = baseUrl + "/pokemon?offset=" + offset + "&limit=" + limit;

        logsUtil.logRequest("GET", url);
        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            logsUtil.logResponse(response.getBody());

            Map<String, Object> result = new HashMap<>();
            result.put("count", response.getBody().get("count"));
            result.put("next", response.getBody().get("next"));
            result.put("previous", response.getBody().get("previous"));
            result.put("results", response.getBody().get("results"));

            return result;
        } catch (HttpClientErrorException e) {
            logsUtil.logCache("Error getting pokemon list");
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                return new HashMap<String, Object>() {{
                    put("error", "Pokemon list not found");
                }};
            }
            throw e;
        }
    }

    @Override
    @Cacheable(value = "pokemonDetails", key = "#id")
    public Object getPokemonDetails(String id) {
        String url = baseUrl + "/pokemon/" + id;

        logsUtil.logRequest("GET", url);
        try {
            Object response = restTemplate.getForObject(url, Object.class);
            logsUtil.logResponse(response);
            return response;
        } catch (HttpClientErrorException e) {
            logsUtil.logCache("Error getting pokemon details");
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                return new HashMap<String, Object>() {{
                    put("error", "Pokemon not found");
                }};
            }
            throw e;
        }
    }

    @Override
    @Cacheable(value = "pokemonSearch", key = "#name.toLowerCase()")
    public Object searchPokemonByName(String name) {
        String url = baseUrl + "/pokemon/" + name.toLowerCase();

        logsUtil.logRequest("GET", url);
        try {
            Object response = restTemplate.getForObject(url, Object.class);
            logsUtil.logResponse(response);
            return response;
        } catch (HttpClientErrorException e) {
            logsUtil.logCache("Error searching pokemon by name");
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                return new HashMap<String, Object>() {{
                    put("error", "Pokemon not found");
                }};
            }
            throw e;
        }
    }

    // Debug cache
    private void printCacheInfo(String cacheName, String key) {
        Cache cache = cacheManager.getCache(cacheName);
        if (cache != null) {
            Cache.ValueWrapper valueWrapper = cache.get(key);
            if (valueWrapper != null) {
                System.out.println("Cache FOUND for " + cacheName + " with key: " + key);
            } else {
                System.out.println("Cache MISS for " + cacheName + " with key: " + key);
            }
        } else {
            System.out.println("Cache " + cacheName + " not found");
        }
    }
}
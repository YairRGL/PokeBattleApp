package com.yair.poke_api_mid.service;

import com.yair.poke_api_mid.model.BattleRequest;
import com.yair.poke_api_mid.model.BattleResult;
import com.yair.poke_api_mid.model.MoveResponse;
import com.yair.poke_api_mid.util.LogsUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class BattleServiceImpl implements BattleService {
    private final RestTemplate restTemplate;
    private final LogsUtil logsUtil;

    public BattleServiceImpl(RestTemplate restTemplate, LogsUtil logsUtil) {
        this.restTemplate = restTemplate;
        this.logsUtil = logsUtil;
    }

    @Override
    public BattleResult calculateDamage(BattleRequest request) {
        String pokemon1 = request.getPokemon1();
        String pokemon2 = request.getPokemon2();
        String moveUrl = request.getMoveUrl();
        int currentTurn = request.getCurrentTurn();
        int pokemon1Health = request.getPokemon1Health();
        int pokemon2Health = request.getPokemon2Health();


        ResponseEntity<MoveResponse> moveResponse = restTemplate.getForEntity(moveUrl, MoveResponse.class);
        int movePower = moveResponse.getBody().getPower();
        String moveEffect = "";
        if (moveResponse.getBody() != null && moveResponse.getBody().getEffectEntries() != null
                && !moveResponse.getBody().getEffectEntries().isEmpty()) {
            moveEffect = moveResponse.getBody().getEffectEntries().get(0).getEffect();
        }

        // Calculate the damage based on the move power from the api
        int damage = movePower/2;
        if (currentTurn == 1) {
            pokemon2Health = Math.max(pokemon2Health - damage, 0);
        } else {
            pokemon1Health = Math.max(pokemon1Health - damage, 0);
        }

        String winner = null;
        if (pokemon1Health <= 0) {
            winner = pokemon2;
        } else if (pokemon2Health <= 0) {
            winner = pokemon1;
        }

        BattleResult result = new BattleResult();
        result.setPokemon1Health(pokemon1Health);
        result.setPokemon2Health(pokemon2Health);
        result.setWinner(winner);
        result.setMoveEffect(moveEffect);

        return result;
    }
}
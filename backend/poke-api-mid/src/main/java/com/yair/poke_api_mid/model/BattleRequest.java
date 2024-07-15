package com.yair.poke_api_mid.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BattleRequest {
    private String pokemon1;
    private String pokemon2;
    private String moveUrl;
    private int currentTurn;
    private int pokemon1Health;
    private int pokemon2Health;
}

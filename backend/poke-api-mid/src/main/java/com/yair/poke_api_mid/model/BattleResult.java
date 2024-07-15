package com.yair.poke_api_mid.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BattleResult {
    private int pokemon1Health;
    private int pokemon2Health;
    private String winner;
    private String moveEffect;
}

package com.yair.poke_api_mid.service;

import com.yair.poke_api_mid.model.BattleRequest;
import com.yair.poke_api_mid.model.BattleResult;

public interface BattleService {
    BattleResult calculateDamage(BattleRequest request);
}

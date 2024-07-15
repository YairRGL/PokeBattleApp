package com.yair.poke_api_mid.controller;

import com.yair.poke_api_mid.model.BattleRequest;
import com.yair.poke_api_mid.model.BattleResult;
import com.yair.poke_api_mid.service.BattleService;
import com.yair.poke_api_mid.service.BattleServiceImpl;
import com.yair.poke_api_mid.util.LogsUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/pokemon/battle")
public class BattleController {
    private final BattleService battleService;

    public BattleController(RestTemplate restTemplate, LogsUtil logsUtil){
        this.battleService = new BattleServiceImpl(restTemplate, logsUtil);
    }

    @PostMapping
    public BattleResult calculateDamage(@RequestBody BattleRequest request){
        return battleService.calculateDamage(request);
    }

}
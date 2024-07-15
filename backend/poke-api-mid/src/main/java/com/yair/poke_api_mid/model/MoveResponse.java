package com.yair.poke_api_mid.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MoveResponse {
    private int power;
    @JsonProperty("effect_entries")
    private List<EffectEntry> effectEntries;

    @Getter
    @Setter
    public static class EffectEntry {
        private String effect;
    }
}

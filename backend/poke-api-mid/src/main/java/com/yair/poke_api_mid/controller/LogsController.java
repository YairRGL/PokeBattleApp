package com.yair.poke_api_mid.controller;

import com.yair.poke_api_mid.util.LogsUtil;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;

@RestController
@RequestMapping("/api/logs")
public class LogsController {

    private final LogsUtil logsUtil;

    public LogsController(LogsUtil logsUtil) {
        this.logsUtil = logsUtil;
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> downloadLogFile() throws IOException {
        FileSystemResource resource = new FileSystemResource(logsUtil.getLogFilePath());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=pokeapi_logs.txt");
        headers.add(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE);
        headers.add(HttpHeaders.CONTENT_LENGTH, String.valueOf(Files.size(logsUtil.getLogFilePath())));

        return ResponseEntity.ok()
                .headers(headers)
                .body(resource);
    }
}
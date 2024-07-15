package com.yair.poke_api_mid.util;


import org.springframework.stereotype.Component;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class LogsUtil {

    private static final String LOG_FILE = "pokeapi_logs.txt";
    private final Path logFilePath;

    public LogsUtil() {
        this.logFilePath = Paths.get(LOG_FILE).toAbsolutePath();
    }

    public void logCache(String cacheName) {
        log("From cache:" + cacheName);
    }

    public void logRequest(String method, String url) {
        log("Request: " + method + " " + url);
    }

    public void logResponse(Object response) {
        log("Response: " + response);
    }

    private void log(String message) {
        try (FileWriter fw = new FileWriter(LOG_FILE, true);
             PrintWriter out = new PrintWriter(fw)) {
            // Get the current time
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);

            // Write the timestamp and message to the log file
            out.println(timestamp + " - " + message);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Return the file path to download
    public Path getLogFilePath() {
        return logFilePath;
    }
}
package com.extension.email_writter.services;

import com.extension.email_writter.entity.EmailRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;


import static org.apache.logging.log4j.util.StringBuilders.escapeJson;

@Service
public class EmailGeneratorService {

    private static final Logger log =
            LoggerFactory.getLogger(EmailGeneratorService.class);

    private WebClient webClient;


    private String apikey ;


    private String baseUrl ;

    @PostConstruct
    public void init() {

        if (apikey == null || apikey.isBlank()) {
            throw new IllegalStateException("Gemini API key is not configured");
        }

        this.webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .build();

        String masked = "****" + apikey.substring(apikey.length() - 4);
        log.info("Gemini API key loaded successfully. Suffix: {}", masked);
    }

    // define the logic of email generator
    public String generateEmailReply(EmailRequest emailRequest) {
        // Build prompt -> tone
        String prompt = buildPrompt(emailRequest);

        // prepare raw json formate or body
        String requestBody = String.format("""
                {
                    "contents": [
                      {
                        "parts": [
                          {
                            "text": "%s"
                          }
                        ]
                      }
                    ],
                    "generationConfig":{
                        "candidateCount": 1
                        }
                  }""", prompt);


        // send request by client(web client spring)
        String response = webClient.post()
                .uri(uriBuilder -> uriBuilder.path().build())
                .header("x-goog-api-key", apikey)
                .header("Content-Type","application/json").bodyValue(requestBody)
                .retrieve().bodyToMono(String.class)
                .block();

        // extract response
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);

            JsonNode candidates = root.path("candidates");
            return root.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText()
                    .trim();

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }





    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();;
        prompt.append("Generate a professional email reply for the following email with pretty good presentable with smoothness and without subject ");

        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()){
            // append the tone in the prompt
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone.");

        }
        prompt.append("Original Email: \n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}

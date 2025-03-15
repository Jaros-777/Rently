package com.example.Rently;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class StartController {
    @GetMapping("/hello")
    public String hello()
    {
        return "Hello World";
    }

    @GetMapping("/json")
    public List<String> lista(){
        return List.of("First","Second","Third");
    }

    @PostMapping("/button")
    String getText(@RequestBody String message)
    {
        System.out.println("Odebralem: "+ message);
        return message;
    }
}

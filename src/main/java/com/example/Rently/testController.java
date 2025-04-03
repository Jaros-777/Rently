package com.example.Rently;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("https://api.sampleapis.com/coffee")
public class testController {

    @PostMapping("/hot")
    public void hot(@RequestBody String response) {
        System.out.println(response);
    }
}

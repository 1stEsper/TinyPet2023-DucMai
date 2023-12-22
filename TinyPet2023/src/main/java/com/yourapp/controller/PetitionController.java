package com.yourapp.controller;

import com.yourapp.model.Petition;
import com.yourapp.repository.PetitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


public class PetitionController {

    private PetitionRepository petitionRepository;

    public List<Petition> getAllPetitions() {
        return petitionRepository.findAll();
    }

    public Petition createPetition(@RequestBody Petition petition) {
        return petitionRepository.save(petition);
    }

    public Petition getPetitionById(@PathVariable Long id) {
        return petitionRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    
}

package com.instagram.Instagram.clone.service;

import com.instagram.Instagram.clone.model.DatabaseSequence;
import com.instagram.Instagram.clone.model.User;
import com.instagram.Instagram.clone.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import com.instagram.Instagram.clone.model.RegistrationMail;
import org.thymeleaf.context.Context;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;



@Service
public class UserService {

    @Autowired
    private MailService mailService;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private MongoOperations mongoOperations;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public User addUser(User user) {
        user.setUser_id(generateSequence(User.SEQUENCE_NAME));

        User savedUser = userRepository.save(user);

        RegistrationMail registrationMail = new RegistrationMail();
        registrationMail.setSubject("Registration Confirmation");
        registrationMail.setName(savedUser.getName());

        try {
            mailService.sendRegistrationEmail(
                    savedUser.getEmail(),
                    registrationMail,
                    "registrationMailTemplate",
                    new Context()
            );
        } catch (MessagingException e) {
            System.out.println("Error sending registration email: " + e.getMessage());

        }

        return savedUser;
    }

    public User getUserById(String id){
        return userRepository.findById(id).orElse(null);
    }

    public List<User> getUser() {
        return userRepository.findAll();
    }

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public User updateUser(String id, User user) {
        Optional<User> optionalUser = userRepository.findById(id);
        User existingUser = null;
        if (optionalUser.isPresent()) {
            existingUser = optionalUser.get();
            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
        }
        return userRepository.save(existingUser);
    }

    public String deleteUser(String id){
        userRepository.deleteById(id);
        return "User deleted with id: "+id;
    }


    public String generateSequence(String seqName) {
        DatabaseSequence counter = mongoOperations.findAndModify(query(where("_id").is(seqName)),
                new Update().inc("seq",1),
                options().returnNew(true).upsert(true),
                DatabaseSequence.class);
        return "U" + (!Objects.isNull(counter)?counter.getSeq():1);
    }

    public List<User> searchByName(String name){
        return userRepository.findByNameContainingIgnoreCase(name);
    }


}

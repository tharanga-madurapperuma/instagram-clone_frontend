package com.example.backend.service;

import com.example.backend.model.Post;
import com.example.backend.model.DatabaseSequence;
import com.example.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public Post getPostById(String id){
        return postRepository.findById(id).orElse(null);
    }

    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }

    public Post addPost(Post post){
        post.setPostId(generateSequence(Post.SEQUENCE_NAME));
        return postRepository.save(post);
    }

    @Autowired
    private MongoOperations mongoOperations;

    public String generateSequence(String seqName){
        DatabaseSequence counter = mongoOperations.findAndModify(query(where("_id").is(seqName)),
                new Update().inc("seq",1), options().returnNew(true).upsert(true),
                DatabaseSequence.class);
        return "P" + (!Objects.isNull(counter) ? counter.getSeq() : 1);
    }
}

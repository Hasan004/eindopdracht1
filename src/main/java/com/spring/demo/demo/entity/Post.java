package com.spring.demo.demo.entity;

import com.spring.demo.demo.entity.audit.UserDateAudit;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "post")
public class Post extends UserDateAudit{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PostID")
    private int id;

    @Column(name = "Title")
    private String title;

    @Column(name = "Status")
    private String status;

    @Column(name = "Prijs")
    private String prijs;

    @Column(name = "Beschrijving")
    private String beschrijving;

    @Column(name = "coverPhotoUrl")
    private String fotoUrl;

//    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
//    @JoinColumn(name = "createdBy")
//    private User createdBy;

}

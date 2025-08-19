package com.examly.springapp.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;



@Entity
@DiscriminatorValue("ADMIN")
@Data
public class Admin extends User {



}

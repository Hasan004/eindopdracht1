package com.spring.demo.demo.entity.audit;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;

import javax.persistence.MappedSuperclass;
@MappedSuperclass
@JsonIgnoreProperties(
        value = {"createdBy"},
        allowGetters = true,
        allowSetters = true
)
public abstract class UserDateAudit extends DateAudit {

    @CreatedBy
    private int createdBy;

    public int getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(int createdBy) {
        this.createdBy = createdBy;
    }

}

package com.personal.assessor.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ComplianceStatus.
 */
@Entity
@Table(name = "compliance_status")
public class ComplianceStatus implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "status_ar", nullable = false)
    private String statusAr;

    @NotNull
    @Column(name = "status_en", nullable = false)
    private String statusEn;

    @Column(name = "created_date")
    private ZonedDateTime createdDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "modified_date")
    private ZonedDateTime modifiedDate;

    @Column(name = "modified_by")
    private String modifiedBy;

    @OneToMany(mappedBy = "complianceStatus")
    @JsonIgnore
    private Set<ComplianceValues> values = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatusAr() {
        return statusAr;
    }

    public ComplianceStatus statusAr(String statusAr) {
        this.statusAr = statusAr;
        return this;
    }

    public void setStatusAr(String statusAr) {
        this.statusAr = statusAr;
    }

    public String getStatusEn() {
        return statusEn;
    }

    public ComplianceStatus statusEn(String statusEn) {
        this.statusEn = statusEn;
        return this;
    }

    public void setStatusEn(String statusEn) {
        this.statusEn = statusEn;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public ComplianceStatus createdDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public ComplianceStatus createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public ZonedDateTime getModifiedDate() {
        return modifiedDate;
    }

    public ComplianceStatus modifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
        return this;
    }

    public void setModifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public ComplianceStatus modifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
        return this;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Set<ComplianceValues> getValues() {
        return values;
    }

    public ComplianceStatus values(Set<ComplianceValues> complianceValues) {
        this.values = complianceValues;
        return this;
    }

    public ComplianceStatus addValues(ComplianceValues complianceValues) {
        this.values.add(complianceValues);
        complianceValues.setComplianceStatus(this);
        return this;
    }

    public ComplianceStatus removeValues(ComplianceValues complianceValues) {
        this.values.remove(complianceValues);
        complianceValues.setComplianceStatus(null);
        return this;
    }

    public void setValues(Set<ComplianceValues> complianceValues) {
        this.values = complianceValues;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ComplianceStatus complianceStatus = (ComplianceStatus) o;
        if (complianceStatus.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), complianceStatus.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ComplianceStatus{" +
            "id=" + getId() +
            ", statusAr='" + getStatusAr() + "'" +
            ", statusEn='" + getStatusEn() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", modifiedDate='" + getModifiedDate() + "'" +
            ", modifiedBy='" + getModifiedBy() + "'" +
            "}";
    }
}

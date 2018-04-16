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
 * A ComplianceSchedule.
 */
@Entity
@Table(name = "compliance_schedule")
public class ComplianceSchedule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "created_date")
    private ZonedDateTime createdDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "modified_date")
    private ZonedDateTime modifiedDate;

    @Column(name = "modified_by")
    private String modifiedBy;

    @OneToMany(mappedBy = "complianceSchedule")
    @JsonIgnore
    private Set<ComplianceValues> values = new HashSet<>();

    @ManyToMany(mappedBy = "schedules")
    @JsonIgnore
    private Set<AssessmentSchedule> assessments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public ComplianceSchedule text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public ComplianceSchedule createdDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public ComplianceSchedule createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public ZonedDateTime getModifiedDate() {
        return modifiedDate;
    }

    public ComplianceSchedule modifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
        return this;
    }

    public void setModifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public ComplianceSchedule modifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
        return this;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Set<ComplianceValues> getValues() {
        return values;
    }

    public ComplianceSchedule values(Set<ComplianceValues> complianceValues) {
        this.values = complianceValues;
        return this;
    }

    public ComplianceSchedule addValues(ComplianceValues complianceValues) {
        this.values.add(complianceValues);
        complianceValues.setComplianceSchedule(this);
        return this;
    }

    public ComplianceSchedule removeValues(ComplianceValues complianceValues) {
        this.values.remove(complianceValues);
        complianceValues.setComplianceSchedule(null);
        return this;
    }

    public void setValues(Set<ComplianceValues> complianceValues) {
        this.values = complianceValues;
    }

    public Set<AssessmentSchedule> getAssessments() {
        return assessments;
    }

    public ComplianceSchedule assessments(Set<AssessmentSchedule> assessmentSchedules) {
        this.assessments = assessmentSchedules;
        return this;
    }

    public ComplianceSchedule addAssessments(AssessmentSchedule assessmentSchedule) {
        this.assessments.add(assessmentSchedule);
        assessmentSchedule.getSchedules().add(this);
        return this;
    }

    public ComplianceSchedule removeAssessments(AssessmentSchedule assessmentSchedule) {
        this.assessments.remove(assessmentSchedule);
        assessmentSchedule.getSchedules().remove(this);
        return this;
    }

    public void setAssessments(Set<AssessmentSchedule> assessmentSchedules) {
        this.assessments = assessmentSchedules;
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
        ComplianceSchedule complianceSchedule = (ComplianceSchedule) o;
        if (complianceSchedule.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), complianceSchedule.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ComplianceSchedule{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", modifiedDate='" + getModifiedDate() + "'" +
            ", modifiedBy='" + getModifiedBy() + "'" +
            "}";
    }
}

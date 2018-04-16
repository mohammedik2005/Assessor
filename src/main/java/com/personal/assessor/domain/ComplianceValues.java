package com.personal.assessor.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ComplianceValues.
 */
@Entity
@Table(name = "compliance_values")
public class ComplianceValues implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "ownership")
    private String ownership;

    @Column(name = "justification")
    private String justification;

    @Column(name = "is_completed")
    private Integer isCompleted;

    @Column(name = "evidence_name")
    private String evidenceName;

    @Column(name = "created_date")
    private ZonedDateTime createdDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "modified_date")
    private ZonedDateTime modifiedDate;

    @Column(name = "modified_by")
    private String modifiedBy;

    @ManyToMany
    @JoinTable(name = "compliance_values_attachments",
               joinColumns = @JoinColumn(name="compliance_values_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="attachments_id", referencedColumnName="id"))
    private Set<Attachment> attachments = new HashSet<>();

    @ManyToOne
    private ComplianceStatus complianceStatus;

    @ManyToOne
    private ComplianceSchedule complianceSchedule;

    @ManyToOne
    private ComplianceEvidenceType evidenceType;

    @ManyToOne
    private ComplianceEvidenceStatus evidenceStatus;

    @ManyToMany(mappedBy = "values")
    @JsonIgnore
    private Set<Applicant> applicants = new HashSet<>();

    @ManyToMany(mappedBy = "values")
    @JsonIgnore
    private Set<Compliance> compliances = new HashSet<>();

    @ManyToMany(mappedBy = "values")
    @JsonIgnore
    private Set<ComplianceEvidenceNote> notes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOwnership() {
        return ownership;
    }

    public ComplianceValues ownership(String ownership) {
        this.ownership = ownership;
        return this;
    }

    public void setOwnership(String ownership) {
        this.ownership = ownership;
    }

    public String getJustification() {
        return justification;
    }

    public ComplianceValues justification(String justification) {
        this.justification = justification;
        return this;
    }

    public void setJustification(String justification) {
        this.justification = justification;
    }

    public Integer getIsCompleted() {
        return isCompleted;
    }

    public ComplianceValues isCompleted(Integer isCompleted) {
        this.isCompleted = isCompleted;
        return this;
    }

    public void setIsCompleted(Integer isCompleted) {
        this.isCompleted = isCompleted;
    }

    public String getEvidenceName() {
        return evidenceName;
    }

    public ComplianceValues evidenceName(String evidenceName) {
        this.evidenceName = evidenceName;
        return this;
    }

    public void setEvidenceName(String evidenceName) {
        this.evidenceName = evidenceName;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public ComplianceValues createdDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public ComplianceValues createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public ZonedDateTime getModifiedDate() {
        return modifiedDate;
    }

    public ComplianceValues modifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
        return this;
    }

    public void setModifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public ComplianceValues modifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
        return this;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Set<Attachment> getAttachments() {
        return attachments;
    }

    public ComplianceValues attachments(Set<Attachment> attachments) {
        this.attachments = attachments;
        return this;
    }

    public ComplianceValues addAttachments(Attachment attachment) {
        this.attachments.add(attachment);
        attachment.getValues().add(this);
        return this;
    }

    public ComplianceValues removeAttachments(Attachment attachment) {
        this.attachments.remove(attachment);
        attachment.getValues().remove(this);
        return this;
    }

    public void setAttachments(Set<Attachment> attachments) {
        this.attachments = attachments;
    }

    public ComplianceStatus getComplianceStatus() {
        return complianceStatus;
    }

    public ComplianceValues complianceStatus(ComplianceStatus complianceStatus) {
        this.complianceStatus = complianceStatus;
        return this;
    }

    public void setComplianceStatus(ComplianceStatus complianceStatus) {
        this.complianceStatus = complianceStatus;
    }

    public ComplianceSchedule getComplianceSchedule() {
        return complianceSchedule;
    }

    public ComplianceValues complianceSchedule(ComplianceSchedule complianceSchedule) {
        this.complianceSchedule = complianceSchedule;
        return this;
    }

    public void setComplianceSchedule(ComplianceSchedule complianceSchedule) {
        this.complianceSchedule = complianceSchedule;
    }

    public ComplianceEvidenceType getEvidenceType() {
        return evidenceType;
    }

    public ComplianceValues evidenceType(ComplianceEvidenceType complianceEvidenceType) {
        this.evidenceType = complianceEvidenceType;
        return this;
    }

    public void setEvidenceType(ComplianceEvidenceType complianceEvidenceType) {
        this.evidenceType = complianceEvidenceType;
    }

    public ComplianceEvidenceStatus getEvidenceStatus() {
        return evidenceStatus;
    }

    public ComplianceValues evidenceStatus(ComplianceEvidenceStatus complianceEvidenceStatus) {
        this.evidenceStatus = complianceEvidenceStatus;
        return this;
    }

    public void setEvidenceStatus(ComplianceEvidenceStatus complianceEvidenceStatus) {
        this.evidenceStatus = complianceEvidenceStatus;
    }

    public Set<Applicant> getApplicants() {
        return applicants;
    }

    public ComplianceValues applicants(Set<Applicant> applicants) {
        this.applicants = applicants;
        return this;
    }

    public ComplianceValues addApplicants(Applicant applicant) {
        this.applicants.add(applicant);
        applicant.getValues().add(this);
        return this;
    }

    public ComplianceValues removeApplicants(Applicant applicant) {
        this.applicants.remove(applicant);
        applicant.getValues().remove(this);
        return this;
    }

    public void setApplicants(Set<Applicant> applicants) {
        this.applicants = applicants;
    }

    public Set<Compliance> getCompliances() {
        return compliances;
    }

    public ComplianceValues compliances(Set<Compliance> compliances) {
        this.compliances = compliances;
        return this;
    }

    public ComplianceValues addCompliance(Compliance compliance) {
        this.compliances.add(compliance);
        compliance.getValues().add(this);
        return this;
    }

    public ComplianceValues removeCompliance(Compliance compliance) {
        this.compliances.remove(compliance);
        compliance.getValues().remove(this);
        return this;
    }

    public void setCompliances(Set<Compliance> compliances) {
        this.compliances = compliances;
    }

    public Set<ComplianceEvidenceNote> getNotes() {
        return notes;
    }

    public ComplianceValues notes(Set<ComplianceEvidenceNote> complianceEvidenceNotes) {
        this.notes = complianceEvidenceNotes;
        return this;
    }

    public ComplianceValues addNotes(ComplianceEvidenceNote complianceEvidenceNote) {
        this.notes.add(complianceEvidenceNote);
        complianceEvidenceNote.getValues().add(this);
        return this;
    }

    public ComplianceValues removeNotes(ComplianceEvidenceNote complianceEvidenceNote) {
        this.notes.remove(complianceEvidenceNote);
        complianceEvidenceNote.getValues().remove(this);
        return this;
    }

    public void setNotes(Set<ComplianceEvidenceNote> complianceEvidenceNotes) {
        this.notes = complianceEvidenceNotes;
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
        ComplianceValues complianceValues = (ComplianceValues) o;
        if (complianceValues.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), complianceValues.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ComplianceValues{" +
            "id=" + getId() +
            ", ownership='" + getOwnership() + "'" +
            ", justification='" + getJustification() + "'" +
            ", isCompleted=" + getIsCompleted() +
            ", evidenceName='" + getEvidenceName() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", modifiedDate='" + getModifiedDate() + "'" +
            ", modifiedBy='" + getModifiedBy() + "'" +
            "}";
    }
}

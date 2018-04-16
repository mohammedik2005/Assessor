package com.personal.assessor.service.dto;


import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ComplianceValues entity.
 */
public class ComplianceValuesDTO implements Serializable {

    private Long id;

    private String ownership;

    private String justification;

    private Integer isCompleted;

    private String evidenceName;

    private ZonedDateTime createdDate;

    private String createdBy;

    private ZonedDateTime modifiedDate;

    private String modifiedBy;

    private Set<AttachmentDTO> attachments = new HashSet<>();

    private Long complianceStatusId;

    private Long complianceScheduleId;

    private Long evidenceTypeId;

    private Long evidenceStatusId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOwnership() {
        return ownership;
    }

    public void setOwnership(String ownership) {
        this.ownership = ownership;
    }

    public String getJustification() {
        return justification;
    }

    public void setJustification(String justification) {
        this.justification = justification;
    }

    public Integer getIsCompleted() {
        return isCompleted;
    }

    public void setIsCompleted(Integer isCompleted) {
        this.isCompleted = isCompleted;
    }

    public String getEvidenceName() {
        return evidenceName;
    }

    public void setEvidenceName(String evidenceName) {
        this.evidenceName = evidenceName;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public ZonedDateTime getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Set<AttachmentDTO> getAttachments() {
        return attachments;
    }

    public void setAttachments(Set<AttachmentDTO> attachments) {
        this.attachments = attachments;
    }

    public Long getComplianceStatusId() {
        return complianceStatusId;
    }

    public void setComplianceStatusId(Long complianceStatusId) {
        this.complianceStatusId = complianceStatusId;
    }

    public Long getComplianceScheduleId() {
        return complianceScheduleId;
    }

    public void setComplianceScheduleId(Long complianceScheduleId) {
        this.complianceScheduleId = complianceScheduleId;
    }

    public Long getEvidenceTypeId() {
        return evidenceTypeId;
    }

    public void setEvidenceTypeId(Long complianceEvidenceTypeId) {
        this.evidenceTypeId = complianceEvidenceTypeId;
    }

    public Long getEvidenceStatusId() {
        return evidenceStatusId;
    }

    public void setEvidenceStatusId(Long complianceEvidenceStatusId) {
        this.evidenceStatusId = complianceEvidenceStatusId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ComplianceValuesDTO complianceValuesDTO = (ComplianceValuesDTO) o;
        if(complianceValuesDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), complianceValuesDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ComplianceValuesDTO{" +
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

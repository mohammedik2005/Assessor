package com.personal.assessor.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Attachment.
 */
@Entity
@Table(name = "attachment")
public class Attachment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "extension")
    private String extension;

    @Column(name = "generated_name")
    private String generatedName;

    @Column(name = "is_active")
    private Integer isActive;

    @Column(name = "mime_type")
    private String mimeType;

    @Column(name = "original_name")
    private String originalName;

    @Column(name = "table_name")
    private String tableName;

    @Column(name = "created_date")
    private ZonedDateTime createdDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "modified_date")
    private ZonedDateTime modifiedDate;

    @Column(name = "modified_by")
    private String modifiedBy;

    @ManyToMany(mappedBy = "attachments")
    @JsonIgnore
    private Set<Domain> domains = new HashSet<>();

    @ManyToMany(mappedBy = "attachments")
    @JsonIgnore
    private Set<ComplianceValues> values = new HashSet<>();

    @ManyToMany(mappedBy = "attachments")
    @JsonIgnore
    private Set<Control> controls = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Attachment description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExtension() {
        return extension;
    }

    public Attachment extension(String extension) {
        this.extension = extension;
        return this;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public String getGeneratedName() {
        return generatedName;
    }

    public Attachment generatedName(String generatedName) {
        this.generatedName = generatedName;
        return this;
    }

    public void setGeneratedName(String generatedName) {
        this.generatedName = generatedName;
    }

    public Integer getIsActive() {
        return isActive;
    }

    public Attachment isActive(Integer isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Integer isActive) {
        this.isActive = isActive;
    }

    public String getMimeType() {
        return mimeType;
    }

    public Attachment mimeType(String mimeType) {
        this.mimeType = mimeType;
        return this;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public String getOriginalName() {
        return originalName;
    }

    public Attachment originalName(String originalName) {
        this.originalName = originalName;
        return this;
    }

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }

    public String getTableName() {
        return tableName;
    }

    public Attachment tableName(String tableName) {
        this.tableName = tableName;
        return this;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public Attachment createdDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Attachment createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public ZonedDateTime getModifiedDate() {
        return modifiedDate;
    }

    public Attachment modifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
        return this;
    }

    public void setModifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public Attachment modifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
        return this;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Set<Domain> getDomains() {
        return domains;
    }

    public Attachment domains(Set<Domain> domains) {
        this.domains = domains;
        return this;
    }

    public Attachment addDomains(Domain domain) {
        this.domains.add(domain);
        domain.getAttachments().add(this);
        return this;
    }

    public Attachment removeDomains(Domain domain) {
        this.domains.remove(domain);
        domain.getAttachments().remove(this);
        return this;
    }

    public void setDomains(Set<Domain> domains) {
        this.domains = domains;
    }

    public Set<ComplianceValues> getValues() {
        return values;
    }

    public Attachment values(Set<ComplianceValues> complianceValues) {
        this.values = complianceValues;
        return this;
    }

    public Attachment addValues(ComplianceValues complianceValues) {
        this.values.add(complianceValues);
        complianceValues.getAttachments().add(this);
        return this;
    }

    public Attachment removeValues(ComplianceValues complianceValues) {
        this.values.remove(complianceValues);
        complianceValues.getAttachments().remove(this);
        return this;
    }

    public void setValues(Set<ComplianceValues> complianceValues) {
        this.values = complianceValues;
    }

    public Set<Control> getControls() {
        return controls;
    }

    public Attachment controls(Set<Control> controls) {
        this.controls = controls;
        return this;
    }

    public Attachment addControls(Control control) {
        this.controls.add(control);
        control.getAttachments().add(this);
        return this;
    }

    public Attachment removeControls(Control control) {
        this.controls.remove(control);
        control.getAttachments().remove(this);
        return this;
    }

    public void setControls(Set<Control> controls) {
        this.controls = controls;
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
        Attachment attachment = (Attachment) o;
        if (attachment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), attachment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Attachment{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", extension='" + getExtension() + "'" +
            ", generatedName='" + getGeneratedName() + "'" +
            ", isActive=" + getIsActive() +
            ", mimeType='" + getMimeType() + "'" +
            ", originalName='" + getOriginalName() + "'" +
            ", tableName='" + getTableName() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", modifiedDate='" + getModifiedDate() + "'" +
            ", modifiedBy='" + getModifiedBy() + "'" +
            "}";
    }
}

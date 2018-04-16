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
 * A Control.
 */
@Entity
@Table(name = "control")
public class Control implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private String code;

    @NotNull
    @Column(name = "name_ar", nullable = false)
    private String nameAr;

    @NotNull
    @Column(name = "name_en", nullable = false)
    private String nameEn;

    @Column(name = "description_ar")
    private String descriptionAr;

    @Column(name = "description_en")
    private String descriptionEn;

    @Column(name = "created_date")
    private ZonedDateTime createdDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "modified_date")
    private ZonedDateTime modifiedDate;

    @Column(name = "modified_by")
    private String modifiedBy;

    @OneToMany(mappedBy = "control")
    @JsonIgnore
    private Set<Domain> domains = new HashSet<>();

    @OneToMany(mappedBy = "control")
    @JsonIgnore
    private Set<Compliance> compliances = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "control_attachments",
               joinColumns = @JoinColumn(name="controls_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="attachments_id", referencedColumnName="id"))
    private Set<Attachment> attachments = new HashSet<>();

    @ManyToOne
    private ControlPriority priority;

    @ManyToMany(mappedBy = "controls")
    @JsonIgnore
    private Set<ControlCategory> categories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Control code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNameAr() {
        return nameAr;
    }

    public Control nameAr(String nameAr) {
        this.nameAr = nameAr;
        return this;
    }

    public void setNameAr(String nameAr) {
        this.nameAr = nameAr;
    }

    public String getNameEn() {
        return nameEn;
    }

    public Control nameEn(String nameEn) {
        this.nameEn = nameEn;
        return this;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    public String getDescriptionAr() {
        return descriptionAr;
    }

    public Control descriptionAr(String descriptionAr) {
        this.descriptionAr = descriptionAr;
        return this;
    }

    public void setDescriptionAr(String descriptionAr) {
        this.descriptionAr = descriptionAr;
    }

    public String getDescriptionEn() {
        return descriptionEn;
    }

    public Control descriptionEn(String descriptionEn) {
        this.descriptionEn = descriptionEn;
        return this;
    }

    public void setDescriptionEn(String descriptionEn) {
        this.descriptionEn = descriptionEn;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public Control createdDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Control createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public ZonedDateTime getModifiedDate() {
        return modifiedDate;
    }

    public Control modifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
        return this;
    }

    public void setModifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public Control modifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
        return this;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Set<Domain> getDomains() {
        return domains;
    }

    public Control domains(Set<Domain> domains) {
        this.domains = domains;
        return this;
    }

    public Control addDomains(Domain domain) {
        this.domains.add(domain);
        domain.setControl(this);
        return this;
    }

    public Control removeDomains(Domain domain) {
        this.domains.remove(domain);
        domain.setControl(null);
        return this;
    }

    public void setDomains(Set<Domain> domains) {
        this.domains = domains;
    }

    public Set<Compliance> getCompliances() {
        return compliances;
    }

    public Control compliances(Set<Compliance> compliances) {
        this.compliances = compliances;
        return this;
    }

    public Control addCompliances(Compliance compliance) {
        this.compliances.add(compliance);
        compliance.setControl(this);
        return this;
    }

    public Control removeCompliances(Compliance compliance) {
        this.compliances.remove(compliance);
        compliance.setControl(null);
        return this;
    }

    public void setCompliances(Set<Compliance> compliances) {
        this.compliances = compliances;
    }

    public Set<Attachment> getAttachments() {
        return attachments;
    }

    public Control attachments(Set<Attachment> attachments) {
        this.attachments = attachments;
        return this;
    }

    public Control addAttachments(Attachment attachment) {
        this.attachments.add(attachment);
        attachment.getControls().add(this);
        return this;
    }

    public Control removeAttachments(Attachment attachment) {
        this.attachments.remove(attachment);
        attachment.getControls().remove(this);
        return this;
    }

    public void setAttachments(Set<Attachment> attachments) {
        this.attachments = attachments;
    }

    public ControlPriority getPriority() {
        return priority;
    }

    public Control priority(ControlPriority controlPriority) {
        this.priority = controlPriority;
        return this;
    }

    public void setPriority(ControlPriority controlPriority) {
        this.priority = controlPriority;
    }

    public Set<ControlCategory> getCategories() {
        return categories;
    }

    public Control categories(Set<ControlCategory> controlCategories) {
        this.categories = controlCategories;
        return this;
    }

    public Control addCategories(ControlCategory controlCategory) {
        this.categories.add(controlCategory);
        controlCategory.getControls().add(this);
        return this;
    }

    public Control removeCategories(ControlCategory controlCategory) {
        this.categories.remove(controlCategory);
        controlCategory.getControls().remove(this);
        return this;
    }

    public void setCategories(Set<ControlCategory> controlCategories) {
        this.categories = controlCategories;
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
        Control control = (Control) o;
        if (control.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), control.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Control{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", nameAr='" + getNameAr() + "'" +
            ", nameEn='" + getNameEn() + "'" +
            ", descriptionAr='" + getDescriptionAr() + "'" +
            ", descriptionEn='" + getDescriptionEn() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", modifiedDate='" + getModifiedDate() + "'" +
            ", modifiedBy='" + getModifiedBy() + "'" +
            "}";
    }
}

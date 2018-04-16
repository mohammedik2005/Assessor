package com.personal.assessor.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Compliance.
 */
@Entity
@Table(name = "compliance")
public class Compliance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "description_ar")
    private String descriptionAr;

    @Column(name = "description_en")
    private String descriptionEn;

    @Column(name = "compliance_version")
    private Integer complianceVersion;

    @Column(name = "version")
    private Long version;

    @Column(name = "created_date")
    private ZonedDateTime createdDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "modified_date")
    private ZonedDateTime modifiedDate;

    @Column(name = "modified_by")
    private String modifiedBy;

    @ManyToMany
    @JoinTable(name = "compliance_values",
               joinColumns = @JoinColumn(name="compliances_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="values_id", referencedColumnName="id"))
    private Set<ComplianceValues> values = new HashSet<>();

    @ManyToOne
    private Control control;

    @ManyToOne
    private ComplianceFlag complianceFlag;

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

    public Compliance code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescriptionAr() {
        return descriptionAr;
    }

    public Compliance descriptionAr(String descriptionAr) {
        this.descriptionAr = descriptionAr;
        return this;
    }

    public void setDescriptionAr(String descriptionAr) {
        this.descriptionAr = descriptionAr;
    }

    public String getDescriptionEn() {
        return descriptionEn;
    }

    public Compliance descriptionEn(String descriptionEn) {
        this.descriptionEn = descriptionEn;
        return this;
    }

    public void setDescriptionEn(String descriptionEn) {
        this.descriptionEn = descriptionEn;
    }

    public Integer getComplianceVersion() {
        return complianceVersion;
    }

    public Compliance complianceVersion(Integer complianceVersion) {
        this.complianceVersion = complianceVersion;
        return this;
    }

    public void setComplianceVersion(Integer complianceVersion) {
        this.complianceVersion = complianceVersion;
    }

    public Long getVersion() {
        return version;
    }

    public Compliance version(Long version) {
        this.version = version;
        return this;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public Compliance createdDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Compliance createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public ZonedDateTime getModifiedDate() {
        return modifiedDate;
    }

    public Compliance modifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
        return this;
    }

    public void setModifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public Compliance modifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
        return this;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Set<ComplianceValues> getValues() {
        return values;
    }

    public Compliance values(Set<ComplianceValues> complianceValues) {
        this.values = complianceValues;
        return this;
    }

    public Compliance addValues(ComplianceValues complianceValues) {
        this.values.add(complianceValues);
        complianceValues.getCompliances().add(this);
        return this;
    }

    public Compliance removeValues(ComplianceValues complianceValues) {
        this.values.remove(complianceValues);
        complianceValues.getCompliances().remove(this);
        return this;
    }

    public void setValues(Set<ComplianceValues> complianceValues) {
        this.values = complianceValues;
    }

    public Control getControl() {
        return control;
    }

    public Compliance control(Control control) {
        this.control = control;
        return this;
    }

    public void setControl(Control control) {
        this.control = control;
    }

    public ComplianceFlag getComplianceFlag() {
        return complianceFlag;
    }

    public Compliance complianceFlag(ComplianceFlag complianceFlag) {
        this.complianceFlag = complianceFlag;
        return this;
    }

    public void setComplianceFlag(ComplianceFlag complianceFlag) {
        this.complianceFlag = complianceFlag;
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
        Compliance compliance = (Compliance) o;
        if (compliance.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), compliance.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Compliance{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", descriptionAr='" + getDescriptionAr() + "'" +
            ", descriptionEn='" + getDescriptionEn() + "'" +
            ", complianceVersion=" + getComplianceVersion() +
            ", version=" + getVersion() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", modifiedDate='" + getModifiedDate() + "'" +
            ", modifiedBy='" + getModifiedBy() + "'" +
            "}";
    }
}

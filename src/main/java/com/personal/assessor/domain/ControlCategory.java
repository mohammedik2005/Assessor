package com.personal.assessor.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ControlCategory.
 */
@Entity
@Table(name = "control_category")
public class ControlCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "category_ar", nullable = false)
    private String categoryAr;

    @NotNull
    @Column(name = "category_en", nullable = false)
    private String categoryEn;

    @Column(name = "created_date")
    private ZonedDateTime createdDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "modified_date")
    private ZonedDateTime modifiedDate;

    @Column(name = "modified_by")
    private String modifiedBy;

    @ManyToMany
    @JoinTable(name = "control_category_controls",
               joinColumns = @JoinColumn(name="control_categories_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="controls_id", referencedColumnName="id"))
    private Set<Control> controls = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryAr() {
        return categoryAr;
    }

    public ControlCategory categoryAr(String categoryAr) {
        this.categoryAr = categoryAr;
        return this;
    }

    public void setCategoryAr(String categoryAr) {
        this.categoryAr = categoryAr;
    }

    public String getCategoryEn() {
        return categoryEn;
    }

    public ControlCategory categoryEn(String categoryEn) {
        this.categoryEn = categoryEn;
        return this;
    }

    public void setCategoryEn(String categoryEn) {
        this.categoryEn = categoryEn;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public ControlCategory createdDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public ControlCategory createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public ZonedDateTime getModifiedDate() {
        return modifiedDate;
    }

    public ControlCategory modifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
        return this;
    }

    public void setModifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public ControlCategory modifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
        return this;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Set<Control> getControls() {
        return controls;
    }

    public ControlCategory controls(Set<Control> controls) {
        this.controls = controls;
        return this;
    }

    public ControlCategory addControls(Control control) {
        this.controls.add(control);
        control.getCategories().add(this);
        return this;
    }

    public ControlCategory removeControls(Control control) {
        this.controls.remove(control);
        control.getCategories().remove(this);
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
        ControlCategory controlCategory = (ControlCategory) o;
        if (controlCategory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), controlCategory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ControlCategory{" +
            "id=" + getId() +
            ", categoryAr='" + getCategoryAr() + "'" +
            ", categoryEn='" + getCategoryEn() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", modifiedDate='" + getModifiedDate() + "'" +
            ", modifiedBy='" + getModifiedBy() + "'" +
            "}";
    }
}

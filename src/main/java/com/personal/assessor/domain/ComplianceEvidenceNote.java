package com.personal.assessor.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ComplianceEvidenceNote.
 */
@Entity
@Table(name = "compliance_evidence_note")
public class ComplianceEvidenceNote implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Lob
    @Column(name = "text")
    private String text;

    @ManyToMany
    @JoinTable(name = "compliance_evidence_note_values",
               joinColumns = @JoinColumn(name="compliance_evidence_notes_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="values_id", referencedColumnName="id"))
    private Set<ComplianceValues> values = new HashSet<>();

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

    public ComplianceEvidenceNote text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Set<ComplianceValues> getValues() {
        return values;
    }

    public ComplianceEvidenceNote values(Set<ComplianceValues> complianceValues) {
        this.values = complianceValues;
        return this;
    }

    public ComplianceEvidenceNote addValues(ComplianceValues complianceValues) {
        this.values.add(complianceValues);
        complianceValues.getNotes().add(this);
        return this;
    }

    public ComplianceEvidenceNote removeValues(ComplianceValues complianceValues) {
        this.values.remove(complianceValues);
        complianceValues.getNotes().remove(this);
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
        ComplianceEvidenceNote complianceEvidenceNote = (ComplianceEvidenceNote) o;
        if (complianceEvidenceNote.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), complianceEvidenceNote.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ComplianceEvidenceNote{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            "}";
    }
}

package com.personal.assessor.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the ComplianceEvidenceNote entity.
 */
public class ComplianceEvidenceNoteDTO implements Serializable {

    private Long id;

    @Lob
    private String text;

    private Set<ComplianceValuesDTO> values = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Set<ComplianceValuesDTO> getValues() {
        return values;
    }

    public void setValues(Set<ComplianceValuesDTO> complianceValues) {
        this.values = complianceValues;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ComplianceEvidenceNoteDTO complianceEvidenceNoteDTO = (ComplianceEvidenceNoteDTO) o;
        if(complianceEvidenceNoteDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), complianceEvidenceNoteDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ComplianceEvidenceNoteDTO{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            "}";
    }
}

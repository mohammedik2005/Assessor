package com.personal.assessor.web.rest;

import com.personal.assessor.AssessorApp;

import com.personal.assessor.domain.ComplianceEvidenceNote;
import com.personal.assessor.repository.ComplianceEvidenceNoteRepository;
import com.personal.assessor.service.ComplianceEvidenceNoteService;
import com.personal.assessor.service.dto.ComplianceEvidenceNoteDTO;
import com.personal.assessor.service.mapper.ComplianceEvidenceNoteMapper;
import com.personal.assessor.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.personal.assessor.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ComplianceEvidenceNoteResource REST controller.
 *
 * @see ComplianceEvidenceNoteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AssessorApp.class)
public class ComplianceEvidenceNoteResourceIntTest {

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    @Autowired
    private ComplianceEvidenceNoteRepository complianceEvidenceNoteRepository;

    @Autowired
    private ComplianceEvidenceNoteMapper complianceEvidenceNoteMapper;

    @Autowired
    private ComplianceEvidenceNoteService complianceEvidenceNoteService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restComplianceEvidenceNoteMockMvc;

    private ComplianceEvidenceNote complianceEvidenceNote;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComplianceEvidenceNoteResource complianceEvidenceNoteResource = new ComplianceEvidenceNoteResource(complianceEvidenceNoteService);
        this.restComplianceEvidenceNoteMockMvc = MockMvcBuilders.standaloneSetup(complianceEvidenceNoteResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ComplianceEvidenceNote createEntity(EntityManager em) {
        ComplianceEvidenceNote complianceEvidenceNote = new ComplianceEvidenceNote()
            .text(DEFAULT_TEXT);
        return complianceEvidenceNote;
    }

    @Before
    public void initTest() {
        complianceEvidenceNote = createEntity(em);
    }

    @Test
    @Transactional
    public void createComplianceEvidenceNote() throws Exception {
        int databaseSizeBeforeCreate = complianceEvidenceNoteRepository.findAll().size();

        // Create the ComplianceEvidenceNote
        ComplianceEvidenceNoteDTO complianceEvidenceNoteDTO = complianceEvidenceNoteMapper.toDto(complianceEvidenceNote);
        restComplianceEvidenceNoteMockMvc.perform(post("/api/compliance-evidence-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceEvidenceNoteDTO)))
            .andExpect(status().isCreated());

        // Validate the ComplianceEvidenceNote in the database
        List<ComplianceEvidenceNote> complianceEvidenceNoteList = complianceEvidenceNoteRepository.findAll();
        assertThat(complianceEvidenceNoteList).hasSize(databaseSizeBeforeCreate + 1);
        ComplianceEvidenceNote testComplianceEvidenceNote = complianceEvidenceNoteList.get(complianceEvidenceNoteList.size() - 1);
        assertThat(testComplianceEvidenceNote.getText()).isEqualTo(DEFAULT_TEXT);
    }

    @Test
    @Transactional
    public void createComplianceEvidenceNoteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = complianceEvidenceNoteRepository.findAll().size();

        // Create the ComplianceEvidenceNote with an existing ID
        complianceEvidenceNote.setId(1L);
        ComplianceEvidenceNoteDTO complianceEvidenceNoteDTO = complianceEvidenceNoteMapper.toDto(complianceEvidenceNote);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComplianceEvidenceNoteMockMvc.perform(post("/api/compliance-evidence-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceEvidenceNoteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ComplianceEvidenceNote in the database
        List<ComplianceEvidenceNote> complianceEvidenceNoteList = complianceEvidenceNoteRepository.findAll();
        assertThat(complianceEvidenceNoteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllComplianceEvidenceNotes() throws Exception {
        // Initialize the database
        complianceEvidenceNoteRepository.saveAndFlush(complianceEvidenceNote);

        // Get all the complianceEvidenceNoteList
        restComplianceEvidenceNoteMockMvc.perform(get("/api/compliance-evidence-notes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(complianceEvidenceNote.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())));
    }

    @Test
    @Transactional
    public void getComplianceEvidenceNote() throws Exception {
        // Initialize the database
        complianceEvidenceNoteRepository.saveAndFlush(complianceEvidenceNote);

        // Get the complianceEvidenceNote
        restComplianceEvidenceNoteMockMvc.perform(get("/api/compliance-evidence-notes/{id}", complianceEvidenceNote.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(complianceEvidenceNote.getId().intValue()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingComplianceEvidenceNote() throws Exception {
        // Get the complianceEvidenceNote
        restComplianceEvidenceNoteMockMvc.perform(get("/api/compliance-evidence-notes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComplianceEvidenceNote() throws Exception {
        // Initialize the database
        complianceEvidenceNoteRepository.saveAndFlush(complianceEvidenceNote);
        int databaseSizeBeforeUpdate = complianceEvidenceNoteRepository.findAll().size();

        // Update the complianceEvidenceNote
        ComplianceEvidenceNote updatedComplianceEvidenceNote = complianceEvidenceNoteRepository.findOne(complianceEvidenceNote.getId());
        // Disconnect from session so that the updates on updatedComplianceEvidenceNote are not directly saved in db
        em.detach(updatedComplianceEvidenceNote);
        updatedComplianceEvidenceNote
            .text(UPDATED_TEXT);
        ComplianceEvidenceNoteDTO complianceEvidenceNoteDTO = complianceEvidenceNoteMapper.toDto(updatedComplianceEvidenceNote);

        restComplianceEvidenceNoteMockMvc.perform(put("/api/compliance-evidence-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceEvidenceNoteDTO)))
            .andExpect(status().isOk());

        // Validate the ComplianceEvidenceNote in the database
        List<ComplianceEvidenceNote> complianceEvidenceNoteList = complianceEvidenceNoteRepository.findAll();
        assertThat(complianceEvidenceNoteList).hasSize(databaseSizeBeforeUpdate);
        ComplianceEvidenceNote testComplianceEvidenceNote = complianceEvidenceNoteList.get(complianceEvidenceNoteList.size() - 1);
        assertThat(testComplianceEvidenceNote.getText()).isEqualTo(UPDATED_TEXT);
    }

    @Test
    @Transactional
    public void updateNonExistingComplianceEvidenceNote() throws Exception {
        int databaseSizeBeforeUpdate = complianceEvidenceNoteRepository.findAll().size();

        // Create the ComplianceEvidenceNote
        ComplianceEvidenceNoteDTO complianceEvidenceNoteDTO = complianceEvidenceNoteMapper.toDto(complianceEvidenceNote);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restComplianceEvidenceNoteMockMvc.perform(put("/api/compliance-evidence-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceEvidenceNoteDTO)))
            .andExpect(status().isCreated());

        // Validate the ComplianceEvidenceNote in the database
        List<ComplianceEvidenceNote> complianceEvidenceNoteList = complianceEvidenceNoteRepository.findAll();
        assertThat(complianceEvidenceNoteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteComplianceEvidenceNote() throws Exception {
        // Initialize the database
        complianceEvidenceNoteRepository.saveAndFlush(complianceEvidenceNote);
        int databaseSizeBeforeDelete = complianceEvidenceNoteRepository.findAll().size();

        // Get the complianceEvidenceNote
        restComplianceEvidenceNoteMockMvc.perform(delete("/api/compliance-evidence-notes/{id}", complianceEvidenceNote.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ComplianceEvidenceNote> complianceEvidenceNoteList = complianceEvidenceNoteRepository.findAll();
        assertThat(complianceEvidenceNoteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComplianceEvidenceNote.class);
        ComplianceEvidenceNote complianceEvidenceNote1 = new ComplianceEvidenceNote();
        complianceEvidenceNote1.setId(1L);
        ComplianceEvidenceNote complianceEvidenceNote2 = new ComplianceEvidenceNote();
        complianceEvidenceNote2.setId(complianceEvidenceNote1.getId());
        assertThat(complianceEvidenceNote1).isEqualTo(complianceEvidenceNote2);
        complianceEvidenceNote2.setId(2L);
        assertThat(complianceEvidenceNote1).isNotEqualTo(complianceEvidenceNote2);
        complianceEvidenceNote1.setId(null);
        assertThat(complianceEvidenceNote1).isNotEqualTo(complianceEvidenceNote2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComplianceEvidenceNoteDTO.class);
        ComplianceEvidenceNoteDTO complianceEvidenceNoteDTO1 = new ComplianceEvidenceNoteDTO();
        complianceEvidenceNoteDTO1.setId(1L);
        ComplianceEvidenceNoteDTO complianceEvidenceNoteDTO2 = new ComplianceEvidenceNoteDTO();
        assertThat(complianceEvidenceNoteDTO1).isNotEqualTo(complianceEvidenceNoteDTO2);
        complianceEvidenceNoteDTO2.setId(complianceEvidenceNoteDTO1.getId());
        assertThat(complianceEvidenceNoteDTO1).isEqualTo(complianceEvidenceNoteDTO2);
        complianceEvidenceNoteDTO2.setId(2L);
        assertThat(complianceEvidenceNoteDTO1).isNotEqualTo(complianceEvidenceNoteDTO2);
        complianceEvidenceNoteDTO1.setId(null);
        assertThat(complianceEvidenceNoteDTO1).isNotEqualTo(complianceEvidenceNoteDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(complianceEvidenceNoteMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(complianceEvidenceNoteMapper.fromId(null)).isNull();
    }
}

package com.personal.assessor.web.rest;

import com.personal.assessor.AssessorApp;

import com.personal.assessor.domain.ComplianceValues;
import com.personal.assessor.repository.ComplianceValuesRepository;
import com.personal.assessor.service.ComplianceValuesService;
import com.personal.assessor.service.dto.ComplianceValuesDTO;
import com.personal.assessor.service.mapper.ComplianceValuesMapper;
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

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.personal.assessor.web.rest.TestUtil.sameInstant;
import static com.personal.assessor.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ComplianceValuesResource REST controller.
 *
 * @see ComplianceValuesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AssessorApp.class)
public class ComplianceValuesResourceIntTest {

    private static final String DEFAULT_OWNERSHIP = "AAAAAAAAAA";
    private static final String UPDATED_OWNERSHIP = "BBBBBBBBBB";

    private static final String DEFAULT_JUSTIFICATION = "AAAAAAAAAA";
    private static final String UPDATED_JUSTIFICATION = "BBBBBBBBBB";

    private static final Integer DEFAULT_IS_COMPLETED = 1;
    private static final Integer UPDATED_IS_COMPLETED = 2;

    private static final String DEFAULT_EVIDENCE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_EVIDENCE_NAME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_MODIFIED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private ComplianceValuesRepository complianceValuesRepository;

    @Autowired
    private ComplianceValuesMapper complianceValuesMapper;

    @Autowired
    private ComplianceValuesService complianceValuesService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restComplianceValuesMockMvc;

    private ComplianceValues complianceValues;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComplianceValuesResource complianceValuesResource = new ComplianceValuesResource(complianceValuesService);
        this.restComplianceValuesMockMvc = MockMvcBuilders.standaloneSetup(complianceValuesResource)
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
    public static ComplianceValues createEntity(EntityManager em) {
        ComplianceValues complianceValues = new ComplianceValues()
            .ownership(DEFAULT_OWNERSHIP)
            .justification(DEFAULT_JUSTIFICATION)
            .isCompleted(DEFAULT_IS_COMPLETED)
            .evidenceName(DEFAULT_EVIDENCE_NAME)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .modifiedBy(DEFAULT_MODIFIED_BY);
        return complianceValues;
    }

    @Before
    public void initTest() {
        complianceValues = createEntity(em);
    }

    @Test
    @Transactional
    public void createComplianceValues() throws Exception {
        int databaseSizeBeforeCreate = complianceValuesRepository.findAll().size();

        // Create the ComplianceValues
        ComplianceValuesDTO complianceValuesDTO = complianceValuesMapper.toDto(complianceValues);
        restComplianceValuesMockMvc.perform(post("/api/compliance-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceValuesDTO)))
            .andExpect(status().isCreated());

        // Validate the ComplianceValues in the database
        List<ComplianceValues> complianceValuesList = complianceValuesRepository.findAll();
        assertThat(complianceValuesList).hasSize(databaseSizeBeforeCreate + 1);
        ComplianceValues testComplianceValues = complianceValuesList.get(complianceValuesList.size() - 1);
        assertThat(testComplianceValues.getOwnership()).isEqualTo(DEFAULT_OWNERSHIP);
        assertThat(testComplianceValues.getJustification()).isEqualTo(DEFAULT_JUSTIFICATION);
        assertThat(testComplianceValues.getIsCompleted()).isEqualTo(DEFAULT_IS_COMPLETED);
        assertThat(testComplianceValues.getEvidenceName()).isEqualTo(DEFAULT_EVIDENCE_NAME);
        assertThat(testComplianceValues.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testComplianceValues.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testComplianceValues.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testComplianceValues.getModifiedBy()).isEqualTo(DEFAULT_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void createComplianceValuesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = complianceValuesRepository.findAll().size();

        // Create the ComplianceValues with an existing ID
        complianceValues.setId(1L);
        ComplianceValuesDTO complianceValuesDTO = complianceValuesMapper.toDto(complianceValues);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComplianceValuesMockMvc.perform(post("/api/compliance-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceValuesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ComplianceValues in the database
        List<ComplianceValues> complianceValuesList = complianceValuesRepository.findAll();
        assertThat(complianceValuesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllComplianceValues() throws Exception {
        // Initialize the database
        complianceValuesRepository.saveAndFlush(complianceValues);

        // Get all the complianceValuesList
        restComplianceValuesMockMvc.perform(get("/api/compliance-values?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(complianceValues.getId().intValue())))
            .andExpect(jsonPath("$.[*].ownership").value(hasItem(DEFAULT_OWNERSHIP.toString())))
            .andExpect(jsonPath("$.[*].justification").value(hasItem(DEFAULT_JUSTIFICATION.toString())))
            .andExpect(jsonPath("$.[*].isCompleted").value(hasItem(DEFAULT_IS_COMPLETED)))
            .andExpect(jsonPath("$.[*].evidenceName").value(hasItem(DEFAULT_EVIDENCE_NAME.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedBy").value(hasItem(DEFAULT_MODIFIED_BY.toString())));
    }

    @Test
    @Transactional
    public void getComplianceValues() throws Exception {
        // Initialize the database
        complianceValuesRepository.saveAndFlush(complianceValues);

        // Get the complianceValues
        restComplianceValuesMockMvc.perform(get("/api/compliance-values/{id}", complianceValues.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(complianceValues.getId().intValue()))
            .andExpect(jsonPath("$.ownership").value(DEFAULT_OWNERSHIP.toString()))
            .andExpect(jsonPath("$.justification").value(DEFAULT_JUSTIFICATION.toString()))
            .andExpect(jsonPath("$.isCompleted").value(DEFAULT_IS_COMPLETED))
            .andExpect(jsonPath("$.evidenceName").value(DEFAULT_EVIDENCE_NAME.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)))
            .andExpect(jsonPath("$.modifiedBy").value(DEFAULT_MODIFIED_BY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingComplianceValues() throws Exception {
        // Get the complianceValues
        restComplianceValuesMockMvc.perform(get("/api/compliance-values/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComplianceValues() throws Exception {
        // Initialize the database
        complianceValuesRepository.saveAndFlush(complianceValues);
        int databaseSizeBeforeUpdate = complianceValuesRepository.findAll().size();

        // Update the complianceValues
        ComplianceValues updatedComplianceValues = complianceValuesRepository.findOne(complianceValues.getId());
        // Disconnect from session so that the updates on updatedComplianceValues are not directly saved in db
        em.detach(updatedComplianceValues);
        updatedComplianceValues
            .ownership(UPDATED_OWNERSHIP)
            .justification(UPDATED_JUSTIFICATION)
            .isCompleted(UPDATED_IS_COMPLETED)
            .evidenceName(UPDATED_EVIDENCE_NAME)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .modifiedBy(UPDATED_MODIFIED_BY);
        ComplianceValuesDTO complianceValuesDTO = complianceValuesMapper.toDto(updatedComplianceValues);

        restComplianceValuesMockMvc.perform(put("/api/compliance-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceValuesDTO)))
            .andExpect(status().isOk());

        // Validate the ComplianceValues in the database
        List<ComplianceValues> complianceValuesList = complianceValuesRepository.findAll();
        assertThat(complianceValuesList).hasSize(databaseSizeBeforeUpdate);
        ComplianceValues testComplianceValues = complianceValuesList.get(complianceValuesList.size() - 1);
        assertThat(testComplianceValues.getOwnership()).isEqualTo(UPDATED_OWNERSHIP);
        assertThat(testComplianceValues.getJustification()).isEqualTo(UPDATED_JUSTIFICATION);
        assertThat(testComplianceValues.getIsCompleted()).isEqualTo(UPDATED_IS_COMPLETED);
        assertThat(testComplianceValues.getEvidenceName()).isEqualTo(UPDATED_EVIDENCE_NAME);
        assertThat(testComplianceValues.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testComplianceValues.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testComplianceValues.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testComplianceValues.getModifiedBy()).isEqualTo(UPDATED_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingComplianceValues() throws Exception {
        int databaseSizeBeforeUpdate = complianceValuesRepository.findAll().size();

        // Create the ComplianceValues
        ComplianceValuesDTO complianceValuesDTO = complianceValuesMapper.toDto(complianceValues);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restComplianceValuesMockMvc.perform(put("/api/compliance-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceValuesDTO)))
            .andExpect(status().isCreated());

        // Validate the ComplianceValues in the database
        List<ComplianceValues> complianceValuesList = complianceValuesRepository.findAll();
        assertThat(complianceValuesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteComplianceValues() throws Exception {
        // Initialize the database
        complianceValuesRepository.saveAndFlush(complianceValues);
        int databaseSizeBeforeDelete = complianceValuesRepository.findAll().size();

        // Get the complianceValues
        restComplianceValuesMockMvc.perform(delete("/api/compliance-values/{id}", complianceValues.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ComplianceValues> complianceValuesList = complianceValuesRepository.findAll();
        assertThat(complianceValuesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComplianceValues.class);
        ComplianceValues complianceValues1 = new ComplianceValues();
        complianceValues1.setId(1L);
        ComplianceValues complianceValues2 = new ComplianceValues();
        complianceValues2.setId(complianceValues1.getId());
        assertThat(complianceValues1).isEqualTo(complianceValues2);
        complianceValues2.setId(2L);
        assertThat(complianceValues1).isNotEqualTo(complianceValues2);
        complianceValues1.setId(null);
        assertThat(complianceValues1).isNotEqualTo(complianceValues2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComplianceValuesDTO.class);
        ComplianceValuesDTO complianceValuesDTO1 = new ComplianceValuesDTO();
        complianceValuesDTO1.setId(1L);
        ComplianceValuesDTO complianceValuesDTO2 = new ComplianceValuesDTO();
        assertThat(complianceValuesDTO1).isNotEqualTo(complianceValuesDTO2);
        complianceValuesDTO2.setId(complianceValuesDTO1.getId());
        assertThat(complianceValuesDTO1).isEqualTo(complianceValuesDTO2);
        complianceValuesDTO2.setId(2L);
        assertThat(complianceValuesDTO1).isNotEqualTo(complianceValuesDTO2);
        complianceValuesDTO1.setId(null);
        assertThat(complianceValuesDTO1).isNotEqualTo(complianceValuesDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(complianceValuesMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(complianceValuesMapper.fromId(null)).isNull();
    }
}

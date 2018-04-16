package com.personal.assessor.web.rest;

import com.personal.assessor.AssessorApp;

import com.personal.assessor.domain.ComplianceEvidenceStatus;
import com.personal.assessor.repository.ComplianceEvidenceStatusRepository;
import com.personal.assessor.service.ComplianceEvidenceStatusService;
import com.personal.assessor.service.dto.ComplianceEvidenceStatusDTO;
import com.personal.assessor.service.mapper.ComplianceEvidenceStatusMapper;
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
 * Test class for the ComplianceEvidenceStatusResource REST controller.
 *
 * @see ComplianceEvidenceStatusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AssessorApp.class)
public class ComplianceEvidenceStatusResourceIntTest {

    private static final String DEFAULT_NAME_AR = "AAAAAAAAAA";
    private static final String UPDATED_NAME_AR = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_EN = "AAAAAAAAAA";
    private static final String UPDATED_NAME_EN = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_MODIFIED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private ComplianceEvidenceStatusRepository complianceEvidenceStatusRepository;

    @Autowired
    private ComplianceEvidenceStatusMapper complianceEvidenceStatusMapper;

    @Autowired
    private ComplianceEvidenceStatusService complianceEvidenceStatusService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restComplianceEvidenceStatusMockMvc;

    private ComplianceEvidenceStatus complianceEvidenceStatus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComplianceEvidenceStatusResource complianceEvidenceStatusResource = new ComplianceEvidenceStatusResource(complianceEvidenceStatusService);
        this.restComplianceEvidenceStatusMockMvc = MockMvcBuilders.standaloneSetup(complianceEvidenceStatusResource)
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
    public static ComplianceEvidenceStatus createEntity(EntityManager em) {
        ComplianceEvidenceStatus complianceEvidenceStatus = new ComplianceEvidenceStatus()
            .nameAr(DEFAULT_NAME_AR)
            .nameEn(DEFAULT_NAME_EN)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .modifiedBy(DEFAULT_MODIFIED_BY);
        return complianceEvidenceStatus;
    }

    @Before
    public void initTest() {
        complianceEvidenceStatus = createEntity(em);
    }

    @Test
    @Transactional
    public void createComplianceEvidenceStatus() throws Exception {
        int databaseSizeBeforeCreate = complianceEvidenceStatusRepository.findAll().size();

        // Create the ComplianceEvidenceStatus
        ComplianceEvidenceStatusDTO complianceEvidenceStatusDTO = complianceEvidenceStatusMapper.toDto(complianceEvidenceStatus);
        restComplianceEvidenceStatusMockMvc.perform(post("/api/compliance-evidence-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceEvidenceStatusDTO)))
            .andExpect(status().isCreated());

        // Validate the ComplianceEvidenceStatus in the database
        List<ComplianceEvidenceStatus> complianceEvidenceStatusList = complianceEvidenceStatusRepository.findAll();
        assertThat(complianceEvidenceStatusList).hasSize(databaseSizeBeforeCreate + 1);
        ComplianceEvidenceStatus testComplianceEvidenceStatus = complianceEvidenceStatusList.get(complianceEvidenceStatusList.size() - 1);
        assertThat(testComplianceEvidenceStatus.getNameAr()).isEqualTo(DEFAULT_NAME_AR);
        assertThat(testComplianceEvidenceStatus.getNameEn()).isEqualTo(DEFAULT_NAME_EN);
        assertThat(testComplianceEvidenceStatus.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testComplianceEvidenceStatus.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testComplianceEvidenceStatus.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testComplianceEvidenceStatus.getModifiedBy()).isEqualTo(DEFAULT_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void createComplianceEvidenceStatusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = complianceEvidenceStatusRepository.findAll().size();

        // Create the ComplianceEvidenceStatus with an existing ID
        complianceEvidenceStatus.setId(1L);
        ComplianceEvidenceStatusDTO complianceEvidenceStatusDTO = complianceEvidenceStatusMapper.toDto(complianceEvidenceStatus);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComplianceEvidenceStatusMockMvc.perform(post("/api/compliance-evidence-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceEvidenceStatusDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ComplianceEvidenceStatus in the database
        List<ComplianceEvidenceStatus> complianceEvidenceStatusList = complianceEvidenceStatusRepository.findAll();
        assertThat(complianceEvidenceStatusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameArIsRequired() throws Exception {
        int databaseSizeBeforeTest = complianceEvidenceStatusRepository.findAll().size();
        // set the field null
        complianceEvidenceStatus.setNameAr(null);

        // Create the ComplianceEvidenceStatus, which fails.
        ComplianceEvidenceStatusDTO complianceEvidenceStatusDTO = complianceEvidenceStatusMapper.toDto(complianceEvidenceStatus);

        restComplianceEvidenceStatusMockMvc.perform(post("/api/compliance-evidence-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceEvidenceStatusDTO)))
            .andExpect(status().isBadRequest());

        List<ComplianceEvidenceStatus> complianceEvidenceStatusList = complianceEvidenceStatusRepository.findAll();
        assertThat(complianceEvidenceStatusList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameEnIsRequired() throws Exception {
        int databaseSizeBeforeTest = complianceEvidenceStatusRepository.findAll().size();
        // set the field null
        complianceEvidenceStatus.setNameEn(null);

        // Create the ComplianceEvidenceStatus, which fails.
        ComplianceEvidenceStatusDTO complianceEvidenceStatusDTO = complianceEvidenceStatusMapper.toDto(complianceEvidenceStatus);

        restComplianceEvidenceStatusMockMvc.perform(post("/api/compliance-evidence-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceEvidenceStatusDTO)))
            .andExpect(status().isBadRequest());

        List<ComplianceEvidenceStatus> complianceEvidenceStatusList = complianceEvidenceStatusRepository.findAll();
        assertThat(complianceEvidenceStatusList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllComplianceEvidenceStatuses() throws Exception {
        // Initialize the database
        complianceEvidenceStatusRepository.saveAndFlush(complianceEvidenceStatus);

        // Get all the complianceEvidenceStatusList
        restComplianceEvidenceStatusMockMvc.perform(get("/api/compliance-evidence-statuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(complianceEvidenceStatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameAr").value(hasItem(DEFAULT_NAME_AR.toString())))
            .andExpect(jsonPath("$.[*].nameEn").value(hasItem(DEFAULT_NAME_EN.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedBy").value(hasItem(DEFAULT_MODIFIED_BY.toString())));
    }

    @Test
    @Transactional
    public void getComplianceEvidenceStatus() throws Exception {
        // Initialize the database
        complianceEvidenceStatusRepository.saveAndFlush(complianceEvidenceStatus);

        // Get the complianceEvidenceStatus
        restComplianceEvidenceStatusMockMvc.perform(get("/api/compliance-evidence-statuses/{id}", complianceEvidenceStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(complianceEvidenceStatus.getId().intValue()))
            .andExpect(jsonPath("$.nameAr").value(DEFAULT_NAME_AR.toString()))
            .andExpect(jsonPath("$.nameEn").value(DEFAULT_NAME_EN.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)))
            .andExpect(jsonPath("$.modifiedBy").value(DEFAULT_MODIFIED_BY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingComplianceEvidenceStatus() throws Exception {
        // Get the complianceEvidenceStatus
        restComplianceEvidenceStatusMockMvc.perform(get("/api/compliance-evidence-statuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComplianceEvidenceStatus() throws Exception {
        // Initialize the database
        complianceEvidenceStatusRepository.saveAndFlush(complianceEvidenceStatus);
        int databaseSizeBeforeUpdate = complianceEvidenceStatusRepository.findAll().size();

        // Update the complianceEvidenceStatus
        ComplianceEvidenceStatus updatedComplianceEvidenceStatus = complianceEvidenceStatusRepository.findOne(complianceEvidenceStatus.getId());
        // Disconnect from session so that the updates on updatedComplianceEvidenceStatus are not directly saved in db
        em.detach(updatedComplianceEvidenceStatus);
        updatedComplianceEvidenceStatus
            .nameAr(UPDATED_NAME_AR)
            .nameEn(UPDATED_NAME_EN)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .modifiedBy(UPDATED_MODIFIED_BY);
        ComplianceEvidenceStatusDTO complianceEvidenceStatusDTO = complianceEvidenceStatusMapper.toDto(updatedComplianceEvidenceStatus);

        restComplianceEvidenceStatusMockMvc.perform(put("/api/compliance-evidence-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceEvidenceStatusDTO)))
            .andExpect(status().isOk());

        // Validate the ComplianceEvidenceStatus in the database
        List<ComplianceEvidenceStatus> complianceEvidenceStatusList = complianceEvidenceStatusRepository.findAll();
        assertThat(complianceEvidenceStatusList).hasSize(databaseSizeBeforeUpdate);
        ComplianceEvidenceStatus testComplianceEvidenceStatus = complianceEvidenceStatusList.get(complianceEvidenceStatusList.size() - 1);
        assertThat(testComplianceEvidenceStatus.getNameAr()).isEqualTo(UPDATED_NAME_AR);
        assertThat(testComplianceEvidenceStatus.getNameEn()).isEqualTo(UPDATED_NAME_EN);
        assertThat(testComplianceEvidenceStatus.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testComplianceEvidenceStatus.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testComplianceEvidenceStatus.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testComplianceEvidenceStatus.getModifiedBy()).isEqualTo(UPDATED_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingComplianceEvidenceStatus() throws Exception {
        int databaseSizeBeforeUpdate = complianceEvidenceStatusRepository.findAll().size();

        // Create the ComplianceEvidenceStatus
        ComplianceEvidenceStatusDTO complianceEvidenceStatusDTO = complianceEvidenceStatusMapper.toDto(complianceEvidenceStatus);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restComplianceEvidenceStatusMockMvc.perform(put("/api/compliance-evidence-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceEvidenceStatusDTO)))
            .andExpect(status().isCreated());

        // Validate the ComplianceEvidenceStatus in the database
        List<ComplianceEvidenceStatus> complianceEvidenceStatusList = complianceEvidenceStatusRepository.findAll();
        assertThat(complianceEvidenceStatusList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteComplianceEvidenceStatus() throws Exception {
        // Initialize the database
        complianceEvidenceStatusRepository.saveAndFlush(complianceEvidenceStatus);
        int databaseSizeBeforeDelete = complianceEvidenceStatusRepository.findAll().size();

        // Get the complianceEvidenceStatus
        restComplianceEvidenceStatusMockMvc.perform(delete("/api/compliance-evidence-statuses/{id}", complianceEvidenceStatus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ComplianceEvidenceStatus> complianceEvidenceStatusList = complianceEvidenceStatusRepository.findAll();
        assertThat(complianceEvidenceStatusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComplianceEvidenceStatus.class);
        ComplianceEvidenceStatus complianceEvidenceStatus1 = new ComplianceEvidenceStatus();
        complianceEvidenceStatus1.setId(1L);
        ComplianceEvidenceStatus complianceEvidenceStatus2 = new ComplianceEvidenceStatus();
        complianceEvidenceStatus2.setId(complianceEvidenceStatus1.getId());
        assertThat(complianceEvidenceStatus1).isEqualTo(complianceEvidenceStatus2);
        complianceEvidenceStatus2.setId(2L);
        assertThat(complianceEvidenceStatus1).isNotEqualTo(complianceEvidenceStatus2);
        complianceEvidenceStatus1.setId(null);
        assertThat(complianceEvidenceStatus1).isNotEqualTo(complianceEvidenceStatus2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComplianceEvidenceStatusDTO.class);
        ComplianceEvidenceStatusDTO complianceEvidenceStatusDTO1 = new ComplianceEvidenceStatusDTO();
        complianceEvidenceStatusDTO1.setId(1L);
        ComplianceEvidenceStatusDTO complianceEvidenceStatusDTO2 = new ComplianceEvidenceStatusDTO();
        assertThat(complianceEvidenceStatusDTO1).isNotEqualTo(complianceEvidenceStatusDTO2);
        complianceEvidenceStatusDTO2.setId(complianceEvidenceStatusDTO1.getId());
        assertThat(complianceEvidenceStatusDTO1).isEqualTo(complianceEvidenceStatusDTO2);
        complianceEvidenceStatusDTO2.setId(2L);
        assertThat(complianceEvidenceStatusDTO1).isNotEqualTo(complianceEvidenceStatusDTO2);
        complianceEvidenceStatusDTO1.setId(null);
        assertThat(complianceEvidenceStatusDTO1).isNotEqualTo(complianceEvidenceStatusDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(complianceEvidenceStatusMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(complianceEvidenceStatusMapper.fromId(null)).isNull();
    }
}

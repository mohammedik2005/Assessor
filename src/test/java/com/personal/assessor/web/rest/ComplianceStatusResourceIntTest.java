package com.personal.assessor.web.rest;

import com.personal.assessor.AssessorApp;

import com.personal.assessor.domain.ComplianceStatus;
import com.personal.assessor.repository.ComplianceStatusRepository;
import com.personal.assessor.service.ComplianceStatusService;
import com.personal.assessor.service.dto.ComplianceStatusDTO;
import com.personal.assessor.service.mapper.ComplianceStatusMapper;
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
 * Test class for the ComplianceStatusResource REST controller.
 *
 * @see ComplianceStatusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AssessorApp.class)
public class ComplianceStatusResourceIntTest {

    private static final String DEFAULT_STATUS_AR = "AAAAAAAAAA";
    private static final String UPDATED_STATUS_AR = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS_EN = "AAAAAAAAAA";
    private static final String UPDATED_STATUS_EN = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_MODIFIED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private ComplianceStatusRepository complianceStatusRepository;

    @Autowired
    private ComplianceStatusMapper complianceStatusMapper;

    @Autowired
    private ComplianceStatusService complianceStatusService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restComplianceStatusMockMvc;

    private ComplianceStatus complianceStatus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComplianceStatusResource complianceStatusResource = new ComplianceStatusResource(complianceStatusService);
        this.restComplianceStatusMockMvc = MockMvcBuilders.standaloneSetup(complianceStatusResource)
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
    public static ComplianceStatus createEntity(EntityManager em) {
        ComplianceStatus complianceStatus = new ComplianceStatus()
            .statusAr(DEFAULT_STATUS_AR)
            .statusEn(DEFAULT_STATUS_EN)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .modifiedBy(DEFAULT_MODIFIED_BY);
        return complianceStatus;
    }

    @Before
    public void initTest() {
        complianceStatus = createEntity(em);
    }

    @Test
    @Transactional
    public void createComplianceStatus() throws Exception {
        int databaseSizeBeforeCreate = complianceStatusRepository.findAll().size();

        // Create the ComplianceStatus
        ComplianceStatusDTO complianceStatusDTO = complianceStatusMapper.toDto(complianceStatus);
        restComplianceStatusMockMvc.perform(post("/api/compliance-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceStatusDTO)))
            .andExpect(status().isCreated());

        // Validate the ComplianceStatus in the database
        List<ComplianceStatus> complianceStatusList = complianceStatusRepository.findAll();
        assertThat(complianceStatusList).hasSize(databaseSizeBeforeCreate + 1);
        ComplianceStatus testComplianceStatus = complianceStatusList.get(complianceStatusList.size() - 1);
        assertThat(testComplianceStatus.getStatusAr()).isEqualTo(DEFAULT_STATUS_AR);
        assertThat(testComplianceStatus.getStatusEn()).isEqualTo(DEFAULT_STATUS_EN);
        assertThat(testComplianceStatus.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testComplianceStatus.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testComplianceStatus.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testComplianceStatus.getModifiedBy()).isEqualTo(DEFAULT_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void createComplianceStatusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = complianceStatusRepository.findAll().size();

        // Create the ComplianceStatus with an existing ID
        complianceStatus.setId(1L);
        ComplianceStatusDTO complianceStatusDTO = complianceStatusMapper.toDto(complianceStatus);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComplianceStatusMockMvc.perform(post("/api/compliance-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceStatusDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ComplianceStatus in the database
        List<ComplianceStatus> complianceStatusList = complianceStatusRepository.findAll();
        assertThat(complianceStatusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStatusArIsRequired() throws Exception {
        int databaseSizeBeforeTest = complianceStatusRepository.findAll().size();
        // set the field null
        complianceStatus.setStatusAr(null);

        // Create the ComplianceStatus, which fails.
        ComplianceStatusDTO complianceStatusDTO = complianceStatusMapper.toDto(complianceStatus);

        restComplianceStatusMockMvc.perform(post("/api/compliance-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceStatusDTO)))
            .andExpect(status().isBadRequest());

        List<ComplianceStatus> complianceStatusList = complianceStatusRepository.findAll();
        assertThat(complianceStatusList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusEnIsRequired() throws Exception {
        int databaseSizeBeforeTest = complianceStatusRepository.findAll().size();
        // set the field null
        complianceStatus.setStatusEn(null);

        // Create the ComplianceStatus, which fails.
        ComplianceStatusDTO complianceStatusDTO = complianceStatusMapper.toDto(complianceStatus);

        restComplianceStatusMockMvc.perform(post("/api/compliance-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceStatusDTO)))
            .andExpect(status().isBadRequest());

        List<ComplianceStatus> complianceStatusList = complianceStatusRepository.findAll();
        assertThat(complianceStatusList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllComplianceStatuses() throws Exception {
        // Initialize the database
        complianceStatusRepository.saveAndFlush(complianceStatus);

        // Get all the complianceStatusList
        restComplianceStatusMockMvc.perform(get("/api/compliance-statuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(complianceStatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].statusAr").value(hasItem(DEFAULT_STATUS_AR.toString())))
            .andExpect(jsonPath("$.[*].statusEn").value(hasItem(DEFAULT_STATUS_EN.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedBy").value(hasItem(DEFAULT_MODIFIED_BY.toString())));
    }

    @Test
    @Transactional
    public void getComplianceStatus() throws Exception {
        // Initialize the database
        complianceStatusRepository.saveAndFlush(complianceStatus);

        // Get the complianceStatus
        restComplianceStatusMockMvc.perform(get("/api/compliance-statuses/{id}", complianceStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(complianceStatus.getId().intValue()))
            .andExpect(jsonPath("$.statusAr").value(DEFAULT_STATUS_AR.toString()))
            .andExpect(jsonPath("$.statusEn").value(DEFAULT_STATUS_EN.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)))
            .andExpect(jsonPath("$.modifiedBy").value(DEFAULT_MODIFIED_BY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingComplianceStatus() throws Exception {
        // Get the complianceStatus
        restComplianceStatusMockMvc.perform(get("/api/compliance-statuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComplianceStatus() throws Exception {
        // Initialize the database
        complianceStatusRepository.saveAndFlush(complianceStatus);
        int databaseSizeBeforeUpdate = complianceStatusRepository.findAll().size();

        // Update the complianceStatus
        ComplianceStatus updatedComplianceStatus = complianceStatusRepository.findOne(complianceStatus.getId());
        // Disconnect from session so that the updates on updatedComplianceStatus are not directly saved in db
        em.detach(updatedComplianceStatus);
        updatedComplianceStatus
            .statusAr(UPDATED_STATUS_AR)
            .statusEn(UPDATED_STATUS_EN)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .modifiedBy(UPDATED_MODIFIED_BY);
        ComplianceStatusDTO complianceStatusDTO = complianceStatusMapper.toDto(updatedComplianceStatus);

        restComplianceStatusMockMvc.perform(put("/api/compliance-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceStatusDTO)))
            .andExpect(status().isOk());

        // Validate the ComplianceStatus in the database
        List<ComplianceStatus> complianceStatusList = complianceStatusRepository.findAll();
        assertThat(complianceStatusList).hasSize(databaseSizeBeforeUpdate);
        ComplianceStatus testComplianceStatus = complianceStatusList.get(complianceStatusList.size() - 1);
        assertThat(testComplianceStatus.getStatusAr()).isEqualTo(UPDATED_STATUS_AR);
        assertThat(testComplianceStatus.getStatusEn()).isEqualTo(UPDATED_STATUS_EN);
        assertThat(testComplianceStatus.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testComplianceStatus.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testComplianceStatus.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testComplianceStatus.getModifiedBy()).isEqualTo(UPDATED_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingComplianceStatus() throws Exception {
        int databaseSizeBeforeUpdate = complianceStatusRepository.findAll().size();

        // Create the ComplianceStatus
        ComplianceStatusDTO complianceStatusDTO = complianceStatusMapper.toDto(complianceStatus);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restComplianceStatusMockMvc.perform(put("/api/compliance-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceStatusDTO)))
            .andExpect(status().isCreated());

        // Validate the ComplianceStatus in the database
        List<ComplianceStatus> complianceStatusList = complianceStatusRepository.findAll();
        assertThat(complianceStatusList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteComplianceStatus() throws Exception {
        // Initialize the database
        complianceStatusRepository.saveAndFlush(complianceStatus);
        int databaseSizeBeforeDelete = complianceStatusRepository.findAll().size();

        // Get the complianceStatus
        restComplianceStatusMockMvc.perform(delete("/api/compliance-statuses/{id}", complianceStatus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ComplianceStatus> complianceStatusList = complianceStatusRepository.findAll();
        assertThat(complianceStatusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComplianceStatus.class);
        ComplianceStatus complianceStatus1 = new ComplianceStatus();
        complianceStatus1.setId(1L);
        ComplianceStatus complianceStatus2 = new ComplianceStatus();
        complianceStatus2.setId(complianceStatus1.getId());
        assertThat(complianceStatus1).isEqualTo(complianceStatus2);
        complianceStatus2.setId(2L);
        assertThat(complianceStatus1).isNotEqualTo(complianceStatus2);
        complianceStatus1.setId(null);
        assertThat(complianceStatus1).isNotEqualTo(complianceStatus2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComplianceStatusDTO.class);
        ComplianceStatusDTO complianceStatusDTO1 = new ComplianceStatusDTO();
        complianceStatusDTO1.setId(1L);
        ComplianceStatusDTO complianceStatusDTO2 = new ComplianceStatusDTO();
        assertThat(complianceStatusDTO1).isNotEqualTo(complianceStatusDTO2);
        complianceStatusDTO2.setId(complianceStatusDTO1.getId());
        assertThat(complianceStatusDTO1).isEqualTo(complianceStatusDTO2);
        complianceStatusDTO2.setId(2L);
        assertThat(complianceStatusDTO1).isNotEqualTo(complianceStatusDTO2);
        complianceStatusDTO1.setId(null);
        assertThat(complianceStatusDTO1).isNotEqualTo(complianceStatusDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(complianceStatusMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(complianceStatusMapper.fromId(null)).isNull();
    }
}

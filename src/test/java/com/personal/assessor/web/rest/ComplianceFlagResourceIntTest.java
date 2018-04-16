package com.personal.assessor.web.rest;

import com.personal.assessor.AssessorApp;

import com.personal.assessor.domain.ComplianceFlag;
import com.personal.assessor.repository.ComplianceFlagRepository;
import com.personal.assessor.service.ComplianceFlagService;
import com.personal.assessor.service.dto.ComplianceFlagDTO;
import com.personal.assessor.service.mapper.ComplianceFlagMapper;
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
 * Test class for the ComplianceFlagResource REST controller.
 *
 * @see ComplianceFlagResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AssessorApp.class)
public class ComplianceFlagResourceIntTest {

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
    private ComplianceFlagRepository complianceFlagRepository;

    @Autowired
    private ComplianceFlagMapper complianceFlagMapper;

    @Autowired
    private ComplianceFlagService complianceFlagService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restComplianceFlagMockMvc;

    private ComplianceFlag complianceFlag;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComplianceFlagResource complianceFlagResource = new ComplianceFlagResource(complianceFlagService);
        this.restComplianceFlagMockMvc = MockMvcBuilders.standaloneSetup(complianceFlagResource)
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
    public static ComplianceFlag createEntity(EntityManager em) {
        ComplianceFlag complianceFlag = new ComplianceFlag()
            .nameAr(DEFAULT_NAME_AR)
            .nameEn(DEFAULT_NAME_EN)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .modifiedBy(DEFAULT_MODIFIED_BY);
        return complianceFlag;
    }

    @Before
    public void initTest() {
        complianceFlag = createEntity(em);
    }

    @Test
    @Transactional
    public void createComplianceFlag() throws Exception {
        int databaseSizeBeforeCreate = complianceFlagRepository.findAll().size();

        // Create the ComplianceFlag
        ComplianceFlagDTO complianceFlagDTO = complianceFlagMapper.toDto(complianceFlag);
        restComplianceFlagMockMvc.perform(post("/api/compliance-flags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceFlagDTO)))
            .andExpect(status().isCreated());

        // Validate the ComplianceFlag in the database
        List<ComplianceFlag> complianceFlagList = complianceFlagRepository.findAll();
        assertThat(complianceFlagList).hasSize(databaseSizeBeforeCreate + 1);
        ComplianceFlag testComplianceFlag = complianceFlagList.get(complianceFlagList.size() - 1);
        assertThat(testComplianceFlag.getNameAr()).isEqualTo(DEFAULT_NAME_AR);
        assertThat(testComplianceFlag.getNameEn()).isEqualTo(DEFAULT_NAME_EN);
        assertThat(testComplianceFlag.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testComplianceFlag.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testComplianceFlag.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testComplianceFlag.getModifiedBy()).isEqualTo(DEFAULT_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void createComplianceFlagWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = complianceFlagRepository.findAll().size();

        // Create the ComplianceFlag with an existing ID
        complianceFlag.setId(1L);
        ComplianceFlagDTO complianceFlagDTO = complianceFlagMapper.toDto(complianceFlag);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComplianceFlagMockMvc.perform(post("/api/compliance-flags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceFlagDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ComplianceFlag in the database
        List<ComplianceFlag> complianceFlagList = complianceFlagRepository.findAll();
        assertThat(complianceFlagList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameArIsRequired() throws Exception {
        int databaseSizeBeforeTest = complianceFlagRepository.findAll().size();
        // set the field null
        complianceFlag.setNameAr(null);

        // Create the ComplianceFlag, which fails.
        ComplianceFlagDTO complianceFlagDTO = complianceFlagMapper.toDto(complianceFlag);

        restComplianceFlagMockMvc.perform(post("/api/compliance-flags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceFlagDTO)))
            .andExpect(status().isBadRequest());

        List<ComplianceFlag> complianceFlagList = complianceFlagRepository.findAll();
        assertThat(complianceFlagList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameEnIsRequired() throws Exception {
        int databaseSizeBeforeTest = complianceFlagRepository.findAll().size();
        // set the field null
        complianceFlag.setNameEn(null);

        // Create the ComplianceFlag, which fails.
        ComplianceFlagDTO complianceFlagDTO = complianceFlagMapper.toDto(complianceFlag);

        restComplianceFlagMockMvc.perform(post("/api/compliance-flags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceFlagDTO)))
            .andExpect(status().isBadRequest());

        List<ComplianceFlag> complianceFlagList = complianceFlagRepository.findAll();
        assertThat(complianceFlagList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllComplianceFlags() throws Exception {
        // Initialize the database
        complianceFlagRepository.saveAndFlush(complianceFlag);

        // Get all the complianceFlagList
        restComplianceFlagMockMvc.perform(get("/api/compliance-flags?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(complianceFlag.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameAr").value(hasItem(DEFAULT_NAME_AR.toString())))
            .andExpect(jsonPath("$.[*].nameEn").value(hasItem(DEFAULT_NAME_EN.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedBy").value(hasItem(DEFAULT_MODIFIED_BY.toString())));
    }

    @Test
    @Transactional
    public void getComplianceFlag() throws Exception {
        // Initialize the database
        complianceFlagRepository.saveAndFlush(complianceFlag);

        // Get the complianceFlag
        restComplianceFlagMockMvc.perform(get("/api/compliance-flags/{id}", complianceFlag.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(complianceFlag.getId().intValue()))
            .andExpect(jsonPath("$.nameAr").value(DEFAULT_NAME_AR.toString()))
            .andExpect(jsonPath("$.nameEn").value(DEFAULT_NAME_EN.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)))
            .andExpect(jsonPath("$.modifiedBy").value(DEFAULT_MODIFIED_BY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingComplianceFlag() throws Exception {
        // Get the complianceFlag
        restComplianceFlagMockMvc.perform(get("/api/compliance-flags/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComplianceFlag() throws Exception {
        // Initialize the database
        complianceFlagRepository.saveAndFlush(complianceFlag);
        int databaseSizeBeforeUpdate = complianceFlagRepository.findAll().size();

        // Update the complianceFlag
        ComplianceFlag updatedComplianceFlag = complianceFlagRepository.findOne(complianceFlag.getId());
        // Disconnect from session so that the updates on updatedComplianceFlag are not directly saved in db
        em.detach(updatedComplianceFlag);
        updatedComplianceFlag
            .nameAr(UPDATED_NAME_AR)
            .nameEn(UPDATED_NAME_EN)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .modifiedBy(UPDATED_MODIFIED_BY);
        ComplianceFlagDTO complianceFlagDTO = complianceFlagMapper.toDto(updatedComplianceFlag);

        restComplianceFlagMockMvc.perform(put("/api/compliance-flags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceFlagDTO)))
            .andExpect(status().isOk());

        // Validate the ComplianceFlag in the database
        List<ComplianceFlag> complianceFlagList = complianceFlagRepository.findAll();
        assertThat(complianceFlagList).hasSize(databaseSizeBeforeUpdate);
        ComplianceFlag testComplianceFlag = complianceFlagList.get(complianceFlagList.size() - 1);
        assertThat(testComplianceFlag.getNameAr()).isEqualTo(UPDATED_NAME_AR);
        assertThat(testComplianceFlag.getNameEn()).isEqualTo(UPDATED_NAME_EN);
        assertThat(testComplianceFlag.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testComplianceFlag.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testComplianceFlag.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testComplianceFlag.getModifiedBy()).isEqualTo(UPDATED_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingComplianceFlag() throws Exception {
        int databaseSizeBeforeUpdate = complianceFlagRepository.findAll().size();

        // Create the ComplianceFlag
        ComplianceFlagDTO complianceFlagDTO = complianceFlagMapper.toDto(complianceFlag);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restComplianceFlagMockMvc.perform(put("/api/compliance-flags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceFlagDTO)))
            .andExpect(status().isCreated());

        // Validate the ComplianceFlag in the database
        List<ComplianceFlag> complianceFlagList = complianceFlagRepository.findAll();
        assertThat(complianceFlagList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteComplianceFlag() throws Exception {
        // Initialize the database
        complianceFlagRepository.saveAndFlush(complianceFlag);
        int databaseSizeBeforeDelete = complianceFlagRepository.findAll().size();

        // Get the complianceFlag
        restComplianceFlagMockMvc.perform(delete("/api/compliance-flags/{id}", complianceFlag.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ComplianceFlag> complianceFlagList = complianceFlagRepository.findAll();
        assertThat(complianceFlagList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComplianceFlag.class);
        ComplianceFlag complianceFlag1 = new ComplianceFlag();
        complianceFlag1.setId(1L);
        ComplianceFlag complianceFlag2 = new ComplianceFlag();
        complianceFlag2.setId(complianceFlag1.getId());
        assertThat(complianceFlag1).isEqualTo(complianceFlag2);
        complianceFlag2.setId(2L);
        assertThat(complianceFlag1).isNotEqualTo(complianceFlag2);
        complianceFlag1.setId(null);
        assertThat(complianceFlag1).isNotEqualTo(complianceFlag2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComplianceFlagDTO.class);
        ComplianceFlagDTO complianceFlagDTO1 = new ComplianceFlagDTO();
        complianceFlagDTO1.setId(1L);
        ComplianceFlagDTO complianceFlagDTO2 = new ComplianceFlagDTO();
        assertThat(complianceFlagDTO1).isNotEqualTo(complianceFlagDTO2);
        complianceFlagDTO2.setId(complianceFlagDTO1.getId());
        assertThat(complianceFlagDTO1).isEqualTo(complianceFlagDTO2);
        complianceFlagDTO2.setId(2L);
        assertThat(complianceFlagDTO1).isNotEqualTo(complianceFlagDTO2);
        complianceFlagDTO1.setId(null);
        assertThat(complianceFlagDTO1).isNotEqualTo(complianceFlagDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(complianceFlagMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(complianceFlagMapper.fromId(null)).isNull();
    }
}

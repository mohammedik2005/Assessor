package com.personal.assessor.web.rest;

import com.personal.assessor.AssessorApp;

import com.personal.assessor.domain.ComplianceEvidenceType;
import com.personal.assessor.repository.ComplianceEvidenceTypeRepository;
import com.personal.assessor.service.ComplianceEvidenceTypeService;
import com.personal.assessor.service.dto.ComplianceEvidenceTypeDTO;
import com.personal.assessor.service.mapper.ComplianceEvidenceTypeMapper;
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
 * Test class for the ComplianceEvidenceTypeResource REST controller.
 *
 * @see ComplianceEvidenceTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AssessorApp.class)
public class ComplianceEvidenceTypeResourceIntTest {

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
    private ComplianceEvidenceTypeRepository complianceEvidenceTypeRepository;

    @Autowired
    private ComplianceEvidenceTypeMapper complianceEvidenceTypeMapper;

    @Autowired
    private ComplianceEvidenceTypeService complianceEvidenceTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restComplianceEvidenceTypeMockMvc;

    private ComplianceEvidenceType complianceEvidenceType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComplianceEvidenceTypeResource complianceEvidenceTypeResource = new ComplianceEvidenceTypeResource(complianceEvidenceTypeService);
        this.restComplianceEvidenceTypeMockMvc = MockMvcBuilders.standaloneSetup(complianceEvidenceTypeResource)
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
    public static ComplianceEvidenceType createEntity(EntityManager em) {
        ComplianceEvidenceType complianceEvidenceType = new ComplianceEvidenceType()
            .nameAr(DEFAULT_NAME_AR)
            .nameEn(DEFAULT_NAME_EN)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .modifiedBy(DEFAULT_MODIFIED_BY);
        return complianceEvidenceType;
    }

    @Before
    public void initTest() {
        complianceEvidenceType = createEntity(em);
    }

    @Test
    @Transactional
    public void createComplianceEvidenceType() throws Exception {
        int databaseSizeBeforeCreate = complianceEvidenceTypeRepository.findAll().size();

        // Create the ComplianceEvidenceType
        ComplianceEvidenceTypeDTO complianceEvidenceTypeDTO = complianceEvidenceTypeMapper.toDto(complianceEvidenceType);
        restComplianceEvidenceTypeMockMvc.perform(post("/api/compliance-evidence-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceEvidenceTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the ComplianceEvidenceType in the database
        List<ComplianceEvidenceType> complianceEvidenceTypeList = complianceEvidenceTypeRepository.findAll();
        assertThat(complianceEvidenceTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ComplianceEvidenceType testComplianceEvidenceType = complianceEvidenceTypeList.get(complianceEvidenceTypeList.size() - 1);
        assertThat(testComplianceEvidenceType.getNameAr()).isEqualTo(DEFAULT_NAME_AR);
        assertThat(testComplianceEvidenceType.getNameEn()).isEqualTo(DEFAULT_NAME_EN);
        assertThat(testComplianceEvidenceType.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testComplianceEvidenceType.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testComplianceEvidenceType.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testComplianceEvidenceType.getModifiedBy()).isEqualTo(DEFAULT_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void createComplianceEvidenceTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = complianceEvidenceTypeRepository.findAll().size();

        // Create the ComplianceEvidenceType with an existing ID
        complianceEvidenceType.setId(1L);
        ComplianceEvidenceTypeDTO complianceEvidenceTypeDTO = complianceEvidenceTypeMapper.toDto(complianceEvidenceType);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComplianceEvidenceTypeMockMvc.perform(post("/api/compliance-evidence-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceEvidenceTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ComplianceEvidenceType in the database
        List<ComplianceEvidenceType> complianceEvidenceTypeList = complianceEvidenceTypeRepository.findAll();
        assertThat(complianceEvidenceTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameArIsRequired() throws Exception {
        int databaseSizeBeforeTest = complianceEvidenceTypeRepository.findAll().size();
        // set the field null
        complianceEvidenceType.setNameAr(null);

        // Create the ComplianceEvidenceType, which fails.
        ComplianceEvidenceTypeDTO complianceEvidenceTypeDTO = complianceEvidenceTypeMapper.toDto(complianceEvidenceType);

        restComplianceEvidenceTypeMockMvc.perform(post("/api/compliance-evidence-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceEvidenceTypeDTO)))
            .andExpect(status().isBadRequest());

        List<ComplianceEvidenceType> complianceEvidenceTypeList = complianceEvidenceTypeRepository.findAll();
        assertThat(complianceEvidenceTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameEnIsRequired() throws Exception {
        int databaseSizeBeforeTest = complianceEvidenceTypeRepository.findAll().size();
        // set the field null
        complianceEvidenceType.setNameEn(null);

        // Create the ComplianceEvidenceType, which fails.
        ComplianceEvidenceTypeDTO complianceEvidenceTypeDTO = complianceEvidenceTypeMapper.toDto(complianceEvidenceType);

        restComplianceEvidenceTypeMockMvc.perform(post("/api/compliance-evidence-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceEvidenceTypeDTO)))
            .andExpect(status().isBadRequest());

        List<ComplianceEvidenceType> complianceEvidenceTypeList = complianceEvidenceTypeRepository.findAll();
        assertThat(complianceEvidenceTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllComplianceEvidenceTypes() throws Exception {
        // Initialize the database
        complianceEvidenceTypeRepository.saveAndFlush(complianceEvidenceType);

        // Get all the complianceEvidenceTypeList
        restComplianceEvidenceTypeMockMvc.perform(get("/api/compliance-evidence-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(complianceEvidenceType.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameAr").value(hasItem(DEFAULT_NAME_AR.toString())))
            .andExpect(jsonPath("$.[*].nameEn").value(hasItem(DEFAULT_NAME_EN.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedBy").value(hasItem(DEFAULT_MODIFIED_BY.toString())));
    }

    @Test
    @Transactional
    public void getComplianceEvidenceType() throws Exception {
        // Initialize the database
        complianceEvidenceTypeRepository.saveAndFlush(complianceEvidenceType);

        // Get the complianceEvidenceType
        restComplianceEvidenceTypeMockMvc.perform(get("/api/compliance-evidence-types/{id}", complianceEvidenceType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(complianceEvidenceType.getId().intValue()))
            .andExpect(jsonPath("$.nameAr").value(DEFAULT_NAME_AR.toString()))
            .andExpect(jsonPath("$.nameEn").value(DEFAULT_NAME_EN.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)))
            .andExpect(jsonPath("$.modifiedBy").value(DEFAULT_MODIFIED_BY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingComplianceEvidenceType() throws Exception {
        // Get the complianceEvidenceType
        restComplianceEvidenceTypeMockMvc.perform(get("/api/compliance-evidence-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComplianceEvidenceType() throws Exception {
        // Initialize the database
        complianceEvidenceTypeRepository.saveAndFlush(complianceEvidenceType);
        int databaseSizeBeforeUpdate = complianceEvidenceTypeRepository.findAll().size();

        // Update the complianceEvidenceType
        ComplianceEvidenceType updatedComplianceEvidenceType = complianceEvidenceTypeRepository.findOne(complianceEvidenceType.getId());
        // Disconnect from session so that the updates on updatedComplianceEvidenceType are not directly saved in db
        em.detach(updatedComplianceEvidenceType);
        updatedComplianceEvidenceType
            .nameAr(UPDATED_NAME_AR)
            .nameEn(UPDATED_NAME_EN)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .modifiedBy(UPDATED_MODIFIED_BY);
        ComplianceEvidenceTypeDTO complianceEvidenceTypeDTO = complianceEvidenceTypeMapper.toDto(updatedComplianceEvidenceType);

        restComplianceEvidenceTypeMockMvc.perform(put("/api/compliance-evidence-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceEvidenceTypeDTO)))
            .andExpect(status().isOk());

        // Validate the ComplianceEvidenceType in the database
        List<ComplianceEvidenceType> complianceEvidenceTypeList = complianceEvidenceTypeRepository.findAll();
        assertThat(complianceEvidenceTypeList).hasSize(databaseSizeBeforeUpdate);
        ComplianceEvidenceType testComplianceEvidenceType = complianceEvidenceTypeList.get(complianceEvidenceTypeList.size() - 1);
        assertThat(testComplianceEvidenceType.getNameAr()).isEqualTo(UPDATED_NAME_AR);
        assertThat(testComplianceEvidenceType.getNameEn()).isEqualTo(UPDATED_NAME_EN);
        assertThat(testComplianceEvidenceType.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testComplianceEvidenceType.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testComplianceEvidenceType.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testComplianceEvidenceType.getModifiedBy()).isEqualTo(UPDATED_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingComplianceEvidenceType() throws Exception {
        int databaseSizeBeforeUpdate = complianceEvidenceTypeRepository.findAll().size();

        // Create the ComplianceEvidenceType
        ComplianceEvidenceTypeDTO complianceEvidenceTypeDTO = complianceEvidenceTypeMapper.toDto(complianceEvidenceType);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restComplianceEvidenceTypeMockMvc.perform(put("/api/compliance-evidence-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceEvidenceTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the ComplianceEvidenceType in the database
        List<ComplianceEvidenceType> complianceEvidenceTypeList = complianceEvidenceTypeRepository.findAll();
        assertThat(complianceEvidenceTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteComplianceEvidenceType() throws Exception {
        // Initialize the database
        complianceEvidenceTypeRepository.saveAndFlush(complianceEvidenceType);
        int databaseSizeBeforeDelete = complianceEvidenceTypeRepository.findAll().size();

        // Get the complianceEvidenceType
        restComplianceEvidenceTypeMockMvc.perform(delete("/api/compliance-evidence-types/{id}", complianceEvidenceType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ComplianceEvidenceType> complianceEvidenceTypeList = complianceEvidenceTypeRepository.findAll();
        assertThat(complianceEvidenceTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComplianceEvidenceType.class);
        ComplianceEvidenceType complianceEvidenceType1 = new ComplianceEvidenceType();
        complianceEvidenceType1.setId(1L);
        ComplianceEvidenceType complianceEvidenceType2 = new ComplianceEvidenceType();
        complianceEvidenceType2.setId(complianceEvidenceType1.getId());
        assertThat(complianceEvidenceType1).isEqualTo(complianceEvidenceType2);
        complianceEvidenceType2.setId(2L);
        assertThat(complianceEvidenceType1).isNotEqualTo(complianceEvidenceType2);
        complianceEvidenceType1.setId(null);
        assertThat(complianceEvidenceType1).isNotEqualTo(complianceEvidenceType2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComplianceEvidenceTypeDTO.class);
        ComplianceEvidenceTypeDTO complianceEvidenceTypeDTO1 = new ComplianceEvidenceTypeDTO();
        complianceEvidenceTypeDTO1.setId(1L);
        ComplianceEvidenceTypeDTO complianceEvidenceTypeDTO2 = new ComplianceEvidenceTypeDTO();
        assertThat(complianceEvidenceTypeDTO1).isNotEqualTo(complianceEvidenceTypeDTO2);
        complianceEvidenceTypeDTO2.setId(complianceEvidenceTypeDTO1.getId());
        assertThat(complianceEvidenceTypeDTO1).isEqualTo(complianceEvidenceTypeDTO2);
        complianceEvidenceTypeDTO2.setId(2L);
        assertThat(complianceEvidenceTypeDTO1).isNotEqualTo(complianceEvidenceTypeDTO2);
        complianceEvidenceTypeDTO1.setId(null);
        assertThat(complianceEvidenceTypeDTO1).isNotEqualTo(complianceEvidenceTypeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(complianceEvidenceTypeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(complianceEvidenceTypeMapper.fromId(null)).isNull();
    }
}

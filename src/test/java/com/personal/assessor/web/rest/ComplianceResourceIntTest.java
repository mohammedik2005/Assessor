package com.personal.assessor.web.rest;

import com.personal.assessor.AssessorApp;

import com.personal.assessor.domain.Compliance;
import com.personal.assessor.repository.ComplianceRepository;
import com.personal.assessor.service.ComplianceService;
import com.personal.assessor.service.dto.ComplianceDTO;
import com.personal.assessor.service.mapper.ComplianceMapper;
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
 * Test class for the ComplianceResource REST controller.
 *
 * @see ComplianceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AssessorApp.class)
public class ComplianceResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION_AR = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION_AR = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION_EN = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION_EN = "BBBBBBBBBB";

    private static final Integer DEFAULT_COMPLIANCE_VERSION = 1;
    private static final Integer UPDATED_COMPLIANCE_VERSION = 2;

    private static final Long DEFAULT_VERSION = 1L;
    private static final Long UPDATED_VERSION = 2L;

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_MODIFIED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private ComplianceRepository complianceRepository;

    @Autowired
    private ComplianceMapper complianceMapper;

    @Autowired
    private ComplianceService complianceService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restComplianceMockMvc;

    private Compliance compliance;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComplianceResource complianceResource = new ComplianceResource(complianceService);
        this.restComplianceMockMvc = MockMvcBuilders.standaloneSetup(complianceResource)
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
    public static Compliance createEntity(EntityManager em) {
        Compliance compliance = new Compliance()
            .code(DEFAULT_CODE)
            .descriptionAr(DEFAULT_DESCRIPTION_AR)
            .descriptionEn(DEFAULT_DESCRIPTION_EN)
            .complianceVersion(DEFAULT_COMPLIANCE_VERSION)
            .version(DEFAULT_VERSION)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .modifiedBy(DEFAULT_MODIFIED_BY);
        return compliance;
    }

    @Before
    public void initTest() {
        compliance = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompliance() throws Exception {
        int databaseSizeBeforeCreate = complianceRepository.findAll().size();

        // Create the Compliance
        ComplianceDTO complianceDTO = complianceMapper.toDto(compliance);
        restComplianceMockMvc.perform(post("/api/compliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceDTO)))
            .andExpect(status().isCreated());

        // Validate the Compliance in the database
        List<Compliance> complianceList = complianceRepository.findAll();
        assertThat(complianceList).hasSize(databaseSizeBeforeCreate + 1);
        Compliance testCompliance = complianceList.get(complianceList.size() - 1);
        assertThat(testCompliance.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testCompliance.getDescriptionAr()).isEqualTo(DEFAULT_DESCRIPTION_AR);
        assertThat(testCompliance.getDescriptionEn()).isEqualTo(DEFAULT_DESCRIPTION_EN);
        assertThat(testCompliance.getComplianceVersion()).isEqualTo(DEFAULT_COMPLIANCE_VERSION);
        assertThat(testCompliance.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testCompliance.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testCompliance.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testCompliance.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testCompliance.getModifiedBy()).isEqualTo(DEFAULT_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void createComplianceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = complianceRepository.findAll().size();

        // Create the Compliance with an existing ID
        compliance.setId(1L);
        ComplianceDTO complianceDTO = complianceMapper.toDto(compliance);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComplianceMockMvc.perform(post("/api/compliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Compliance in the database
        List<Compliance> complianceList = complianceRepository.findAll();
        assertThat(complianceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCompliances() throws Exception {
        // Initialize the database
        complianceRepository.saveAndFlush(compliance);

        // Get all the complianceList
        restComplianceMockMvc.perform(get("/api/compliances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(compliance.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].descriptionAr").value(hasItem(DEFAULT_DESCRIPTION_AR.toString())))
            .andExpect(jsonPath("$.[*].descriptionEn").value(hasItem(DEFAULT_DESCRIPTION_EN.toString())))
            .andExpect(jsonPath("$.[*].complianceVersion").value(hasItem(DEFAULT_COMPLIANCE_VERSION)))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION.intValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedBy").value(hasItem(DEFAULT_MODIFIED_BY.toString())));
    }

    @Test
    @Transactional
    public void getCompliance() throws Exception {
        // Initialize the database
        complianceRepository.saveAndFlush(compliance);

        // Get the compliance
        restComplianceMockMvc.perform(get("/api/compliances/{id}", compliance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(compliance.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.descriptionAr").value(DEFAULT_DESCRIPTION_AR.toString()))
            .andExpect(jsonPath("$.descriptionEn").value(DEFAULT_DESCRIPTION_EN.toString()))
            .andExpect(jsonPath("$.complianceVersion").value(DEFAULT_COMPLIANCE_VERSION))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION.intValue()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)))
            .andExpect(jsonPath("$.modifiedBy").value(DEFAULT_MODIFIED_BY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCompliance() throws Exception {
        // Get the compliance
        restComplianceMockMvc.perform(get("/api/compliances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompliance() throws Exception {
        // Initialize the database
        complianceRepository.saveAndFlush(compliance);
        int databaseSizeBeforeUpdate = complianceRepository.findAll().size();

        // Update the compliance
        Compliance updatedCompliance = complianceRepository.findOne(compliance.getId());
        // Disconnect from session so that the updates on updatedCompliance are not directly saved in db
        em.detach(updatedCompliance);
        updatedCompliance
            .code(UPDATED_CODE)
            .descriptionAr(UPDATED_DESCRIPTION_AR)
            .descriptionEn(UPDATED_DESCRIPTION_EN)
            .complianceVersion(UPDATED_COMPLIANCE_VERSION)
            .version(UPDATED_VERSION)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .modifiedBy(UPDATED_MODIFIED_BY);
        ComplianceDTO complianceDTO = complianceMapper.toDto(updatedCompliance);

        restComplianceMockMvc.perform(put("/api/compliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceDTO)))
            .andExpect(status().isOk());

        // Validate the Compliance in the database
        List<Compliance> complianceList = complianceRepository.findAll();
        assertThat(complianceList).hasSize(databaseSizeBeforeUpdate);
        Compliance testCompliance = complianceList.get(complianceList.size() - 1);
        assertThat(testCompliance.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testCompliance.getDescriptionAr()).isEqualTo(UPDATED_DESCRIPTION_AR);
        assertThat(testCompliance.getDescriptionEn()).isEqualTo(UPDATED_DESCRIPTION_EN);
        assertThat(testCompliance.getComplianceVersion()).isEqualTo(UPDATED_COMPLIANCE_VERSION);
        assertThat(testCompliance.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testCompliance.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testCompliance.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testCompliance.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testCompliance.getModifiedBy()).isEqualTo(UPDATED_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingCompliance() throws Exception {
        int databaseSizeBeforeUpdate = complianceRepository.findAll().size();

        // Create the Compliance
        ComplianceDTO complianceDTO = complianceMapper.toDto(compliance);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restComplianceMockMvc.perform(put("/api/compliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceDTO)))
            .andExpect(status().isCreated());

        // Validate the Compliance in the database
        List<Compliance> complianceList = complianceRepository.findAll();
        assertThat(complianceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCompliance() throws Exception {
        // Initialize the database
        complianceRepository.saveAndFlush(compliance);
        int databaseSizeBeforeDelete = complianceRepository.findAll().size();

        // Get the compliance
        restComplianceMockMvc.perform(delete("/api/compliances/{id}", compliance.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Compliance> complianceList = complianceRepository.findAll();
        assertThat(complianceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Compliance.class);
        Compliance compliance1 = new Compliance();
        compliance1.setId(1L);
        Compliance compliance2 = new Compliance();
        compliance2.setId(compliance1.getId());
        assertThat(compliance1).isEqualTo(compliance2);
        compliance2.setId(2L);
        assertThat(compliance1).isNotEqualTo(compliance2);
        compliance1.setId(null);
        assertThat(compliance1).isNotEqualTo(compliance2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComplianceDTO.class);
        ComplianceDTO complianceDTO1 = new ComplianceDTO();
        complianceDTO1.setId(1L);
        ComplianceDTO complianceDTO2 = new ComplianceDTO();
        assertThat(complianceDTO1).isNotEqualTo(complianceDTO2);
        complianceDTO2.setId(complianceDTO1.getId());
        assertThat(complianceDTO1).isEqualTo(complianceDTO2);
        complianceDTO2.setId(2L);
        assertThat(complianceDTO1).isNotEqualTo(complianceDTO2);
        complianceDTO1.setId(null);
        assertThat(complianceDTO1).isNotEqualTo(complianceDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(complianceMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(complianceMapper.fromId(null)).isNull();
    }
}

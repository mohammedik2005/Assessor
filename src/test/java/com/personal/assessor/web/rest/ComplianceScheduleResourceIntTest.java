package com.personal.assessor.web.rest;

import com.personal.assessor.AssessorApp;

import com.personal.assessor.domain.ComplianceSchedule;
import com.personal.assessor.repository.ComplianceScheduleRepository;
import com.personal.assessor.service.ComplianceScheduleService;
import com.personal.assessor.service.dto.ComplianceScheduleDTO;
import com.personal.assessor.service.mapper.ComplianceScheduleMapper;
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
 * Test class for the ComplianceScheduleResource REST controller.
 *
 * @see ComplianceScheduleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AssessorApp.class)
public class ComplianceScheduleResourceIntTest {

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_MODIFIED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private ComplianceScheduleRepository complianceScheduleRepository;

    @Autowired
    private ComplianceScheduleMapper complianceScheduleMapper;

    @Autowired
    private ComplianceScheduleService complianceScheduleService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restComplianceScheduleMockMvc;

    private ComplianceSchedule complianceSchedule;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComplianceScheduleResource complianceScheduleResource = new ComplianceScheduleResource(complianceScheduleService);
        this.restComplianceScheduleMockMvc = MockMvcBuilders.standaloneSetup(complianceScheduleResource)
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
    public static ComplianceSchedule createEntity(EntityManager em) {
        ComplianceSchedule complianceSchedule = new ComplianceSchedule()
            .text(DEFAULT_TEXT)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .modifiedBy(DEFAULT_MODIFIED_BY);
        return complianceSchedule;
    }

    @Before
    public void initTest() {
        complianceSchedule = createEntity(em);
    }

    @Test
    @Transactional
    public void createComplianceSchedule() throws Exception {
        int databaseSizeBeforeCreate = complianceScheduleRepository.findAll().size();

        // Create the ComplianceSchedule
        ComplianceScheduleDTO complianceScheduleDTO = complianceScheduleMapper.toDto(complianceSchedule);
        restComplianceScheduleMockMvc.perform(post("/api/compliance-schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceScheduleDTO)))
            .andExpect(status().isCreated());

        // Validate the ComplianceSchedule in the database
        List<ComplianceSchedule> complianceScheduleList = complianceScheduleRepository.findAll();
        assertThat(complianceScheduleList).hasSize(databaseSizeBeforeCreate + 1);
        ComplianceSchedule testComplianceSchedule = complianceScheduleList.get(complianceScheduleList.size() - 1);
        assertThat(testComplianceSchedule.getText()).isEqualTo(DEFAULT_TEXT);
        assertThat(testComplianceSchedule.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testComplianceSchedule.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testComplianceSchedule.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testComplianceSchedule.getModifiedBy()).isEqualTo(DEFAULT_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void createComplianceScheduleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = complianceScheduleRepository.findAll().size();

        // Create the ComplianceSchedule with an existing ID
        complianceSchedule.setId(1L);
        ComplianceScheduleDTO complianceScheduleDTO = complianceScheduleMapper.toDto(complianceSchedule);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComplianceScheduleMockMvc.perform(post("/api/compliance-schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceScheduleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ComplianceSchedule in the database
        List<ComplianceSchedule> complianceScheduleList = complianceScheduleRepository.findAll();
        assertThat(complianceScheduleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTextIsRequired() throws Exception {
        int databaseSizeBeforeTest = complianceScheduleRepository.findAll().size();
        // set the field null
        complianceSchedule.setText(null);

        // Create the ComplianceSchedule, which fails.
        ComplianceScheduleDTO complianceScheduleDTO = complianceScheduleMapper.toDto(complianceSchedule);

        restComplianceScheduleMockMvc.perform(post("/api/compliance-schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceScheduleDTO)))
            .andExpect(status().isBadRequest());

        List<ComplianceSchedule> complianceScheduleList = complianceScheduleRepository.findAll();
        assertThat(complianceScheduleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllComplianceSchedules() throws Exception {
        // Initialize the database
        complianceScheduleRepository.saveAndFlush(complianceSchedule);

        // Get all the complianceScheduleList
        restComplianceScheduleMockMvc.perform(get("/api/compliance-schedules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(complianceSchedule.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedBy").value(hasItem(DEFAULT_MODIFIED_BY.toString())));
    }

    @Test
    @Transactional
    public void getComplianceSchedule() throws Exception {
        // Initialize the database
        complianceScheduleRepository.saveAndFlush(complianceSchedule);

        // Get the complianceSchedule
        restComplianceScheduleMockMvc.perform(get("/api/compliance-schedules/{id}", complianceSchedule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(complianceSchedule.getId().intValue()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)))
            .andExpect(jsonPath("$.modifiedBy").value(DEFAULT_MODIFIED_BY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingComplianceSchedule() throws Exception {
        // Get the complianceSchedule
        restComplianceScheduleMockMvc.perform(get("/api/compliance-schedules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComplianceSchedule() throws Exception {
        // Initialize the database
        complianceScheduleRepository.saveAndFlush(complianceSchedule);
        int databaseSizeBeforeUpdate = complianceScheduleRepository.findAll().size();

        // Update the complianceSchedule
        ComplianceSchedule updatedComplianceSchedule = complianceScheduleRepository.findOne(complianceSchedule.getId());
        // Disconnect from session so that the updates on updatedComplianceSchedule are not directly saved in db
        em.detach(updatedComplianceSchedule);
        updatedComplianceSchedule
            .text(UPDATED_TEXT)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .modifiedBy(UPDATED_MODIFIED_BY);
        ComplianceScheduleDTO complianceScheduleDTO = complianceScheduleMapper.toDto(updatedComplianceSchedule);

        restComplianceScheduleMockMvc.perform(put("/api/compliance-schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceScheduleDTO)))
            .andExpect(status().isOk());

        // Validate the ComplianceSchedule in the database
        List<ComplianceSchedule> complianceScheduleList = complianceScheduleRepository.findAll();
        assertThat(complianceScheduleList).hasSize(databaseSizeBeforeUpdate);
        ComplianceSchedule testComplianceSchedule = complianceScheduleList.get(complianceScheduleList.size() - 1);
        assertThat(testComplianceSchedule.getText()).isEqualTo(UPDATED_TEXT);
        assertThat(testComplianceSchedule.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testComplianceSchedule.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testComplianceSchedule.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testComplianceSchedule.getModifiedBy()).isEqualTo(UPDATED_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingComplianceSchedule() throws Exception {
        int databaseSizeBeforeUpdate = complianceScheduleRepository.findAll().size();

        // Create the ComplianceSchedule
        ComplianceScheduleDTO complianceScheduleDTO = complianceScheduleMapper.toDto(complianceSchedule);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restComplianceScheduleMockMvc.perform(put("/api/compliance-schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(complianceScheduleDTO)))
            .andExpect(status().isCreated());

        // Validate the ComplianceSchedule in the database
        List<ComplianceSchedule> complianceScheduleList = complianceScheduleRepository.findAll();
        assertThat(complianceScheduleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteComplianceSchedule() throws Exception {
        // Initialize the database
        complianceScheduleRepository.saveAndFlush(complianceSchedule);
        int databaseSizeBeforeDelete = complianceScheduleRepository.findAll().size();

        // Get the complianceSchedule
        restComplianceScheduleMockMvc.perform(delete("/api/compliance-schedules/{id}", complianceSchedule.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ComplianceSchedule> complianceScheduleList = complianceScheduleRepository.findAll();
        assertThat(complianceScheduleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComplianceSchedule.class);
        ComplianceSchedule complianceSchedule1 = new ComplianceSchedule();
        complianceSchedule1.setId(1L);
        ComplianceSchedule complianceSchedule2 = new ComplianceSchedule();
        complianceSchedule2.setId(complianceSchedule1.getId());
        assertThat(complianceSchedule1).isEqualTo(complianceSchedule2);
        complianceSchedule2.setId(2L);
        assertThat(complianceSchedule1).isNotEqualTo(complianceSchedule2);
        complianceSchedule1.setId(null);
        assertThat(complianceSchedule1).isNotEqualTo(complianceSchedule2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComplianceScheduleDTO.class);
        ComplianceScheduleDTO complianceScheduleDTO1 = new ComplianceScheduleDTO();
        complianceScheduleDTO1.setId(1L);
        ComplianceScheduleDTO complianceScheduleDTO2 = new ComplianceScheduleDTO();
        assertThat(complianceScheduleDTO1).isNotEqualTo(complianceScheduleDTO2);
        complianceScheduleDTO2.setId(complianceScheduleDTO1.getId());
        assertThat(complianceScheduleDTO1).isEqualTo(complianceScheduleDTO2);
        complianceScheduleDTO2.setId(2L);
        assertThat(complianceScheduleDTO1).isNotEqualTo(complianceScheduleDTO2);
        complianceScheduleDTO1.setId(null);
        assertThat(complianceScheduleDTO1).isNotEqualTo(complianceScheduleDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(complianceScheduleMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(complianceScheduleMapper.fromId(null)).isNull();
    }
}

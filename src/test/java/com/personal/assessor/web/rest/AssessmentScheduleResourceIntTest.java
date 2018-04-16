package com.personal.assessor.web.rest;

import com.personal.assessor.AssessorApp;

import com.personal.assessor.domain.AssessmentSchedule;
import com.personal.assessor.repository.AssessmentScheduleRepository;
import com.personal.assessor.service.AssessmentScheduleService;
import com.personal.assessor.service.dto.AssessmentScheduleDTO;
import com.personal.assessor.service.mapper.AssessmentScheduleMapper;
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
 * Test class for the AssessmentScheduleResource REST controller.
 *
 * @see AssessmentScheduleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AssessorApp.class)
public class AssessmentScheduleResourceIntTest {

    private static final ZonedDateTime DEFAULT_FROM_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FROM_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_TO_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TO_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_DESCRIPTION_AR = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION_AR = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION_EN = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION_EN = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_MODIFIED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private AssessmentScheduleRepository assessmentScheduleRepository;

    @Autowired
    private AssessmentScheduleMapper assessmentScheduleMapper;

    @Autowired
    private AssessmentScheduleService assessmentScheduleService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAssessmentScheduleMockMvc;

    private AssessmentSchedule assessmentSchedule;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AssessmentScheduleResource assessmentScheduleResource = new AssessmentScheduleResource(assessmentScheduleService);
        this.restAssessmentScheduleMockMvc = MockMvcBuilders.standaloneSetup(assessmentScheduleResource)
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
    public static AssessmentSchedule createEntity(EntityManager em) {
        AssessmentSchedule assessmentSchedule = new AssessmentSchedule()
            .fromDate(DEFAULT_FROM_DATE)
            .toDate(DEFAULT_TO_DATE)
            .descriptionAr(DEFAULT_DESCRIPTION_AR)
            .descriptionEn(DEFAULT_DESCRIPTION_EN)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .modifiedBy(DEFAULT_MODIFIED_BY);
        return assessmentSchedule;
    }

    @Before
    public void initTest() {
        assessmentSchedule = createEntity(em);
    }

    @Test
    @Transactional
    public void createAssessmentSchedule() throws Exception {
        int databaseSizeBeforeCreate = assessmentScheduleRepository.findAll().size();

        // Create the AssessmentSchedule
        AssessmentScheduleDTO assessmentScheduleDTO = assessmentScheduleMapper.toDto(assessmentSchedule);
        restAssessmentScheduleMockMvc.perform(post("/api/assessment-schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assessmentScheduleDTO)))
            .andExpect(status().isCreated());

        // Validate the AssessmentSchedule in the database
        List<AssessmentSchedule> assessmentScheduleList = assessmentScheduleRepository.findAll();
        assertThat(assessmentScheduleList).hasSize(databaseSizeBeforeCreate + 1);
        AssessmentSchedule testAssessmentSchedule = assessmentScheduleList.get(assessmentScheduleList.size() - 1);
        assertThat(testAssessmentSchedule.getFromDate()).isEqualTo(DEFAULT_FROM_DATE);
        assertThat(testAssessmentSchedule.getToDate()).isEqualTo(DEFAULT_TO_DATE);
        assertThat(testAssessmentSchedule.getDescriptionAr()).isEqualTo(DEFAULT_DESCRIPTION_AR);
        assertThat(testAssessmentSchedule.getDescriptionEn()).isEqualTo(DEFAULT_DESCRIPTION_EN);
        assertThat(testAssessmentSchedule.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testAssessmentSchedule.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testAssessmentSchedule.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testAssessmentSchedule.getModifiedBy()).isEqualTo(DEFAULT_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void createAssessmentScheduleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = assessmentScheduleRepository.findAll().size();

        // Create the AssessmentSchedule with an existing ID
        assessmentSchedule.setId(1L);
        AssessmentScheduleDTO assessmentScheduleDTO = assessmentScheduleMapper.toDto(assessmentSchedule);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssessmentScheduleMockMvc.perform(post("/api/assessment-schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assessmentScheduleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AssessmentSchedule in the database
        List<AssessmentSchedule> assessmentScheduleList = assessmentScheduleRepository.findAll();
        assertThat(assessmentScheduleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAssessmentSchedules() throws Exception {
        // Initialize the database
        assessmentScheduleRepository.saveAndFlush(assessmentSchedule);

        // Get all the assessmentScheduleList
        restAssessmentScheduleMockMvc.perform(get("/api/assessment-schedules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(assessmentSchedule.getId().intValue())))
            .andExpect(jsonPath("$.[*].fromDate").value(hasItem(sameInstant(DEFAULT_FROM_DATE))))
            .andExpect(jsonPath("$.[*].toDate").value(hasItem(sameInstant(DEFAULT_TO_DATE))))
            .andExpect(jsonPath("$.[*].descriptionAr").value(hasItem(DEFAULT_DESCRIPTION_AR.toString())))
            .andExpect(jsonPath("$.[*].descriptionEn").value(hasItem(DEFAULT_DESCRIPTION_EN.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedBy").value(hasItem(DEFAULT_MODIFIED_BY.toString())));
    }

    @Test
    @Transactional
    public void getAssessmentSchedule() throws Exception {
        // Initialize the database
        assessmentScheduleRepository.saveAndFlush(assessmentSchedule);

        // Get the assessmentSchedule
        restAssessmentScheduleMockMvc.perform(get("/api/assessment-schedules/{id}", assessmentSchedule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(assessmentSchedule.getId().intValue()))
            .andExpect(jsonPath("$.fromDate").value(sameInstant(DEFAULT_FROM_DATE)))
            .andExpect(jsonPath("$.toDate").value(sameInstant(DEFAULT_TO_DATE)))
            .andExpect(jsonPath("$.descriptionAr").value(DEFAULT_DESCRIPTION_AR.toString()))
            .andExpect(jsonPath("$.descriptionEn").value(DEFAULT_DESCRIPTION_EN.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)))
            .andExpect(jsonPath("$.modifiedBy").value(DEFAULT_MODIFIED_BY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAssessmentSchedule() throws Exception {
        // Get the assessmentSchedule
        restAssessmentScheduleMockMvc.perform(get("/api/assessment-schedules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAssessmentSchedule() throws Exception {
        // Initialize the database
        assessmentScheduleRepository.saveAndFlush(assessmentSchedule);
        int databaseSizeBeforeUpdate = assessmentScheduleRepository.findAll().size();

        // Update the assessmentSchedule
        AssessmentSchedule updatedAssessmentSchedule = assessmentScheduleRepository.findOne(assessmentSchedule.getId());
        // Disconnect from session so that the updates on updatedAssessmentSchedule are not directly saved in db
        em.detach(updatedAssessmentSchedule);
        updatedAssessmentSchedule
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE)
            .descriptionAr(UPDATED_DESCRIPTION_AR)
            .descriptionEn(UPDATED_DESCRIPTION_EN)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .modifiedBy(UPDATED_MODIFIED_BY);
        AssessmentScheduleDTO assessmentScheduleDTO = assessmentScheduleMapper.toDto(updatedAssessmentSchedule);

        restAssessmentScheduleMockMvc.perform(put("/api/assessment-schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assessmentScheduleDTO)))
            .andExpect(status().isOk());

        // Validate the AssessmentSchedule in the database
        List<AssessmentSchedule> assessmentScheduleList = assessmentScheduleRepository.findAll();
        assertThat(assessmentScheduleList).hasSize(databaseSizeBeforeUpdate);
        AssessmentSchedule testAssessmentSchedule = assessmentScheduleList.get(assessmentScheduleList.size() - 1);
        assertThat(testAssessmentSchedule.getFromDate()).isEqualTo(UPDATED_FROM_DATE);
        assertThat(testAssessmentSchedule.getToDate()).isEqualTo(UPDATED_TO_DATE);
        assertThat(testAssessmentSchedule.getDescriptionAr()).isEqualTo(UPDATED_DESCRIPTION_AR);
        assertThat(testAssessmentSchedule.getDescriptionEn()).isEqualTo(UPDATED_DESCRIPTION_EN);
        assertThat(testAssessmentSchedule.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testAssessmentSchedule.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testAssessmentSchedule.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testAssessmentSchedule.getModifiedBy()).isEqualTo(UPDATED_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingAssessmentSchedule() throws Exception {
        int databaseSizeBeforeUpdate = assessmentScheduleRepository.findAll().size();

        // Create the AssessmentSchedule
        AssessmentScheduleDTO assessmentScheduleDTO = assessmentScheduleMapper.toDto(assessmentSchedule);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAssessmentScheduleMockMvc.perform(put("/api/assessment-schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assessmentScheduleDTO)))
            .andExpect(status().isCreated());

        // Validate the AssessmentSchedule in the database
        List<AssessmentSchedule> assessmentScheduleList = assessmentScheduleRepository.findAll();
        assertThat(assessmentScheduleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAssessmentSchedule() throws Exception {
        // Initialize the database
        assessmentScheduleRepository.saveAndFlush(assessmentSchedule);
        int databaseSizeBeforeDelete = assessmentScheduleRepository.findAll().size();

        // Get the assessmentSchedule
        restAssessmentScheduleMockMvc.perform(delete("/api/assessment-schedules/{id}", assessmentSchedule.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AssessmentSchedule> assessmentScheduleList = assessmentScheduleRepository.findAll();
        assertThat(assessmentScheduleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssessmentSchedule.class);
        AssessmentSchedule assessmentSchedule1 = new AssessmentSchedule();
        assessmentSchedule1.setId(1L);
        AssessmentSchedule assessmentSchedule2 = new AssessmentSchedule();
        assessmentSchedule2.setId(assessmentSchedule1.getId());
        assertThat(assessmentSchedule1).isEqualTo(assessmentSchedule2);
        assessmentSchedule2.setId(2L);
        assertThat(assessmentSchedule1).isNotEqualTo(assessmentSchedule2);
        assessmentSchedule1.setId(null);
        assertThat(assessmentSchedule1).isNotEqualTo(assessmentSchedule2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssessmentScheduleDTO.class);
        AssessmentScheduleDTO assessmentScheduleDTO1 = new AssessmentScheduleDTO();
        assessmentScheduleDTO1.setId(1L);
        AssessmentScheduleDTO assessmentScheduleDTO2 = new AssessmentScheduleDTO();
        assertThat(assessmentScheduleDTO1).isNotEqualTo(assessmentScheduleDTO2);
        assessmentScheduleDTO2.setId(assessmentScheduleDTO1.getId());
        assertThat(assessmentScheduleDTO1).isEqualTo(assessmentScheduleDTO2);
        assessmentScheduleDTO2.setId(2L);
        assertThat(assessmentScheduleDTO1).isNotEqualTo(assessmentScheduleDTO2);
        assessmentScheduleDTO1.setId(null);
        assertThat(assessmentScheduleDTO1).isNotEqualTo(assessmentScheduleDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(assessmentScheduleMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(assessmentScheduleMapper.fromId(null)).isNull();
    }
}

package com.personal.assessor.web.rest;

import com.personal.assessor.AssessorApp;

import com.personal.assessor.domain.ControlPriority;
import com.personal.assessor.repository.ControlPriorityRepository;
import com.personal.assessor.service.ControlPriorityService;
import com.personal.assessor.service.dto.ControlPriorityDTO;
import com.personal.assessor.service.mapper.ControlPriorityMapper;
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
 * Test class for the ControlPriorityResource REST controller.
 *
 * @see ControlPriorityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AssessorApp.class)
public class ControlPriorityResourceIntTest {

    private static final String DEFAULT_NAME_AR = "AAAAAAAAAA";
    private static final String UPDATED_NAME_AR = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_EN = "AAAAAAAAAA";
    private static final String UPDATED_NAME_EN = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final Integer DEFAULT_ORDER = 1;
    private static final Integer UPDATED_ORDER = 2;

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_MODIFIED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private ControlPriorityRepository controlPriorityRepository;

    @Autowired
    private ControlPriorityMapper controlPriorityMapper;

    @Autowired
    private ControlPriorityService controlPriorityService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restControlPriorityMockMvc;

    private ControlPriority controlPriority;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ControlPriorityResource controlPriorityResource = new ControlPriorityResource(controlPriorityService);
        this.restControlPriorityMockMvc = MockMvcBuilders.standaloneSetup(controlPriorityResource)
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
    public static ControlPriority createEntity(EntityManager em) {
        ControlPriority controlPriority = new ControlPriority()
            .nameAr(DEFAULT_NAME_AR)
            .nameEn(DEFAULT_NAME_EN)
            .code(DEFAULT_CODE)
            .order(DEFAULT_ORDER)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .modifiedBy(DEFAULT_MODIFIED_BY);
        return controlPriority;
    }

    @Before
    public void initTest() {
        controlPriority = createEntity(em);
    }

    @Test
    @Transactional
    public void createControlPriority() throws Exception {
        int databaseSizeBeforeCreate = controlPriorityRepository.findAll().size();

        // Create the ControlPriority
        ControlPriorityDTO controlPriorityDTO = controlPriorityMapper.toDto(controlPriority);
        restControlPriorityMockMvc.perform(post("/api/control-priorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(controlPriorityDTO)))
            .andExpect(status().isCreated());

        // Validate the ControlPriority in the database
        List<ControlPriority> controlPriorityList = controlPriorityRepository.findAll();
        assertThat(controlPriorityList).hasSize(databaseSizeBeforeCreate + 1);
        ControlPriority testControlPriority = controlPriorityList.get(controlPriorityList.size() - 1);
        assertThat(testControlPriority.getNameAr()).isEqualTo(DEFAULT_NAME_AR);
        assertThat(testControlPriority.getNameEn()).isEqualTo(DEFAULT_NAME_EN);
        assertThat(testControlPriority.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testControlPriority.getOrder()).isEqualTo(DEFAULT_ORDER);
        assertThat(testControlPriority.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testControlPriority.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testControlPriority.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testControlPriority.getModifiedBy()).isEqualTo(DEFAULT_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void createControlPriorityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = controlPriorityRepository.findAll().size();

        // Create the ControlPriority with an existing ID
        controlPriority.setId(1L);
        ControlPriorityDTO controlPriorityDTO = controlPriorityMapper.toDto(controlPriority);

        // An entity with an existing ID cannot be created, so this API call must fail
        restControlPriorityMockMvc.perform(post("/api/control-priorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(controlPriorityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ControlPriority in the database
        List<ControlPriority> controlPriorityList = controlPriorityRepository.findAll();
        assertThat(controlPriorityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameArIsRequired() throws Exception {
        int databaseSizeBeforeTest = controlPriorityRepository.findAll().size();
        // set the field null
        controlPriority.setNameAr(null);

        // Create the ControlPriority, which fails.
        ControlPriorityDTO controlPriorityDTO = controlPriorityMapper.toDto(controlPriority);

        restControlPriorityMockMvc.perform(post("/api/control-priorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(controlPriorityDTO)))
            .andExpect(status().isBadRequest());

        List<ControlPriority> controlPriorityList = controlPriorityRepository.findAll();
        assertThat(controlPriorityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameEnIsRequired() throws Exception {
        int databaseSizeBeforeTest = controlPriorityRepository.findAll().size();
        // set the field null
        controlPriority.setNameEn(null);

        // Create the ControlPriority, which fails.
        ControlPriorityDTO controlPriorityDTO = controlPriorityMapper.toDto(controlPriority);

        restControlPriorityMockMvc.perform(post("/api/control-priorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(controlPriorityDTO)))
            .andExpect(status().isBadRequest());

        List<ControlPriority> controlPriorityList = controlPriorityRepository.findAll();
        assertThat(controlPriorityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllControlPriorities() throws Exception {
        // Initialize the database
        controlPriorityRepository.saveAndFlush(controlPriority);

        // Get all the controlPriorityList
        restControlPriorityMockMvc.perform(get("/api/control-priorities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(controlPriority.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameAr").value(hasItem(DEFAULT_NAME_AR.toString())))
            .andExpect(jsonPath("$.[*].nameEn").value(hasItem(DEFAULT_NAME_EN.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].order").value(hasItem(DEFAULT_ORDER)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedBy").value(hasItem(DEFAULT_MODIFIED_BY.toString())));
    }

    @Test
    @Transactional
    public void getControlPriority() throws Exception {
        // Initialize the database
        controlPriorityRepository.saveAndFlush(controlPriority);

        // Get the controlPriority
        restControlPriorityMockMvc.perform(get("/api/control-priorities/{id}", controlPriority.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(controlPriority.getId().intValue()))
            .andExpect(jsonPath("$.nameAr").value(DEFAULT_NAME_AR.toString()))
            .andExpect(jsonPath("$.nameEn").value(DEFAULT_NAME_EN.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.order").value(DEFAULT_ORDER))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)))
            .andExpect(jsonPath("$.modifiedBy").value(DEFAULT_MODIFIED_BY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingControlPriority() throws Exception {
        // Get the controlPriority
        restControlPriorityMockMvc.perform(get("/api/control-priorities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateControlPriority() throws Exception {
        // Initialize the database
        controlPriorityRepository.saveAndFlush(controlPriority);
        int databaseSizeBeforeUpdate = controlPriorityRepository.findAll().size();

        // Update the controlPriority
        ControlPriority updatedControlPriority = controlPriorityRepository.findOne(controlPriority.getId());
        // Disconnect from session so that the updates on updatedControlPriority are not directly saved in db
        em.detach(updatedControlPriority);
        updatedControlPriority
            .nameAr(UPDATED_NAME_AR)
            .nameEn(UPDATED_NAME_EN)
            .code(UPDATED_CODE)
            .order(UPDATED_ORDER)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .modifiedBy(UPDATED_MODIFIED_BY);
        ControlPriorityDTO controlPriorityDTO = controlPriorityMapper.toDto(updatedControlPriority);

        restControlPriorityMockMvc.perform(put("/api/control-priorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(controlPriorityDTO)))
            .andExpect(status().isOk());

        // Validate the ControlPriority in the database
        List<ControlPriority> controlPriorityList = controlPriorityRepository.findAll();
        assertThat(controlPriorityList).hasSize(databaseSizeBeforeUpdate);
        ControlPriority testControlPriority = controlPriorityList.get(controlPriorityList.size() - 1);
        assertThat(testControlPriority.getNameAr()).isEqualTo(UPDATED_NAME_AR);
        assertThat(testControlPriority.getNameEn()).isEqualTo(UPDATED_NAME_EN);
        assertThat(testControlPriority.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testControlPriority.getOrder()).isEqualTo(UPDATED_ORDER);
        assertThat(testControlPriority.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testControlPriority.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testControlPriority.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testControlPriority.getModifiedBy()).isEqualTo(UPDATED_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingControlPriority() throws Exception {
        int databaseSizeBeforeUpdate = controlPriorityRepository.findAll().size();

        // Create the ControlPriority
        ControlPriorityDTO controlPriorityDTO = controlPriorityMapper.toDto(controlPriority);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restControlPriorityMockMvc.perform(put("/api/control-priorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(controlPriorityDTO)))
            .andExpect(status().isCreated());

        // Validate the ControlPriority in the database
        List<ControlPriority> controlPriorityList = controlPriorityRepository.findAll();
        assertThat(controlPriorityList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteControlPriority() throws Exception {
        // Initialize the database
        controlPriorityRepository.saveAndFlush(controlPriority);
        int databaseSizeBeforeDelete = controlPriorityRepository.findAll().size();

        // Get the controlPriority
        restControlPriorityMockMvc.perform(delete("/api/control-priorities/{id}", controlPriority.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ControlPriority> controlPriorityList = controlPriorityRepository.findAll();
        assertThat(controlPriorityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ControlPriority.class);
        ControlPriority controlPriority1 = new ControlPriority();
        controlPriority1.setId(1L);
        ControlPriority controlPriority2 = new ControlPriority();
        controlPriority2.setId(controlPriority1.getId());
        assertThat(controlPriority1).isEqualTo(controlPriority2);
        controlPriority2.setId(2L);
        assertThat(controlPriority1).isNotEqualTo(controlPriority2);
        controlPriority1.setId(null);
        assertThat(controlPriority1).isNotEqualTo(controlPriority2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ControlPriorityDTO.class);
        ControlPriorityDTO controlPriorityDTO1 = new ControlPriorityDTO();
        controlPriorityDTO1.setId(1L);
        ControlPriorityDTO controlPriorityDTO2 = new ControlPriorityDTO();
        assertThat(controlPriorityDTO1).isNotEqualTo(controlPriorityDTO2);
        controlPriorityDTO2.setId(controlPriorityDTO1.getId());
        assertThat(controlPriorityDTO1).isEqualTo(controlPriorityDTO2);
        controlPriorityDTO2.setId(2L);
        assertThat(controlPriorityDTO1).isNotEqualTo(controlPriorityDTO2);
        controlPriorityDTO1.setId(null);
        assertThat(controlPriorityDTO1).isNotEqualTo(controlPriorityDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(controlPriorityMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(controlPriorityMapper.fromId(null)).isNull();
    }
}

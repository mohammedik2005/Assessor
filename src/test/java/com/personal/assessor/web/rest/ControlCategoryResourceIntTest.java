package com.personal.assessor.web.rest;

import com.personal.assessor.AssessorApp;

import com.personal.assessor.domain.ControlCategory;
import com.personal.assessor.repository.ControlCategoryRepository;
import com.personal.assessor.service.ControlCategoryService;
import com.personal.assessor.service.dto.ControlCategoryDTO;
import com.personal.assessor.service.mapper.ControlCategoryMapper;
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
 * Test class for the ControlCategoryResource REST controller.
 *
 * @see ControlCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AssessorApp.class)
public class ControlCategoryResourceIntTest {

    private static final String DEFAULT_CATEGORY_AR = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY_AR = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORY_EN = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY_EN = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_MODIFIED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private ControlCategoryRepository controlCategoryRepository;

    @Autowired
    private ControlCategoryMapper controlCategoryMapper;

    @Autowired
    private ControlCategoryService controlCategoryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restControlCategoryMockMvc;

    private ControlCategory controlCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ControlCategoryResource controlCategoryResource = new ControlCategoryResource(controlCategoryService);
        this.restControlCategoryMockMvc = MockMvcBuilders.standaloneSetup(controlCategoryResource)
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
    public static ControlCategory createEntity(EntityManager em) {
        ControlCategory controlCategory = new ControlCategory()
            .categoryAr(DEFAULT_CATEGORY_AR)
            .categoryEn(DEFAULT_CATEGORY_EN)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .modifiedBy(DEFAULT_MODIFIED_BY);
        return controlCategory;
    }

    @Before
    public void initTest() {
        controlCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createControlCategory() throws Exception {
        int databaseSizeBeforeCreate = controlCategoryRepository.findAll().size();

        // Create the ControlCategory
        ControlCategoryDTO controlCategoryDTO = controlCategoryMapper.toDto(controlCategory);
        restControlCategoryMockMvc.perform(post("/api/control-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(controlCategoryDTO)))
            .andExpect(status().isCreated());

        // Validate the ControlCategory in the database
        List<ControlCategory> controlCategoryList = controlCategoryRepository.findAll();
        assertThat(controlCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        ControlCategory testControlCategory = controlCategoryList.get(controlCategoryList.size() - 1);
        assertThat(testControlCategory.getCategoryAr()).isEqualTo(DEFAULT_CATEGORY_AR);
        assertThat(testControlCategory.getCategoryEn()).isEqualTo(DEFAULT_CATEGORY_EN);
        assertThat(testControlCategory.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testControlCategory.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testControlCategory.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testControlCategory.getModifiedBy()).isEqualTo(DEFAULT_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void createControlCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = controlCategoryRepository.findAll().size();

        // Create the ControlCategory with an existing ID
        controlCategory.setId(1L);
        ControlCategoryDTO controlCategoryDTO = controlCategoryMapper.toDto(controlCategory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restControlCategoryMockMvc.perform(post("/api/control-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(controlCategoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ControlCategory in the database
        List<ControlCategory> controlCategoryList = controlCategoryRepository.findAll();
        assertThat(controlCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCategoryArIsRequired() throws Exception {
        int databaseSizeBeforeTest = controlCategoryRepository.findAll().size();
        // set the field null
        controlCategory.setCategoryAr(null);

        // Create the ControlCategory, which fails.
        ControlCategoryDTO controlCategoryDTO = controlCategoryMapper.toDto(controlCategory);

        restControlCategoryMockMvc.perform(post("/api/control-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(controlCategoryDTO)))
            .andExpect(status().isBadRequest());

        List<ControlCategory> controlCategoryList = controlCategoryRepository.findAll();
        assertThat(controlCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCategoryEnIsRequired() throws Exception {
        int databaseSizeBeforeTest = controlCategoryRepository.findAll().size();
        // set the field null
        controlCategory.setCategoryEn(null);

        // Create the ControlCategory, which fails.
        ControlCategoryDTO controlCategoryDTO = controlCategoryMapper.toDto(controlCategory);

        restControlCategoryMockMvc.perform(post("/api/control-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(controlCategoryDTO)))
            .andExpect(status().isBadRequest());

        List<ControlCategory> controlCategoryList = controlCategoryRepository.findAll();
        assertThat(controlCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllControlCategories() throws Exception {
        // Initialize the database
        controlCategoryRepository.saveAndFlush(controlCategory);

        // Get all the controlCategoryList
        restControlCategoryMockMvc.perform(get("/api/control-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(controlCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].categoryAr").value(hasItem(DEFAULT_CATEGORY_AR.toString())))
            .andExpect(jsonPath("$.[*].categoryEn").value(hasItem(DEFAULT_CATEGORY_EN.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedBy").value(hasItem(DEFAULT_MODIFIED_BY.toString())));
    }

    @Test
    @Transactional
    public void getControlCategory() throws Exception {
        // Initialize the database
        controlCategoryRepository.saveAndFlush(controlCategory);

        // Get the controlCategory
        restControlCategoryMockMvc.perform(get("/api/control-categories/{id}", controlCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(controlCategory.getId().intValue()))
            .andExpect(jsonPath("$.categoryAr").value(DEFAULT_CATEGORY_AR.toString()))
            .andExpect(jsonPath("$.categoryEn").value(DEFAULT_CATEGORY_EN.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)))
            .andExpect(jsonPath("$.modifiedBy").value(DEFAULT_MODIFIED_BY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingControlCategory() throws Exception {
        // Get the controlCategory
        restControlCategoryMockMvc.perform(get("/api/control-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateControlCategory() throws Exception {
        // Initialize the database
        controlCategoryRepository.saveAndFlush(controlCategory);
        int databaseSizeBeforeUpdate = controlCategoryRepository.findAll().size();

        // Update the controlCategory
        ControlCategory updatedControlCategory = controlCategoryRepository.findOne(controlCategory.getId());
        // Disconnect from session so that the updates on updatedControlCategory are not directly saved in db
        em.detach(updatedControlCategory);
        updatedControlCategory
            .categoryAr(UPDATED_CATEGORY_AR)
            .categoryEn(UPDATED_CATEGORY_EN)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .modifiedBy(UPDATED_MODIFIED_BY);
        ControlCategoryDTO controlCategoryDTO = controlCategoryMapper.toDto(updatedControlCategory);

        restControlCategoryMockMvc.perform(put("/api/control-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(controlCategoryDTO)))
            .andExpect(status().isOk());

        // Validate the ControlCategory in the database
        List<ControlCategory> controlCategoryList = controlCategoryRepository.findAll();
        assertThat(controlCategoryList).hasSize(databaseSizeBeforeUpdate);
        ControlCategory testControlCategory = controlCategoryList.get(controlCategoryList.size() - 1);
        assertThat(testControlCategory.getCategoryAr()).isEqualTo(UPDATED_CATEGORY_AR);
        assertThat(testControlCategory.getCategoryEn()).isEqualTo(UPDATED_CATEGORY_EN);
        assertThat(testControlCategory.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testControlCategory.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testControlCategory.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testControlCategory.getModifiedBy()).isEqualTo(UPDATED_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingControlCategory() throws Exception {
        int databaseSizeBeforeUpdate = controlCategoryRepository.findAll().size();

        // Create the ControlCategory
        ControlCategoryDTO controlCategoryDTO = controlCategoryMapper.toDto(controlCategory);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restControlCategoryMockMvc.perform(put("/api/control-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(controlCategoryDTO)))
            .andExpect(status().isCreated());

        // Validate the ControlCategory in the database
        List<ControlCategory> controlCategoryList = controlCategoryRepository.findAll();
        assertThat(controlCategoryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteControlCategory() throws Exception {
        // Initialize the database
        controlCategoryRepository.saveAndFlush(controlCategory);
        int databaseSizeBeforeDelete = controlCategoryRepository.findAll().size();

        // Get the controlCategory
        restControlCategoryMockMvc.perform(delete("/api/control-categories/{id}", controlCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ControlCategory> controlCategoryList = controlCategoryRepository.findAll();
        assertThat(controlCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ControlCategory.class);
        ControlCategory controlCategory1 = new ControlCategory();
        controlCategory1.setId(1L);
        ControlCategory controlCategory2 = new ControlCategory();
        controlCategory2.setId(controlCategory1.getId());
        assertThat(controlCategory1).isEqualTo(controlCategory2);
        controlCategory2.setId(2L);
        assertThat(controlCategory1).isNotEqualTo(controlCategory2);
        controlCategory1.setId(null);
        assertThat(controlCategory1).isNotEqualTo(controlCategory2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ControlCategoryDTO.class);
        ControlCategoryDTO controlCategoryDTO1 = new ControlCategoryDTO();
        controlCategoryDTO1.setId(1L);
        ControlCategoryDTO controlCategoryDTO2 = new ControlCategoryDTO();
        assertThat(controlCategoryDTO1).isNotEqualTo(controlCategoryDTO2);
        controlCategoryDTO2.setId(controlCategoryDTO1.getId());
        assertThat(controlCategoryDTO1).isEqualTo(controlCategoryDTO2);
        controlCategoryDTO2.setId(2L);
        assertThat(controlCategoryDTO1).isNotEqualTo(controlCategoryDTO2);
        controlCategoryDTO1.setId(null);
        assertThat(controlCategoryDTO1).isNotEqualTo(controlCategoryDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(controlCategoryMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(controlCategoryMapper.fromId(null)).isNull();
    }
}

package com.personal.assessor.web.rest;

import com.personal.assessor.AssessorApp;

import com.personal.assessor.domain.Principles;
import com.personal.assessor.repository.PrinciplesRepository;
import com.personal.assessor.service.PrinciplesService;
import com.personal.assessor.service.dto.PrinciplesDTO;
import com.personal.assessor.service.mapper.PrinciplesMapper;
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
 * Test class for the PrinciplesResource REST controller.
 *
 * @see PrinciplesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AssessorApp.class)
public class PrinciplesResourceIntTest {

    private static final String DEFAULT_NAME_AR = "AAAAAAAAAA";
    private static final String UPDATED_NAME_AR = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_EN = "AAAAAAAAAA";
    private static final String UPDATED_NAME_EN = "BBBBBBBBBB";

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
    private PrinciplesRepository principlesRepository;

    @Autowired
    private PrinciplesMapper principlesMapper;

    @Autowired
    private PrinciplesService principlesService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPrinciplesMockMvc;

    private Principles principles;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrinciplesResource principlesResource = new PrinciplesResource(principlesService);
        this.restPrinciplesMockMvc = MockMvcBuilders.standaloneSetup(principlesResource)
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
    public static Principles createEntity(EntityManager em) {
        Principles principles = new Principles()
            .nameAr(DEFAULT_NAME_AR)
            .nameEn(DEFAULT_NAME_EN)
            .descriptionAr(DEFAULT_DESCRIPTION_AR)
            .descriptionEn(DEFAULT_DESCRIPTION_EN)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .modifiedBy(DEFAULT_MODIFIED_BY);
        return principles;
    }

    @Before
    public void initTest() {
        principles = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrinciples() throws Exception {
        int databaseSizeBeforeCreate = principlesRepository.findAll().size();

        // Create the Principles
        PrinciplesDTO principlesDTO = principlesMapper.toDto(principles);
        restPrinciplesMockMvc.perform(post("/api/principles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(principlesDTO)))
            .andExpect(status().isCreated());

        // Validate the Principles in the database
        List<Principles> principlesList = principlesRepository.findAll();
        assertThat(principlesList).hasSize(databaseSizeBeforeCreate + 1);
        Principles testPrinciples = principlesList.get(principlesList.size() - 1);
        assertThat(testPrinciples.getNameAr()).isEqualTo(DEFAULT_NAME_AR);
        assertThat(testPrinciples.getNameEn()).isEqualTo(DEFAULT_NAME_EN);
        assertThat(testPrinciples.getDescriptionAr()).isEqualTo(DEFAULT_DESCRIPTION_AR);
        assertThat(testPrinciples.getDescriptionEn()).isEqualTo(DEFAULT_DESCRIPTION_EN);
        assertThat(testPrinciples.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testPrinciples.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testPrinciples.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testPrinciples.getModifiedBy()).isEqualTo(DEFAULT_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void createPrinciplesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = principlesRepository.findAll().size();

        // Create the Principles with an existing ID
        principles.setId(1L);
        PrinciplesDTO principlesDTO = principlesMapper.toDto(principles);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrinciplesMockMvc.perform(post("/api/principles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(principlesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Principles in the database
        List<Principles> principlesList = principlesRepository.findAll();
        assertThat(principlesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameArIsRequired() throws Exception {
        int databaseSizeBeforeTest = principlesRepository.findAll().size();
        // set the field null
        principles.setNameAr(null);

        // Create the Principles, which fails.
        PrinciplesDTO principlesDTO = principlesMapper.toDto(principles);

        restPrinciplesMockMvc.perform(post("/api/principles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(principlesDTO)))
            .andExpect(status().isBadRequest());

        List<Principles> principlesList = principlesRepository.findAll();
        assertThat(principlesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameEnIsRequired() throws Exception {
        int databaseSizeBeforeTest = principlesRepository.findAll().size();
        // set the field null
        principles.setNameEn(null);

        // Create the Principles, which fails.
        PrinciplesDTO principlesDTO = principlesMapper.toDto(principles);

        restPrinciplesMockMvc.perform(post("/api/principles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(principlesDTO)))
            .andExpect(status().isBadRequest());

        List<Principles> principlesList = principlesRepository.findAll();
        assertThat(principlesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPrinciples() throws Exception {
        // Initialize the database
        principlesRepository.saveAndFlush(principles);

        // Get all the principlesList
        restPrinciplesMockMvc.perform(get("/api/principles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(principles.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameAr").value(hasItem(DEFAULT_NAME_AR.toString())))
            .andExpect(jsonPath("$.[*].nameEn").value(hasItem(DEFAULT_NAME_EN.toString())))
            .andExpect(jsonPath("$.[*].descriptionAr").value(hasItem(DEFAULT_DESCRIPTION_AR.toString())))
            .andExpect(jsonPath("$.[*].descriptionEn").value(hasItem(DEFAULT_DESCRIPTION_EN.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedBy").value(hasItem(DEFAULT_MODIFIED_BY.toString())));
    }

    @Test
    @Transactional
    public void getPrinciples() throws Exception {
        // Initialize the database
        principlesRepository.saveAndFlush(principles);

        // Get the principles
        restPrinciplesMockMvc.perform(get("/api/principles/{id}", principles.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(principles.getId().intValue()))
            .andExpect(jsonPath("$.nameAr").value(DEFAULT_NAME_AR.toString()))
            .andExpect(jsonPath("$.nameEn").value(DEFAULT_NAME_EN.toString()))
            .andExpect(jsonPath("$.descriptionAr").value(DEFAULT_DESCRIPTION_AR.toString()))
            .andExpect(jsonPath("$.descriptionEn").value(DEFAULT_DESCRIPTION_EN.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)))
            .andExpect(jsonPath("$.modifiedBy").value(DEFAULT_MODIFIED_BY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPrinciples() throws Exception {
        // Get the principles
        restPrinciplesMockMvc.perform(get("/api/principles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrinciples() throws Exception {
        // Initialize the database
        principlesRepository.saveAndFlush(principles);
        int databaseSizeBeforeUpdate = principlesRepository.findAll().size();

        // Update the principles
        Principles updatedPrinciples = principlesRepository.findOne(principles.getId());
        // Disconnect from session so that the updates on updatedPrinciples are not directly saved in db
        em.detach(updatedPrinciples);
        updatedPrinciples
            .nameAr(UPDATED_NAME_AR)
            .nameEn(UPDATED_NAME_EN)
            .descriptionAr(UPDATED_DESCRIPTION_AR)
            .descriptionEn(UPDATED_DESCRIPTION_EN)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .modifiedBy(UPDATED_MODIFIED_BY);
        PrinciplesDTO principlesDTO = principlesMapper.toDto(updatedPrinciples);

        restPrinciplesMockMvc.perform(put("/api/principles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(principlesDTO)))
            .andExpect(status().isOk());

        // Validate the Principles in the database
        List<Principles> principlesList = principlesRepository.findAll();
        assertThat(principlesList).hasSize(databaseSizeBeforeUpdate);
        Principles testPrinciples = principlesList.get(principlesList.size() - 1);
        assertThat(testPrinciples.getNameAr()).isEqualTo(UPDATED_NAME_AR);
        assertThat(testPrinciples.getNameEn()).isEqualTo(UPDATED_NAME_EN);
        assertThat(testPrinciples.getDescriptionAr()).isEqualTo(UPDATED_DESCRIPTION_AR);
        assertThat(testPrinciples.getDescriptionEn()).isEqualTo(UPDATED_DESCRIPTION_EN);
        assertThat(testPrinciples.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testPrinciples.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testPrinciples.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testPrinciples.getModifiedBy()).isEqualTo(UPDATED_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingPrinciples() throws Exception {
        int databaseSizeBeforeUpdate = principlesRepository.findAll().size();

        // Create the Principles
        PrinciplesDTO principlesDTO = principlesMapper.toDto(principles);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPrinciplesMockMvc.perform(put("/api/principles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(principlesDTO)))
            .andExpect(status().isCreated());

        // Validate the Principles in the database
        List<Principles> principlesList = principlesRepository.findAll();
        assertThat(principlesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePrinciples() throws Exception {
        // Initialize the database
        principlesRepository.saveAndFlush(principles);
        int databaseSizeBeforeDelete = principlesRepository.findAll().size();

        // Get the principles
        restPrinciplesMockMvc.perform(delete("/api/principles/{id}", principles.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Principles> principlesList = principlesRepository.findAll();
        assertThat(principlesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Principles.class);
        Principles principles1 = new Principles();
        principles1.setId(1L);
        Principles principles2 = new Principles();
        principles2.setId(principles1.getId());
        assertThat(principles1).isEqualTo(principles2);
        principles2.setId(2L);
        assertThat(principles1).isNotEqualTo(principles2);
        principles1.setId(null);
        assertThat(principles1).isNotEqualTo(principles2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrinciplesDTO.class);
        PrinciplesDTO principlesDTO1 = new PrinciplesDTO();
        principlesDTO1.setId(1L);
        PrinciplesDTO principlesDTO2 = new PrinciplesDTO();
        assertThat(principlesDTO1).isNotEqualTo(principlesDTO2);
        principlesDTO2.setId(principlesDTO1.getId());
        assertThat(principlesDTO1).isEqualTo(principlesDTO2);
        principlesDTO2.setId(2L);
        assertThat(principlesDTO1).isNotEqualTo(principlesDTO2);
        principlesDTO1.setId(null);
        assertThat(principlesDTO1).isNotEqualTo(principlesDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(principlesMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(principlesMapper.fromId(null)).isNull();
    }
}

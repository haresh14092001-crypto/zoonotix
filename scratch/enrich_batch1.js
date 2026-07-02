// Batch 1: Bacterial Diseases
const newDataStr = `
  salmonellosis: {
    definition: "A widespread foodborne zoonosis causing acute gastroenteritis and sometimes systemic infection.",
    etiology: "Non-typhoidal Salmonella species (e.g., S. Typhimurium, S. Enteritidis).",
    taxonomy: "Family Enterobacteriaceae, Gram-negative facultative anaerobic bacilli.",
    vetImportance: "Causes clinical disease in livestock (enteritis, septicemia) and silent carriage in poultry/pigs.",
    publicHealthImportance: "Major cause of human foodborne outbreaks worldwide.",
    riskGroups: "Children, immunocompromised individuals, abattoir workers, and food handlers.",
    envSurvival: "Can survive for months in soil, water, and dried animal feces.",
    epidemiology: {
      source: "Contaminated food (eggs, poultry, meat) and water; direct contact with infected animals.",
      globalRelevance: "Ubiquitous global distribution with high economic impact."
    },
    pathogenesis: {
      entry: "Oral ingestion (fecal-oral route).",
      spread: "Invasion of intestinal mucosa (M cells) and multiplication in macrophages.",
      organs: ["Intestines", "Mesenteric lymph nodes"],
      lesions: "Fibrinonecrotic enteritis."
    },
    clinicalSigns: {
      animals: { acute: "Fever, foul-smelling diarrhea, dehydration.", chronic: "Unthriftiness, intermittent shedding.", subclinical: "Asymptomatic carrier state (very common)." },
      humans: { acute: "Nausea, vomiting, abdominal cramps, diarrhea, fever.", chronic: "Reactive arthritis (Reiter's syndrome).", subclinical: "Transient asymptomatic shedding." }
    },
    lesionsDesc: {
      gross: "Hyperemic intestinal mucosa with fibrinous exudate, enlarged mesenteric lymph nodes.",
      histopathology: "Mucosal necrosis with neutrophil and macrophage infiltration.",
      hallmark: "Fibrinonecrotic enteritis with button ulcers (in pigs with S. Choleraesuis)."
    },
    diagnosis: {
      history: "Consumption of raw/undercooked animal products; exposure to reptiles/poultry.",
      signs: "Acute febrile diarrhea.",
      samples: "Feces, blood, contaminated food, environmental swabs.",
      tests: [
        { test: "Bacterial Culture", type: "Microbiology", description: "Isolation on selective media (XLD, MacConkey) followed by serotyping." }
      ],
      differentials: [
        { disease: "Campylobacteriosis", keyDiff: "Differentiated by culture and morphology.", mistake: "Assuming all acute foodborne diarrhea is Salmonella." }
      ]
    },
    treatment: [
      { drug: "Supportive Fluid Therapy", purpose: "Rehydration", mechanism: "Electrolyte replacement", speciesNotes: "Primary treatment in most uncomplicated cases.", limitations: "Antibiotics contraindicated in mild human cases to prevent prolonged shedding.", resistance: "High MDR prevalence." },
      { drug: "Fluoroquinolones / Cephalosporins", purpose: "Bactericidal", mechanism: "Inhibit DNA gyrase / cell wall synthesis", speciesNotes: "Reserved for severe, systemic infections.", limitations: "Restricted use in food animals.", resistance: "Increasing resistance globally." }
    ],
    control: {
      farm: "All-in-all-out systems, rodent control, feed hygiene.",
      animal: "Vaccination of poultry flocks, competitive exclusion (probiotics).",
      human: "Thorough cooking of meat and eggs, handwashing after animal contact.",
      government: "Food safety standards, abattoir surveillance, pathogen reduction programs."
    },
    publicHealth: { economic: "Product recalls, healthcare costs, production losses.", foodSafety: "Strict hygiene and processing controls required.", wildlifeInterface: "Wild birds and reptiles can act as reservoirs." },
    onehealth: { human: "Foodborne illness from animal products.", animal: "Asymptomatic carriers maintain farm infection.", environment: "Effluent contamination of water sources." },
    references: ["WOAH Terrestrial Manual", "WHO Salmonella Fact Sheet"]
  },

  plague: {
    definition: "An acute, highly fatal zoonotic disease characterized by bubonic, septicemic, or pneumonic forms.",
    etiology: "Yersinia pestis.",
    taxonomy: "Family Yersiniaceae, Gram-negative, bipolar-staining coccobacillus.",
    vetImportance: "Causes high mortality in rodents and severe disease in cats; dogs are relatively resistant.",
    publicHealthImportance: "A severe disease with epidemic/pandemic potential and high case fatality.",
    riskGroups: "Hunters, veterinarians, individuals in endemic rural areas.",
    envSurvival: "Can survive in burrows, soil, and carcasses for weeks.",
    epidemiology: {
      source: "Flea bites (infected from rodents), direct contact with infected tissues, or inhalation.",
      globalRelevance: "Endemic in parts of Africa, Asia, and the Americas."
    },
    pathogenesis: {
      entry: "Flea bite (skin) or inhalation.",
      spread: "Lymphatic spread to regional nodes (buboes), followed by bacteremia.",
      organs: ["Lymph nodes", "Lungs", "Spleen"],
      lesions: "Hemorrhagic, necrotizing lymphadenitis and pneumonia."
    },
    clinicalSigns: {
      animals: { acute: "Severe lethargy, fever, enlarged lymph nodes (cats).", chronic: "Rare.", subclinical: "Dogs may seroconvert without overt signs." },
      humans: { acute: "Sudden onset fever, painful bubo, pneumonia.", chronic: "N/A", subclinical: "N/A" }
    },
    lesionsDesc: {
      gross: "Severely enlarged, hemorrhagic, and necrotic lymph nodes (buboes).",
      histopathology: "Massive extracellular bacterial proliferation with necrosis and hemorrhage.",
      hallmark: "Hemorrhagic bubo and bipolar staining bacteria."
    },
    diagnosis: {
      history: "Flea exposure, contact with rodents, or exposure to a sick cat in endemic areas.",
      signs: "Acute severe febrile illness with lymphadenopathy.",
      samples: "Bubo aspirate, blood, sputum.",
      tests: [
        { test: "Bacterial Culture & Smear", type: "Microbiology", description: "Bipolar 'safety pin' appearance with Wayson or Giemsa stain." },
        { test: "PCR", type: "Molecular", description: "Rapid detection of specific Y. pestis genes." }
      ],
      differentials: [
        { disease: "Tularemia", keyDiff: "Culture requirements and specific serology.", mistake: "Misdiagnosing bubonic plague as a generic abscess." }
      ]
    },
    treatment: [
      { drug: "Streptomycin / Gentamicin", purpose: "Bactericidal", mechanism: "Inhibits protein synthesis (30S ribosome)", speciesNotes: "Used in both humans and susceptible animals (cats).", limitations: "Must be started early.", resistance: "Rare but documented." }
    ],
    control: {
      farm: "Rodent and flea control.",
      animal: "Flea control for pets; isolation of suspect cats.",
      human: "PPE when handling suspect cases, avoid touching dead rodents.",
      government: "Endemic surveillance, vector control during outbreaks."
    },
    publicHealth: { economic: "Trade restrictions during outbreaks.", foodSafety: "Meat from infected animals must be condemned.", wildlifeInterface: "Maintained in wild rodent populations (sylvatic plague)." },
    onehealth: { human: "Bitten by fleas or exposure to pneumonic cat.", animal: "Wild rodents act as reservoir; domestic cats as bridge.", environment: "Rodent burrows harbor infected fleas." },
    references: ["CDC Plague Resources", "WOAH Terrestrial Manual"]
  },

  qfever: {
    definition: "A widespread zoonotic disease causing abortion in ruminants and a severe flu-like illness in humans.",
    etiology: "Coxiella burnetii.",
    taxonomy: "Order Legionellales, obligate intracellular Gram-negative pleomorphic bacterium.",
    vetImportance: "Major cause of late-term abortions, stillbirths, and weak offspring in sheep and goats.",
    publicHealthImportance: "Highly infectious (low infectious dose); severe occupational hazard.",
    riskGroups: "Veterinarians, farmers, abattoir workers, researchers.",
    envSurvival: "Spore-like variants are extremely resistant to heat, drying, and disinfectants; survives for years in dust.",
    epidemiology: {
      source: "Inhalation of contaminated aerosols from birth products, feces, and urine.",
      globalRelevance: "Worldwide distribution (except New Zealand)."
    },
    pathogenesis: {
      entry: "Inhalation (primarily) or ingestion.",
      spread: "Phagocytosed by alveolar macrophages, disseminates to reproductive tract and udder.",
      organs: ["Placenta", "Uterus", "Mammary glands", "Lungs"],
      lesions: "Placentitis."
    },
    clinicalSigns: {
      animals: { acute: "Abortion, stillbirth, retained placenta.", chronic: "Infertility.", subclinical: "Asymptomatic shedding in milk and feces." },
      humans: { acute: "High fever, severe headache, atypical pneumonia, hepatitis.", chronic: "Endocarditis, chronic fatigue.", subclinical: "Frequent asymptomatic seroconversion." }
    },
    lesionsDesc: {
      gross: "Thickened, leathery placenta with copious exudate.",
      histopathology: "Necrotizing placentitis with massive intracellular bacterial loads in trophoblasts.",
      hallmark: "Intercotyledonary placentitis."
    },
    diagnosis: {
      history: "Exposure to birthing ruminants or farm dust.",
      signs: "Abortion storms in small ruminants; atypical pneumonia in humans.",
      samples: "Placenta, vaginal discharges, aborted fetus, serum.",
      tests: [
        { test: "PCR", type: "Molecular", description: "Direct detection in clinical samples." },
        { test: "Serology (IFA, ELISA)", type: "Immunology", description: "Detects Phase I and Phase II antibodies." }
      ],
      differentials: [
        { disease: "Brucellosis / Chlamydiosis", keyDiff: "Specific PCR and serology; C. burnetii resists standard culture.", mistake: "Treating human cases as standard bacterial pneumonia." }
      ]
    },
    treatment: [
      { drug: "Doxycycline", purpose: "Bacteriostatic", mechanism: "Inhibits protein synthesis", speciesNotes: "Treatment of choice for humans; rarely used in livestock due to economics.", limitations: "Prolonged treatment required for chronic Q fever.", resistance: "Not typically a clinical issue." }
    ],
    control: {
      farm: "Safe disposal of birth products; strict hygiene during lambing/kidding.",
      animal: "Vaccination in highly endemic areas.",
      human: "Human vaccination available in some countries (e.g., Australia) for high-risk groups; pasteurize milk.",
      government: "Mandatory reporting, outbreak surveillance."
    },
    publicHealth: { economic: "Loss of offspring, workplace absences.", foodSafety: "Raw milk is a vehicle for transmission.", wildlifeInterface: "Ticks and wild mammals maintain sylvatic cycles." },
    onehealth: { human: "Inhalation of farm dust contaminated by birthing fluids.", animal: "Sheep and goats are primary amplifiers.", environment: "Windborne spread of resilient spore-like forms." },
    references: ["WOAH Q Fever Guidelines", "CDC Q Fever"]
  },

  listeriosis: {
    definition: "A serious foodborne zoonosis causing encephalitis, septicemia, and abortion.",
    etiology: "Listeria monocytogenes.",
    taxonomy: "Firmicutes, Gram-positive, non-spore-forming, motile, psychrotrophic bacillus.",
    vetImportance: "Causes 'circling disease' (encephalitis) and abortions, mainly in ruminants feeding on poor-quality silage.",
    publicHealthImportance: "High case fatality rate in humans; major concern for pregnant women and immunocompromised.",
    riskGroups: "Pregnant women, elderly, neonates, and immunocompromised.",
    envSurvival: "Ubiquitous in soil and water; multiplies at refrigeration temperatures (psychrotrophic).",
    epidemiology: {
      source: "Consumption of contaminated food (silage for animals, unpasteurized dairy/RTE meats for humans).",
      globalRelevance: "Global food safety threat."
    },
    pathogenesis: {
      entry: "Ingestion; in animals, can also enter via oral mucosal lesions.",
      spread: "Ascends trigeminal nerve to brainstem (animals) or translocates gut to systemic spread (humans).",
      organs: ["Brainstem", "Uterus", "Liver"],
      lesions: "Microabscesses in the brainstem."
    },
    clinicalSigns: {
      animals: { acute: "Circling, facial paralysis, head tilt, abortion.", chronic: "N/A", subclinical: "Fecal shedding." },
      humans: { acute: "Meningitis, septicemia, abortion/stillbirth.", chronic: "N/A", subclinical: "Mild gastroenteritis in healthy adults." }
    },
    lesionsDesc: {
      gross: "Often no gross lesions; sometimes opaque meninges or necrotic foci in liver of aborted fetuses.",
      histopathology: "Microabscesses and perivascular cuffing in the brainstem (medulla and pons).",
      hallmark: "Brainstem microabscesses."
    },
    diagnosis: {
      history: "Feeding spoiled silage (animals); consumption of RTE foods (humans).",
      signs: "Unilateral cranial nerve deficits (animals).",
      samples: "Brain tissue (medulla), CSF, blood, aborted fetus, placenta.",
      tests: [
        { test: "Bacterial Culture", type: "Microbiology", description: "Cold enrichment followed by isolation; exhibits tumbling motility." }
      ],
      differentials: [
        { disease: "Rabies / BSE / Pregnancy Toxemia", keyDiff: "Culture confirmation and response to early antibiotics.", mistake: "Misdiagnosing circling as metabolic disease." }
      ]
    },
    treatment: [
      { drug: "Ampicillin or Penicillin", purpose: "Bactericidal", mechanism: "Inhibits cell wall synthesis", speciesNotes: "Requires high doses to cross blood-brain barrier.", limitations: "Must be given early in the clinical course.", resistance: "Generally susceptible, but inherent resistance to cephalosporins." }
    ],
    control: {
      farm: "Proper ensiling processes (pH < 4.0 to inhibit Listeria).",
      animal: "Avoid feeding spoiled silage to pregnant animals.",
      human: "Avoid unpasteurized soft cheeses and deli meats during pregnancy.",
      government: "Zero tolerance policy in RTE foods in many countries."
    },
    publicHealth: { economic: "Massive food recalls.", foodSafety: "Post-processing contamination in cold chains.", wildlifeInterface: "Environmental saprophyte." },
    onehealth: { human: "Foodborne exposure from retail foods.", animal: "Silage-associated outbreaks.", environment: "Persistent in cold, damp environments." },
    references: ["WHO Listeriosis", "WOAH Terrestrial Manual"]
  },

  glanders: {
    definition: "A highly contagious, ancient, and often fatal bacterial disease primarily affecting equines.",
    etiology: "Burkholderia mallei.",
    taxonomy: "Betaproteobacteria, Gram-negative, non-motile obligate mammalian pathogen.",
    vetImportance: "Causes massive losses in equines; an OIE notifiable disease subject to strict eradication.",
    publicHealthImportance: "Highly fatal in humans; considered a potential biological weapon.",
    riskGroups: "Veterinarians, equine handlers, laboratory workers.",
    envSurvival: "Does not survive long outside the host; inactivated by sunlight and common disinfectants.",
    epidemiology: {
      source: "Direct contact with respiratory secretions, skin exudates from infected equines, or fomites.",
      globalRelevance: "Eradicated in many countries, but endemic in parts of Asia, Middle East, and South America."
    },
    pathogenesis: {
      entry: "Ingestion, inhalation, or skin abrasions.",
      spread: "Lymphatic and hematogenous dissemination.",
      organs: ["Lungs", "Skin", "Nasal mucosa", "Lymphatics"],
      lesions: "Pyogranulomatous nodules and ulcers."
    },
    clinicalSigns: {
      animals: { acute: "High fever, thick purulent nasal discharge, respiratory distress (Donkeys/Mules).", chronic: "Nasal ulcers, skin nodules (farcy), enlarged lymphatics (Horses).", subclinical: "Latent carriers exist." },
      humans: { acute: "Fever, localized abscess, pneumonia, septicemia.", chronic: "Multiple abscesses.", subclinical: "N/A" }
    },
    lesionsDesc: {
      gross: "Stellate (star-shaped) scars in the nasal septum, farcy pipes (thickened lymphatics), lung nodules.",
      histopathology: "Pyogranulomas with caseous necrosis and a halo of epithelioid cells.",
      hallmark: "Nasal septal ulcers and farcy cords."
    },
    diagnosis: {
      history: "Exposure to endemic areas, illegal equine movement.",
      signs: "Purulent nasal discharge with skin nodules.",
      samples: "Swabs from lesions, blood for serology.",
      tests: [
        { test: "Mallein Test", type: "Allergic", description: "Intrapalpebral injection causing swelling (OIE prescribed test for trade)." },
        { test: "Complement Fixation Test (CFT)", type: "Serology", description: "Standard test for international trade." }
      ],
      differentials: [
        { disease: "Strangles / Melioidosis / Epizootic Lymphangitis", keyDiff: "Mallein test and CFT specificity.", mistake: "Confusing with Strangles, delaying culling." }
      ]
    },
    treatment: [
      { drug: "Culling (Animals)", purpose: "Eradication", mechanism: "N/A", speciesNotes: "Treatment of animals is strictly prohibited in most countries to prevent carrier states.", limitations: "N/A", resistance: "N/A" },
      { drug: "Ceftazidime / Imipenem (Humans)", purpose: "Bactericidal", mechanism: "Inhibits cell wall synthesis", speciesNotes: "Prolonged intensive therapy required for humans.", limitations: "High mortality even with treatment.", resistance: "Intrinsic resistance to many antibiotics." }
    ],
    control: {
      farm: "Strict quarantine, testing, and humane destruction of positive animals.",
      animal: "No vaccine available.",
      human: "Biosafety Level 3 precautions for lab workers; PPE for vets.",
      government: "Strict border control, mandatory test and slaughter policies."
    },
    publicHealth: { economic: "Severe restrictions on international equine trade and equestrian sports.", foodSafety: "N/A", wildlifeInterface: "N/A" },
    onehealth: { human: "Occupational exposure to infected equines.", animal: "Maintained in horse, donkey, and mule populations.", environment: "Shared water troughs act as fomites." },
    references: ["WOAH Glanders Manual", "CDC Burkholderia"]
  },

  campylobacteriosis: {
    definition: "A major bacterial cause of human acute diarrheal illness, often associated with poultry.",
    etiology: "Campylobacter jejuni, C. coli.",
    taxonomy: "Campylobacterota, Gram-negative, microaerophilic, spirally curved bacteria.",
    vetImportance: "Often asymptomatic commensals in poultry; C. fetus causes abortion in ruminants.",
    publicHealthImportance: "Leading cause of bacterial foodborne gastroenteritis worldwide.",
    riskGroups: "General population, children, young adults.",
    envSurvival: "Fragile in the environment; sensitive to drying, oxygen, and heat.",
    epidemiology: {
      source: "Raw/undercooked poultry, unpasteurized milk, contaminated water.",
      globalRelevance: "Hyperendemic globally."
    },
    pathogenesis: {
      entry: "Oral ingestion.",
      spread: "Colonization of the distal ileum and colon, epithelial invasion.",
      organs: ["Intestines"],
      lesions: "Acute enteritis."
    },
    clinicalSigns: {
      animals: { acute: "Usually asymptomatic in poultry. Enteritis in young dogs/cats.", chronic: "N/A", subclinical: "High prevalence of asymptomatic carriage in poultry guts." },
      humans: { acute: "Watery/bloody diarrhea, abdominal cramping, fever.", chronic: "Guillain-Barré syndrome (autoimmune demyelination).", subclinical: "Occasional asymptomatic infection." }
    },
    lesionsDesc: {
      gross: "Edematous and hyperemic intestinal mucosa.",
      histopathology: "Mucosal inflammation, crypt abscesses, ulceration.",
      hallmark: "Seagull-shaped bacteria in fecal smears."
    },
    diagnosis: {
      history: "Consumption of undercooked chicken.",
      signs: "Acute abdominal pain mimicking appendicitis, with diarrhea.",
      samples: "Feces.",
      tests: [
        { test: "Microaerophilic Culture", type: "Microbiology", description: "Requires specialized conditions (42°C, reduced O2) and selective media (e.g., Skirrow's)." },
        { test: "PCR", type: "Molecular", description: "Culture-independent diagnostic test on stool." }
      ],
      differentials: [
        { disease: "Salmonellosis", keyDiff: "Culture conditions and morphological appearance.", mistake: "Misdiagnosing due to failure to use microaerophilic culture." }
      ]
    },
    treatment: [
      { drug: "Macrolides (Azithromycin)", purpose: "Bacteriostatic/cidal", mechanism: "Inhibits 50S ribosome", speciesNotes: "Treatment of choice for severe human cases.", limitations: "Self-limiting in most cases; antibiotics often unnecessary.", resistance: "Increasing resistance to fluoroquinolones." }
    ],
    control: {
      farm: "Biosecurity on poultry farms, fly control, clean drinking water.",
      animal: "Difficult to eliminate from poultry flocks.",
      human: "Kitchen hygiene, avoiding cross-contamination, thorough cooking.",
      government: "Abattoir hygiene improvements."
    },
    publicHealth: { economic: "Significant healthcare burden due to incidence volume.", foodSafety: "Cross-contamination in kitchens is a primary driver.", wildlifeInterface: "Wild birds carry the bacteria." },
    onehealth: { human: "Foodborne acquisition.", animal: "Avian intestinal tract acts as the natural reservoir.", environment: "Water contamination from farm runoff." },
    references: ["WHO Campylobacter", "OIE Terrestrial Manual"]
  },

  pasteurellosis: {
    definition: "A complex of respiratory and septicemic diseases caused by Pasteurella species.",
    etiology: "Pasteurella multocida.",
    taxonomy: "Pasteurellaceae, Gram-negative, non-motile coccobacillus.",
    vetImportance: "Causes Hemorrhagic Septicemia (HS) in cattle/buffalo, Fowl Cholera in poultry, and snuffles in rabbits.",
    publicHealthImportance: "Common cause of wound infections following animal bites.",
    riskGroups: "Veterinarians, pet owners, animal handlers.",
    envSurvival: "Poor survival outside the host; requires direct contact.",
    epidemiology: {
      source: "Animal bites/scratches (especially cats and dogs); inhalation in animal flocks.",
      globalRelevance: "HS is endemic in Asia/Africa; bite infections are global."
    },
    pathogenesis: {
      entry: "Skin bite wounds (humans); inhalation/ingestion (animals).",
      spread: "Rapid multiplication in wounds or respiratory tract leading to septicemia.",
      organs: ["Skin (wounds)", "Lungs", "Systemic"],
      lesions: "Suppurative inflammation, pneumonia, widespread hemorrhages."
    },
    clinicalSigns: {
      animals: { acute: "High fever, salivation, submandibular edema, acute death (HS).", chronic: "Chronic respiratory distress.", subclinical: "Upper respiratory tract commensal." },
      humans: { acute: "Rapid onset cellulitis, pain, and swelling at bite site.", chronic: "Osteomyelitis (if bone is penetrated).", subclinical: "N/A" }
    },
    lesionsDesc: {
      gross: "Extensive subcutaneous edema (brisket region in bovines), petechial hemorrhages.",
      histopathology: "Fibrinous bronchopneumonia, severe vascular congestion.",
      hallmark: "Rapid spreading cellulitis (humans) / Submandibular edema (cattle)."
    },
    diagnosis: {
      history: "Recent cat or dog bite (humans); sudden death in cattle during monsoons (HS).",
      signs: "Rapid localized inflammation (humans).",
      samples: "Swabs from bite wounds, blood, lung tissue.",
      tests: [
        { test: "Bacterial Culture", type: "Microbiology", description: "Grows well on blood agar, exhibits sweet/musty odor." }
      ],
      differentials: [
        { disease: "Staph/Strep infection / Anthrax (in cattle)", keyDiff: "Onset speed (P. multocida is extremely fast) and culture.", mistake: "Delaying antibiotics for cat bites." }
      ]
    },
    treatment: [
      { drug: "Amoxicillin-Clavulanate", purpose: "Bactericidal", mechanism: "Inhibits cell wall synthesis; beta-lactamase inhibitor", speciesNotes: "First-line empirical treatment for animal bites in humans.", limitations: "Must clean wound thoroughly.", resistance: "Generally susceptible, but beta-lactamase production occurs." }
    ],
    control: {
      farm: "Prophylactic vaccination of cattle/buffalo against HS before monsoons.",
      animal: "Reduce stress during transport.",
      human: "Prompt, thorough washing of animal bite wounds; prophylactic antibiotics.",
      government: "Mass vaccination campaigns for livestock."
    },
    publicHealth: { economic: "HS causes massive acute livestock losses in developing nations.", foodSafety: "N/A", wildlifeInterface: "Fowl cholera affects wild waterfowl." },
    onehealth: { human: "Infected via companion animal bites.", animal: "Commensal turning pathogenic under stress.", environment: "Monsoon rains trigger outbreaks in cattle." },
    references: ["WOAH Haemorrhagic Septicaemia", "CDC Animal Bites"]
  },

  melioidosis: {
    definition: "A tropical infectious disease resembling glanders, known as the 'great mimicker'.",
    etiology: "Burkholderia pseudomallei.",
    taxonomy: "Betaproteobacteria, Gram-negative, motile saprophytic bacillus.",
    vetImportance: "Causes abscesses in multiple organs in sheep, goats, pigs, and horses.",
    publicHealthImportance: "High mortality rate in humans if untreated; significant biothreat agent.",
    riskGroups: "Farmers, military personnel, diabetics, people in contact with soil/water in endemic regions.",
    envSurvival: "Highly resilient; survives for years in moist soil and pooled water.",
    epidemiology: {
      source: "Inhalation of contaminated dust, ingestion of water, or contact of broken skin with wet soil.",
      globalRelevance: "Highly endemic in Southeast Asia and Northern Australia."
    },
    pathogenesis: {
      entry: "Percutaneous inoculation, inhalation, or ingestion.",
      spread: "Hematogenous spread forming microabscesses in any organ.",
      organs: ["Lungs", "Liver", "Spleen", "Skin", "Prostate"],
      lesions: "Multiple caseous abscesses."
    },
    clinicalSigns: {
      animals: { acute: "Fever, respiratory distress, neurological signs.", chronic: "Chronic abscesses in internal organs, often found at slaughter.", subclinical: "Latent infections possible." },
      humans: { acute: "Acute pneumonia, septicemia, localized skin ulcers.", chronic: "Chronic abscessation mimicking tuberculosis.", subclinical: "Latent infection capable of reactivation decades later." }
    },
    lesionsDesc: {
      gross: "Caseous or purulent abscesses resembling TB ('cheesy' exudate).",
      histopathology: "Pyogranulomatous inflammation.",
      hallmark: "The 'great mimicker' - widespread abscesses."
    },
    diagnosis: {
      history: "Exposure to monsoon rains or rice paddies in endemic regions.",
      signs: "Pneumonia with systemic abscesses, especially in diabetic patients.",
      samples: "Blood, sputum, pus, urine.",
      tests: [
        { test: "Bacterial Culture", type: "Microbiology", description: "Ashdown's agar; colonies appear wrinkled and metallic." }
      ],
      differentials: [
        { disease: "Tuberculosis / Glanders", keyDiff: "Culture on specific media and environmental history.", mistake: "Misdiagnosing as TB and giving ineffective anti-tubercular drugs." }
      ]
    },
    treatment: [
      { drug: "Ceftazidime or Meropenem", purpose: "Bactericidal", mechanism: "Inhibits cell wall synthesis", speciesNotes: "Intensive IV phase followed by prolonged eradication phase (Bactrim) in humans.", limitations: "Extremely long treatment duration required to prevent relapse.", resistance: "Intrinsic resistance to penicillin, ampicillin, first/second gen cephalosporins, and aminoglycosides." }
    ],
    control: {
      farm: "Provide clean drinking water for livestock; avoid swampy pastures.",
      animal: "Culling infected animals.",
      human: "Wear waterproof boots/gloves when working in wet soil.",
      government: "Public awareness during monsoon season."
    },
    publicHealth: { economic: "Long hospitalization and treatment costs.", foodSafety: "N/A", wildlifeInterface: "Affects diverse wildlife species." },
    onehealth: { human: "Environmental exposure to contaminated soil/water.", animal: "Environmental exposure.", environment: "Environmental saprophyte, heavily influenced by extreme weather/monsoons." },
    references: ["CDC Melioidosis", "WOAH Terrestrial Manual"]
  }
`;

const fs = require('fs');
const file = 'C:\\Users\\hares\\.antigravity\\Zoonotix\\scratch\\zoonotix_content_enrichment.js';
let code = fs.readFileSync(file, 'utf8');

// Insert the new objects
code = code.replace(/};\s*\n+\/\/ Export or expose/, ",\n" + newDataStr + "\n};\n\n// Export or expose");
fs.writeFileSync(file, code);
console.log("Successfully added Batch 1 (Bacterial).");

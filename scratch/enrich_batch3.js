// Batch 3: Fungal and Prion Diseases
const newDataStr = `
  cryptococcosis: {
    definition: "A systemic fungal infection primarily affecting the lungs and CNS in immunocompromised hosts.",
    etiology: "Cryptococcus neoformans, Cryptococcus gattii.",
    taxonomy: "Tremellomycetes, basidiomycetous encapsulated yeast.",
    vetImportance: "Causes upper respiratory and CNS disease in cats, and mastitis in dairy cattle.",
    publicHealthImportance: "Major cause of fatal meningoencephalitis in HIV/AIDS patients.",
    riskGroups: "Immunocompromised humans, bird breeders.",
    envSurvival: "Survives for years in pigeon guano and soil.",
    epidemiology: {
      source: "Inhalation of desiccated yeast cells from pigeon droppings or soil.",
      globalRelevance: "Worldwide distribution."
    },
    pathogenesis: {
      entry: "Inhalation.",
      spread: "Hematogenous spread to the central nervous system.",
      organs: ["Lungs", "Brain", "Meninges"],
      lesions: "Gelatinous pseudocysts in the brain."
    },
    clinicalSigns: {
      animals: { acute: "Sneezing, facial swelling (Roman nose in cats), blindness.", chronic: "Granulomatous rhinitis.", subclinical: "N/A" },
      humans: { acute: "Pneumonia, headache, confusion.", chronic: "Meningoencephalitis.", subclinical: "Asymptomatic lung infection in healthy individuals." }
    },
    lesionsDesc: {
      gross: "Gelatinous masses (cryptococcomas) in the nasal cavity or brain.",
      histopathology: "Soap-bubble appearance in brain tissue due to large yeast capsules.",
      hallmark: "Thick polysaccharide capsule visualizing with India Ink."
    },
    diagnosis: {
      history: "Exposure to pigeon droppings; HIV positive status.",
      signs: "Meningoencephalitis in an immunocompromised patient.",
      samples: "CSF, serum, nasal exudate.",
      tests: [
        { test: "India Ink Stain", type: "Microbiology", description: "Highlights the thick capsule in CSF." },
        { test: "Cryptococcal Antigen (CrAg)", type: "Immunology", description: "Highly sensitive latex agglutination or lateral flow assay." }
      ],
      differentials: [
        { disease: "Toxoplasmosis / Tuberculosis", keyDiff: "CrAg test and India Ink.", mistake: "Assuming bacterial meningitis." }
      ]
    },
    treatment: [
      { drug: "Amphotericin B + Flucytosine", purpose: "Fungicidal", mechanism: "Binds ergosterol / Inhibits DNA synthesis", speciesNotes: "Used in human CNS disease.", limitations: "High nephrotoxicity.", resistance: "Emerging." },
      { drug: "Fluconazole", purpose: "Fungistatic", mechanism: "Inhibits ergosterol synthesis", speciesNotes: "Used in cats and as human maintenance therapy.", limitations: "Requires long-term administration.", resistance: "Occasional." }
    ],
    control: {
      farm: "Proper treatment/culling of mastitic cows.",
      animal: "Keep cats indoors.",
      human: "Immunocompromised individuals should avoid cleaning pigeon coops.",
      government: "Urban pigeon population control."
    },
    publicHealth: { economic: "High treatment costs.", foodSafety: "N/A", wildlifeInterface: "Pigeons." },
    onehealth: { human: "Infected from environmental sources.", animal: "Pigeons carry the yeast without disease.", environment: "Pigeon guano provides an ideal nitrogen-rich medium for the yeast." },
    references: ["CDC Cryptococcosis", "WOAH"]
  },

  aspergillosis: {
    definition: "An opportunistic fungal infection affecting the respiratory tract of humans and birds.",
    etiology: "Aspergillus fumigatus.",
    taxonomy: "Eurotiomycetes, saprophytic mold.",
    vetImportance: "Causes 'Brooder pneumonia' in poultry, leading to high mortality in chicks.",
    publicHealthImportance: "Major cause of invasive pulmonary disease in neutropenic patients.",
    riskGroups: "Immunocompromised humans, poultry farmers.",
    envSurvival: "Ubiquitous in environment; spores are highly resilient in soil and decaying vegetation.",
    epidemiology: {
      source: "Inhalation of airborne conidia (spores) from moldy feed or bedding.",
      globalRelevance: "Worldwide."
    },
    pathogenesis: {
      entry: "Inhalation.",
      spread: "Hyphal invasion of blood vessels causing thrombosis and infarction.",
      organs: ["Lungs", "Air sacs (birds)"],
      lesions: "Necrotizing pneumonia, granulomas."
    },
    clinicalSigns: {
      animals: { acute: "Gasping, rapid breathing, high mortality in young birds.", chronic: "N/A", subclinical: "N/A" },
      humans: { acute: "Fever, chest pain, hemoptysis (invasive form).", chronic: "Aspergilloma (fungus ball) in pre-existing lung cavities.", subclinical: "Allergic bronchopulmonary aspergillosis (ABPA)." }
    },
    lesionsDesc: {
      gross: "Yellow-white caseous nodules in lungs and air sacs of birds.",
      histopathology: "Dichotomously branching septate hyphae (at acute angles) invading tissue.",
      hallmark: "Fruiting bodies (conidiophores) in airways; branching hyphae in tissue."
    },
    diagnosis: {
      history: "Moldy hatchery/bedding (birds); severe immunosuppression (humans).",
      signs: "Respiratory distress.",
      samples: "Sputum, BAL, lung tissue.",
      tests: [
        { test: "Fungal Culture", type: "Microbiology", description: "Sabouraud Dextrose Agar." },
        { test: "Galactomannan Assay", type: "Immunology", description: "Detects fungal cell wall antigen in serum/BAL." }
      ],
      differentials: [
        { disease: "Avian Influenza (in birds) / Candidiasis", keyDiff: "Culture and histopathology.", mistake: "Treating with antibiotics." }
      ]
    },
    treatment: [
      { drug: "Voriconazole", purpose: "Fungicidal", mechanism: "Inhibits ergosterol synthesis", speciesNotes: "Treatment of choice for invasive human disease.", limitations: "Drug interactions.", resistance: "Emerging." }
    ],
    control: {
      farm: "Clean, dry bedding; avoid moldy feed; strict hatchery sanitation.",
      animal: "Cull severely affected birds.",
      human: "HEPA filtration in hospital wards for immunocompromised patients.",
      government: "N/A"
    },
    publicHealth: { economic: "Losses in poultry industry.", foodSafety: "N/A", wildlifeInterface: "Affects captive penguins and raptors." },
    onehealth: { human: "Environmental exposure.", animal: "Environmental exposure.", environment: "Moldy organic matter." },
    references: ["CDC Aspergillosis", "WOAH"]
  },

  sporotrichosis: {
    definition: "A subacute/chronic fungal infection characterized by nodular lesions along lymphatics.",
    etiology: "Sporothrix schenckii complex.",
    taxonomy: "Sordariomycetes, thermally dimorphic fungus.",
    vetImportance: "Causes severe, contagious skin disease in cats.",
    publicHealthImportance: "Occupational hazard ('Rose gardener's disease'); zoonotic transmission from cats.",
    riskGroups: "Gardeners, landscapers, veterinarians handling infected cats.",
    envSurvival: "Saprophyte living in soil, sphagnum moss, and plant debris.",
    epidemiology: {
      source: "Traumatic inoculation (thorns, splinters) or scratches/bites from infected cats.",
      globalRelevance: "Global, but epidemic zoonotic outbreaks in Brazil (S. brasiliensis)."
    },
    pathogenesis: {
      entry: "Skin trauma.",
      spread: "Ascends via local lymphatic channels.",
      organs: ["Skin", "Lymphatics"],
      lesions: "Nodular, ulcerating granulomas."
    },
    clinicalSigns: {
      animals: { acute: "Multiple ulcerated skin nodules (cats).", chronic: "Disseminated disease in cats.", subclinical: "Dogs often heal spontaneously." },
      humans: { acute: "Painless papule that ulcerates, followed by secondary nodules along lymphatic drainage.", chronic: "N/A", subclinical: "N/A" }
    },
    lesionsDesc: {
      gross: "Ulcerated, draining skin nodules.",
      histopathology: "Granulomatous inflammation with cigar-shaped budding yeast cells.",
      hallmark: "Sporothrix asteroid bodies (yeast surrounded by eosinophilic material, Splendore-Hoeppli phenomenon)."
    },
    diagnosis: {
      history: "Rose gardening or handling a cat with skin lesions.",
      signs: "Lymphocutaneous nodules.",
      samples: "Pus, tissue biopsy.",
      tests: [
        { test: "Fungal Culture", type: "Microbiology", description: "Demonstrates dimorphism (mold at 25C, yeast at 37C)." },
        { test: "Cytology", type: "Microbiology", description: "Abundant cigar-shaped yeast in cat exudates (rare in humans)." }
      ],
      differentials: [
        { disease: "Leishmaniasis / Mycobacteriosis", keyDiff: "Culture.", mistake: "Assuming bacterial cellulitis." }
      ]
    },
    treatment: [
      { drug: "Itraconazole", purpose: "Fungicidal", mechanism: "Inhibits ergosterol synthesis", speciesNotes: "Treatment of choice for humans and cats.", limitations: "Months of therapy required.", resistance: "Rare." }
    ],
    control: {
      farm: "N/A",
      animal: "Isolate and treat infected cats; keep indoors.",
      human: "Wear gloves when gardening or handling cats with unhealed wounds.",
      government: "Surveillance of zoonotic S. brasiliensis outbreaks."
    },
    publicHealth: { economic: "Veterinary costs.", foodSafety: "N/A", wildlifeInterface: "N/A" },
    onehealth: { human: "Infected by environment or cat.", animal: "Cats amplify the fungus in their claws/mouth.", environment: "Soil and plants are the natural reservoir." },
    references: ["CDC Sporotrichosis", "WOAH"]
  },

  scrapie: {
    definition: "A fatal, neurodegenerative prion disease of sheep and goats.",
    etiology: "Prion (PrPSc).",
    taxonomy: "Proteinaceous infectious particle.",
    vetImportance: "Causes progressive weight loss and intense pruritus; trade restrictions.",
    publicHealthImportance: "Not considered zoonotic, but structurally related to BSE and CJD.",
    riskGroups: "None (no proven human transmission).",
    envSurvival: "Prions persist in pastures and soil for years.",
    epidemiology: {
      source: "Environmental contamination, maternal transmission via placenta/fluids.",
      globalRelevance: "Global, except Australia and New Zealand."
    },
    pathogenesis: {
      entry: "Ingestion of contaminated pasture or placental fluids.",
      spread: "Uptake by gut lymphoid tissue (Peyer's patches), neural spread to CNS.",
      organs: ["Brain", "Lymphoid tissues"],
      lesions: "Spongiform encephalopathy."
    },
    clinicalSigns: {
      animals: { acute: "N/A", chronic: "Intense rubbing (scraping) against objects, wool loss, tremors, ataxia, weight loss.", subclinical: "Long incubation (years)." },
      humans: { acute: "N/A", chronic: "N/A", subclinical: "No human disease." }
    },
    lesionsDesc: {
      gross: "Wool loss and skin abrasions (self-trauma).",
      histopathology: "Spongiform vacuolation of neurons in the medulla oblongata.",
      hallmark: "Intracytoplasmic neuronal vacuolation."
    },
    diagnosis: {
      history: "Chronic weight loss with intense itching in sheep.",
      signs: "Positive 'nibble reflex' when scratching the back.",
      samples: "Obex (brainstem), retropharyngeal lymph nodes, third eyelid lymphoid tissue.",
      tests: [
        { test: "Immunohistochemistry (IHC)", type: "Histopathology", description: "Gold standard for PrPSc detection." }
      ],
      differentials: [
        { disease: "Listeriosis / Ectoparasites (Mange)", keyDiff: "IHC confirmation.", mistake: "Treating for mange without investigating neuro signs." }
      ]
    },
    treatment: [
      { drug: "Culling", purpose: "Eradication", mechanism: "N/A", speciesNotes: "No treatment exists.", limitations: "Fatal.", resistance: "N/A" }
    ],
    control: {
      farm: "Breeding for genetic resistance (e.g., ARR/ARR genotype in sheep).",
      animal: "Culling infected flocks.",
      human: "N/A",
      government: "National eradication programs."
    },
    publicHealth: { economic: "Flock culling and trade bans.", foodSafety: "N/A", wildlifeInterface: "N/A" },
    onehealth: { human: "N/A", animal: "Maintained in sheep populations.", environment: "Pastures remain infectious for years." },
    references: ["WOAH Scrapie", "USDA Scrapie Eradication"]
  },

  cwd: {
    definition: "Chronic Wasting Disease is a highly contagious, fatal prion disease of cervids (deer, elk, moose).",
    etiology: "Prion (PrPSc).",
    taxonomy: "Proteinaceous infectious particle.",
    vetImportance: "Devastating to wild and captive cervid populations.",
    publicHealthImportance: "Zoonotic potential is currently unknown/unproven, but hunters are advised not to consume meat from CWD-positive animals.",
    riskGroups: "Hunters, taxidermists.",
    envSurvival: "Extremely persistent in soil, water, and vegetation.",
    epidemiology: {
      source: "Direct contact with saliva, urine, feces, or environmental fomites.",
      globalRelevance: "Expanding rapidly in North America; isolated cases in Europe (Norway)."
    },
    pathogenesis: {
      entry: "Ingestion/inhalation.",
      spread: "Lymphoid tissue to CNS.",
      organs: ["Brain", "Lymph nodes"],
      lesions: "Spongiform encephalopathy."
    },
    clinicalSigns: {
      animals: { acute: "N/A", chronic: "Extreme weight loss, hypersalivation, loss of fear of humans, ataxia.", subclinical: "Infected animals shed prions for months before showing signs." },
      humans: { acute: "N/A", chronic: "N/A", subclinical: "No confirmed human cases." }
    },
    lesionsDesc: {
      gross: "Emaciation, aspiration pneumonia, rumen impaction.",
      histopathology: "Spongiform change in the obex.",
      hallmark: "Spongiform encephalopathy in cervids."
    },
    diagnosis: {
      history: "Captive deer farm or hunting in endemic zones.",
      signs: "Emaciated, drooling deer.",
      samples: "Retropharyngeal lymph nodes, obex.",
      tests: [
        { test: "ELISA / IHC", type: "Immunology/Histology", description: "Detection of PrPSc." }
      ],
      differentials: [
        { disease: "Malnutrition / EHD (Epizootic Hemorrhagic Disease)", keyDiff: "Diagnostic testing for prions.", mistake: "Assuming winter starvation." }
      ]
    },
    treatment: [
      { drug: "Culling", purpose: "Containment", mechanism: "N/A", speciesNotes: "No treatment.", limitations: "Fatal.", resistance: "N/A" }
    ],
    control: {
      farm: "Depopulation of infected captive herds; double fencing.",
      animal: "Ban on feeding deer.",
      human: "Test harvested deer before consumption; use gloves when field dressing.",
      government: "Carcass movement restrictions; extensive wild herd surveillance."
    },
    publicHealth: { economic: "Impacts multi-billion dollar hunting industry.", foodSafety: "CDC recommends avoiding consumption of CWD+ meat.", wildlifeInterface: "A true wildlife epidemic." },
    onehealth: { human: "Hunters advised caution.", animal: "Wild deer spread it rapidly.", environment: "Environmental persistence makes eradication nearly impossible." },
    references: ["USGS CWD", "CDC CWD"]
  }
`;

const fs = require('fs');
const file = 'C:\\Users\\hares\\.antigravity\\Zoonotix\\scratch\\zoonotix_content_enrichment.js';
let code = fs.readFileSync(file, 'utf8');
code = code.replace(/};\s*\n+\/\/ Export or expose/, ",\n" + newDataStr + "\n};\n\n// Export or expose");
fs.writeFileSync(file, code);
console.log("Successfully added Batch 3 (Fungal & Prion).");

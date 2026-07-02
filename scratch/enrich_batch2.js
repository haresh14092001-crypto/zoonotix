// Batch 2: Viral Diseases
const newDataStr = `
  jencephalitis: {
    definition: "A mosquito-borne viral infection leading to severe encephalitis in humans and horses, and abortion in pigs.",
    etiology: "Japanese Encephalitis Virus (JEV).",
    taxonomy: "Flaviviridae, Flavivirus, (+)ssRNA enveloped virus.",
    vetImportance: "Major cause of reproductive failure in swine.",
    publicHealthImportance: "Leading cause of viral encephalitis in Asia with high mortality and severe neurological sequelae.",
    riskGroups: "Children in rural endemic areas, pig farmers.",
    envSurvival: "Inactivated by heat, UV light, and standard disinfectants.",
    epidemiology: {
      source: "Bite of infected Culex mosquitoes.",
      globalRelevance: "Endemic across Southeast Asia and the Western Pacific."
    },
    pathogenesis: {
      entry: "Mosquito bite.",
      spread: "Initial replication in local lymphatics, viremia, crosses blood-brain barrier.",
      organs: ["Brain", "Spinal cord", "Uterus (pigs)"],
      lesions: "Non-suppurative meningoencephalitis."
    },
    clinicalSigns: {
      animals: { acute: "Abortions, mummified fetuses in pigs. Fever, neurological signs in horses.", chronic: "Infertility in boars.", subclinical: "Asymptomatic viremia in water birds and most pigs." },
      humans: { acute: "High fever, neck stiffness, seizures, coma.", chronic: "Permanent neurological/cognitive deficits.", subclinical: "Most infections are asymptomatic." }
    },
    lesionsDesc: {
      gross: "Congestion and edema of the brain and meninges.",
      histopathology: "Perivascular cuffing, neuronal necrosis, and microglial nodules.",
      hallmark: "Non-suppurative encephalitis with neuronophagia."
    },
    diagnosis: {
      history: "Rural exposure in Asia during rainy season; proximity to pig farms.",
      signs: "Encephalitis with acute onset.",
      samples: "Serum, CSF, brain tissue (post-mortem), aborted fetuses.",
      tests: [
        { test: "MAC-ELISA", type: "Serology", description: "Detects IgM in CSF or serum." },
        { test: "RT-PCR", type: "Molecular", description: "Detects viral RNA." }
      ],
      differentials: [
        { disease: "Rabies / Nipah", keyDiff: "Mosquito vector history and specific IgM.", mistake: "Assuming bacterial meningitis without checking for JEV." }
      ]
    },
    treatment: [
      { drug: "Supportive Care", purpose: "Manage intracranial pressure/seizures", mechanism: "N/A", speciesNotes: "No specific antiviral available.", limitations: "Palliative only.", resistance: "N/A" }
    ],
    control: {
      farm: "Mosquito control around piggeries; relocation of pig farms away from human housing.",
      animal: "Vaccination of pigs and horses in endemic areas.",
      human: "Human vaccination (e.g., SA 14-14-2), bed nets, repellents.",
      government: "Vector surveillance, mosquito abatement programs."
    },
    publicHealth: { economic: "Severe long-term healthcare costs for survivors.", foodSafety: "N/A", wildlifeInterface: "Ardeid birds (herons/egrets) are natural reservoirs." },
    onehealth: { human: "Dead-end host infected via mosquito.", animal: "Pigs are amplifying hosts with high viremia.", environment: "Rice paddies breed Culex vectors." },
    references: ["WHO Japanese Encephalitis", "WOAH Terrestrial Manual"]
  },

  rift_valley: {
    definition: "An acute, fever-causing viral disease that affects domestic animals and humans.",
    etiology: "Rift Valley Fever Phlebovirus (RVFV).",
    taxonomy: "Phenuiviridae, Phlebovirus, (-)ssRNA enveloped virus.",
    vetImportance: "Causes massive 'abortion storms' and high mortality in young ruminants.",
    publicHealthImportance: "Causes severe outbreaks in humans with hemorrhagic fever and vision loss.",
    riskGroups: "Veterinarians, farmers, abattoir workers, individuals in endemic areas.",
    envSurvival: "Survives in dried mosquito eggs in soil for years.",
    epidemiology: {
      source: "Mosquito bites; direct contact with infected blood, tissues, or aborted fetuses.",
      globalRelevance: "Endemic to sub-Saharan Africa, with outbreaks in North Africa and the Middle East."
    },
    pathogenesis: {
      entry: "Mosquito bite or contact with mucosa/abraded skin.",
      spread: "Viremia leading to severe hepatic and vascular endothelial damage.",
      organs: ["Liver", "Spleen", "Brain", "Eyes"],
      lesions: "Severe hepatic necrosis."
    },
    clinicalSigns: {
      animals: { acute: "Abortion storms (100% in pregnant ewes), high mortality in lambs, fever.", chronic: "N/A", subclinical: "Mild fever in adult cattle." },
      humans: { acute: "Flu-like syndrome, hemorrhagic fever, meningoencephalitis, retinitis.", chronic: "Permanent blindness (macular lesions).", subclinical: "Common." }
    },
    lesionsDesc: {
      gross: "Enlarged, friable, necrotic liver; widespread hemorrhages.",
      histopathology: "Massive hepatic necrosis with eosinophilic intranuclear inclusion bodies.",
      hallmark: "Necrotizing hepatitis in aborted lambs."
    },
    diagnosis: {
      history: "Heavy rainfall/flooding followed by massive mosquito hatching; handling aborted animal fetuses.",
      signs: "Abortion storms alongside human flu-like/hemorrhagic illness.",
      samples: "Blood, liver tissue, aborted fetuses.",
      tests: [
        { test: "RT-PCR", type: "Molecular", description: "Detection of viral RNA." },
        { test: "IgM ELISA", type: "Serology", description: "Recent infection marker." }
      ],
      differentials: [
        { disease: "Q Fever / Brucellosis / Ebola", keyDiff: "Mosquito association and specific hepatic lesions.", mistake: "Performing necropsies without PPE, leading to fatal human exposure." }
      ]
    },
    treatment: [
      { drug: "Supportive Care", purpose: "Symptom management", mechanism: "N/A", speciesNotes: "No specific treatment.", limitations: "High mortality in hemorrhagic cases.", resistance: "N/A" }
    ],
    control: {
      farm: "Vaccination of ruminants before rainy seasons.",
      animal: "Do not slaughter sick animals during outbreaks (risk to humans).",
      human: "PPE when handling aborted materials; mosquito nets.",
      government: "Climate monitoring (El Niño) to predict outbreaks."
    },
    publicHealth: { economic: "Devastating losses to livestock industry and trade bans.", foodSafety: "Do not consume raw milk or meat from sick animals.", wildlifeInterface: "Wild ruminants can be infected." },
    onehealth: { human: "Infected via handling animal tissues or mosquito bite.", animal: "Ruminants amplify the virus for mosquitoes.", environment: "Heavy rains flood dambos, hatching infected mosquito eggs." },
    references: ["WHO Rift Valley Fever", "WOAH Terrestrial Manual"]
  },

  influenza: {
    definition: "Acute respiratory infections caused by Orthomyxoviruses that regularly jump between animal and human populations.",
    etiology: "Avian/Swine Influenza A viruses (e.g., H5N1, H1N1).",
    taxonomy: "Orthomyxoviridae, Alphainfluenzavirus, (-)ssRNA segmented enveloped virus.",
    vetImportance: "High Pathogenicity Avian Influenza (HPAI) causes near 100% mortality in poultry.",
    publicHealthImportance: "Major pandemic threat; genetic reassortment creates novel strains.",
    riskGroups: "Poultry farmers, swine workers, live animal market workers.",
    envSurvival: "Survives in cold water and feces for weeks.",
    epidemiology: {
      source: "Inhalation of aerosols, contact with infected respiratory secretions or feces.",
      globalRelevance: "Global distribution with ongoing pandemic risk."
    },
    pathogenesis: {
      entry: "Inhalation into respiratory tract.",
      spread: "Viral attachment to sialic acid receptors; in HPAI, systemic replication due to polybasic cleavage site.",
      organs: ["Respiratory tract", "Systemic (HPAI)"],
      lesions: "Necrotizing bronchitis/pneumonia, systemic hemorrhages (HPAI)."
    },
    clinicalSigns: {
      animals: { acute: "Respiratory distress, cyanosis of wattles/combs, sudden mass death (poultry).", chronic: "N/A", subclinical: "Wild waterfowl carry virus asymptomatically." },
      humans: { acute: "High fever, cough, severe pneumonia, acute respiratory distress syndrome (ARDS).", chronic: "N/A", subclinical: "Rare in HPAI." }
    },
    lesionsDesc: {
      gross: "Hemorrhages in multiple organs (poultry); severe pulmonary consolidation (humans).",
      histopathology: "Necrotizing tracheitis, diffuse alveolar damage.",
      hallmark: "Cyanosis and edema of the head/comb in poultry."
    },
    diagnosis: {
      history: "Mass die-offs in poultry; exposure to live bird markets.",
      signs: "Severe respiratory disease.",
      samples: "Tracheal/cloacal swabs, serum.",
      tests: [
        { test: "RT-PCR", type: "Molecular", description: "Detects Matrix gene and specific H/N subtypes." }
      ],
      differentials: [
        { disease: "Newcastle Disease", keyDiff: "Specific PCR.", mistake: "Assuming human cases are seasonal flu without taking exposure history." }
      ]
    },
    treatment: [
      { drug: "Neuraminidase Inhibitors (Oseltamivir)", purpose: "Antiviral", mechanism: "Inhibits viral release", speciesNotes: "Used in humans; rarely in animals.", limitations: "Must be given within 48 hours.", resistance: "Monitored closely." }
    ],
    control: {
      farm: "Strict biosecurity, keeping poultry indoors to avoid wild bird contact.",
      animal: "Stamping out (culling) infected flocks.",
      human: "PPE, targeted vaccination.",
      government: "Active surveillance, trade embargoes during outbreaks."
    },
    publicHealth: { economic: "Massive culling costs and poultry trade bans.", foodSafety: "Proper cooking destroys the virus.", wildlifeInterface: "Wild waterfowl are the primary reservoir." },
    onehealth: { human: "Infected by contact with sick birds or pigs.", animal: "Pigs act as mixing vessels for human/avian strains.", environment: "Waterfowl migrate and spread virus globally via feces." },
    references: ["WHO Avian Influenza", "WOAH Terrestrial Manual"]
  },

  hendravirus: {
    definition: "A rare but highly fatal respiratory and neurological disease of horses and humans.",
    etiology: "Hendra virus (HeV).",
    taxonomy: "Paramyxoviridae, Henipavirus, (-)ssRNA enveloped virus.",
    vetImportance: "Causes acute fatal disease in horses.",
    publicHealthImportance: "Extremely high case fatality rate in humans (~50%).",
    riskGroups: "Equine veterinarians, horse owners in endemic regions.",
    envSurvival: "Relatively fragile; inactivated by heat and detergents.",
    epidemiology: {
      source: "Contact with respiratory secretions or tissues of infected horses.",
      globalRelevance: "Endemic strictly to Australia (flying fox habitats)."
    },
    pathogenesis: {
      entry: "Inhalation or mucosal contact.",
      spread: "Systemic endothelial infection.",
      organs: ["Lungs", "Brain"],
      lesions: "Severe interstitial pneumonia and encephalitis."
    },
    clinicalSigns: {
      animals: { acute: "Frothy nasal discharge, respiratory distress, neurological signs, rapid death.", chronic: "N/A", subclinical: "N/A" },
      humans: { acute: "Severe flu-like illness, rapidly progressing to pneumonia and encephalitis.", chronic: "Late-onset encephalitis.", subclinical: "N/A" }
    },
    lesionsDesc: {
      gross: "Heavy, fluid-filled lungs with frothy exudate in airways.",
      histopathology: "Syncytial cells (multinucleated giant cells) in vascular endothelium.",
      hallmark: "Endothelial syncytia and severe pulmonary edema."
    },
    diagnosis: {
      history: "Exposure to sick horses in Australia; horses camped under trees with flying foxes.",
      signs: "Acute fatal respiratory/neurological disease.",
      samples: "Nasal/oral swabs, blood, tissue (handled in BSL-4).",
      tests: [
        { test: "RT-PCR", type: "Molecular", description: "Detects viral RNA." },
        { test: "Virus Isolation", type: "Microbiology", description: "Restricted to maximum biocontainment laboratories." }
      ],
      differentials: [
        { disease: "Equine Influenza / African Horse Sickness", keyDiff: "Rapid progression and human involvement.", mistake: "Performing equine necropsy or endoscopy without full PPE." }
      ]
    },
    treatment: [
      { drug: "Supportive Care / Monoclonal Antibodies", purpose: "Experimental", mechanism: "Neutralization", speciesNotes: "No approved human or animal antiviral.", limitations: "Extremely high mortality.", resistance: "N/A" }
    ],
    control: {
      farm: "Prevent horses from grazing under fruit bat roosting trees.",
      animal: "Equine Hendra virus vaccine is highly effective.",
      human: "Strict PPE when handling sick horses.",
      government: "Mandatory reporting, quarantine of infected properties."
    },
    publicHealth: { economic: "Severe impact on local equine industries.", foodSafety: "N/A", wildlifeInterface: "Pteropid bats (flying foxes) are the natural reservoir." },
    onehealth: { human: "Dead-end host infected via close contact with horse secretions.", animal: "Horses amplify the virus from bat excreta/saliva.", environment: "Bat habitats overlapping with horse pastures." },
    references: ["Australian Government Hendra Guidelines", "WOAH Terrestrial Manual"]
  },

  monkeypox: {
    definition: "An emerging viral zoonosis causing a smallpox-like illness.",
    etiology: "Mpox virus.",
    taxonomy: "Poxviridae, Orthopoxvirus, dsDNA enveloped virus.",
    vetImportance: "Infects various rodents and non-human primates.",
    publicHealthImportance: "Global public health emergency potential.",
    riskGroups: "People with close physical contact with infected animals or humans.",
    envSurvival: "Highly resistant to drying and temperature changes; survives on fomites (linens).",
    epidemiology: {
      source: "Contact with infected animal blood/fluids, human-to-human via close physical/sexual contact.",
      globalRelevance: "Endemic to Central/West Africa, recent global spread."
    },
    pathogenesis: {
      entry: "Skin abrasions, respiratory tract, or mucous membranes.",
      spread: "Lymphatic spread to nodes, primary viremia, secondary viremia to skin.",
      organs: ["Skin", "Lymph nodes"],
      lesions: "Vesiculopustular rash."
    },
    clinicalSigns: {
      animals: { acute: "Fever, rash, conjunctivitis in monkeys.", chronic: "N/A", subclinical: "African rodents often asymptomatic." },
      humans: { acute: "Fever, profound lymphadenopathy, distinctive vesiculo-pustular rash.", chronic: "Scarring.", subclinical: "Possible." }
    },
    lesionsDesc: {
      gross: "Deep-seated, well-circumscribed pustules with central umbilication.",
      histopathology: "Epidermal necrosis with eosinophilic intracytoplasmic inclusions (Guarnieri bodies).",
      hallmark: "Umbilicated pustules and lymphadenopathy."
    },
    diagnosis: {
      history: "Travel to endemic areas, exposure to exotic pets (prairie dogs), or close contact with confirmed human cases.",
      signs: "Rash progressing from macules to pustules.",
      samples: "Lesion swabs/crusts.",
      tests: [
        { test: "PCR", type: "Molecular", description: "Direct detection from lesion material." }
      ],
      differentials: [
        { disease: "Chickenpox (Varicella) / Smallpox", keyDiff: "Prominent lymphadenopathy distinguishes from chickenpox.", mistake: "Misdiagnosing as secondary syphilis or chickenpox." }
      ]
    },
    treatment: [
      { drug: "Tecovirimat (TPOXX)", purpose: "Antiviral", mechanism: "Inhibits viral envelope formation", speciesNotes: "Used in severe human cases.", limitations: "Availability limited.", resistance: "Monitored." }
    ],
    control: {
      farm: "Restriction on exotic pet trade.",
      animal: "Quarantine of imported mammals.",
      human: "Smallpox/Mpox vaccination, isolation of patients, contact tracing.",
      government: "International trade bans on specific African rodents."
    },
    publicHealth: { economic: "Healthcare costs during outbreaks.", foodSafety: "Bushmeat consumption is a risk factor.", wildlifeInterface: "Maintained in African rodents (rope squirrels, pouched rats)." },
    onehealth: { human: "Human-to-human transmission now drives global outbreaks.", animal: "Exotic pet trade causes spillover (e.g., 2003 US outbreak).", environment: "Bushmeat hunting." },
    references: ["WHO Mpox Fact Sheet", "CDC Mpox"]
  },

  hantavirus: {
    definition: "Rodent-borne viruses causing HFRS in Eurasia and HPS in the Americas.",
    etiology: "Hantaviruses (e.g., Sin Nombre, Puumala, Seoul).",
    taxonomy: "Hantaviridae, Orthohantavirus, (-)ssRNA segmented enveloped virus.",
    vetImportance: "Rodents are asymptomatic lifelong carriers; does not cause disease in domestic livestock.",
    publicHealthImportance: "Causes Hantavirus Pulmonary Syndrome (HPS) with high mortality (~38%).",
    riskGroups: "Rural workers, campers, individuals cleaning rodent-infested buildings.",
    envSurvival: "Survives in rodent excreta for days to weeks depending on temperature/humidity.",
    epidemiology: {
      source: "Inhalation of aerosolized rodent urine, droppings, or saliva.",
      globalRelevance: "Global, varying by specific virus-rodent pairs."
    },
    pathogenesis: {
      entry: "Inhalation.",
      spread: "Viremia, infects vascular endothelium causing profound capillary leak.",
      organs: ["Lungs (HPS)", "Kidneys (HFRS)"],
      lesions: "Severe pulmonary edema (HPS) or acute renal failure (HFRS)."
    },
    clinicalSigns: {
      animals: { acute: "N/A", chronic: "N/A", subclinical: "Lifelong asymptomatic shedding in specific rodent hosts." },
      humans: { acute: "Fever, myalgia, rapidly progressive respiratory distress (HPS) or renal failure/hemorrhage (HFRS).", chronic: "Convalescence takes months.", subclinical: "Rare in HPS." }
    },
    lesionsDesc: {
      gross: "Massive, heavy, fluid-filled lungs (HPS).",
      histopathology: "Interstitial pneumonitis with mononuclear infiltration and edema.",
      hallmark: "Non-cardiogenic pulmonary edema (HPS)."
    },
    diagnosis: {
      history: "Cleaning a dusty, closed, rodent-infested space (e.g., barn, shed) 1-4 weeks prior.",
      signs: "Sudden unexplained severe respiratory failure in a healthy adult.",
      samples: "Serum, tissue (post-mortem).",
      tests: [
        { test: "ELISA (IgM/IgG)", type: "Serology", description: "Primary diagnostic method." },
        { test: "RT-PCR", type: "Molecular", description: "Can detect viral RNA early in blood/tissues." }
      ],
      differentials: [
        { disease: "Influenza / Leptospirosis / Pneumonic Plague", keyDiff: "Specific serology and lack of bacterial response.", mistake: "Sweeping dry rodent droppings instead of wet-mopping." }
      ]
    },
    treatment: [
      { drug: "ECMO / Intensive Care", purpose: "Supportive", mechanism: "Oxygenation", speciesNotes: "Requires human ICU care.", limitations: "No specific antiviral for HPS.", resistance: "N/A" }
    ],
    control: {
      farm: "Rodent exclusion and control.",
      animal: "N/A",
      human: "Ventilate enclosed spaces before entering; use wet-cleaning methods with bleach.",
      government: "Public education on safe cabin/barn cleaning."
    },
    publicHealth: { economic: "ICU costs.", foodSafety: "N/A", wildlifeInterface: "Deer mice, cotton rats, bank voles." },
    onehealth: { human: "Infected via aerosolized rodent feces.", animal: "Rodents are unaffected reservoir hosts.", environment: "Dry, dusty enclosed spaces preserve the virus." },
    references: ["CDC Hantavirus", "WHO HFRS/HPS"]
  },

  creutzfeldt: {
    definition: "Variant Creutzfeldt-Jakob Disease (vCJD) is a fatal human neurodegenerative disease linked to BSE.",
    etiology: "Prion (PrPSc).",
    taxonomy: "Proteinaceous infectious particle.",
    vetImportance: "Directly linked to the Bovine Spongiform Encephalopathy (BSE) epidemic.",
    publicHealthImportance: "Uniformly fatal; transmissible via blood transfusion and contaminated surgical instruments.",
    riskGroups: "Consumers of contaminated beef (historically in the UK).",
    envSurvival: "Extremely resistant to heat (including standard autoclaving), radiation, and formalin.",
    epidemiology: {
      source: "Ingestion of BSE-contaminated beef products (especially brain/spinal cord).",
      globalRelevance: "Peaked in the UK in the late 1990s/early 2000s; now rare."
    },
    pathogenesis: {
      entry: "Ingestion.",
      spread: "Uptake by gut lymphoid tissue, travels via peripheral nerves to the CNS.",
      organs: ["Brain", "Lymphoid tissues (tonsils)"],
      lesions: "Spongiform encephalopathy."
    },
    clinicalSigns: {
      animals: { acute: "N/A", chronic: "N/A", subclinical: "N/A" },
      humans: { acute: "N/A", chronic: "Psychiatric symptoms (depression), progressing to ataxia, dementia, and death.", subclinical: "Incubation period can be decades." }
    },
    lesionsDesc: {
      gross: "Brain atrophy in late stages.",
      histopathology: "Spongiform change, neuronal loss, astrogliosis, and florid plaques.",
      hallmark: "Florid PrP plaques (daisy-like plaques) in the cerebrum and cerebellum."
    },
    diagnosis: {
      history: "Residence in the UK during the BSE epidemic.",
      signs: "Progressive dementia and ataxia in young patients.",
      samples: "Tonsil biopsy, brain biopsy (post-mortem), CSF.",
      tests: [
        { test: "Tonsil Biopsy / IHC", type: "Histopathology", description: "Detection of PrPSc in lymphoid tissue (unique to vCJD)." },
        { test: "RT-QuIC", type: "Molecular", description: "Amplifies and detects abnormal prion proteins in CSF." }
      ],
      differentials: [
        { disease: "Sporadic CJD / Alzheimer's", keyDiff: "Younger age of onset, psychiatric presentation, and florid plaques.", mistake: "Misdiagnosing early stages as primary psychiatric illness." }
      ]
    },
    treatment: [
      { drug: "Palliative Care", purpose: "Comfort", mechanism: "N/A", speciesNotes: "Uniformly fatal in humans.", limitations: "No cure.", resistance: "N/A" }
    ],
    control: {
      farm: "Eradication of BSE in cattle (feed bans).",
      animal: "N/A",
      human: "Leukodepletion of blood donations, specialized sterilization of neurosurgical instruments.",
      government: "BSE surveillance, ban on specified risk materials (SRM) in food chain."
    },
    publicHealth: { economic: "Massive historical impact on beef trade.", foodSafety: "SRM bans are critical.", wildlifeInterface: "N/A" },
    onehealth: { human: "Dietary exposure to BSE prions.", animal: "BSE amplification via meat-and-bone meal.", environment: "N/A" },
    references: ["WHO vCJD", "CDC Prion Diseases"]
  }
`;

const fs = require('fs');
const file = 'C:\\Users\\hares\\.antigravity\\Zoonotix\\scratch\\zoonotix_content_enrichment.js';
let code = fs.readFileSync(file, 'utf8');
code = code.replace(/};\s*\n+\/\/ Export or expose/, ",\n" + newDataStr + "\n};\n\n// Export or expose");
fs.writeFileSync(file, code);
console.log("Successfully added Batch 2 (Viral).");

// ==========================================
// ZOONOTIX PHASE 4 — SCIENTIFICALLY ACCURATE CONTENT ENRICHMENT
// Sourced from: WOAH Terrestrial Manual, WHO Guidelines, CDC, FAO, Merck Veterinary Manual
// ==========================================

const diseaseEnrichment = {
  // --- BACTERIAL ZOONOSES ---
  anthrax: {
    definition: "A hyperacute or acute, highly infectious febrile disease of all warm-blooded animals and humans characterized by septicemia, rapid death, and exudation of tarry, non-coagulating blood from natural orifices.",
    etiology: "Bacillus anthracis; Gram-positive, spore-forming, rod-shaped bacterium. Produces tripartite toxin: Protective Antigen (PA), Lethal Factor (LF), and Edema Factor (EF).",
    taxonomy: "Family Bacillaceae, Genus Bacillus, Species B. anthracis.",
    vetImportance: "Causes catastrophic livestock mortality events. Spores contaminate grazing pastures for decades, posing a permanent ecological threat to herds.",
    publicHealthImportance: "Bioterrorism concern (Category A agent). Cutaneous forms can progress to fatal septicemia; inhalation anthrax is highly lethal.",
    riskGroups: "Veterinarians, tannery workers, abattoir workers, pastoralists handling carcasses.",
    envSurvival: "Endospores are extremely resistant to heat, desiccation, common disinfectants, and remain viable in dry alkaline soil for 50+ years.",
    pathogenesis: {
      entry: "Ingestion of soil spores (livestock); skin abrasions, inhalation, or ingestion of contaminated meat (humans).",
      spread: "Germination in macrophages, migration to regional lymph nodes, multiplication, lymphatic spread into blood stream, massive septicemia.",
      organs: ["Spleen", "Blood vessels", "Lungs (inhalation)", "Lymph nodes"],
      lesions: "Splenomegaly (spleen is soft, black, and 'raspberry jam' like), widespread capillary thrombosis, hemorrhages, edema."
    },
    clinicalSigns: {
      animals: {
        acute: "Sudden onset of high fever, dyspnea, muscle tremors, collapse, rapid death within 1-2 hours. Bleeding of dark, tarry, uncoagulated blood from nose, mouth, anus.",
        chronic: "Localized edematous swellings in throat, neck, and shoulders (common in pigs and dogs).",
        subclinical: "Mild transient fever in partially immune animals."
      },
      humans: {
        acute: "Cutaneous: Painless pruritic papule developing into a black eschar surrounded by vesicles and edema. Inhalation: Fever, chills, cough, severe mediastinitis, dyspnea, shock.",
        chronic: "Severe gastrointestinal ulceration, hematemesis, bloody diarrhea (gastrointestinal form).",
        subclinical: "Extremely rare; typical exposure leads to clinical manifestations."
      }
    },
    lesionsDesc: {
      gross: "Splenomegaly with dark, liquefied parenchyma. Absence of rigor mortis. Bloated carcass with blood exuding from natural orifices. Dark, tarry, uncoagulated blood.",
      histopathology: "Massive bacterial emboli in capillaries. Hemorrhagic lymphadenitis. Splenic necrosis. Diffuse capillary congestion.",
      hallmark: "Splenomegaly with liquefied pulp and dark, uncoagulable blood."
    },
    diagnosis: {
      history: "Grazing in known endemic soil zone, sudden deaths, lack of rigor mortis.",
      signs: "Sudden death, uncoagulated black blood from orifices.",
      samples: "Peripheral blood smear (ear vein) collected using strict precautions. DO NOT OPEN CARCASS (prevents sporulation).",
      tests: [
        { test: "Polychrome M'Fadyean Staining", type: "Microscopy", description: "Demonstrates blue bacilli with pink capsular material." },
        { test: "PCR", type: "Molecular", description: "Detects toxin gene plasmids (pXO1 and pXO2) with high specificity." },
        { test: "Ascoli Precipitin Test", type: "Immunological", description: "Detects thermostable anthrax antigen in decayed tissues." }
      ],
      differentials: [
        { disease: "Blackquarter (BQ)", keyDiff: "Crepitating swellings in major muscle groups, acidic odor, coagulated blood.", mistake: "Both cause sudden death; BQ carcass has rigor mortis." },
        { disease: "Lightning Strike", keyDiff: "Singed hair, tree-bark patterns on skin, grass in mouth.", mistake: "Both cause sudden death; lightning carcass lacks tarry blood." }
      ]
    },
    treatment: [
      { drug: "Penicillin G", purpose: "Primary antibiotic therapy", mechanism: "Cell wall synthesis inhibitor", speciesNotes: "Drug of choice in susceptible livestock.", limitations: "Ineffective after toxemia is established.", resistance: "Rare in wild isolates." },
      { drug: "Ciprofloxacin", purpose: "Alternative or post-exposure prophylaxis", mechanism: "DNA gyrase inhibitor", speciesNotes: "First-line prophylaxis in humans exposed to aerosol spores.", limitations: "High cost in veterinary medicine.", resistance: "Can be induced in vitro." }
    ],
    control: {
      farm: "Quarantine infected premises. Sterne strain live spore vaccination of all healthy animals annually.",
      animal: "Incinerate carcasses at site of death or bury deep (>2m) with quicklime. Avoid post-mortem examination.",
      human: "PPE for veterinarians and handlers. Ciprofloxacin prophylaxis post-exposure.",
      government: "National surveillance through NADRS. Reporting to WOAH. Strict quarantine bounds."
    },
    publicHealth: {
      economic: "Severe trade restrictions on hides, wool, and meat. Complete loss of dairy and beef productivity in affected zones.",
      foodSafety: "Immediate condemnation of milk and meat from exposed herds. High threat from carcass scavenging.",
      wildlifeInterface: "Affects wild herbivores (elephants, bison, deer). Soil reservoirs bridge domestic and wild ecosystems."
    },
    onehealth: {
      human: "Spillover via contact with infected hides, carcass handling, or inhalation of wool dust.",
      animal: "Ingestion of persistent spores from soil or bone meal feed.",
      environment: "Soil chemistry (alkaline, calcium-rich soils) and flooding events promote spore persistence and exposure."
    },
    references: ["WOAH Terrestrial Manual Chapter 3.1.1", "WHO Guidelines on Anthrax in Humans and Animals (4th Ed)", "Merck Veterinary Manual - Anthrax Section"]
  },

  brucellosis: {
    definition: "A chronic, contagious bacterial disease of livestock, dogs, and humans characterized by abortion in females, orchitis and accessory sex gland infection in males, and undulant fever in humans.",
    etiology: "Brucella species (B. abortus in cattle, B. melitensis in sheep/goats, B. suis in pigs, B. canis in dogs). Gram-negative, facultative intracellular coccobacilli.",
    taxonomy: "Family Brucellaceae, Genus Brucella.",
    vetImportance: "Causes massive reproductive failure (abortion storms, infertility) in dairy cattle, buffalo, goats, and sheep. Substantial herd economic wastage.",
    publicHealthImportance: "Major occupational disease. Leads to chronic debilitating multi-organ disease (Undulant Fever) with joint, cardiovascular, and neural complications in humans.",
    riskGroups: "Veterinarians assisting parturition, dairy farmers, artificial insemination technicians, raw milk consumers.",
    envSurvival: "Survives in pasture, aborted fetuses, and uterine discharge for up to 4 months in cool, damp environments; killed easily by pasteurization.",
    pathogenesis: {
      entry: "Ingestion, inhalation, or penetration of conjunctival/skin mucosa by vaginal discharges, raw milk, semen.",
      spread: "Phagocytosed by macrophages, migrates to regional lymph nodes, bacteremia, localization in erythritol-rich reproductive organs (gravid uterus, placenta, testes).",
      organs: ["Placenta", "Uterus", "Epididymis", "Spleen", "Mammary glands"],
      lesions: "Necrotic placentitis, endometritis, granulomatous epididymitis, synovitis."
    },
    clinicalSigns: {
      animals: {
        acute: "Abortion storms in third trimester (typically between 5th and 8th months in cattle). Retained placenta, metritis, and vaginal discharge.",
        chronic: "Infertility, hygromas on knee joints, decreased milk production. Males develop orchitis and epididymitis.",
        subclinical: "Carrier state with excretion of bacteria in milk and vaginal fluids without active abortion."
      },
      humans: {
        acute: "Undulant fever (fluctuating temperature peaks), drenching night sweats, severe arthralgia, headache, malaise.",
        chronic: "Spondylitis, chronic fatigue syndrome, depression, endocarditis, orchitis.",
        subclinical: "Seropositivity without overt systemic manifestations."
      }
    },
    lesionsDesc: {
      gross: "Edematous, leathery, yellow-brown placenta with necrotic cotyledons. Fetus has blood-tinged fluid in cavities.",
      histopathology: "Necrotic vasculitis of placental villi. Granulomatous reactions in liver, spleen, and epididymis.",
      hallmark: "Leathery thickening of placenta with necrotic yellow-gray cotyledons."
    },
    diagnosis: {
      history: "Unexplained abortions in late pregnancy in herd, consumption of raw milk, handling uterine discharges.",
      signs: "Late abortions, hygroma, testicular swelling in bulls.",
      samples: "Aborted fetus stomach content, placenta, milk samples, serum.",
      tests: [
        { test: "Rose Bengal Plate Test (RBPT)", type: "Serology", description: "Rapid, highly sensitive screening test using buffered antigen." },
        { test: "Standard Tube Agglutination Test", type: "Serology", description: "Quantifies antibody titers (IgG and IgM)." },
        { test: "Milk Ring Test (MRT)", type: "Screening", description: "Blue ring in cream layer indicates positive herd antibodies." },
        { test: "Bacterial Isolation", type: "Culture", description: "Gold standard - culture on Farrell's medium from placenta or fetal stomach." }
      ],
      differentials: [
        { disease: "Listeriosis", keyDiff: "Often shows neurological signs in herd, necrotic liver foci in aborted fetus.", mistake: "Both cause late-term abortion and necrotic placentitis." },
        { disease: "Leptospirosis", keyDiff: "Associated with icterus and hemoglobinuria in calves and cows.", mistake: "Both cause reproductive loss and are occupational hazards." }
      ]
    },
    treatment: [
      { drug: "Doxycycline + Rifampicin", purpose: "First-line human combination", mechanism: "Protein synthesis inhibitors", speciesNotes: "Standard WHO regimen for human brucellosis (6 weeks).", limitations: "High relapse rate if compliance is poor.", resistance: "Rarely reported." },
      { drug: "Oxytetracycline", purpose: "Veterinary suppression (rare)", mechanism: "Protein synthesis inhibitor", speciesNotes: "Veterinary treatment generally discouraged due to carrier state creation.", limitations: "Does not cure; animal must be culled.", resistance: "Not clinically relevant." }
    ],
    control: {
      farm: "Implement strict biosecurity. Isolate aborting cows immediately. Burn aborted fetuses and membranes.",
      animal: "Vaccinate female calves (4-8 months) with B. abortus Strain 19 or RB51. Test and slaughter positive reactor herds.",
      human: "Universal pasteurization of milk. Use long gloves and PPE during veterinary calving assistance.",
      government: "National Brucellosis Control Programme in India. Standardized sero-surveillance."
    },
    publicHealth: {
      economic: "Severe drop in dairy sector yields. High costs of heifer replacement and vaccination campaigns.",
      foodSafety: "Milk safety hazard. Raw butter and soft cheeses act as vehicles.",
      wildlifeInterface: "Spillover reservoir in wild swine (feral pigs) and wild ruminants (bison, deer)."
    },
    onehealth: {
      human: "Exposure via ingestion of raw dairy or contact with infectious fluids.",
      animal: "Abortion discharge contaminates pasture, feed, and water holes.",
      environment: "Moist, cool environmental niches support bacterial survival outside host."
    },
    references: ["WOAH Terrestrial Manual Chapter 3.1.4", "WHO Brucellosis in Humans and Animals Guidelines", "Merck Veterinary Manual - Brucellosis"]
  },

  leptospirosis: {
    definition: "An acute or chronic zoonotic septicemic disease of domestic animals, dogs, and humans caused by spirochetes of the genus Leptospira, manifesting as fever, icterus, hemoglobinuria, renal failure, and abortion.",
    etiology: "Leptospira interrogans (>300 serovars including Pomona, Grippotyphosa, Hardjo, Canicola, Icterohaemorrhagiae). Gram-negative, thin, helically coiled motile spirochetes with hooked ends.",
    taxonomy: "Family Leptospiraceae, Genus Leptospira.",
    vetImportance: "Causes acute septicemia, hemolysis, renal damage, and abortion storms in livestock, cattle, pigs, and dogs. Significant economic dairy herd drain.",
    publicHealthImportance: "Worldwide threat; hyper-endemic in tropical flood zones. Progresses to severe icteric renal failure (Weil's Disease) or fatal pulmonary hemorrhage.",
    riskGroups: "Rice paddy farmers, sewer workers, veterinarians, flood rescue teams, dog handlers.",
    envSurvival: "Thrives in warm, humid, alkaline soils and standing fresh water. Spirochetes die rapidly in acidic soils, dryness, and salt water.",
    pathogenesis: {
      entry: "Penetration of damaged skin or mucous membranes (conjunctiva, mouth) from contact with rodent/carrier urine or contaminated water.",
      spread: "Bacteremia, systemic colonization, multiplication, localization in proximal renal tubules, liver, and gravid uterus.",
      organs: ["Kidneys", "Liver", "Spleen", "Uterus", "Lungs"],
      lesions: "Tubulointerstitial nephritis, focal hepatic necrosis, capillary endothelial damage leading to widespread hemorrhages."
    },
    clinicalSigns: {
      animals: {
        acute: "Calves: High fever, icterus (yellow mucous membranes), hemoglobinuria (red/coffee-colored urine), hemolytic anemia, dyspnea. Milk drop syndrome in dairy cows.",
        chronic: "Abortion, stillbirths, birth of weak calves, chronic nephritis.",
        subclinical: "Asymptomatic renal shedders (particularly pigs and dogs)."
      },
      humans: {
        acute: "Biphasic: Sudden high fever, severe calf muscle pain (myalgia), conjunctival suffusion (redness without discharge), headache.",
        chronic: "Weil's Disease: Jaundice, acute renal failure, hemorrhage, myocarditis. Pulmonary Hemorrhagic Syndrome.",
        subclinical: "Seroprevalence in endemic agricultural workers without clinical history."
      }
    },
    lesionsDesc: {
      gross: "Yellow discoloration of carcass tissues (icterus). Petechial hemorrhages in lungs ('butterfly pattern'). Swollen, pale kidneys with subcapsular hemorrhages.",
      histopathology: "Interstitial nephritis with lymphocyte and plasma cell infiltration. Disassociation of hepatocytes. Leptospires visible in tubules using silver stains.",
      hallmark: "Focal interstitial nephritis and widespread tissue icterus."
    },
    diagnosis: {
      history: "Exposure to standing water or monsoonal floodwater, history of rodent infestation, contact with farm dog.",
      signs: "Calf muscle pain, conjunctival suffusion, red urine in livestock.",
      samples: "Blood/CSF in acute phase (first week); urine in chronic phase (after day 7); paired serum samples.",
      tests: [
        { test: "Microscopic Agglutination Test (MAT)", type: "Serology", description: "Gold standard serology - determines specific serovar agglutination titers." },
        { test: "Darkfield Microscopy", type: "Direct detection", description: "Visualizes motile spirochetes in fresh urine or blood." },
        { test: "PCR", type: "Molecular", description: "Detects leptospiral DNA in blood, urine, or tissue homogenates during early infection." }
      ],
      differentials: [
        { disease: "Babesiosis", keyDiff: "Vector-borne (ticks), protozoan inside erythrocytes on blood smear, no renal failure.", mistake: "Both cause fever, icterus, and red urine (hemoglobinuria) in cattle." },
        { disease: "Bacillary Hemoglobinuria", keyDiff: "Caused by Clostridium haemolyticum, shows characteristic hepatic infarct.", mistake: "Both present with severe hemolysis and dark red urine." }
      ]
    },
    treatment: [
      { drug: "Doxycycline", purpose: "Mild cases and prophylaxis", mechanism: "Protein synthesis inhibitor", speciesNotes: "First choice for dog leptospirosis and human early stage.", limitations: "May cause gastrointestinal upset.", resistance: "Minimal." },
      { drug: "Penicillin G / Ampicillin", purpose: "Severe acute septicemia", mechanism: "Cell wall synthesis inhibitor", speciesNotes: "Intravenous administration in hospitalized human/dog patients.", limitations: "Does not eliminate the renal carrier state.", resistance: "Not reported." },
      { drug: "Dihydrostreptomycin", purpose: "Eliminate carrier state", mechanism: "Aminoglycoside", speciesNotes: "Used in cattle and pigs to clear renal leptospiruria.", limitations: "Nephrotoxic potential; milk withdrawal times.", resistance: "Rare." }
    ],
    control: {
      farm: "Rodent control programmes. Drain standing water. Exclude livestock from swampy pastures.",
      animal: "Vaccination of cattle, pigs, and dogs using multivalent leptospiral bacterins annually.",
      human: "Doxycycline prophylaxis (200 mg weekly) for crop workers during floods. Wear rubber boots.",
      government: "State health department notification. Integrated disease surveillance programmes during monsoons."
    },
    publicHealth: {
      economic: "Loss of dairy cattle productivity, calf mortality, and crop-worker absenteeism during monsoons.",
      foodSafety: "Milk safety is rarely compromised if pasteurized, but direct contact with raw milk of leptospiruric cows is a risk.",
      wildlifeInterface: "Rodents (Rattus norvegicus) act as primary reservoir hosts, shedding leptospires in urine without disease."
    },
    onehealth: {
      human: "Wading in flood waters contaminated with rodent urine spreads infection.",
      animal: "Rodents shed leptospires into standing water on pasture land.",
      environment: "Heavy rainfall and flooding events create contaminated water tables that maintain spirochetes."
    },
    references: ["WOAH Terrestrial Manual Chapter 3.1.12", "WHO Leptospirosis Diagnosis and Control Guidelines", "CDC Leptospirosis Resources"]
  },

  tuberculosis: {
    definition: "A chronic granulomatous infectious disease of cattle, domestic animals, and humans caused by Mycobacterium bovis, manifesting as progressive wasting, lung lesions, lymphadenitis, and chronic cough.",
    etiology: "Mycobacterium bovis; acid-fast, aerobic, slow-growing bacillus. Possesses lipid-rich cell wall (mycolic acid) providing acid-fast staining characteristics.",
    taxonomy: "Family Mycobacteriaceae, Genus Mycobacterium, Mycobacterium tuberculosis complex.",
    vetImportance: "Causes chronic debilitating tuberculosis in cattle herds, buffaloes, and goats. Leads to heavy carcass condemnation at slaughter.",
    publicHealthImportance: "M. bovis causes human tuberculosis (zoonotic TB) indistinguishable from M. tuberculosis. Hard to treat due to intrinsic pyrazinamide resistance.",
    riskGroups: "Dairy farmers, abattoir workers, veterinarians, raw milk consumers.",
    envSurvival: "Mycolic acid layer protects against desiccation, acids, and alkalis. Survives in moist feces, soil, and barns for weeks to months.",
    pathogenesis: {
      entry: "Inhalation of aerosols (farm contact); ingestion of raw milk/dairy (humans).",
      spread: "Phagocytosed by alveolar macrophages, intracellular survival, granuloma (tubercle) formation in lungs and lymph nodes, lymphatic dissemination.",
      organs: ["Lungs", "Mediastinal lymph nodes", "Spleen", "Intestines (ingestion)", "Udder"],
      lesions: "Caseous necrosis, calcified granulomas (tubercles) in lungs, lymph nodes, and thoracic cavity ('pearl disease')."
    },
    clinicalSigns: {
      animals: {
        acute: "Clinical signs are rarely acute. Slowly progressive emaciation, fluctuating low-grade fever, dry cough, dyspnea.",
        chronic: "Progressive emaciation ('wasting disease'), chronic painful cough, enlargement of retropharyngeal and mediastinal lymph nodes.",
        subclinical: "Most infected cows are subclinical reactors, appearing completely healthy but shedding bacteria."
      },
      humans: {
        acute: "Usually insidious. Chronic cough, hemoptysis (bloody sputum), night sweats, weight loss, pleural effusion.",
        chronic: "Extra-pulmonary TB: Cervical lymphadenitis ('scrofula'), abdominal TB, spinal tuberculosis (Pott's disease).",
        subclinical: "Latent tuberculosis infection; positive tuberculin test without clinical symptoms."
      }
    },
    lesionsDesc: {
      gross: "Yellow, caseated, gritty (calcified) nodules in bronchial and mediastinal lymph nodes, lungs, and liver. Nodular growths on pleura ('pearl disease').",
      histopathology: "Classical tubercle: Central caseous necrosis surrounded by epithelioid cells, Langhans giant cells, and outer zone of lymphocytes and fibrous tissue.",
      hallmark: "Granulomatous tubercles with central caseous necrosis and calcification."
    },
    diagnosis: {
      history: "Unpasteurized milk consumption, history of chronic wasting in herd, positive skin test reactor.",
      signs: "Chronic dry cough, progressive emaciation despite feeding.",
      samples: "Sputum, tracheobronchial aspirates, lymph node aspirates, post-mortem lung tissue.",
      tests: [
        { test: "Single Intradermal Tuberculin Test (SID)", type: "Screening", description: "Injects bovine PPD intradermally in caudal fold; swelling at 72 hours indicates hypersensitivity." },
        { test: "Comparative Intradermal Test", type: "Confirmatory", description: "Compares bovine and avian PPD reactions to exclude environmental mycobacterial cross-reactions." },
        { test: "Ziehl-Neelsen Staining", type: "Microscopy", description: "Acid-fast red bacilli visible against blue background." },
        { test: "culture", type: "Culture", description: "Culture on Lowenstein-Jensen or Stonebrink medium (takes 4-8 weeks)." }
      ],
      differentials: [
        { disease: "Johne's Disease (Paratuberculosis)", keyDiff: "Caused by M. avium subsp. paratuberculosis, shows corrugation of intestinal mucosa and watery diarrhea.", mistake: "Both cause chronic wasting in cattle." },
        { disease: "Actinobacillosis (Wooden Tongue)", keyDiff: "Granuloma of tongue with club-like bacteria on histopathology.", mistake: "Both present with chronic granulomatous head lymph node swellings." }
      ]
    },
    treatment: [
      { drug: "Isoniazid + Rifampicin + Ethambutol", purpose: "Human zoonotic TB therapy", mechanism: "Mycolic acid and RNA synthesis inhibitors", speciesNotes: "Standard 6-month regimen in humans.", limitations: "Intrinsic resistance of M. bovis to Pyrazinamide.", resistance: "Growing threat of MDR-TB." },
      { drug: "None (Livestock)", purpose: "Slaughter policy", mechanism: "N/A", speciesNotes: "Treatment of animals is illegal in most countries to prevent drug-resistant strains.", limitations: "High slaughter compensation costs.", resistance: "N/A" }
    ],
    control: {
      farm: "Maintain closed herds. Regular Caudal Fold testing. Exclude skin test reactors from milking.",
      animal: "Test-and-slaughter policy in cattle. Cull reactors. Disinfect premises with phenolic agents.",
      human: "Mandatory pasteurization of milk. PPE in abattoirs. BCG vaccination (variable protection).",
      government: "National Bovine TB surveillance. Meat inspection screening at all licensed slaughterhouses."
    },
    publicHealth: {
      economic: "Trade blockades on live cattle and dairy products. Severe herd replacement losses.",
      foodSafety: "Milk-borne threat. M. bovis remains viable in raw milk, raw cream, and aged cheeses.",
      wildlifeInterface: "Sylvatic reservoirs maintain cycle: badgers (UK), wild boar (Europe), deer (US), opossums (NZ)."
    },
    onehealth: {
      human: "Contracted by drinking raw milk or inhaling aerosols from infected cattle.",
      animal: "Cattle contract from respiratory contact or sharing feed/water with infected cattle or wildlife.",
      environment: "Shedding in feces contaminates soils and pastures in damp, shaded settings."
    },
    references: ["WOAH Terrestrial Manual Chapter 3.4.6", "WHO Zoonotic Tuberculosis Roadmap", "Merck Veterinary Manual - Bovine Tuberculosis"]
  },

  // --- VIRAL ZOONOSES ---
  rabies: {
    definition: "An acute, progressive, fatal encephalomyelitis of all warm-blooded animals and humans caused by neurotropic lyssaviruses, characterized by severe behavioral changes, ascending paralysis, hydrophobia, and inevitable death once clinical signs manifest.",
    etiology: "Rabies lyssavirus (RABV); negative-sense, single-stranded RNA virus. Bullet-shaped (75 x 180 nm) virion, enveloped with tightly packed glycoprotein (G) spikes that mediate host cell entry via acetylcholine receptors. Highly fragile in the environment.",
    taxonomy: "Order: Mononegavirales, Family: Rhabdoviridae, Genus: Lyssavirus. Multiple genotypes exist globally, but classic Rabies virus is Genotype 1.",
    vetImportance: "High-mortality threat to livestock and domestic animals. Dogs serve as the primary epidemiological reservoir and sentinel for human exposure in developing nations.",
    publicHealthImportance: "Nearly 100% Case Fatality Rate (CFR) once clinical signs appear. India bears the highest global burden, accounting for ~36% of global human rabies deaths (approx. 20,000 annually).",
    riskGroups: "Veterinarians, dog catchers, forest rangers, animal shelter workers, children in endemic regions (highest incidence of bites).",
    envSurvival: "Lacks environmental stability. The lipid envelope is rapidly inactivated by drying, sunlight (UV), heat, lipid solvents (ether, chloroform), and common detergents (hence the critical importance of immediate wound washing).",
    pathogenesis: {
      entry: "Virus-laden saliva enters via bite, deep scratch, or mucosal exposure. Primary replication occurs locally in striated muscle cells (myocytes).",
      spread: "Binds to nicotinic acetylcholine receptors at neuromuscular junctions. Travels centripetally (towards CNS) via retrograde axoplasmic flow in motor and sensory nerves (8-20 mm/day) to the dorsal root ganglia, then spinal cord and brain. Once encephalitis is established, travels centrifugally (away from CNS) to salivary glands, cornea, and skin.",
      organs: ["Brain (hippocampus, cerebellum, brainstem)", "Salivary glands (highly concentrated for transmission)", "Spinal cord", "Peripheral nerves", "Corneal epithelium"],
      lesions: "Non-suppurative polioencephalomyelitis, neuronal degeneration, ganglioneuritis, and pathognomonic cytoplasmic Negri bodies in specific neurons."
    },
    clinicalSigns: {
      animals: {
        acute: "<div style='margin-bottom:8px'><strong>Furious Rabies (Encephalitic):</strong> Restlessness, aggression, loss of fear of humans, biting inanimate objects (pica), hyper-reactivity to stimuli, change in bark tone (vocal cord paralysis).</div><div><strong>Dumb Rabies (Paralytic):</strong> Profuse salivation, inability to swallow, paralysis of lower jaw ('dropped jaw'), progressive ataxia, and ascending paralysis.</div><div class='clinical-pearl'><strong>💡 Clinical Pearl:</strong> In cattle, the dumb form is most common. It is frequently misdiagnosed as choking on a foreign body. Veterinarians attempting manual extraction without PPE are at extreme risk of exposure.</div>",
        chronic: "Does not occur. Rapidly progresses to coma and death, typically within 10 days of symptom onset. Any dog surviving >14 days post-bite was likely not shedding virus at the time.",
        subclinical: "No true subclinical state. The incubation period is asymptomatic (days to years), but the clinical phase is invariably acute and fatal."
      },
      humans: {
        acute: "<div style='margin-bottom:8px'><strong>Prodromal Phase:</strong> Fever, malaise, and highly suggestive neuropathic pain/tingling at the healed bite site.</div><div style='margin-bottom:8px'><strong>Furious Form (80%):</strong> Hydrophobia (laryngeal spasms triggered by sight, sound, or thought of water), aerophobia, hallucinations, episodic autonomic hyperactivity.</div><div><strong>Paralytic Form (20%):</strong> Ascending flaccid paralysis (often misdiagnosed as Guillain-Barré syndrome).</div>",
        chronic: "N/A - death generally occurs within 2-14 days of symptom onset due to cardiopulmonary arrest.",
        subclinical: "N/A - invariably fatal once clinical. <div class='pitfall'><strong>⚠️ Diagnostic Pitfall:</strong> The paralytic form lacks classic hydrophobia and is notoriously underdiagnosed in human hospitals.</div>"
      }
    },
    lesionsDesc: {
      gross: "No characteristic gross pathology. Findings are non-specific: congestion of meninges, dry brain parenchyma, self-inflicted bite wounds, foreign bodies in stomach (pica).",
      histopathology: "Perivascular cuffing (lymphocytes), microglial nodules (Babes nodules). Pathognomonic Negri bodies (round/oval eosinophilic cytoplasmic inclusion bodies).",
      hallmark: "Presence of eosinophilic Negri bodies in the cytoplasm of Purkinje cells (cerebellum) in herbivores, and pyramidal cells (hippocampus) in carnivores."
    },
    diagnosis: {
      history: "History of animal bite, scratch, licks on broken skin, stray dog exposure, lack of robust vaccination history.",
      signs: "Dropped jaw in dogs; hydrophobia and aerophobia in humans.",
      samples: "Full brain (cerebellum, hippocampus, and brainstem) post-mortem. <strong>Must be refrigerated (on ice), NOT frozen or formalin-fixed</strong>, as this interferes with the FAT.",
      tests: [
        { test: "Fluorescent Antibody Test (dFAT)", type: "Immunological", description: "Gold standard - detects rabies viral antigens in fresh brain smears using FITC-conjugates. High sensitivity and specificity." },
        { test: "RTCIT", type: "Cell Culture", description: "Rabies tissue culture infection test (using neuroblastoma cells) used as a confirmatory backup for doubtful FAT results." },
        { test: "RT-PCR", type: "Molecular", description: "Detects viral RNA in saliva, CSF, or brain tissue; useful for intra-vitam human diagnosis and epidemiological lineage tracing." }
      ],
      differentials: [
        { disease: "Canine Distemper", keyDiff: "Presents with hyperkeratosis of footpads ('hard pad'), mucopurulent oculonasal discharge, and both cytoplasmic AND nuclear inclusions.", mistake: "Both cause severe neurological convulsions and sudden aggression in young dogs." },
        { disease: "Pseudorabies (Aujeszky's Disease)", keyDiff: "Caused by a porcine herpesvirus, characterized by intense pruritus ('mad itch') and self-mutilation at the entry site.", mistake: "Both cause acute salivation, vocalization, paralysis, and rapid death in cattle and dogs." }
      ]
    },
    treatment: [
      { 
        drug: "Human Post-Exposure Prophylaxis (PEP)", 
        purpose: "Neutralize virus before it enters peripheral nerves", 
        mechanism: "Immediate active + passive immunization", 
        speciesNotes: "<strong>Step 1:</strong> Thorough wound washing (15 mins running soap/water or povidone-iodine). <strong>Step 2:</strong> Rabies Immunoglobulin (RIG) infiltrated directly into and around the wound (passive). <strong>Step 3:</strong> Cell culture vaccine series (active) via IM or ID route. <div style='margin-top:16px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:12px;'><div style='font-family:DM Mono;font-size:12px;color:var(--accent);margin-bottom:8px;'>WHO PEP CATEGORIES DIAGRAM</div><svg width='100%' height='auto' viewBox='0 0 500 200' style='background:#1a2332;border-radius:4px;'><rect x='20' y='20' width='140' height='60' rx='4' fill='#2a354a'/><text x='90' y='45' fill='#e8f0fe' font-size='12' text-anchor='middle'>Category I</text><text x='90' y='65' fill='#6b8cae' font-size='10' text-anchor='middle'>Touch/Lick intact skin</text><rect x='20' y='100' width='140' height='30' rx='4' fill='none' stroke='#00d4aa'/><text x='90' y='119' fill='#00d4aa' font-size='11' text-anchor='middle'>Wash only</text><path d='M90,80 L90,100' stroke='#6b8cae' marker-end='url(#arrow)'/><rect x='180' y='20' width='140' height='60' rx='4' fill='#2a354a'/><text x='250' y='45' fill='#e8f0fe' font-size='12' text-anchor='middle'>Category II</text><text x='250' y='65' fill='#6b8cae' font-size='10' text-anchor='middle'>Minor scratches</text><rect x='180' y='100' width='140' height='30' rx='4' fill='none' stroke='#e8a838'/><text x='250' y='119' fill='#e8a838' font-size='11' text-anchor='middle'>Wash + Vaccine</text><path d='M250,80 L250,100' stroke='#6b8cae' marker-end='url(#arrow)'/><rect x='340' y='20' width='140' height='60' rx='4' fill='#2a354a'/><text x='410' y='45' fill='#e8f0fe' font-size='12' text-anchor='middle'>Category III</text><text x='410' y='65' fill='#6b8cae' font-size='10' text-anchor='middle'>Bites/Licks on mucosa</text><rect x='340' y='100' width='140' height='30' rx='4' fill='none' stroke='#e84444'/><text x='410' y='119' fill='#e84444' font-size='11' text-anchor='middle'>Wash + Vac + RIG</text><path d='M410,80 L410,100' stroke='#6b8cae' marker-end='url(#arrow)'/><defs><marker id='arrow' viewBox='0 0 10 10' refX='5' refY='5' markerWidth='4' markerHeight='4' orient='auto-start-reverse'><path d='M 0 0 L 10 5 L 0 10 z' fill='#6b8cae'/></marker></defs></svg></div>", 
        limitations: "Must be given before clinical signs start; ineffective after symptoms appear (virus protected by blood-brain barrier).", 
        resistance: "N/A" 
      },
      { 
        drug: "None (Animals)", 
        purpose: "Prevention of spread", 
        mechanism: "Humane euthanasia", 
        speciesNotes: "Suspected rabid animals must be humanely euthanized and tested. Treatment is strictly prohibited by veterinary public health laws.", 
        limitations: "N/A", 
        resistance: "N/A" 
      }
    ],
    control: {
      farm: "Prophylactic vaccination of cattle/horses in high endemic zones. Immediate isolation and reporting of suspect cases. Do not butcher or consume meat from rabid animals.",
      animal: "Mass dog vaccination campaigns (70% coverage breaks transmission cycles). Animal Birth Control (ABC) stray dog management.",
      human: "Pre-exposure vaccination for high-risk workers (vets, lab staff). Immediate PEP post-bite. Intense community education on wound washing.",
      government: "National Rabies Control Programme (NRCP) in India implementing the 'One Health' approach. Declaration of rabies-free zones (e.g. Goa)."
    },
    publicHealth: { 
      economic: "Massive burden: cost of PEP biologicals, loss of livestock (cattle), and loss of human life/productivity.", 
      foodSafety: "Virus is not typically meat-borne, but butchering a rabid animal poses extreme occupational risk to butchers via cuts/abrasions.", 
      wildlifeInterface: "Sylvatic reservoirs (foxes, jackals, mongooses) can maintain the virus independently and spill over to unvaccinated domestic dogs." 
    },
    onehealth: { 
      human: "100% reliant on dog population management and rapid PEP access for survival.", 
      animal: "Dog vaccination is the single most cost-effective intervention to prevent human deaths.", 
      environment: "Waste management impacts stray dog carrying capacity. Expanding urban borders increase wildlife-dog-human interfaces." 
    },
    references: ["WOAH Terrestrial Manual (Chapter 3.1.17)", "WHO Expert Consultation on Rabies", "Merck Veterinary Manual - Rabies", "National Rabies Control Programme (India) Guidelines"]
  },
  nipah: {
    definition: "An emerging, highly lethal zoonotic viral disease of pigs, bats, and humans caused by henipaviruses, presenting as acute respiratory distress and severe encephalitis with high case fatality rates.",
    etiology: "Nipah virus (NiV); negative-sense, single-stranded enveloped RNA virus. Member of Henipavirus genus.",
    taxonomy: "Family Paramyxoviridae, Genus Henipavirus.",
    vetImportance: "Causes acute respiratory illness ('One-mile cough') and nervous signs in pigs. Acts as amplifying hosts.",
    publicHealthImportance: "WHO Priority Pathogen. Causes severe neurological damage and fatal encephalitis (CFR 40-75%). High potential for human-to-human transmission.",
    riskGroups: "Pig farmers, abattoir workers, veterinarians, healthcare workers, palm sap collectors.",
    envSurvival: "Highly sensitive to heat, detergents, and disinfectants. Survives in bat urine and fruit juices for several hours at neutral pH.",
    pathogenesis: {
      entry: "Ingestion of date palm sap contaminated with bat saliva/urine, contact with infected pig tissues, respiratory droplets.",
      spread: "Enters mucosal epithelium, infects endothelial cells, systemic dissemination, targets microvascular endothelial cells of brain.",
      organs: ["Brain (CNS)", "Lungs", "Spleen", "Kidneys"],
      lesions: "Endothelial syncytia formation, vasculitis, thrombosis, focal necrosis in brain."
    },
    clinicalSigns: {
      animals: {
        acute: "Pigs: Acute fever, labored breathing, loud explosive cough ('barking pig syndrome'), trembling, muscle spasms.",
        chronic: "Neurological sequels in surviving pigs.",
        subclinical: "Asymptomatic carrier state in adult sows and boars."
      },
      humans: {
        acute: "Sudden high fever, severe headache, drowsiness, mental confusion, progress to coma within 24-48 hours. Atypical pneumonia.",
        chronic: "Relapsed or late-onset encephalitis months/years after recovery.",
        subclinical: "Serologically positive individuals detected during outbreak tracing without clinical history."
      }
    },
    lesionsDesc: {
      gross: "Pigs: Pulmonary consolidation, tracheal exudate, congested meninges. Humans: Cerebral edema, petechial hemorrhages in brain slices.",
      histopathology: "Systemic endothelial syncytial cells in capillaries. Necrotizing vasculitis. Viral inclusions in brain tissue.",
      hallmark: "Microvascular syncytial giant cell formation and vasculitis in brain."
    },
    diagnosis: {
      history: "Consumption of raw date palm sap, contact with sick pigs, exposure to fruit bat roosting trees, contact with index case.",
      signs: "Explosive cough in pigs, rapid onset coma in humans.",
      samples: "Throat swabs, urine, blood, CSF, post-mortem brain tissue. Handle under BSL-4 conditions.",
      tests: [
        { test: "RT-PCR", type: "Molecular", description: "Gold standard - detects viral RNA in throat swabs, CSF, or tissue samples." },
        { test: "ELISA (IgM/IgG)", type: "Serology", description: "Detects IgM antibodies in serum/CSF during the second week." },
        { test: "IHC", type: "Histology", description: "Immunohistochemistry of tissues showing viral antigens in endothelium." }
      ],
      differentials: [
        { disease: "Japanese Encephalitis (JE)", keyDiff: "Mosquito vector, swine are amplification hosts but do not show respiratory symptoms.", mistake: "Both cause seasonal viral encephalitis in children/adults in agricultural zones." },
        { disease: "PRRS (Pig)", keyDiff: "Arterivirus, causes reproductive failure and blue ear disease in pigs.", mistake: "Both cause severe respiratory distress in swine herds." }
      ]
    },
    treatment: [
      { drug: "Monoclonal Antibody m102.4", purpose: "Passive immunization", mechanism: "Neutralizes G protein", speciesNotes: "Investigational monoclonal antibody used under compassionate grounds.", limitations: "Highly limited supply.", resistance: "Not reported." },
      { drug: "Ribavirin", purpose: "Antiviral (supportive)", mechanism: "RNA synthesis inhibitor", speciesNotes: "Used in outbreaks to reduce mortality, but efficacy is debated.", limitations: "Does not cure; supportive only.", resistance: "N/A" }
    ],
    control: {
      farm: "Establish bat proofing in pig farms. Cull infected and exposed pig populations during outbreaks.",
      animal: "Strict quarantine of swine movements. No pig vaccines licensed.",
      human: "Avoid raw date palm sap consumption. Wear PPE (ASHA workers and clinicians). Isolate suspect human cases.",
      government: "Outbreak containment protocols. BSL-4 laboratory diagnostics (ICMR-NIV Pune). Rapid response teams."
    },
    publicHealth: {
      economic: "Devastating losses to pig husbandry sectors. Costly quarantine and culling operations.",
      foodSafety: "Avoid partially eaten fruits (bats bites). Protect date palm sap collection pots with bamboo skirts.",
      wildlifeInterface: "Pteropus fruit bats act as the natural asymptomatic reservoir."
    },
    onehealth: {
      human: "Infection via drinking raw palm sap contaminated with bat excreta, or pig contact.",
      animal: "Pigs ingest fruit dropped by infected fruit bats in open pens.",
      environment: "Deforestation and seasonal changes drive fruit bats closer to domestic orchard areas."
    },
    references: ["WHO Nipah Virus Factsheet", "ICMR Outbreak Response Manual - Nipah", "Merck Veterinary Manual - Henipavirus Section"]
  },

  kyasanur: {
    definition: "A tick-borne, highly debilitating zoonotic viral disease endemic to India, presenting as a biphasic hemorrhagic fever with neurological signs, preceded by sentinel monkey deaths.",
    etiology: "Kyasanur Forest Disease Virus (KFDV); positive-sense, single-stranded enveloped RNA virus. Member of tick-borne encephalitis group.",
    taxonomy: "Family Flaviviridae, Genus Flavivirus.",
    vetImportance: "Does not cause clinical disease in domestic livestock, but cattle serve as hosts for vector tick breeding.",
    publicHealthImportance: "Endemic strictly to India (Karnataka, expanding to Kerala, Goa). CFR of 3-10% with severe chronic convalescence.",
    riskGroups: "Forest workers, grass cutters, cattle herders, tribal populations.",
    envSurvival: "Virus survives within tick populations transovarially and transstadially. Sensitive to standard disinfectants and heat.",
    pathogenesis: {
      entry: "Bite of infected Haemaphysalis tick.",
      spread: "Local replication, lymph nodes, primary viremia, multi-organ localization, secondary viremia with CNS involvement.",
      organs: ["Liver", "Spleen", "CNS", "Kidneys", "Blood vessels"],
      lesions: "Hepatomegaly, splenic enlargement, parenchymatous degeneration of kidneys, microvascular hemorrhages, non-suppurative meningitis."
    },
    clinicalSigns: {
      animals: {
        acute: "Domestic livestock (cattle, buffaloes): Asymptomatic viremia. Sentinel monkeys (Langurs, Macaques): Severe fever, bleeding, prostration, death.",
        chronic: "N/A",
        subclinical: "Universal subclinical status in cattle herds."
      },
      humans: {
        acute: "First phase: Sudden onset chills, high fever, severe frontal headache, muscle pain, gastrointestinal bleeding, bradycardia. Second phase (biphasic): Mild fever return, severe headache, stiff neck, tremors.",
        chronic: "Prolonged weakness, muscle wasting, tremors during recovery.",
        subclinical: "Some exposures lead to seroconversion with mild fever."
      }
    },
    lesionsDesc: {
      gross: "Monkeys: Hemorrhagic lungs, liver degeneration, enlarged spleen. Humans: Sub-serosal hemorrhages, cerebral congestion.",
      histopathology: "Focal necrosis in liver parenchyma. Interstitial nephritis. Mild perivascular cuffs in brain tissue.",
      hallmark: "Focal hepatic necrosis and erythrophagocytosis in spleen."
    },
    diagnosis: {
      history: "Visit to forested zones in Western Ghats, tick bite history, reports of monkey deaths in the vicinity.",
      signs: "Biphasic fever, severe myalgia, sentinel monkey deaths.",
      samples: "Blood/Serum collected during the first 1-12 days of fever.",
      tests: [
        { test: "RT-PCR", type: "Molecular", description: "Primary diagnostic method during early viremic phase (first week)." },
        { test: "MAC-ELISA (IgM)", type: "Serology", description: "Detects IgM antibodies after day 8-10 of illness." },
        { test: "Virus Isolation", type: "Cell Culture", description: "Cultured in BSL-3 from blood; confirms active infection." }
      ],
      differentials: [
        { disease: "Dengue Fever", keyDiff: "Vector is Aedes mosquito, does not involve Western Ghats forest tick exposure or sentinel monkey deaths.", mistake: "Both present with high fever, myalgia, leucopenia, and thrombocytopenia." },
        { disease: "Scrub Typhus", keyDiff: "Caused by Orientia tsutsugamushi (rickettsia), displays characteristic black eschar at bite site.", mistake: "Both cause seasonal post-monsoon febrile illness in rural forest zones." }
      ]
    },
    treatment: [
      { drug: "Supportive Therapy", purpose: "Outbreak clinical management", mechanism: "Fluid balance, antipyretics", speciesNotes: "No specific antiviral therapy exists. Early hydration saves lives.", limitations: "Palliative only.", resistance: "N/A" }
    ],
    control: {
      farm: "Acaricide spraying of cattle to reduce Haemaphysalis tick vectors.",
      animal: "Monitors forest floors for dead monkeys. Notify forest departments immediately.",
      human: "Formalin-inactivated KFD vaccine (Kasauli) administered in endemic areas. Personal protective clothing.",
      government: "ICMR-NIV Pune KFD unit monitoring. Tick drag surveys post-monsoon."
    },
    publicHealth: {
      economic: "Severe impact on forest-based livelihoods (cashew harvesting, honey collection, firewood gathering).",
      foodSafety: "No foodborne link established; strictly vector-borne.",
      wildlifeInterface: "Macaques (Macaca radiata) and Langurs (Presbytis entellus) serve as highly susceptible sentinel hosts."
    },
    onehealth: {
      human: "Entering forest zones exposes humans to Haemaphysalis ticks.",
      animal: "Wild rodents maintain tick cycles; monkeys amplify virus and die.",
      environment: "Western Ghats forest ecosystem, leaf litter levels, and temperature cycles drive tick activity."
    },
    references: ["National Guidelines on Kyasanur Forest Disease - Karnataka Health Dept", "ICMR-NIV Pune KFD Resources", "WOAH Flavivirus Reviews"]
  },

  // --- FUNGAL ZOONOSES ---
  dermatophytosis: {
    definition: "A highly contagious superficial fungal infection of keratinized tissues (skin, hair, claws) of animals and humans, causing circular scaling patches, alopecia, and intense itching.",
    etiology: "Trichophyton verrucosum (cattle), Microsporum canis (cats/dogs), Trichophyton mentagrophytes. Filamentous, keratinophilic fungi.",
    taxonomy: "Phylum Ascomycota, Class Eurotiomycetes, Order Onygenales.",
    vetImportance: "Highly prevalent in calves and cats. Leads to hide damage and economic losses in cattle husbandry.",
    publicHealthImportance: "Common zoonotic skin infection. High family outbreak potential from infected kittens/puppies.",
    riskGroups: "Veterinarians, dairy farmers, pet owners, children.",
    envSurvival: "Arthrospores are highly resistant and remain infective in wooden gates, brushes, and soil for up to 18 months.",
    pathogenesis: {
      entry: "Direct contact of fungal spores (arthroconidia) with abraded skin or hair shafts.",
      spread: "Keratinase enzymes digest stratum corneum and hair keratin, hyphae descend into hair follicle, hair breaks off.",
      organs: ["Stratum corneum", "Hair follicles", "Nails/Claws"],
      lesions: "Alopecic circular crusty plaques, folliculitis, hyperkeratosis."
    },
    clinicalSigns: {
      animals: {
        acute: "Circular patches of hair loss (alopecia), thick asbestos-like dry grey crusts (common in calves around eyes/neck).",
        chronic: "General scaling skin lesions, persistent focal alopecia, pruritus.",
        subclinical: "Asymptomatic carrier state (common in long-haired cats carrying M. canis)."
      },
      humans: {
        acute: "Tinea Corporis: Ring-like red scaling lesions with active borders and central clearing. Intense itching (pruritus).",
        chronic: "Tinea Capitis (scalp) with hair breakage; Tinea Unguium (nails) causing yellow thickening.",
        subclinical: "Serological antibodies without active follicular lesions."
      }
    },
    lesionsDesc: {
      gross: "Dry, scaly, circumscribed crusty patches with broken hair stumps. Variable erythema.",
      histopathology: "Hyperkeratosis, acanthosis. Fungal hyphae and arthrospores visible in stratum corneum and hair shaft using Periodic Acid-Schiff (PAS) or Grocott stains.",
      hallmark: "Circular crusty lesions with ectothrix spore accumulation around hair shafts."
    },
    diagnosis: {
      history: "Contact with new kittens/puppies showing scaling skin, contact with crusty calves, sharing grooming brushes.",
      signs: "Circular bald spots with grey crusts.",
      samples: "Hair pluckings, skin scrapings from the active margins of the lesion.",
      tests: [
        { test: "Wood's Lamp Examination", type: "Screening", description: "M. canis infected hairs show apple-green fluorescence under UV light (365nm)." },
        { test: "Direct Microscopy (KOH)", type: "Direct detection", description: "10-20% KOH mounts show fungal hyphae and chains of arthrospores under microscope." },
        { test: "Culture (DTM)", type: "Culture", description: "Inoculation on Dermatophyte Test Medium; turns red during growth (7-14 days)." }
      ],
      differentials: [
        { disease: "Demodiosis (Demodectic Mange)", keyDiff: "Demodex mites visible on deep skin scrapings, no fungal structures.", mistake: "Both cause circular alopecic lesions in young dogs." },
        { disease: "Sarcoptic Mange", keyDiff: "Intense, scratching-dominated pruritus, scraping shows Sarcoptes scabiei mites.", mistake: "Both present with generalized crusting skin lesions." }
      ]
    },
    treatment: [
      { drug: "Terbinafine", purpose: "Systemic antifungal", mechanism: "Squalene epoxidase inhibitor", speciesNotes: "First line systemic treatment for dogs, cats, and humans.", limitations: "Requires weeks of treatment; monitoring of liver enzymes necessary.", resistance: "Emerging in Indian Trichophyton strains." },
      { drug: "Miconazole / Ketoconazole", purpose: "Topical rinse / shampoo", mechanism: "Ergosterol synthesis inhibitor", speciesNotes: "Used as adjunctive twice-weekly rinses to reduce spore shedding.", limitations: "Must be left on skin for 10 minutes.", resistance: "Rare." }
    ],
    control: {
      farm: "Isolate infected calves. Disinfect stables, gates, and halters with sodium hypochlorite (bleach).",
      animal: "Treat all contact animals. Vacuum pet environments to remove shed hairs containing spores.",
      human: "Hand washing after handling animals. Wear gloves when treating calves.",
      government: "Standardized animal import inspections for companion animals."
    },
    publicHealth: {
      economic: "Hide degradation in leather industries. Costly pet veterinary treatment cycles.",
      foodSafety: "No foodborne link; strictly contact transmission.",
      wildlifeInterface: "Sylvatic reservoirs in wild rodents (T. mentagrophytes) and wild felids."
    },
    onehealth: {
      human: "Acquired by hugging pets or grooming livestock without protective wear.",
      animal: "Fungi colonize keratinized tissues; environment acts as massive spore sink.",
      environment: "Spores survive long periods in wood, soil, and dust of animal housing."
    },
    references: ["Merck Veterinary Manual - Dermatophytosis", "Acha & Szyfres Vol 1 - Dermatophytosis Section", "Standard BVSc Textbook of Veterinary Mycology"]
  },

  // --- PARASITIC ZOONOSES ---
  toxoplasmosis: {
    definition: "A widespread protozoan zoonotic disease of warm-blooded animals and humans caused by Toxoplasma gondii, characterized by abortion in sheep/goats, congenital malformations in newborns, and encephalitis in immunocompromised hosts.",
    etiology: "Toxoplasma gondii; obligate intracellular apicomplexan protozoan. Exists as tachyzoites (replicating form), bradyzoites (tissue cyst form), and oocysts (environmental stage).",
    taxonomy: "Family Sarcocystidae, Genus Toxoplasma.",
    vetImportance: "Major cause of abortion, mummification, and stillbirths ('abortion storms') in sheep and goats.",
    publicHealthImportance: "Severe threat to pregnant women (congenital hydrocephalus, retinochoroiditis). Fatal opportunistic infection (encephalitis) in HIV/AIDS patients.",
    riskGroups: "Pregnant women, cat owners, sheep farm workers, raw meat consumers.",
    envSurvival: "Sporulated oocysts are highly resistant in soil and water, remaining viable for up to 1-2 years in humid climates.",
    pathogenesis: {
      entry: "Ingestion of sporulated oocysts (soil/water/vegetation) or ingestion of raw meat containing bradyzoite tissue cysts.",
      spread: "Penetrates gut wall, tachyzoite multiplication, systemic lympho-hematogenous spread, encystment into tissues (brain, muscles).",
      organs: ["Gravid placenta", "Brain", "Skeletal muscle", "Eyes"],
      lesions: "Necrotic foci in placenta, cotyledonary calcification, microglial nodules in brain, tissue cyst accumulation."
    },
    clinicalSigns: {
      animals: {
        acute: "Pregnant Sheep/Goats: Abortion, stillbirth, or mummified fetuses in late gestation. Calves/dogs: Fever, dyspnea, tremors.",
        chronic: "Subclinical persistent tissue cysts in musculature.",
        subclinical: "Cats (definitive hosts) are usually asymptomatic while shedding millions of oocysts in feces."
      },
      humans: {
        acute: "Lymphadenopathy, mild flu-like fever, muscle pain. Congenital: Chorioretinitis (blindness), hydrocephalus, cerebral calcification.",
        chronic: "Latent infection with persistent brain/muscle cysts. Recurrent ocular toxoplasmosis.",
        subclinical: "Up to 30-50% of the human population is seropositive without symptoms."
      }
    },
    lesionsDesc: {
      gross: "Sheep placenta shows characteristic small, white, gritty necrotic spots ('pebble-like') on cotyledons. Fetus has fluid inside tissue cavities.",
      histopathology: "Necrosis of cotyledonary villi. Microglial nodules and focal necrosis in fetal brain. Eosinophilic crescentic tachyzoites.",
      hallmark: "White necrotic cotyledons ('white spots') on sheep placenta."
    },
    diagnosis: {
      history: "Presence of barn cats around sheep gestation housing, consuming raw vegetables from cat-accessible gardens, ingestion of raw meat.",
      signs: "Stillborn lambs, white spots on sheep placenta, ocular lesions in human babies.",
      samples: "Aborted placenta, fetal brain, maternal serum, cerebrospinal fluid (CSF).",
      tests: [
        { test: "Sabin-Feldman Dye Test", type: "Serology", description: "Gold standard - measures neutralising antibodies using live tachyzoites (requires biohazard facility)." },
        { test: "ELISA (IgM/IgG)", type: "Serology", description: "Widely used to differentiate acute (IgM) and past (IgG) exposure." },
        { test: "Polymerase Chain Reaction (PCR)", type: "Molecular", description: "Detects T. gondii DNA in amniotic fluid, CSF, or tissues." }
      ],
      differentials: [
        { disease: "Enzootic Abortion of Ewes (EAE)", keyDiff: "Caused by Chlamydia abortus, displays severe intercotyledonary edema, stains pink on modified ZN.", mistake: "Both cause late gestation abortions and necrotic placental lesions in sheep." },
        { disease: "Neosporosis", keyDiff: "Caused by Neospora caninum, dogs are definitive hosts, primarily causes abortions in dairy cattle.", mistake: "Both cause protozoal abortions and microscopic brain lesions." }
      ]
    },
    treatment: [
      { drug: "Pyrimethamine + Sulfadiazine", purpose: "Combination protozoacidal", mechanism: "Folic acid pathway inhibitors", speciesNotes: "First line combination for human clinical/congenital toxoplasmosis.", limitations: "Requires folinic acid supplementation to prevent bone marrow toxicity.", resistance: "Rare." },
      { drug: "Clindamycin", purpose: "Alternative therapy", mechanism: "Protein synthesis inhibitor", speciesNotes: "Used in clinical canine/feline toxoplasmosis.", limitations: "High dosage required.", resistance: "Not clinically relevant." }
    ],
    control: {
      farm: "Prevent cats from accessing sheep feed storage bins and gestating pens. Control rodent populations.",
      animal: "Vaccination of ewes before mating with live mutant vaccine (Toxovax).",
      human: "Pregnant women must avoid cat litter box cleaning and wear gloves when gardening. Cook meat to 71°C.",
      government: "Public health advisory campaigns for prenatal care. Mandatory veterinary reporting."
    },
    publicHealth: {
      economic: "Productivity loss in mutton/wool sheep farms due to lamb crop losses.",
      foodSafety: "Meat safety hazard. Bradyzoite tissue cysts remain viable in undercooked mutton, pork, and venison.",
      wildlifeInterface: "Feral cats bridge environmental oocyst contamination across wild bird and rodent cycles."
    },
    onehealth: {
      human: "Infection via raw meat ingestion, oocyst-contaminated garden soil, or water.",
      animal: "Sheep ingest oocysts from pastures contaminated by cat feces.",
      environment: "Rainfall runoff washes cat oocysts into water tables, exposing wildlife and livestock."
    },
    references: ["WOAH Terrestrial Manual Chapter 3.9.10", "WHO Guidelines on Congenital Zoonoses", "Merck Veterinary Manual - Toxoplasmosis"]
  },

  // --- PRION ZOONOSES ---
  bse: {
    definition: "A fatal, progressive neurodegenerative disease of cattle caused by prions, transmissible to humans as variant Creutzfeldt-Jakob Disease (vCJD) via ingestion of contaminated beef products.",
    etiology: "Abnormal prion protein (PrPSc); infectious conformational protein causing misfolding of host cellular PrPC protein.",
    taxonomy: "Transmissible Spongiform Encephalopathy (TSE).",
    vetImportance: "Devastating economic disease of cattle herds. Leads to strict eradication and cattle cull policies.",
    publicHealthImportance: "Causative agent of variant CJD (vCJD) in humans, which is 100% fatal and progresses over months.",
    riskGroups: "Abattoir workers, renderers, meat consumers in BSE-endemic zones.",
    envSurvival: "Prions are extremely stable in the environment. Highly resistant to heat (autoclaving), UV, enzymatic digestion, and standard formalin fixatives.",
    pathogenesis: {
      entry: "Ingestion of feed contaminated with meat and bone meal (MBM) containing PrPSc.",
      spread: "Absorption via Peyer's patches in gut, transport along splanchnic/vagus nerves to brain stem, accumulation of misfolded PrPSc.",
      organs: ["Brain stem (obex)", "Spinal cord", "Distal ileum", "Tonsils"],
      lesions: "Bilateral spongiform vacuolation of neuropil and neuronal perikaryon, astrocytic hypertrophy."
    },
    clinicalSigns: {
      animals: {
        acute: "Cattle: Apprehension, hypersensitivity to touch/sound, aggressive behavior ('mad cow'), ataxia, abnormal gate (swaying pelvic limbs), emaciation.",
        chronic: "Slow progression of neurological signs over weeks to months, leading to recumbency.",
        subclinical: "Incubation period of 2-8 years; cattle appear healthy but carry prions in neural tissues."
      },
      humans: {
        acute: "vCJD: Prominent psychiatric symptoms (depression, anxiety), sensory abnormalities (pain), progress to cerebellar ataxia, myoclonus, dementia, death.",
        chronic: "N/A - invariably progressive to death (average survival 14 months).",
        subclinical: "Long latent incubation of 10-40 years."
      }
    },
    lesionsDesc: {
      gross: "No gross lesions. Brain appears visually normal at autopsy.",
      histopathology: "Spongiform vacuolation of gray matter neuropil and neurons (especially in solitary tract nucleus and spinal trigeminal nucleus). Amyloid plaques.",
      hallmark: "Symmetrical spongiform change (vacuoles) in obex neurons."
    },
    diagnosis: {
      history: "History of feeding ruminant-derived Meat and Bone Meal (MBM) in early life, live cattle imported from BSE zones.",
      signs: "Sensory hyper-reactivity, sway-back gait, chronic ataxia.",
      samples: "Brain stem (obex section) collected post-mortem.",
      tests: [
        { test: "IHC (Immunohistochemistry)", type: "Immunological", description: "Gold standard - detects PrPSc accumulation in obex tissue slices." },
        { test: "Western Blotting", type: "Immunological", description: "Rapid diagnostic test detecting proteinase K-resistant PrPSc bands." },
        { test: "ELISA", type: "Screening", description: "High-throughput rapid screening of obex samples at slaughter." }
      ],
      differentials: [
        { disease: "Rabies", keyDiff: "Rapid clinical progression (<10 days), presence of Negri bodies in Purkinje cells.", mistake: "Both cause severe neurological aggression, ataxia, and salivation." },
        { disease: "Listeriosis", keyDiff: "Unilateral cranial nerve paralysis, microabscesses on histopathology, responsive to penicillin.", mistake: "Both cause circling, ataxia, and depression in cattle." }
      ]
    },
    treatment: [
      { drug: "Palliative Care", purpose: "Symptomatic control", mechanism: "N/A", speciesNotes: "No effective treatment exists. 100% case fatality rate.", limitations: "Supportive only.", resistance: "N/A" }
    ],
    control: {
      farm: "Strict ban on feeding ruminant-derived Meat and Bone Meal (MBM) to ruminants.",
      animal: "Removal of Specified Risk Material (SRM - brain, spinal cord, ileum) at slaughter. Traceability tagging.",
      human: "Exclusion of SRM from human food chain. Blood donation restrictions for those exposed to UK epidemic.",
      government: "National feed ban enforcement. OIE BSE Risk Status certification."
    },
    publicHealth: {
      economic: "Loss of dairy export markets. Colossal financial burden of herd culling and feed ban audits.",
      foodSafety: "SRM ban ensures beef safety. Prions are not present in milk; dairy milk remains safe.",
      wildlifeInterface: "Captive exotic ungulates in zoos are susceptible (Feline Spongiform Encephalopathy in big cats)."
    },
    onehealth: {
      human: "vCJD acquired by eating beef products contaminated with bovine brain/spinal cord.",
      animal: "Cattle contract BSE by eating feed containing processed prion-infected MBM.",
      environment: "Prions bound to clay soil particles remain infectious in environment."
    },
    references: ["WOAH Terrestrial Manual Chapter 3.4.1", "WHO variant CJD Surveillance Guidelines", "Merck Veterinary Manual - Bovine Spongiform Encephalopathy"]
  }
,

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

,

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

,

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

,

  echinococcosis: {
    definition: "A severe parasitic zoonosis caused by larval stages of Echinococcus tapeworms forming cysts in organs.",
    etiology: "Echinococcus granulosus (Cystic) / E. multilocularis (Alveolar).",
    taxonomy: "Cestoda, Taeniidae, cyclophyllidean tapeworm.",
    vetImportance: "Economic losses due to condemnation of infected ruminant offal (hydatid cysts) at slaughter.",
    publicHealthImportance: "Causes life-threatening cysts in human liver and lungs; surgery often required.",
    riskGroups: "Sheep farmers, dog owners in rural areas, individuals in poor hygiene settings.",
    envSurvival: "Eggs are highly resistant to freezing and environmental stress; survive for months in soil.",
    epidemiology: {
      source: "Ingestion of food/water contaminated with dog feces containing tapeworm eggs.",
      globalRelevance: "E. granulosus is global; E. multilocularis is Northern Hemisphere."
    },
    pathogenesis: {
      entry: "Ingestion of eggs.",
      spread: "Oncospheres hatch in gut, penetrate mucosa, and migrate via portal vein to liver/lungs.",
      organs: ["Liver", "Lungs", "Brain"],
      lesions: "Hydatid cysts (fluid-filled, containing protoscoleces)."
    },
    clinicalSigns: {
      animals: { acute: "N/A", chronic: "Dogs: Asymptomatic intestinal tapeworms. Sheep: Asymptomatic cysts in offal.", subclinical: "Highly prevalent subclinical infection." },
      humans: { acute: "N/A", chronic: "Abdominal pain, hepatomegaly, respiratory distress (depending on cyst location).", subclinical: "Asymptomatic for years while cyst grows slowly." }
    },
    lesionsDesc: {
      gross: "Large unilocular (E. granulosus) or multilocular (E. multilocularis) cysts filled with fluid and hydatid sand.",
      histopathology: "Laminated acellular layer, inner germinal layer budding brood capsules.",
      hallmark: "Hydatid cyst."
    },
    diagnosis: {
      history: "Rural background, close association with sheep dogs.",
      signs: "Slow-growing cystic masses in liver or lungs found on imaging.",
      samples: "Serum, cyst fluid (fine needle aspiration with caution).",
      tests: [
        { test: "Ultrasound / CT", type: "Imaging", description: "Visualizes cysts (e.g., 'water lily' sign)." },
        { test: "Serology (ELISA, Western Blot)", type: "Immunology", description: "Detects antibodies against hydatid fluid antigens." }
      ],
      differentials: [
        { disease: "Hepatic Abscess / Tumor", keyDiff: "Imaging characteristics and serology.", mistake: "Puncturing a cyst without albendazole cover, causing anaphylaxis." }
      ]
    },
    treatment: [
      { drug: "Albendazole", purpose: "Parasiticidal", mechanism: "Inhibits microtubule assembly", speciesNotes: "Used in humans.", limitations: "Long-term therapy needed; poorly absorbed.", resistance: "N/A" },
      { drug: "Praziquantel", purpose: "Parasiticidal", mechanism: "Increases calcium permeability", speciesNotes: "Used to deworm dogs (kills adult tapeworms).", limitations: "N/A", resistance: "N/A" }
    ],
    control: {
      farm: "Prevent dogs from scavenging dead sheep or eating raw offal.",
      animal: "Regular prophylactic deworming (praziquantel) of farm dogs.",
      human: "Hand hygiene, washing vegetables.",
      government: "Abattoir inspection and safe offal disposal."
    },
    publicHealth: { economic: "Major surgical/treatment costs and offal condemnation.", foodSafety: "Washing raw vegetables is essential.", wildlifeInterface: "Sylvatic cycle involves wolves, foxes, and wild ungulates." },
    onehealth: { human: "Accidental intermediate host via egg ingestion.", animal: "Dog-sheep domestic cycle.", environment: "Pastures/gardens contaminated with dog feces." },
    references: ["WHO Echinococcosis", "WOAH"]
  },

  leishmaniasis: {
    definition: "A vector-borne protozoal disease presenting in visceral, cutaneous, and mucocutaneous forms.",
    etiology: "Leishmania donovani (Visceral), L. tropica (Cutaneous), L. infantum.",
    taxonomy: "Kinetoplastida, Trypanosomatidae, intracellular protozoan.",
    vetImportance: "L. infantum causes severe, chronic canine leishmaniasis.",
    publicHealthImportance: "Visceral form (Kala-azar) is fatal if untreated; cutaneous form causes severe disfigurement.",
    riskGroups: "Impoverished populations in endemic areas, dog owners in the Mediterranean/South America.",
    envSurvival: "Requires vector; fragile outside host.",
    epidemiology: {
      source: "Bite of infected female phlebotomine sandflies.",
      globalRelevance: "Endemic in tropics/subtropics and Mediterranean."
    },
    pathogenesis: {
      entry: "Sandfly bite (promastigotes injected into skin).",
      spread: "Phagocytosed by macrophages, transform to amastigotes, disseminate to reticuloendothelial system.",
      organs: ["Spleen", "Liver", "Bone marrow", "Skin"],
      lesions: "Granulomatous inflammation, marked splenomegaly."
    },
    clinicalSigns: {
      animals: { acute: "N/A", chronic: "Dogs: Alopecia, skin scaling, overgrown nails (onychogryphosis), renal failure.", subclinical: "Many dogs are asymptomatic carriers." },
      humans: { acute: "Visceral: Prolonged fever, profound weight loss, massive splenomegaly, pancytopenia.", chronic: "Cutaneous: Painless skin ulcers.", subclinical: "Asymptomatic infections occur." }
    },
    lesionsDesc: {
      gross: "Massive splenomegaly and hepatomegaly.",
      histopathology: "Macrophages packed with Leishman-Donovan (LD) bodies (amastigotes).",
      hallmark: "Amastigotes inside macrophages."
    },
    diagnosis: {
      history: "Exposure to sandflies in endemic regions.",
      signs: "Fever + Splenomegaly + Pancytopenia (Visceral).",
      samples: "Bone marrow aspirate, spleen aspirate, lymph node biopsy, serum.",
      tests: [
        { test: "rk39 Rapid Test", type: "Serology", description: "Highly sensitive rapid diagnostic test for visceral leishmaniasis." },
        { test: "Microscopy (Giemsa)", type: "Microbiology", description: "Identification of LD bodies in aspirates." }
      ],
      differentials: [
        { disease: "Malaria / Schistosomiasis / Trypanosomiasis", keyDiff: "rk39 test and demonstration of amastigotes.", mistake: "Treating for malaria without checking for Leishmania." }
      ]
    },
    treatment: [
      { drug: "Liposomal Amphotericin B", purpose: "Leishmanicidal", mechanism: "Binds ergosterol", speciesNotes: "Treatment of choice for human visceral leishmaniasis.", limitations: "Expensive; IV administration required.", resistance: "Rare." },
      { drug: "Miltefosine", purpose: "Leishmanicidal", mechanism: "Alters lipid metabolism", speciesNotes: "Oral option.", limitations: "Teratogenic.", resistance: "Emerging." },
      { drug: "Meglumine Antimoniate", purpose: "Leishmanicidal", mechanism: "Inhibits glycolysis", speciesNotes: "Used in dogs and humans.", limitations: "Toxicity.", resistance: "Widespread in some areas." }
    ],
    control: {
      farm: "N/A",
      animal: "Canine Leishmania vaccines, deltamethrin collars for dogs.",
      human: "Indoor residual spraying, bed nets.",
      government: "Vector control programs."
    },
    publicHealth: { economic: "Major poverty-associated disease.", foodSafety: "N/A", wildlifeInterface: "Wild canids and rodents serve as reservoirs." },
    onehealth: { human: "Bitten by sandfly.", animal: "Dogs act as the primary reservoir for L. infantum.", environment: "Sandflies breed in organic matter/cracks in walls." },
    references: ["WHO Leishmaniasis", "WOAH"]
  },

  cysticercosis: {
    definition: "A parasitic tissue infection caused by larval cysts of the pork tapeworm.",
    etiology: "Taenia solium (larval stage: Cysticercus cellulosae).",
    taxonomy: "Cestoda, Taeniidae.",
    vetImportance: "Condemnation of 'measly pork' at slaughter.",
    publicHealthImportance: "Neurocysticercosis is the leading cause of adult-onset seizures/epilepsy worldwide.",
    riskGroups: "Individuals in areas with free-roaming pigs and poor sanitation.",
    envSurvival: "Eggs survive in soil for months.",
    epidemiology: {
      source: "Humans ingest tapeworm eggs from human feces (fecal-oral) to get cysticercosis. Ingesting raw pork causes taeniasis (adult tapeworm).",
      globalRelevance: "Endemic in Latin America, Asia, and Sub-Saharan Africa."
    },
    pathogenesis: {
      entry: "Ingestion of eggs.",
      spread: "Oncospheres penetrate intestine, disseminate via blood to muscles and brain.",
      organs: ["Brain", "Skeletal muscle", "Eyes"],
      lesions: "Cysts causing mechanical compression or severe inflammation upon death of the cyst."
    },
    clinicalSigns: {
      animals: { acute: "N/A", chronic: "Usually asymptomatic in pigs.", subclinical: "Pigs have cysts in muscles ('measly pork')." },
      humans: { acute: "Seizures, severe headaches, increased intracranial pressure.", chronic: "Epilepsy.", subclinical: "Subcutaneous nodules." }
    },
    lesionsDesc: {
      gross: "Translucent cysts (~1cm) containing a single scolex in brain parenchyma or muscle.",
      histopathology: "Granulomatous inflammation and calcification around degenerating cysts.",
      hallmark: "Cysticercus cellulosae in the brain."
    },
    diagnosis: {
      history: "Onset of seizures in a patient from an endemic area.",
      signs: "Epilepsy, subcutaneous nodules.",
      samples: "Serum, CSF.",
      tests: [
        { test: "Neuroimaging (CT/MRI)", type: "Imaging", description: "Shows cysts in varying stages (vesicular, calcified)." },
        { test: "Western Blot", type: "Immunology", description: "Confirmatory serology on serum/CSF." }
      ],
      differentials: [
        { disease: "Tuberculosis / Brain Tumor / Toxoplasmosis", keyDiff: "Imaging showing a scolex within a cyst.", mistake: "Treating with albendazole without steroids, causing fatal brain inflammation." }
      ]
    },
    treatment: [
      { drug: "Albendazole + Dexamethasone", purpose: "Parasiticidal + Anti-inflammatory", mechanism: "Inhibits microtubules / Reduces edema", speciesNotes: "Human treatment for active neurocysticercosis.", limitations: "Dexamethasone is crucial to prevent fatal inflammation when cysts die.", resistance: "N/A" }
    ],
    control: {
      farm: "Prevent pigs from accessing human feces (build latrines).",
      animal: "Porcine TSOL18 vaccine.",
      human: "Hand hygiene, proper cooking of pork to prevent taeniasis.",
      government: "Meat inspection (slitting masseter/heart muscles to check for cysts)."
    },
    publicHealth: { economic: "Huge neurological healthcare burden; loss of pig value.", foodSafety: "Thoroughly cook pork.", wildlifeInterface: "N/A" },
    onehealth: { human: "Acts as definitive host (tapeworm) and accidental intermediate host (cysts).", animal: "Pigs act as the natural intermediate host.", environment: "Lack of sanitation drives the cycle." },
    references: ["WHO Taeniasis/Cysticercosis", "CDC"]
  },

  schistosomiasis: {
    definition: "An acute and chronic parasitic disease caused by blood flukes.",
    etiology: "Schistosoma japonicum (Zoonotic), S. mansoni, S. haematobium (mostly human).",
    taxonomy: "Trematoda, Schistosomatidae, dioecious blood fluke.",
    vetImportance: "S. japonicum affects cattle and water buffaloes in Asia.",
    publicHealthImportance: "Second most devastating socio-economic parasitic disease after malaria.",
    riskGroups: "Farmers, children swimming in fresh water, fishermen in endemic areas.",
    envSurvival: "Cercariae survive in fresh water for up to 48 hours.",
    epidemiology: {
      source: "Skin penetration by free-swimming cercariae in contaminated fresh water.",
      globalRelevance: "S. japonicum is endemic in China, Philippines, and Indonesia."
    },
    pathogenesis: {
      entry: "Skin penetration.",
      spread: "Migrate via lungs to hepatic portal system; adults live in mesenteric venules.",
      organs: ["Liver", "Intestines"],
      lesions: "Granulomas forming around trapped eggs."
    },
    clinicalSigns: {
      animals: { acute: "N/A", chronic: "Cattle: Weight loss, diarrhea, liver fibrosis.", subclinical: "Water buffaloes often asymptomatic carriers." },
      humans: { acute: "Swimmer's itch, Katayama fever (acute toxemia).", chronic: "Hepatomegaly, splenomegaly, portal hypertension, ascites.", subclinical: "Chronic subtle morbidity." }
    },
    lesionsDesc: {
      gross: "Hepatic fibrosis ('pipe-stem' fibrosis of Symmers).",
      histopathology: "Eosinophilic granulomas centered around schistosome eggs in tissues.",
      hallmark: "Pipe-stem fibrosis and egg granulomas."
    },
    diagnosis: {
      history: "Freshwater exposure in endemic regions.",
      signs: "Hepatomegaly, bloody diarrhea, or hematuria (S. haematobium).",
      samples: "Feces, urine.",
      tests: [
        { test: "Microscopy", type: "Parasitology", description: "Detection of eggs (S. japonicum eggs are round with a small lateral knob)." },
        { test: "Kato-Katz Technique", type: "Parasitology", description: "Quantitative fecal smear." }
      ],
      differentials: [
        { disease: "Cirrhosis / Amoebiasis", keyDiff: "Detection of eggs.", mistake: "Misdiagnosing portal hypertension as alcoholic cirrhosis." }
      ]
    },
    treatment: [
      { drug: "Praziquantel", purpose: "Parasiticidal", mechanism: "Tetany and tegumental damage", speciesNotes: "Used in humans and domestic animals.", limitations: "Ineffective against immature schistosomes.", resistance: "Rare, but efficacy varies." }
    ],
    control: {
      farm: "Tractor farming instead of using water buffaloes (in China).",
      animal: "Mass treatment of bovines with praziquantel.",
      human: "Mass drug administration (MDA), avoid swimming in infested water.",
      government: "Snail control (molluscicides), sanitation infrastructure."
    },
    publicHealth: { economic: "Major cause of morbidity and lost productivity.", foodSafety: "N/A", wildlifeInterface: "Rodents and wild mammals can maintain S. japonicum." },
    onehealth: { human: "Water contact.", animal: "Bovines are major reservoir for S. japonicum.", environment: "Freshwater snails (Oncomelania) act as intermediate hosts." },
    references: ["WHO Schistosomiasis", "CDC"]
  },

  cryptosporidiosis: {
    definition: "A diarrheal disease caused by microscopic protozoan parasites.",
    etiology: "Cryptosporidium parvum (Zoonotic), C. hominis (Human).",
    taxonomy: "Apicomplexa, Conoidasida.",
    vetImportance: "Major cause of neonatal calf diarrhea (scours).",
    publicHealthImportance: "Major cause of waterborne outbreaks and severe, life-threatening diarrhea in immunocompromised (HIV/AIDS).",
    riskGroups: "Calf rearers, children, immunocompromised individuals, swimmers.",
    envSurvival: "Oocysts are highly resistant to environmental stress and chlorine disinfection.",
    epidemiology: {
      source: "Ingestion of oocysts from contaminated water (swimming pools, lakes) or contact with calves.",
      globalRelevance: "Worldwide."
    },
    pathogenesis: {
      entry: "Oral ingestion.",
      spread: "Excystation in gut, sporozoites attach to enterocytes (intracellular but extracytoplasmic).",
      organs: ["Intestines"],
      lesions: "Villous atrophy."
    },
    clinicalSigns: {
      animals: { acute: "Profuse, watery, yellow diarrhea in calves (1-3 weeks old), dehydration.", chronic: "Unthriftiness.", subclinical: "Adult cattle shed oocysts asymptomatically." },
      humans: { acute: "Watery diarrhea, stomach cramps, nausea.", chronic: "Severe, unremitting diarrhea in AIDS patients.", subclinical: "Common." }
    },
    lesionsDesc: {
      gross: "Hyperemic intestinal mucosa.",
      histopathology: "Villous blunting, crypt hyperplasia, tiny basophilic organisms at the brush border.",
      hallmark: "Organisms on the apical surface of enterocytes."
    },
    diagnosis: {
      history: "Contact with calves or swimming in public pools.",
      signs: "Acute watery diarrhea.",
      samples: "Feces.",
      tests: [
        { test: "Modified Ziehl-Neelsen (Acid-Fast) Stain", type: "Microbiology", description: "Oocysts stain bright red against a blue background." },
        { test: "Fecal PCR / Direct Fluorescent Antibody (DFA)", type: "Molecular/Immunology", description: "High sensitivity/specificity." }
      ],
      differentials: [
        { disease: "Giardiasis / Rotavirus / E. coli", keyDiff: "Acid-fast stain or PCR.", mistake: "Standard fecal flotation fails to reliably detect Cryptosporidium." }
      ]
    },
    treatment: [
      { drug: "Nitazoxanide", purpose: "Antiprotozoal", mechanism: "Interferes with anaerobic metabolism", speciesNotes: "Used in immunocompetent humans.", limitations: "Less effective in HIV/AIDS patients.", resistance: "N/A" },
      { drug: "Halofuginone", purpose: "Antiprotozoal", mechanism: "Unknown", speciesNotes: "Used prophylactically in calves.", limitations: "Toxicity risk.", resistance: "N/A" },
      { drug: "Supportive Fluid Therapy", purpose: "Rehydration", mechanism: "N/A", speciesNotes: "Crucial for calves.", limitations: "N/A", resistance: "N/A" }
    ],
    control: {
      farm: "Hygiene in calf pens, quarantine sick calves, adequate colostrum.",
      animal: "N/A",
      human: "Boil water during outbreaks, do not swim if diarrheal.",
      government: "UV or ozone treatment for municipal water supplies (chlorine ineffective)."
    },
    publicHealth: { economic: "Massive costs during waterborne outbreaks.", foodSafety: "Wash produce with safe water.", wildlifeInterface: "Wild ruminants can shed oocysts." },
    onehealth: { human: "Waterborne/contact exposure.", animal: "Neonatal calves are the primary zoonotic amplifier.", environment: "Water systems contaminated by farm runoff." },
    references: ["CDC Cryptosporidium", "WHO"]
  },

  giardiasis: {
    definition: "A diarrheal disease caused by a flagellated protozoan.",
    etiology: "Giardia duodenalis (syn. G. intestinalis, G. lamblia) - Assemblages A & B are zoonotic.",
    taxonomy: "Diplomonadida, Hexamitidae.",
    vetImportance: "Common cause of diarrhea in puppies, kittens, and calves.",
    publicHealthImportance: "Most common intestinal parasitic disease in humans globally.",
    riskGroups: "Campers, hikers, daycare attendees, pet owners.",
    envSurvival: "Cysts survive for months in cold water.",
    epidemiology: {
      source: "Ingestion of cysts in contaminated water, food, or via fecal-oral contact.",
      globalRelevance: "Worldwide."
    },
    pathogenesis: {
      entry: "Oral ingestion.",
      spread: "Excystation in duodenum, trophozoites attach to mucosa via ventral sucking disk.",
      organs: ["Small intestine"],
      lesions: "Malabsorption and villous atrophy without deep invasion."
    },
    clinicalSigns: {
      animals: { acute: "Foul-smelling, fatty, mucoid diarrhea in young pets.", chronic: "Intermittent diarrhea, weight loss.", subclinical: "Highly prevalent asymptomatic shedding." },
      humans: { acute: "Greasy, foul-smelling diarrhea, bloating, flatulence, abdominal cramps.", chronic: "Malabsorption syndrome, weight loss.", subclinical: "Common." }
    },
    lesionsDesc: {
      gross: "Often grossly normal.",
      histopathology: "Villous blunting, presence of trophozoites ('falling leaf' motility or 'monkey face' appearance on stained smears) in crypts.",
      hallmark: "Pear-shaped trophozoites with two nuclei."
    },
    diagnosis: {
      history: "Drinking untreated stream/lake water ('Beaver fever'); acquiring a new puppy.",
      signs: "Steatorrhea (fatty stool) and bloating.",
      samples: "Feces.",
      tests: [
        { test: "Zinc Sulfate Centrifugal Flotation", type: "Parasitology", description: "Detection of cysts." },
        { test: "Fecal ELISA / SNAP Test", type: "Immunology", description: "Detects Giardia cyst wall antigen (highly sensitive)." }
      ],
      differentials: [
        { disease: "Cryptosporidiosis / Exocrine Pancreatic Insufficiency", keyDiff: "Specific antigen tests.", mistake: "Missing intermittent shedding on a single fecal exam." }
      ]
    },
    treatment: [
      { drug: "Metronidazole / Fenbendazole", purpose: "Antiprotozoal", mechanism: "DNA disruption / Microtubule inhibition", speciesNotes: "Fenbendazole is preferred in dogs/cats due to lower toxicity. Metronidazole is common in humans.", limitations: "Reinfection is common.", resistance: "Occasional treatment failure." }
    ],
    control: {
      farm: "Hygiene.",
      animal: "Bathe pets to remove cysts from haircoat on the last day of treatment.",
      human: "Boil or filter backcountry water.",
      government: "Water sanitation."
    },
    publicHealth: { economic: "Healthcare visits and lost work.", foodSafety: "Foodborne transmission possible via infected handlers.", wildlifeInterface: "Beavers and other wildlife serve as reservoirs." },
    onehealth: { human: "Waterborne exposure.", animal: "Companion animals and livestock shed cysts.", environment: "Cold surface waters maintain cyst viability." },
    references: ["CDC Giardia"]
  },

  visceral_larva: {
    definition: "Visceral Larva Migrans (VLM) is caused by the aberrant migration of animal nematode larvae in human tissues.",
    etiology: "Toxocara canis (Dogs), Toxocara cati (Cats).",
    taxonomy: "Nematoda, Ascarididae.",
    vetImportance: "Virtually all puppies are born with T. canis (transplacental transmission).",
    publicHealthImportance: "Major cause of VLM and Ocular Larva Migrans (OLM) leading to blindness in children.",
    riskGroups: "Toddlers and children with geophagia/pica, pet owners.",
    envSurvival: "Toxocara eggs are incredibly hardy; survive for years in soil and parks.",
    epidemiology: {
      source: "Ingestion of embryonated eggs from contaminated soil/sandboxes.",
      globalRelevance: "Worldwide."
    },
    pathogenesis: {
      entry: "Oral ingestion of eggs.",
      spread: "Larvae hatch in gut, penetrate mucosa, and migrate through liver, lungs, brain, and eyes (cannot complete lifecycle in humans).",
      organs: ["Liver", "Lungs", "Eyes (OLM)", "Brain"],
      lesions: "Eosinophilic granulomas tracking larval migration paths."
    },
    clinicalSigns: {
      animals: { acute: "Pot-bellied puppies with diarrhea, vomiting worms.", chronic: "N/A", subclinical: "Adult dogs carry encysted larvae in tissues." },
      humans: { acute: "Fever, hepatomegaly, coughing, marked eosinophilia (VLM).", chronic: "Unilateral vision loss, retinal granuloma (OLM).", subclinical: "Covert toxocariasis (asthma-like symptoms)." }
    },
    lesionsDesc: {
      gross: "White tracks or granulomas on the liver surface.",
      histopathology: "Eosinophilic granulomas surrounding degenerating nematode larvae.",
      hallmark: "Eosinophilic granuloma with larva."
    },
    diagnosis: {
      history: "A child with a new puppy or history of eating dirt, presenting with eosinophilia.",
      signs: "Hepatomegaly + Eosinophilia (VLM) or leukocoria (OLM).",
      samples: "Serum.",
      tests: [
        { test: "ELISA", type: "Immunology", description: "Detection of Toxocara excretory-secretory (TES) antibodies." }
      ],
      differentials: [
        { disease: "Retinoblastoma / Asthma / Strongyloidiasis", keyDiff: "ELISA and history.", mistake: "Enucleating an eye misdiagnosed as retinoblastoma when it was OLM." }
      ]
    },
    treatment: [
      { drug: "Albendazole + Corticosteroids", purpose: "Larvicidal + Anti-inflammatory", mechanism: "Microtubule inhibition", speciesNotes: "Used in human VLM. OLM often requires ophthalmologic intervention.", limitations: "Killing the parasite can trigger severe inflammation.", resistance: "N/A" },
      { drug: "Pyrantel / Fenbendazole", purpose: "Anthelmintic", mechanism: "Neuromuscular block", speciesNotes: "Routine deworming of puppies starting at 2 weeks of age.", limitations: "N/A", resistance: "N/A" }
    ],
    control: {
      farm: "N/A",
      animal: "Routine, strict deworming protocols for pregnant bitches and puppies.",
      human: "Prevent children from eating dirt; wash hands after playing in parks.",
      government: "Strict leash laws and picking up dog feces in public parks."
    },
    publicHealth: { economic: "Healthcare costs for OLM.", foodSafety: "N/A", wildlifeInterface: "Foxes carry T. canis." },
    onehealth: { human: "Accidental host.", animal: "Dogs are the definitive host.", environment: "Parks/sandboxes act as the transmission hub." },
    references: ["CDC Toxocariasis"]
  },

  trichinellosis: {
    definition: "A foodborne parasitic disease caused by the consumption of encysted nematode larvae in raw meat.",
    etiology: "Trichinella spiralis.",
    taxonomy: "Nematoda, Trichinellidae.",
    vetImportance: "Endemic in pigs fed garbage; heavily regulated in commercial pork production.",
    publicHealthImportance: "Can cause severe myositis and fatal myocarditis in humans.",
    riskGroups: "Consumers of wild game (bear, boar) or uninspected domestic pork.",
    envSurvival: "Encysted larvae survive freezing in some sylvatic species (e.g., T. nativa), but T. spiralis is killed by deep freezing.",
    epidemiology: {
      source: "Ingestion of raw or undercooked meat containing encysted larvae.",
      globalRelevance: "Worldwide, but largely eliminated from commercial pork in developed nations."
    },
    pathogenesis: {
      entry: "Ingestion of meat.",
      spread: "Larvae mature in gut, adults mate, females release newborn larvae that enter lymphatics/blood to skeletal muscle.",
      organs: ["Skeletal muscle (diaphragm, masseter)", "Heart"],
      lesions: "Nurse cell formation in striated muscle."
    },
    clinicalSigns: {
      animals: { acute: "N/A", chronic: "N/A", subclinical: "Pigs are almost always asymptomatic." },
      humans: { acute: "Phase 1 (Intestinal): Diarrhea, nausea. Phase 2 (Muscular): Severe muscle pain, periorbital edema, fever, splinter hemorrhages.", chronic: "Muscle soreness.", subclinical: "Mild infections are common." }
    },
    lesionsDesc: {
      gross: "Usually normal, heavily infected meat may show small white specks.",
      histopathology: "Coiled larvae inside altered muscle cells (nurse cells) surrounded by inflammatory cells (eosinophils).",
      hallmark: "Encysted larva in striated muscle."
    },
    diagnosis: {
      history: "Consumption of wild bear/boar meat, or homemade pork sausage.",
      signs: "Myalgia, periorbital edema, and marked eosinophilia.",
      samples: "Serum, muscle biopsy.",
      tests: [
        { test: "ELISA", type: "Immunology", description: "Detects antibodies in humans." },
        { test: "Artificial Digestion Method", type: "Parasitology", description: "Gold standard for testing pork carcasses at slaughter." }
      ],
      differentials: [
        { disease: "Polymyositis / Eosinophilic myositis", keyDiff: "Dietary history and serology.", mistake: "Confusing with the flu or arthritis." }
      ]
    },
    treatment: [
      { drug: "Albendazole + Corticosteroids", purpose: "Anthelmintic + Anti-inflammatory", mechanism: "Microtubule inhibition", speciesNotes: "Best given early before extensive encystment in humans.", limitations: "Less effective against mature encysted larvae.", resistance: "N/A" }
    ],
    control: {
      farm: "Ban on feeding uncooked garbage/swill to pigs. Strict rodent control.",
      animal: "Test carcasses at slaughter.",
      human: "Cook meat to 71°C (160°F) or freeze pork appropriately (-15°C for 20 days).",
      government: "Abattoir surveillance and mandatory carcass testing."
    },
    publicHealth: { economic: "Trade restrictions on pork.", foodSafety: "Meat inspection is critical.", wildlifeInterface: "Sylvatic cycle in bears, wild boars, and foxes." },
    onehealth: { human: "Foodborne acquisition.", animal: "Pigs get infected by eating rodents or uncooked swill.", environment: "N/A" },
    references: ["WHO Trichinellosis", "WOAH"]
  }

};

// Export or expose globally depending on environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { diseaseEnrichment };
} else {
  window.diseaseEnrichment = diseaseEnrichment;
}

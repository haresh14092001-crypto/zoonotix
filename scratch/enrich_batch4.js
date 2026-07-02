// Batch 4: Parasitic Diseases
const newDataStr = `
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
`;

const fs = require('fs');
const file = 'C:\\Users\\hares\\.antigravity\\Zoonotix\\scratch\\zoonotix_content_enrichment.js';
let code = fs.readFileSync(file, 'utf8');
code = code.replace(/};\s*\n+\/\/ Export or expose/, ",\n" + newDataStr + "\n};\n\n// Export or expose");
fs.writeFileSync(file, code);
console.log("Successfully added Batch 4 (Parasitic).");

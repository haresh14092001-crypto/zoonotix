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
        acute: "<div style='margin-bottom:8px'><strong>Furious Rabies (Encephalitic):</strong> Restlessness, aggression, loss of fear of humans, biting inanimate objects (pica), hyper-reactivity to stimuli, change in bark tone (vocal cord paralysis).</div><div><strong>Dumb Rabies (Paralytic):</strong> Profuse salivation, inability to swallow, paralysis of lower jaw ('dropped jaw'), progressive ataxia, and ascending paralysis.</div><div class='clinical-pearl' style='margin-top:12px;padding:12px;background:rgba(0,212,170,0.1);border-left:4px solid var(--accent);border-radius:4px;'><strong>💡 Clinical Pearl:</strong> In cattle, the dumb form is most common. It is frequently misdiagnosed as choking on a foreign body. Veterinarians attempting manual extraction without PPE are at extreme risk of exposure.</div>",
        chronic: "Does not occur. Rapidly progresses to coma and death, typically within 10 days of symptom onset. Any dog surviving >14 days post-bite was likely not shedding virus at the time.",
        subclinical: "No true subclinical state. The incubation period is asymptomatic (days to years), but the clinical phase is invariably acute and fatal."
      },
      humans: {
        acute: "<div style='margin-bottom:8px'><strong>Prodromal Phase:</strong> Fever, malaise, and highly suggestive neuropathic pain/tingling at the healed bite site.</div><div style='margin-bottom:8px'><strong>Furious Form (80%):</strong> Hydrophobia (laryngeal spasms triggered by sight, sound, or thought of water), aerophobia, hallucinations, episodic autonomic hyperactivity.</div><div><strong>Paralytic Form (20%):</strong> Ascending flaccid paralysis (often misdiagnosed as Guillain-Barré syndrome).</div>",
        chronic: "N/A - death generally occurs within 2-14 days of symptom onset due to cardiopulmonary arrest.",
        subclinical: "N/A - invariably fatal once clinical. <div class='pitfall' style='margin-top:12px;padding:12px;background:rgba(232,68,68,0.1);border-left:4px solid var(--viral);border-radius:4px;'><strong>⚠️ Diagnostic Pitfall:</strong> The paralytic form lacks classic hydrophobia and is notoriously underdiagnosed in human hospitals.</div>"
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
        speciesNotes: "<strong>Step 1:</strong> Thorough wound washing (15 mins running soap/water or povidone-iodine). <strong>Step 2:</strong> Rabies Immunoglobulin (RIG) infiltrated directly into and around the wound (passive). <strong>Step 3:</strong> Cell culture vaccine series (active) via IM or ID route (e.g. Essen or Thai Red Cross schedules). <div style='margin-top:16px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:12px;'><div style='font-family:DM Mono;font-size:12px;color:var(--accent);margin-bottom:8px;'>WHO PEP CATEGORIES SVG DIAGRAM</div><svg width='100%' height='auto' viewBox='0 0 500 200' style='background:#1a2332;border-radius:4px;'><rect x='20' y='20' width='140' height='60' rx='4' fill='#2a354a'/><text x='90' y='45' fill='#e8f0fe' font-size='12' text-anchor='middle'>Category I</text><text x='90' y='65' fill='#6b8cae' font-size='10' text-anchor='middle'>Touch/Lick intact skin</text><rect x='20' y='100' width='140' height='30' rx='4' fill='none' stroke='#00d4aa'/><text x='90' y='119' fill='#00d4aa' font-size='11' text-anchor='middle'>Wash only</text><path d='M90,80 L90,100' stroke='#6b8cae' marker-end='url(#arrow)'/><rect x='180' y='20' width='140' height='60' rx='4' fill='#2a354a'/><text x='250' y='45' fill='#e8f0fe' font-size='12' text-anchor='middle'>Category II</text><text x='250' y='65' fill='#6b8cae' font-size='10' text-anchor='middle'>Minor scratches</text><rect x='180' y='100' width='140' height='30' rx='4' fill='none' stroke='#e8a838'/><text x='250' y='119' fill='#e8a838' font-size='11' text-anchor='middle'>Wash + Vaccine</text><path d='M250,80 L250,100' stroke='#6b8cae' marker-end='url(#arrow)'/><rect x='340' y='20' width='140' height='60' rx='4' fill='#2a354a'/><text x='410' y='45' fill='#e8f0fe' font-size='12' text-anchor='middle'>Category III</text><text x='410' y='65' fill='#6b8cae' font-size='10' text-anchor='middle'>Bites/Licks on mucosa</text><rect x='340' y='100' width='140' height='30' rx='4' fill='none' stroke='#e84444'/><text x='410' y='119' fill='#e84444' font-size='11' text-anchor='middle'>Wash + Vac + RIG</text><path d='M410,80 L410,100' stroke='#6b8cae' marker-end='url(#arrow)'/><defs><marker id='arrow' viewBox='0 0 10 10' refX='5' refY='5' markerWidth='4' markerHeight='4' orient='auto-start-reverse'><path d='M 0 0 L 10 5 L 0 10 z' fill='#6b8cae'/></marker></defs></svg></div>", 
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
  }
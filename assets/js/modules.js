window.MODULE_FILES = {
 "module-01": {
  "video": true,
  "sections": [
   {
    "f": "01_what-is-machine-learning.html",
    "t": "What Is Machine Learning?",
    "s": "Why signature-based detection hits a wall, how machine learning offers a different paradigm, and which type of ML fits which security problem."
   },
   {
    "f": "02_how-machines-learn.html",
    "t": "How Machines Learn",
    "s": "What people actually mean when they say \"AI,\" how a machine learns from data, and the hierarchy from artificial intelligence down to the large language models you interact with daily."
   },
   {
    "f": "03_ml-models-in-action.html",
    "t": "ML Models in Action",
    "s": "Five ML approaches, one dataset, real predictions you can watch happen step by step inside your browser."
   },
   {
    "f": "04_language-models.html",
    "t": "Language Models, Hallucination, and Trust",
    "s": "How LLMs generate text through next-token prediction, why hallucination is structural rather than fixable, and what this means for security operations."
   },
   {
    "f": "05_measuring-performance.html",
    "t": "Measuring AI Performance",
    "s": "The confusion matrix, precision, recall, F1, and why understanding these metrics is the difference between a useful security tool and expensive alert noise."
   },
   {
    "f": "06_ai-on-the-cyber-battlefield.html",
    "t": "AI Reshaping the Cyber Battlefield",
    "s": "How AI transforms the threat landscape by lowering barriers to entry, compressing attack timelines, and introducing novel attack surfaces."
   },
   {
    "f": "07_references-and-readings.html",
    "t": "References & Readings",
    "s": "All sources, citations, and recommended readings referenced throughout Module 1: AI Foundations, organized by section for easy review."
   }
  ],
  "labs": []
 },
 "module-02": {
  "video": true,
  "sections": [
   {
    "f": "01_how-text-becomes-computation.html",
    "t": "How Text Becomes Computation",
    "s": "How your prompts become tokens, how tokens become numerical vectors, how transformer layers transform those vectors through attention to produce predictions, and why security data pays a token tax that general text does not."
   },
   {
    "f": "02_where-model-behavior-comes-from.html",
    "t": "Where Model Behavior Comes From",
    "s": "An LLM's behavior is not determined by a single factor. It emerges from layered causes: training data, post training alignment, system instructions, user context, retrieval, tools, and decoding settings. Each layer introduces distinct capabilities and distinct security risks."
   },
   {
    "f": "03_model-lifecycle-risk-map.html",
    "t": "The Model Lifecycle as a Risk Map",
    "s": "Sections 1 and 2 explained how LLMs turn text into probabilistic output and where model behavior comes from. This section turns that understanding into a decision framework: given a security risk, which lifecycle stage produced it, what category of control addresses it, and how does the OWASP LLM Top 10 organize these risks for practitioners?"
   },
   {
    "f": "04_deployment-decisions.html",
    "t": "Deployment as a Security Architecture Decision",
    "s": "Section 3 mapped LLM risks to lifecycle stages and matched each stage to appropriate controls. This section examines the deployment question: where should the model actually run? The answer reshapes trust boundaries, data flows, accountability, and your ability to audit and reproduce every inference decision."
   },
   {
    "f": "05_why_modules_fabricate.html",
    "t": "Why Models Fabricate and Why Outputs Vary",
    "s": "When LLMs produce output for security tasks, two reliability risks demand practitioner attention: the model may fabricate plausible but unsupported claims (hallucination), and it may produce different outputs from the same prompt across runs (variability). This section teaches you to classify fabrication types, identify the conditions that raise risk, apply a verification workflow, and design for reproducibility."
   },
   {
    "f": "06_references-and-readings.html",
    "t": "References & Readings",
    "s": "All sources, standards, and recommended readings referenced throughout Module 2: How LLMs Work, organized by type and indexed by section."
   }
  ],
  "labs": [
   {
    "f": "interactive/pipeline_stages/01_embedding_lookup.html",
    "t": "Stage 1: Embedding Lookup"
   },
   {
    "f": "interactive/pipeline_stages/02_positional_encoding.html",
    "t": "Stage 2: Positional Encoding"
   },
   {
    "f": "interactive/pipeline_stages/03_transformer_layers.html",
    "t": "Stage 3: Transformer Layers"
   },
   {
    "f": "interactive/pipeline_stages/04_projection_to_logits.html",
    "t": "Stage 4: Projection to Logits"
   },
   {
    "f": "interactive/pipeline_stages/05_probabilities_sampling.html",
    "t": "Stage 5: Probabilities & Sampling"
   },
   {
    "f": "interactive/pipeline_stages/06_decoding_to_text.html",
    "t": "Stage 6: Decoding to Text"
   },
   {
    "f": "interactive/quantization/quantization_curve_animation.html",
    "t": "Quantization Curve Resolution Demo"
   }
  ]
 },
 "module-03": {
  "video": true,
  "sections": [
   {
    "f": "01_structuring-prompts.html",
    "t": "Structuring Prompts for Security Tasks",
    "s": "How to move from typing a question into a chatbot to building a structured, testable prompt for a real security workflow."
   },
   {
    "f": "02_few-shot-brittleness-and-variation.html",
    "t": "Few-Shot Prompting and Why Outputs Vary",
    "s": "Adding examples to a prompt usually improves it, but two properties of language models make a single good-looking run misleading: prompts are brittle, and generation is stochastic."
   },
   {
    "f": "03_iteration-and-critical-evaluation.html",
    "t": "Systematic Iteration & Critical Evaluation",
    "s": "How to improve a security prompt in a way you can defend with evidence, and how to catch the confident, fluent, completely fabricated output before it reaches a decision."
   },
   {
    "f": "04_machine-usable-output-and-judgment.html",
    "t": "Machine-Usable Output & Production Judgment",
    "s": "How to get output a security pipeline can consume automatically, how to guarantee that output is structurally valid, and how to decide whether a prompt is ready for production."
   },
   {
    "f": "05_tinyllama_lab.html",
    "t": "Lab: Requested vs. Schema-Layer Output",
    "s": "Four pre-built prompts, each with its own frustrations. Run them through two paths and see which one breaks first. The failures are the lesson."
   },
   {
    "f": "06_references-and-readings.html",
    "t": "References & Readings",
    "s": "All sources, citations, and recommended readings referenced throughout Module 3: Prompt Engineering for Cybersecurity, organized by category and section."
   }
  ],
  "labs": [
   {
    "f": "interactive/diff_results/diff_embed.html",
    "t": "Same Meaning, Different Result"
   },
   {
    "f": "interactive/nvd_search/nvd_tool.html",
    "t": "NVD CVE Lookup Demo"
   },
   {
    "f": "interactive/prompt_model/prompt_model.html",
    "t": "Prompt Roles Terminal"
   },
   {
    "f": "interactive/temp_sampler/token_probability_sampler.html",
    "t": "Token Probability Sampler"
   }
  ]
 },
 "module-04": {
  "video": true,
  "sections": [
   {
    "f": "01_the-soc-analysts-challenge.html",
    "t": "The SOC Analyst's Challenge",
    "s": "Security operations centers process thousands of alerts daily. This section examines how analysts triage those alerts, the three log formats they encounter most often, how conventional tools parse those formats, and how ground truth enables us to evaluate any parsing approach."
   },
   {
    "f": "02_triage-pipeline-and-metrics.html",
    "t": "Triage Pipelines, Classification Metrics, and Failure Modes",
    "s": "How do SOCs automate alert triage, how do we measure whether any triage tool works, and where do different approaches fail?"
   },
   {
    "f": "03_how-machines-detect-intrusions.html",
    "t": "How Machines Detect Intrusions",
    "s": "Where detection runs at wire speed, how signature engines set the baseline, how raw packets become the flow records a model can read, and how the three detector families differ in what they can and cannot catch."
   },
   {
    "f": "04_detection-in-practice.html",
    "t": "Detection in Practice: Worked Examples and Choosing a Detector",
    "s": "Classifying real traffic end to end, recognising exfiltration and flood patterns, why detectors decay after deployment, how to read a benchmark claim, and how to choose a detector a small team can operate."
   },
   {
    "f": "05_comparing-approaches.html",
    "t": "Comparing Approaches: Baseline, Classical ML, and LLM Triage",
    "s": "Ten thousand events and three analysts, the baseline already running, the alert record as a data contract, what classical ML adds to it, and where LLM-assisted triage fits as one more tool rather than a replacement."
   },
   {
    "f": "06_evidence-and-roc-curves.html",
    "t": "Evidence: Tracing an Alert and Reading ROC Curves",
    "s": "Tracing one C2 beaconing alert from raw signal to a validated verdict, then reading ROC curves against a false-positive budget to choose an operating point you can defend."
   },
   {
    "f": "07_failure-and-choosing-tools.html",
    "t": "When the Pipeline Fails and Choosing Tools",
    "s": "A worked incident where AI-assisted triage failed and nobody caught it, the accountability question it raises, and how to choose detection tools on evidence rather than vendor claims."
   },
   {
    "f": "08_references-and-readings.html",
    "t": "References & Readings",
    "s": "All sources, citations, and recommended readings referenced throughout Module 4: Intrusion Detection and Log Analysis, organized by category and section."
   }
  ],
  "labs": [
   {
    "f": "interactive/decision_owner/decision_owner.html",
    "t": "Who Owns the Decision?"
   }
  ]
 },
 "module-05": {
  "video": true,
  "sections": [
   {
    "f": "01_the-intelligence-cycle-meets-the-language-model.html",
    "t": "The Intelligence Cycle Meets the Language Model",
    "s": "Before any AI touches threat intelligence, we need to know what threat intelligence actually is. This section defines the discipline, walks the intelligence cycle, and distinguishes the user types. We'll look at which parts of this process a language model can potentially accelerate."
   },
   {
    "f": "02_ground-truth-cve-cvss-nvd-kev.html",
    "t": "Ground Truth: CVE, CVSS, NVD, and the KEV Catalog",
    "s": "When an AI tells us something about a vulnerability, what do we check it against? In this section we map the public vulnerability intelligence infrastructure: what each source is authoritative about, where each one lags, and why severity is not always a risk. The goal is to establish a ground truth concept."
   },
   {
    "f": "03_ai-assisted-summarization-and-briefing.html",
    "t": "AI Assisted Summarization and Briefing",
    "s": "The acceleration is real, and so are the failures. This section teaches the workflow that gets genuine value from a language model on advisory summarization and briefing work, then teaches the specific failure modes we must expect and catch: fabricated identifiers, wrong version boundaries, stale mitigations, and confident prose hiding all of it."
   },
   {
    "f": "04_ioc-extraction-and-stix.html",
    "t": "IoC Extraction and STIX",
    "s": "Intelligence that only humans can read does not scale. This section turns the prose of a threat report into machine consumable indicators, scores the conversion with the precision and recall vocabulary from Module 4, and shows what STIX interoperability concretely looks like, including the trap that catches careless extraction pipelines."
   },
   {
    "f": "05_verification-methodology-and-the-analysts-boundary.html",
    "t": "The Verification Methodology and the Analyst's Boundary",
    "s": "A five-step method that makes \"double-check the AI\" professional practice, the grading vocabularies analysts actually use, the sharing rules governing what leaves your organization, and a clear line where the analyst's non-delegable work begins!"
   },
   {
    "f": "06_lab_hallucinations.html",
    "t": "The Hallucination Audit Lab",
    "s": "A model will hand you fluent, confident threat intelligence. Some of it is true, some is true but out of date, and some is invented. Your job is not to trust the tone, it is to run the audit. In this lab you will hunt fabrications in raw model output, route every claim to the source that adjudicates it, stamp a verdict, and walk away with a verification checklist that is yours to keep."
   },
   {
    "f": "07_references-and-readings.html",
    "t": "References & Readings",
    "s": "All sources, citations, and recommended readings referenced throughout Module 5: AI for Threat Intelligence and Research, organized by category and section."
   }
  ],
  "labs": [
   {
    "f": "interactive/atomic_claims/atomic_claims.html",
    "t": "Decompose into Atomic Claims"
   },
   {
    "f": "interactive/cvss_builder/cvss_builder.html",
    "t": "CVSS v3.1 Base Score Builder"
   },
   {
    "f": "interactive/disclosure_timeline/disclosure_timeline.html",
    "t": "The Disclosure Lag"
   },
   {
    "f": "interactive/grounding/grounding.html",
    "t": "Grounded vs. Ungrounded"
   },
   {
    "f": "interactive/intelligence_cycle/intelligence_cycle.html",
    "t": "The Intelligence Cycle"
   },
   {
    "f": "interactive/stale_truth/stale_truth.html",
    "t": "Stale Truth: The Frozen Model"
   }
  ]
 },
 "module-06": {
  "video": true,
  "sections": [
   {
    "f": "01_how-llms-analyze-code.html",
    "t": "How LLMs Analyze Code",
    "s": "Understanding the mechanism behind AI code review, and how it differs from static analysis tools."
   },
   {
    "f": "02_evaluating-llm-code-review.html",
    "t": "Evaluating LLM Code Review",
    "s": "How well does AI code review actually perform, and what happens when the measurements themselves are unreliable?"
   },
   {
    "f": "03_ai-in-the-sdlc.html",
    "t": "AI Review in the Secure Development Lifecycle",
    "s": "Where does AI-assisted code review add the most value in a development process, and how do you design a review strategy that accounts for its limitations?"
   },
   {
    "f": "04_supply-chain-attacks-and-defenses.html",
    "t": "Supply Chain Attacks and Defenses",
    "s": "How attackers exploit the trust relationships in software supply chains, and how AI both helps defend against and inadvertently contributes to these attacks."
   },
   {
    "f": "05_synthesis-and-forward.html",
    "t": "Synthesis and Forward",
    "s": "What is the right level of trust to place in AI as a security tool, and how does domain knowledge from code review become training data that makes a model better at a specific task?"
   },
   {
    "f": "06_references-and-readings.html",
    "t": "References & Readings",
    "s": "All sources, citations, and recommended readings referenced throughout Module 6: AI-Assisted Secure Code Review and Supply Chain Awareness, organized by category and section."
   }
  ],
  "labs": [
   {
    "f": "interactive/02_adversarial_framing/adversarial_framing.html",
    "t": "Adversarial Comment Framing Lens"
   },
   {
    "f": "interactive/02_benchmark_mirage/benchmark_mirage.html",
    "t": "Benchmark Mirage Collapse"
   },
   {
    "f": "interactive/02_confidence_gap/confidence_gap.html",
    "t": "Confidence vs Security Gap"
   },
   {
    "f": "interactive/02_confusion_matrix_lab/confusion_matrix_lab.html",
    "t": "Code Review Confusion Matrix Lab"
   },
   {
    "f": "interactive/02_trust_decay/trust_decay.html",
    "t": "Developer Trust Decay Simulator"
   },
   {
    "f": "interactive/03_review_layer_gauntlet/review_layer_gauntlet.html",
    "t": "Review Layer Gauntlet"
   },
   {
    "f": "interactive/03_sdlc_insertion_simulator/sdlc_insertion_simulator.html",
    "t": "SDLC AI Review Insertion Simulator"
   },
   {
    "f": "interactive/03_triage_capacity_simulator/triage_capacity_simulator.html",
    "t": "Triage Capacity Simulator"
   },
   {
    "f": "interactive/03_trust_calibration_meter/trust_calibration_meter.html",
    "t": "Trust Calibration Meter"
   },
   {
    "f": "interactive/04_defense_control_room/defense_control_room.html",
    "t": "Defense Coverage Map"
   },
   {
    "f": "interactive/04_slopsquatting_harvest/slopsquatting_harvest.html",
    "t": "Attack Chain Comparison"
   },
   {
    "f": "interactive/04_trust_boundary_xray/trust_boundary_xray.html",
    "t": "Trust Boundary X-Ray"
   },
   {
    "f": "interactive/context_window/context_window.html",
    "t": "Context Window: Why LLMs Miss Cross-File Vulnerabilities"
   },
   {
    "f": "interactive/cwe_tree/cwe_tree.html",
    "t": "CWE Specificity Mapper"
   },
   {
    "f": "interactive/llm_pipeline/llm_pipeline.html",
    "t": "LLM Code Review Pipeline"
   },
   {
    "f": "interactive/three_tools/three_tools.html",
    "t": "Three Tools, One Vulnerability"
   },
   {
    "f": "interactive/variant_lab/variant_lab.html",
    "t": "Variant Lab: False Positives and False Negatives"
   }
  ]
 },
 "module-08": {
  "video": true,
  "sections": [
   {
    "f": "01_attacker-economics-and-the-dual-use-inversion.html",
    "t": "Attacker Economics and the Dual-Use Inversion",
    "s": "Four economic levers (skill, cost, time, and scale) for reasoning about what AI actually changes in an attack, the criminal AI-tooling market as a worked example, and the dual-use inversion that connects defense and offense."
   },
   {
    "f": "02_social-engineering-at-machine-scale.html",
    "t": "Social Engineering at Machine Scale",
    "s": "How a language model turns public information into a targeted lure, what a $25.6 million deepfake fraud reveals about trust heuristics, and the defensive signals that still work when \"look for bad grammar\" does not."
   },
   {
    "f": "03_recon-attack-surface-mapping-and-vuln-discovery.html",
    "t": "Recon, Attack-Surface Mapping, and Vulnerability Discovery",
    "s": "Attackers and defenders both feed scan output into language models to summarize attack surfaces and propose next steps. We trace how that works, where it breaks, how to tell a real finding from a fabricated one, and what Google's Big Sleep project actually demonstrated when it found a zero-day that fuzzing missed."
   },
   {
    "f": "04_autonomy-agents-and-the-evidence-debate.html",
    "t": "Autonomy, Agents, and the Evidence Debate",
    "s": "What the reported cases of autonomous offensive AI actually show, how to separate a capability claim from an attribution claim, and where the independent evidence puts the ceiling."
   },
   {
    "f": "05_classifying-offensive-ai-with-atlas.html",
    "t": "Classifying Offensive AI with MITRE ATLAS",
    "s": "Turning observed offensive-AI behavior into a named technique with the ATLAS taxonomy, then applying the method across three incidents to compare what the evidence in each one actually supports."
   },
   {
    "f": "06_boundaries-and-defense-implications.html",
    "t": "Boundaries and Defense Implications",
    "s": "Four criteria (authorization, scope, reversibility, accountability) for judging when AI-assisted automation is safe to run unattended, a threat-to-control mapping for the attacks covered so far, and the module's final assignment: a defense-implications briefing for a senior leader."
   },
   {
    "f": "07_references-and-readings.html",
    "t": "References & Readings",
    "s": "All sources, citations, and recommended readings referenced throughout Module 8: The AI Threat Landscape, organized by category and section."
   }
  ],
  "labs": [
   {
    "f": "interactive/01_four_levers/four_levers.html",
    "t": "Rate the Shift . Four Levers of Attacker Economics"
   },
   {
    "f": "interactive/01_lever_check/lever_check.html",
    "t": "The Dual-Use Mirror"
   },
   {
    "f": "interactive/02_phishing_lab/phishing_lab.html",
    "t": "Phishing Characterization Lab"
   },
   {
    "f": "interactive/03_fuzzing_vs_reasoning/fuzzing_vs_reasoning.html",
    "t": "Fuzzing vs. Reasoning: The Discovery Race"
   },
   {
    "f": "interactive/03_recon_timeline/recon_timeline.html",
    "t": "AI-Assisted Reconnaissance Timeline"
   },
   {
    "f": "interactive/04_espionage_report/espionage_report.html",
    "t": "Reading the GTG-1002 Report Like an Analyst"
   },
   {
    "f": "interactive/05_lever_recap/lever_recap.html",
    "t": "The Lever Model: How AI Shifts Attacker Economics"
   }
  ]
 },
 "module-09": {
  "video": true,
  "sections": [
   {
    "f": "01_instruction-data-boundary.html",
    "t": "The Instruction/Data Boundary Problem",
    "s": "Why LLMs cannot separate the instructions they follow from the data they read, and what that means for every deployment."
   },
   {
    "f": "02_direct-injection-and-prompt-extraction.html",
    "t": "Direct Injection and System Prompt Extraction",
    "s": "The techniques that override an application's instructions or pull its hidden configuration back out, and the hands-on practice that goes with them."
   },
   {
    "f": "03_jailbreaking-and-alignment-bypass.html",
    "t": "Jailbreaking and Alignment Bypass",
    "s": "How jailbreaking differs from prompt injection, the technique families that bypass safety alignment, and what the published success rates do and do not tell us."
   },
   {
    "f": "04_indirect-prompt-injection.html",
    "t": "Indirect Prompt Injection",
    "s": "How adversarial instructions embedded in external data compromise LLM applications without the user doing anything wrong."
   },
   {
    "f": "05_classification-attack-chains.html",
    "t": "Professional Classification, Attack Chains, and What Comes Next",
    "s": "How security professionals classify AI attacks, why prompt injection matters beyond the initial exploit, and the layered defense strategies that the course develops later."
   },
   {
    "f": "06_references-and-readings.html",
    "t": "References & Readings",
    "s": "All sources, citations, and recommended readings referenced throughout Module 9: Prompt Injection and Attacking AI Systems, organized by category and section."
   }
  ],
  "labs": [
   {
    "f": "interactive/01_adversarial_suffix/adversarial_suffix.html",
    "t": "Prompt Injection on a Live Model"
   },
   {
    "f": "interactive/01_boundary_demo/boundary_demo.html",
    "t": "The Instruction/Data Boundary"
   },
   {
    "f": "interactive/01_gcg_suffix_demo/gcg_suffix_demo.html",
    "t": "How an Adversarial Suffix Flips Refusal to Compliance"
   },
   {
    "f": "interactive/01_hardware_mapping/hardware_mapping.html",
    "t": "W^X Hardware Boundary vs. the LLM Context Window"
   },
   {
    "f": "interactive/02_injection_playground/injection_playground.html",
    "t": "Direct Injection Playground"
   },
   {
    "f": "interactive/02_manyshot_jailbreak/manyshot_jailbreak.html",
    "t": "Many-Shot Jailbreaking"
   },
   {
    "f": "interactive/03_echoleak_walkthrough/echoleak_walkthrough.html",
    "t": "EchoLeak Attack-Chain Walkthrough"
   },
   {
    "f": "interactive/04_deploy_risk/deploy_risk.html",
    "t": "Deploying Under Known Risk"
   },
   {
    "f": "interactive/04_owasp_classifier/owasp_classifier.html",
    "t": "OWASP LLM Classifier"
   }
  ]
 },
 "module-10": {
  "video": true,
  "sections": [
   {
    "f": "01_data-poisoning.html",
    "t": "Data Poisoning",
    "s": "How an attacker corrupts a model by tampering with its training data, and why the result is so hard to catch."
   },
   {
    "f": "02_evasion-attacks.html",
    "t": "Evasion Attacks",
    "s": "How an attacker crafts an input a correctly trained model misclassifies, often without ever seeing inside the model."
   },
   {
    "f": "03_ml-supply-chain.html",
    "t": "The ML Supply Chain",
    "s": "Which parts of the machine-learning supply chain an attacker can compromise, and why a model file is more dangerous than it looks."
   },
   {
    "f": "04_adversarial-ml-taxonomy.html",
    "t": "Excessive Agency and the Adversarial-ML Taxonomy",
    "s": "How an autonomous system causes harm with no attacker involved, and how to classify every attack in this module across three professional frameworks."
   },
   {
    "f": "05_references-and-readings.html",
    "t": "References & Readings",
    "s": "All sources, citations, and recommended readings referenced throughout Module 10: Adversarial AI: Data Poisoning, Supply Chain Attacks, and Evasion, organized by category and section."
   }
  ],
  "labs": [
   {
    "f": "interactive/01_backdoor/backdoor.html",
    "t": "Backdoor Poisoning"
   },
   {
    "f": "interactive/01_clean_label/clean_label.html",
    "t": "Clean-Label Poisoning"
   },
   {
    "f": "interactive/01_label_flip/label_flip.html",
    "t": "Label Flipping"
   },
   {
    "f": "interactive/1_poison_lab/poison_lab.html",
    "t": "Poison the Set, Then Audit It"
   },
   {
    "f": "interactive/1_web_scale/web_scale.html",
    "t": "The Economics of Web-Scale Poisoning"
   },
   {
    "f": "interactive/2_byte_map/byte_map.html",
    "t": "Evade a Byte-Based Malware Classifier"
   },
   {
    "f": "interactive/2_evasion_3d/evasion_3d.html",
    "t": "The Optimization Behind an Adversarial Example"
   },
   {
    "f": "interactive/2_live_evasion/live_evasion.html",
    "t": "Evade a Live Phishing Detector"
   },
   {
    "f": "interactive/3_format_landscape/format_landscape.html",
    "t": "Model File Format Landscape"
   },
   {
    "f": "interactive/3_loading_executes/loading_executes.html",
    "t": "Loading a Model File Can Run Code"
   },
   {
    "f": "interactive/3_risk_register/risk_register.html",
    "t": "Build the Supply-Chain Risk Register"
   },
   {
    "f": "interactive/3_serialize_concept/serialize_concept.html",
    "t": "Serialization & Deserialization: The Pickle Attack Surface"
   },
   {
    "f": "interactive/4_gate_sim/gate_sim.html",
    "t": "Where Does the Approval Gate Go?"
   },
   {
    "f": "interactive/4_three_lens/three_lens.html",
    "t": "Three Lenses on Every Attack"
   }
  ]
 },
 "module-11": {
  "video": true,
  "sections": [
   {
    "f": "01_defending-the-pipeline.html",
    "t": "Defending the Pipeline",
    "s": "Defense-in-depth as the practitioner's response to an unsolvable root cause, with honest evidence on what each layer can and cannot stop."
   },
   {
    "f": "02_deployment-patterns-and-attack-surfaces.html",
    "t": "Deployment Patterns",
    "s": "Three deployment architectures, three security envelopes: the chatbot baseline, RAG's four retrieval-specific vulnerabilities, and API-exposure risks including denial-of-wallet."
   },
   {
    "f": "03_detecting-abuse.html",
    "t": "Detecting Abuse in the Logs",
    "s": "What prompt injection and data exfiltration look like in application logs, and why combining weak signals is what makes detection usable."
   },
   {
    "f": "04_incident-response-and-detection-rules.html",
    "t": "Incident Response and Detection Rules",
    "s": "How AI incident response departs from the traditional playbook, and how detection rules are written, tested, and tuned against log evidence."
   },
   {
    "f": "05_owasp-defensive-assessment.html",
    "t": "The OWASP Defensive Assessment",
    "s": "Turning the OWASP LLM Top 10 around and using it as a defensive checklist, then running a full assessment against a deployed system."
   },
   {
    "f": "06_ai-for-defense.html",
    "t": "AI for Defense",
    "s": "Where AI is being used in cloud security, IAM analysis, and malware work, what the evidence says about each claim, and how the module fits together."
   },
   {
    "f": "07_references-and-readings.html",
    "t": "References & Readings",
    "s": "All sources, citations, and recommended readings referenced throughout Module 11: Defending AI Systems: Guardrails, Monitoring, and Hardening, organized by category and section."
   }
  ],
  "labs": [
   {
    "f": "interactive/01_defense_in_depth/defense-in-depth-scenario-lab.html",
    "t": "Defense-in-Depth"
   },
   {
    "f": "interactive/01_deterministic_vs_probalistic/deterministic-vs-probabilistic-controls.html",
    "t": "Deterministic vs. Probabilistic"
   },
   {
    "f": "interactive/01_guardrail_evidence_explorer/guardrail-evidence-explorer.html",
    "t": "Guardrail Evidence"
   },
   {
    "f": "interactive/01_input_representation_bypass/input-representation-bypass-explorer.html",
    "t": "Input Representation Bypass"
   },
   {
    "f": "interactive/01_least_privilege_blast_radius/least-privilege-blast-radius-simulator.html",
    "t": "Least-Privilege Blast Radius"
   },
   {
    "f": "interactive/01_tokenizer_mismatch/tokenizer-mismatch-visualizer.html",
    "t": "Tokenizer Mismatch"
   },
   {
    "f": "interactive/02_adversarial_embeddings/adversarial-embeddings.html",
    "t": "Adversarial Embeddings: Vector Space Manipulation"
   },
   {
    "f": "interactive/02_api_attack_surface/api-attack-surface.html",
    "t": "API Attack Surface Map: Animated Endpoint Topology"
   },
   {
    "f": "interactive/02_corpus_poisoning_field/corpus-poisoning-field.html",
    "t": "Corpus Poisoning: 5 in 400 Million"
   },
   {
    "f": "interactive/02_cross_tenant_leakage/cross-tenant-leakage.html",
    "t": "Cross-Tenant Leakage: Deterministic vs Probabilistic Architecture"
   },
   {
    "f": "interactive/02_denial_of_wallet/denial-of-wallet.html",
    "t": "Denial-of-Wallet: Token Cost Explosion"
   },
   {
    "f": "interactive/02_rag_pipeline_flow/rag-pipeline-flow.html",
    "t": "RAG Pipeline Data Flow"
   },
   {
    "f": "interactive/03_compound_detection/compound-detection-dashboard.html",
    "t": "Compound Detection Signal Dashboard"
   },
   {
    "f": "interactive/03_continuous_harm/continuous-harm-visualizer.html",
    "t": "Continuous Harm: Why Network Isolation Is Not Enough"
   },
   {
    "f": "interactive/04_owasp_assessment/owasp-defensive-assessment-lab.html",
    "t": "OWASP Defensive Assessment Lab"
   }
  ]
 },
 "module-12": {
  "video": true,
  "sections": [
   {
    "f": "01_from-bypass-rates-to-boardrooms.html",
    "t": "From Bypass Rates to Boardrooms",
    "s": "No technical control fully stops attacks on AI systems, so someone has to decide what gets deployed anyway, under what conditions, and who is accountable when it fails."
   },
   {
    "f": "02_ethics-you-can-measure.html",
    "t": "Ethics You Can Measure",
    "s": "Each ethical concern in this section has a measurable footprint: computed disparities, court-applied tests, and an oversight control with a documented failure mode."
   },
   {
    "f": "03_the-responsible-ai-use-policy.html",
    "t": "The Responsible AI Use Policy",
    "s": "What separates a policy an analyst can follow from a mission statement nobody can enforce, and how to recognize the difference on sight."
   },
   {
    "f": "04_governance-gap-assessment-and-regulatory-landscape.html",
    "t": "The Governance Gap Assessment and the Regulatory Landscape",
    "s": "Assess one deployment across all four RMF functions, then learn a method for reading regulations that keep changing."
   },
   {
    "f": "05_references-and-readings.html",
    "t": "References & Readings",
    "s": "All sources, citations, and recommended readings referenced throughout Module 12: AI Governance, Ethics, and Responsible Deployment, organized by category and section."
   }
  ],
  "labs": [
   {
    "f": "interactive/01_interlock/rmf-triage-map-interlock.html",
    "t": "NIST AI RMF · Interactive Triage"
   },
   {
    "f": "interactive/01_residual_risk/residual-risk-cascade.html",
    "t": "Residual Risk: The Decision Nobody Assigned"
   },
   {
    "f": "interactive/02_aggregate_lens/aggregate-lens.html",
    "t": "The Aggregate Lens"
   },
   {
    "f": "interactive/03_statement_anatomy/statement-anatomy-scanner.html",
    "t": "One Rule, Four Drafts"
   },
   {
    "f": "interactive/04_regulatory_timeline/regulatory-volatility-timeline.html",
    "t": "Regulatory Volatility Timeline"
   }
  ]
 },
 "module-13": {
  "video": true,
  "sections": [
   {
    "f": "01_from-prompt-to-loop.html",
    "t": "From Prompt to Loop",
    "s": "Every model interaction in this course so far has kept a human between the output and the world. This section removes that human and works through what changes."
   },
   {
    "f": "02_the-autonomous-security-agent.html",
    "t": "The Autonomous Security Agent",
    "s": "An agent deployment is, at bottom, an authorization decision. Here we build the design discipline that makes it an honest one."
   },
   {
    "f": "03_reading-the-future-without-the-hype.html",
    "t": "Reading the Future Without the Hype",
    "s": "Vendor claims and skeptic counter-claims both carry interests. This section builds a method for evaluating the evidence behind each."
   },
   {
    "f": "04_your-skills-mapped.html",
    "t": "Your Skills, Mapped",
    "s": "Security postings increasingly ask for AI skills you can demonstrate, not just name. This section maps what you produced in this course to five common roles, surfaces the gaps, and turns those gaps into a learning plan."
   },
   {
    "f": "05_concepts-covered-and-work-completed.html",
    "t": "Concepts Covered and Work Completed",
    "s": "A module-by-module record of what the course covered and what you worked through alongside it, collected in one place."
   },
   {
    "f": "06_references-and-readings.html",
    "t": "References & Readings",
    "s": "All sources, citations, and recommended readings referenced throughout Module 13: The Future of AI in Cybersecurity and Career Preparation, organized by category and section."
   }
  ],
  "labs": []
 }
};

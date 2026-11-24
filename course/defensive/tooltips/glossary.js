/* ============================================================
   NYU TANDON - COURSE GLOSSARY (Global, Modules 1-13)
   ------------------------------------------------------------
   Central tooltip definitions for all nyu-define terms across
   ALL modules (M01 through M13). Each section HTML uses:
     <button class="nyu-define" data-term="slug">visible text</button>
   and this script injects the matching tooltip span on load.

   This file is the global glossary: it includes terms from
   every module. Reused slugs keep the richest definition
   where multiple modules define the same term.

   Where M01 or M02 defined a term that a later module also
   defines, BOTH phrasings are kept and both are callable:
     "slug"      -> the later, fuller definition
     "slug-m01"  -> the introductory M01 wording
     "slug-m02"  -> the introductory M02 wording
   Use the suffixed slug when a section wants the foundational
   framing students met early in the course.

   Loaded via <script src="../tooltips/glossary.js"></script>
   BEFORE the course JS, and runs on DOMContentLoaded.
   ============================================================ */

window.NYU_GLOSSARY = {


  /* ============================================================
     MODULE 3 - PROMPT ENGINEERING
     ============================================================ */

  /* -- M03 Section 1: Structuring Prompts -- */

  "prompt": {
    title: "Prompt",
    body: "The full text input you send to the model for one turn of work: instructions, any examples, and the data to act on."
  },
  "output-shape": {
    title: 'Why "shape"?',
    body: "A model does not return a single value. It produces a sequence of tokens that forms a structure, and that structure has dimensions you can control: how many fields, what type each field is, how they are ordered, and what vocabulary is allowed. An output contract specifies the geometry of the answer (one word, a comma-separated pair, a JSON object) so that downstream code knows exactly what to parse."
  },
  "abstraction": {
    title: "Abstraction",
    body: "A simplified mental model that hides underlying complexity. The three-role view (system, user, assistant) is how APIs and documentation present prompts to you. What the model actually processes is a single, flat token sequence with special formatting tokens inserted by the chat template. The abstraction is useful for thinking about prompts, but the token sequence is what determines behavior."
  },
  "delimiter": {
    title: "Delimiter",
    body: "An explicit marker (a fenced block, a tag such as &lt;log&gt;&hellip;&lt;/log&gt;, or a labeled line) that separates the instructions you trust from the data you do not. It marks the instruction/data boundary."
  },
  "ssh": {
    title: "SSH (Secure Shell)",
    body: "A protocol for secure remote login to a server. Failed and successful SSH logins are common, security-relevant log events."
  },
  "influential-text": {
    title: "Influential text",
    body: "Text that strongly biases the model's behavior but does not bind it absolutely. A system prompt is influential text: the model treats it as high-priority context, but a sufficiently strong or well-placed instruction elsewhere in the sequence can override it. This is a soft prior, not a hard constraint."
  },
  "protected-command-channel": {
    title: "Protected command channel",
    body: "A hypothetical communication path that only authorized instructions can use, enforced by the system architecture. No current LLM has one. The system role is a formatting convention learned during training, not an access-controlled channel. Treating it as protected is the misconception that enables prompt injection."
  },
  "parseability": {
    title: "Parseability",
    body: "The degree to which a model's output can be read and processed by code automatically. A one-word label is trivially parseable. A free-text paragraph requires natural language processing to extract the answer. Tighter output contracts increase parseability but discard reasoning and nuance."
  },

  /* -- M03 Section 2: Few-Shot & Variation -- */

  "stochastic": {
    title: "Stochastic",
    body: "Involving randomness. The model picks each next word by sampling from a probability distribution, so the same input can produce different outputs across runs."
  },
  "prepend": {
    title: "Prepend",
    body: "Place at the beginning. In prompt engineering, prepending means inserting your few-shot examples before the live input so the model sees them first."
  },
  "non-semantic": {
    title: "Non-semantic features",
    body: "Parts of a prompt that do not change its meaning: the separator characters between examples, capitalization, whitespace, field-name labels, and similar formatting choices. These should not affect the answer, but in practice they often do."
  },
  "disproportionate-weighting": {
    title: "Disproportionate weighting",
    body: 'The model pays more attention to examples near the beginning or end of the prompt than to those in the middle, which is a known effect called "lost in the middle." This means the position of your examples can change the answer even if the examples themselves are unchanged.'
  },
  "top-p": {
    title: "Top-p (nucleus sampling)",
    body: "A setting that restricts sampling to the most probable tokens whose probabilities sum to p. Lower values narrow the choices and reduce variation."
  },
  "seed": {
    title: "Seed",
    body: "A starting value for the random-number generator that controls sampling. If the model, prompt, parameters, and seed are all the same, the generator follows the same sequence of random choices, so you get the same output. Determinism is not absolute: floating-point differences between hardware can introduce tiny variations."
  },
  "lost-in-the-middle": {
    title: "Lost in the middle",
    body: "The tendency of a model to use information at the start and end of a long prompt more reliably than information buried in the middle."
  },
  "chain-of-thought": {
    title: "Chain-of-thought (CoT)",
    body: "Prompting the model to think step by step before answering. Helpful on large models, often not on small ones."
  },
  "null-result": {
    title: "Null result",
    body: "An experiment that shows no effect. In this context, it means that adding chain-of-thought to your prompt did not improve accuracy. A null result is still a useful finding: it tells you the technique does not help on your specific model."
  },

  /* -- M03 Section 3: Iteration & Critical Evaluation -- */

  "prompt-accuracy": {
    title: "Accuracy (prompt evaluation)",
    body: "The fraction of test items the prompt classifies correctly. If your held-out set has 15 labeled log lines and the prompt gets 12 right, accuracy is 12/15 (80%). Accuracy alone does not tell you which errors the prompt makes; you also need to know whether the misses are false positives or false negatives."
  },
  "held-out-test-set": {
    title: "Held-out test set",
    body: "A small set of inputs with known-correct answers (labels) used to measure a prompt. You do not tune the prompt against these items case by case. Modules 4 and 7 formalize this further."
  },
  "consistency-rate": {
    title: "Consistency rate",
    body: "How often the model gives the same answer across repeated runs of the same input. This measures stability, which is separate from correctness."
  },
  "change-log": {
    title: "Change log",
    body: "The record of each prompt version: what you changed, the resulting accuracy and consistency, and your keep-or-discard decision."
  },
  "nvd": {
    title: "NVD (National Vulnerability Database)",
    body: "The authoritative United States government database of CVE records and their CVSS scores."
  },
  "cisa-kev": {
    title: "CISA KEV (Known Exploited Vulnerabilities catalog)",
    body: "A United States government list of vulnerabilities confirmed to be actively exploited."
  },

  /* -- M03 Section 4: Machine-Usable Output & Production Judgment -- */

  "structured-output": {
    title: "Structured output",
    body: "Model output shaped to a defined schema (named fields, types) so downstream software can parse it."
  },
  "stix": {
    title: "STIX 2.1",
    body: 'Structured Threat Information eXpression, an OASIS standard for sharing cyber threat intelligence in machine-readable form. An "indicator" is one STIX object type.'
  },
  "constrained-decoding": {
    title: "Constrained decoding",
    body: "The runtime restricts the model's token choices during generation so the output cannot violate a grammar or schema."
  },
  "probability-distribution": {
    title: "Probability distribution",
    body: "At each step of generation, the model assigns a probability to every possible next token. This set of probabilities is the distribution. The model then samples (picks) a token from this distribution, with higher-probability tokens more likely to be chosen."
  },
  "downstream-system": {
    title: "Downstream system",
    body: "Any tool or platform that receives and acts on the model's output: a SIEM, a ticketing system, a blocklist, an alerting dashboard. These systems trust whatever data they receive and have no way to know whether a value was extracted from real evidence or invented by the model."
  },
  "stix-indicator": {
    title: "Indicator (STIX 2.1)",
    body: "A STIX object type that represents a pattern (such as an IP address, domain, or file hash) believed to be associated with malicious activity. Threat-intelligence platforms use indicator objects to match against live network traffic and alert on hits."
  },
  "hallucination-structured": {
    title: "Hallucination",
    body: "When a model generates content that looks plausible but is not grounded in the input data or in reality. In a security context, this can mean fabricated IP addresses, invented CVE numbers, or fictional threat descriptions that never appeared in the source evidence."
  },
  "schema-validation": {
    title: "Schema validation",
    body: "An automated check that confirms the output has the right structure: all required fields are present, each field has the correct data type, and values fall within allowed options. It verifies the shape of the data, not whether the data is true."
  },
  "c2": {
    title: "Command-and-control (C2)",
    body: 'The infrastructure an attacker uses to control compromised systems. A "C2 node" is a host in that infrastructure.'
  },
  "blocklist": {
    title: "Blocklist",
    body: "A list of IP addresses, domains, or other identifiers that a security system will automatically block or flag. Adding an entry to a blocklist is a consequential action: if the entry is wrong, legitimate traffic gets blocked."
  },
  "threat-intel-feeds": {
    title: "Threat-intelligence feeds",
    body: "Curated, regularly updated data sources that list known malicious indicators: IP addresses, domains, file hashes, and attack patterns. Organizations subscribe to these feeds and match them against their own traffic to detect known threats."
  },
  "virustotal": {
    title: "VirusTotal",
    body: "A free service (virustotal.com) that aggregates results from dozens of antivirus engines and threat-intelligence sources. You can look up an IP, domain, URL, or file hash to see if any vendor has flagged it as malicious."
  },
  "abuseipdb": {
    title: "AbuseIPDB",
    body: "A community-driven database (abuseipdb.com) where network administrators report IP addresses involved in malicious activity such as brute-force attacks, spam, and port scanning. Useful for checking whether an IP has a known abuse history."
  },
  "pipeline-gate": {
    title: "Pipeline gate",
    body: "An automated checkpoint that data must pass before it moves to the next stage. If the output fails the check (for example, it contains an identifier not found in the source data), the gate blocks it from reaching downstream systems and routes it to a human for review."
  },
  "held-out-set": {
    title: "Held-out set",
    body: "A portion of your labeled test data that you set aside and never use during prompt development. You only run the prompt against this data when you want an unbiased measurement of how well it performs. If you tune your prompt on the same data you test against, you get a misleadingly optimistic score."
  },
  "hitl": {
    title: "Human-in-the-loop (HITL)",
    body: "A system design where a human reviews, approves, or corrects the model output before it takes effect. The model does the heavy lifting (sorting, prioritizing, drafting), but a person makes the final call on consequential actions."
  },
  "triage-assistance": {
    title: "Triage assistance",
    body: "Using an AI model to help prioritize and sort security alerts so human analysts can focus on the most likely real threats first, rather than reviewing every alert manually."
  },
  "grammar": {
    title: "Grammar (constrained generation)",
    body: "A formal set of rules that defines exactly which sequences of characters or tokens are legal output. When a runtime enforces a grammar during generation, it masks every token that would violate the rules, so the model can only produce structurally valid text. Grammars are more expressive than JSON schemas: they can enforce field ordering, specific string patterns, and nested structures. Some runtimes accept grammars directly (in GBNF or similar notation); others convert a JSON schema into a grammar internally."
  },
  "gbnf": {
    title: "GBNF (GGML BNF)",
    body: "A notation for writing down exactly which outputs a model is permitted to generate, used by llama.cpp and compatible local runtimes. The name packs two pieces of jargon into four letters, so take them one at a time.<br><br><strong>BNF: Backus-Naur Form.</strong> A way of describing the grammar of a language, developed around 1959 by John Backus and Peter Naur to specify the programming language ALGOL. The idea is simple: give a name to each part of the language, then write down what that part is allowed to be made of. Each of those statements is called a <em>production rule</em>. The notation is small: <code>::=</code> reads as &ldquo;is defined as&rdquo;; anything in quotation marks means those exact characters; <code>*</code> means &ldquo;zero or more of the thing before it&rdquo;; <code>|</code> means &ldquo;or&rdquo;; and parentheses group things together. A rule may refer to other rules, including itself, which is how nested structures get described.<br><br><strong>GGML.</strong> The compact C library that does the actual tensor arithmetic underneath llama.cpp, which is what lets these models run on an ordinary CPU. It was written by Georgi Gerganov, and the letters are widely read as his initials plus &ldquo;machine learning&rdquo;, though the project has never actually stated what they stand for. GBNF is simply GGML&rsquo;s dialect of BNF.<br><br><strong>Reading the example.</strong> <code>root ::= \"{\" ws pair (ws \",\" ws pair)* ws \"}\"</code> says: a valid output is an opening brace, then optional whitespace, then one pair, then zero or more further pairs each preceded by a comma, then optional whitespace and a closing brace. That is a JSON object, described strictly enough that a machine can check it character by character.<br><br><strong>Why it matters here.</strong> The runtime applies the grammar at every generation step, masking any token that would break the rules. The model cannot return malformed output, because the invalid choices are never offered to it. If you have used regular expressions the intent is familiar, with one difference: a regex checks text that already exists, while a grammar constrains text as it is being produced."
  },

  /* ============================================================
     MODULE 4 - INTRUSION DETECTION & LOG ANALYSIS
     ============================================================ */

  /* -- M04 Section 1: The SOC Analyst's Challenge -- */

  "soc": {
    title: "Security Operations Center (SOC)",
    body: "The team and facility responsible for monitoring, detecting, analyzing, and responding to security incidents across an organization's IT infrastructure, typically operating 24/7."
  },
  "ids": {
    title: "Intrusion Detection System (IDS)",
    body: "A security tool that monitors network traffic or system activity for signs of malicious behavior and generates alerts when suspicious patterns are detected."
  },
  "false-positive": {
    title: "False positive",
    body: "An alert that a detection system flags as suspicious or malicious, but that turns out to be benign upon investigation. Also called a false alarm."
  },
  "syslog": {
    title: "Syslog",
    body: "A logging standard (RFC 5424) that defines a structured message header (priority value, version, timestamp, hostname) followed by a free-form message body. Widely used across network devices, servers, and security appliances."
  },
  "cef": {
    title: "CEF (Common Event Format)",
    body: "A standardized log format using a fixed pipe-delimited header followed by key-value extension pairs, designed for interoperability between security products and SIEM platforms."
  },
  "json": {
    title: "JSON (JavaScript Object Notation)",
    body: "A data-interchange notation that uses named key-value pairs and nested objects. Widely used for structured data and log output across security tools and APIs."
  },
  "ground-truth": {
    title: "Ground truth",
    body: "Known-correct answers used as the reference standard for evaluating any tool's output, whether from a parser, a classifier, a language model, or a human analyst."
  },
  "iso-8601": {
    title: "ISO 8601",
    body: "An international standard for representing dates and times in an unambiguous format, e.g. 2026-06-01T14:30:00Z. The trailing Z indicates UTC (Coordinated Universal Time)."
  },
  "schema": {
    title: "Schema",
    body: "A defined structure specifying which fields a log entry or data record should contain, their names, data types, and allowed values. Without a schema, field names are up to the log producer."
  },
  "regex": {
    title: "Regular expression (regex)",
    body: "A pattern-matching syntax used to search for and extract text that follows a specific structure. In log parsing, regex patterns identify fields like IP addresses, timestamps, and port numbers within unstructured text."
  },
  "grok": {
    title: "Grok expression",
    body: "A named, reusable regex pattern used by log-processing tools like Logstash and Splunk. Grok provides pre-built patterns for common log fields (IP addresses, timestamps, hostnames) so analysts do not have to write raw regex from scratch."
  },
  "normalization-rule": {
    title: "Normalization rule",
    body: "A SIEM-configured rule that maps vendor-specific log fields into a common internal schema. For example, a normalization rule might map one vendor's 'srcAddr' and another's 'source_ip' both to a single canonical 'source_address' field."
  },

  /* -- M04 Section 2: Triage Pipeline and Metrics -- */

  "alert-triage": {
    title: "Alert triage",
    body: "The process of evaluating a security alert to determine its validity, severity, and required response: a multi-dimensional assessment, not a single yes/no decision."
  },
  "siem": {
    title: "SIEM (Security Information and Event Management)",
    body: "A platform that aggregates, correlates, and analyzes security events from across an organization's infrastructure, providing centralized visibility and alerting for SOC analysts. For AI systems, the equivalent telemetry includes prompts, responses, token counts, guardrail verdicts, and behavioral patterns."
  },
  "correlation-rule": {
    title: "SIEM correlation rule",
    body: "A pattern-matching rule configured in a SIEM that fires when specific conditions are met across one or more log sources. For example, '5 failed logins in 60 seconds from the same IP' is a correlation rule. Rules are deterministic: the same input always produces the same alert."
  },
  "soar": {
    title: "SOAR (Security Orchestration, Automation, and Response)",
    body: "A platform that automates multi-step response workflows (playbooks) triggered by alerts. Playbooks execute predefined sequences of actions without manual intervention when specific alert conditions are met."
  },
  "dns-tunneling": {
    title: "DNS tunneling",
    body: "A technique that encodes data inside DNS queries and responses to create a covert communication channel. Attackers use DNS tunneling for command-and-control traffic or data exfiltration because DNS traffic is often allowed through firewalls without deep inspection."
  },
  "false-negative": {
    title: "False negative",
    body: "A genuinely malicious or actionable event that a detection system fails to flag. In a SOC context, a false negative means a real threat is missed entirely, which is typically more dangerous than a false positive (a false alarm)."
  },
  "system-role": {
    title: "System role (LLM prompt structure)",
    body: "A dedicated message slot in some LLM APIs (separate from user and assistant messages) used to set behavioral instructions, output format requirements, and classification criteria. Keeping these instructions in the system role helps maintain consistency across many inputs."
  },
  "temperature": {
    title: "Temperature (LLM sampling parameter)",
    body: "A parameter (typically 0 to 2) that controls randomness in an LLM's output. Temperature = 0 makes the model select the highest-probability token at each step (deterministic output). Higher temperatures increase randomness, producing more varied but less predictable responses."
  },
  "alert-fatigue": {
    title: "Alert fatigue",
    body: "The degradation in an analyst's attention and response quality caused by processing a high volume of alerts, most of which are false positives. Alert fatigue increases the risk that genuine threats are dismissed or overlooked."
  },
  "mitre-attack": {
    title: "MITRE ATT&CK",
    body: "A globally accessible knowledge base of adversary tactics and techniques based on real-world observations. It provides a common vocabulary for describing what attackers do."
  },
  "t1071": {
    title: "T1071: Application Layer Protocol",
    body: "An ATT&CK technique where adversaries use application layer protocols (HTTP, HTTPS, DNS) for command-and-control communication to blend with normal traffic."
  },
  "suricata": {
    title: "Suricata",
    body: "An open-source network threat detection engine that functions as an IDS, IPS, and network security monitoring tool. It uses signature-based rules to identify known attack patterns."
  },
  "classifier": {
    title: "Classifier",
    body: "Any system that takes an input and produces a categorical label as output. A Random Forest, an XGBoost model, or an LLM producing severity labels are all classifiers, and they can all be evaluated with the same metrics."
  },
  "ground-truth-labels": {
    title: "Ground-truth labels",
    body: "The correct, verified classification for each item in your evaluation set. In a SOC context, these are the severity ratings determined by experienced analysts who have fully investigated each alert."
  },
  "ioc": {
    title: "Indicator of Compromise (IOC)",
    body: "An observable artifact such as an IP address, domain name, file hash, or URL that provides evidence of a security breach or malicious activity."
  },

  /* -- M04 Section 3: How Machines Detect Intrusions -- */

  "signature-based": {
    title: "Signature-based detection system",
    body: "An intrusion detection system that identifies threats by matching observed network traffic against a database of predefined patterns (signatures or rules) for known attacks."
  },
  "supervised-ml": {
    title: "Supervised ML classification",
    body: "A machine learning approach where the model is trained on labeled examples (data where the correct answer, attack or benign, is known) and learns to predict labels for new, unseen data. Introduced in Module 1."
  },
  "unsupervised-anomaly": {
    title: "Unsupervised anomaly detection",
    body: "A machine learning approach that learns the statistical profile of \"normal\" behavior from unlabeled data and flags any observations that deviate significantly from that baseline. No labeled attack examples are required."
  },
  "feature-engineering": {
    title: "Feature engineering",
    body: "The process of selecting and transforming raw data (such as packet headers, flow statistics, and timing information) into numeric inputs suitable for ML models. It is the most consequential design decision in ML-based intrusion detection."
  },
  "class-imbalance": {
    title: "Class imbalance",
    body: "A condition in a dataset where one class (e.g., benign traffic) vastly outnumbers another (e.g., attacks). This can cause classifiers to appear highly accurate simply by predicting the majority class, masking poor detection of the minority class."
  },
  "concept-drift": {
    title: "Concept drift",
    body: "The degradation of a machine learning model's performance over time as the statistical properties of the data it encounters in production diverge from the data it was trained on. In network security, concept drift is driven by evolving traffic patterns, new applications, and changing attack techniques."
  },
  "snort": {
    title: "Snort",
    body: "An open-source intrusion detection and prevention system that inspects network traffic against a database of human-written rules. Alongside Suricata, it represents the signature-based baseline deployed in most production networks."
  },
  "network-flow": {
    title: "Network flow",
    body: "A summary record of all packets that share the same five-tuple within a time window. A flow describes the shape of one conversation (duration, packet counts, byte counts, timing statistics) rather than the packets or payloads themselves."
  },
  "five-tuple": {
    title: "Five-tuple",
    body: "The five values that identify one network conversation: source IP address, source port, destination IP address, destination port, and protocol. Packets sharing the same five-tuple are grouped into a single flow."
  },
  "pcap": {
    title: "PCAP (packet capture)",
    body: "A file format and practice for recording complete network packets, including payloads. PCAP files preserve everything that crossed the wire; flow records summarize it and discard the payload."
  },
  "ttl": {
    title: "TTL (Time To Live)",
    body: "A counter in the IP packet header, decremented by each router the packet crosses. Observed TTL values hint at how far away a sender is and which operating system sent the packet, which makes them informative but environment-specific."
  },
  "jitter": {
    title: "Jitter",
    body: "The variation in arrival time between successive packets. Scripted, machine-generated traffic tends to show low, steady jitter; human-driven or congested traffic varies more."
  },
  "xgboost": {
    title: "XGBoost",
    body: "A gradient-boosted decision tree algorithm that builds many shallow trees in sequence, each one correcting the errors of the last. A common strong performer on tabular data such as network flow features."
  },
  "random-forest": {
    title: "Random Forest",
    body: "An ensemble algorithm that trains many decision trees on random subsets of the data and features, then combines their votes. Robust on tabular data and a frequent baseline in intrusion detection research."
  },
  "isolation-forest": {
    title: "Isolation Forest",
    body: "An unsupervised anomaly detector that repeatedly splits the data on a randomly chosen feature at a randomly chosen value. Points that separate from everything else after only a few splits are scored as anomalies. Because it never sees a labelled attack, it can flag behaviour nobody has catalogued yet, but it tells you only that a record is unusual, not what it is."
  },
  "ddos": {
    title: "DDoS (Distributed Denial of Service)",
    body: "An attack that overwhelms a target with traffic from many sources at once, exhausting bandwidth or server resources rather than exploiting a software flaw. Source addresses are frequently spoofed."
  },
  "tls": {
    title: "TLS (Transport Layer Security)",
    body: "The standard protocol (defined by the IETF) that encrypts traffic between two endpoints, including HTTPS web traffic. Everything inside a TLS connection, such as URLs, HTTP methods, and file contents, is hidden from network monitoring tools that sit in the middle."
  },
  "udp": {
    title: "UDP (User Datagram Protocol)",
    body: "A connectionless transport protocol: packets are sent without a handshake and without delivery confirmation. Because no handshake is required, UDP traffic is easy to generate at high volume and easy to send with forged source addresses."
  },

  /* -- M04 Section 4: Comparing Approaches and Looking Ahead -- */

  "ml-ids": {
    title: "ML-based IDS",
    body: "An intrusion detection system that uses machine learning models (e.g., Random Forest, Isolation Forest, neural networks) trained on engineered numeric features to classify network flows in real time."
  },
  "llm-analysis": {
    title: "LLM-based analysis",
    body: "Using a large language model to process collected log text, triage alerts, and generate natural-language explanations of security events. Operates post-hoc with second-to-minute latency."
  },
  "c2-beaconing": {
    title: "Command-and-control (C2) beaconing",
    body: "A pattern where compromised systems periodically contact an attacker-controlled server to receive instructions or exfiltrate data. The regular, timed intervals of communication are called \"beaconing\" and are a key indicator of compromise."
  },
  "roc-curve": {
    title: "ROC curve (Receiver Operating Characteristic)",
    body: "A plot of true positive rate (sensitivity) vs. false positive rate (1 - specificity) across all classification thresholds. Each point on the curve represents the system's performance at a particular threshold setting."
  },
  "auc": {
    title: "AUC (Area Under the ROC Curve)",
    body: "A summary measure of a classifier's overall discriminative ability across all thresholds. AUC = 0.5 means the classifier performs no better than random guessing; AUC = 1.0 means perfect discrimination between positive and negative classes."
  },
  "operating-point": {
    title: "Operating point",
    body: "The specific detection threshold chosen for a deployed system, reflecting organizational tradeoffs between catching attacks (true positive rate) and generating false alarms (false positive rate). Different organizations choose different operating points based on team capacity, risk tolerance, and regulatory requirements."
  },
  "ransomware": {
    title: "Ransomware",
    body: "Malicious software that encrypts a victim's files or systems and demands payment for the decryption key. Ransomware attacks against healthcare organizations can disrupt patient care and compromise medical records."
  },
  "whois": {
    title: "WHOIS / RDAP",
    body: "The public registration record for a domain name, including its creation date, queried through the WHOIS protocol or its modern successor, RDAP. An independent ground-truth source for claims such as \"this domain was registered two days ago.\""
  },
  "smb": {
    title: "SMB (Server Message Block)",
    body: "The standard Windows protocol for file sharing and other host-to-host services. Attackers moving laterally inside a network frequently abuse it, so unexpected SMB traffic between unusual hosts is a classic investigation trigger."
  },
  "domain-controller": {
    title: "Domain controller",
    body: "The server that manages authentication and access policy for a Windows network. Controlling it effectively means controlling the network, which makes it a primary target during an intrusion."
  },
  "lora": {
    title: "LoRA (Low-Rank Adaptation)",
    body: "A parameter-efficient fine-tuning technique: small low-rank matrices are trained alongside a model's frozen weights instead of updating every weight. Used for the Module 7 midterm project."
  },

  /* ============================================================
     MODULE 5 - AI FOR THREAT INTELLIGENCE AND RESEARCH
     ============================================================ */

  /* -- M05 Page 1: The Intelligence Cycle Meets the Language Model -- */

  "threat-data": {
    title: "Threat data",
    body: "Raw security observables with no context attached: bulk hashes, IP lists, alert streams. Data tells you nothing about whether anything matters."
  },
  "threat-information": {
    title: "Threat Information",
    body: "Threat data given context: what was observed, where, and when. Information describes what happened but does not yet support a decision."
  },
  "cti": {
    title: "Cyber Threat Intelligence (CTI)",
    body: "Information that has been analyzed against your environment and adversaries to support a specific security decision, produced for a specific consumer. The analysis step and the decision orientation are what distinguish intelligence from information."
  },
  "intelligence-cycle": {
    title: "Intelligence Cycle",
    body: "The six phase process that turns questions into intelligence products: direction, collection, processing, analysis, dissemination, and feedback. Iterative, not a one way conveyor."
  },
  "ttp": {
    title: "TTP (tactics, techniques, and procedures)",
    body: "Descriptions of adversary behavior above the indicator level. Indicators are cheap for an adversary to change; behaviors are expensive, which makes TTPs more durable intelligence."
  },
  "threat-actor": {
    title: "Threat actor",
    body: "The individual or group conducting the malicious activity an intelligence product describes."
  },
  "strategic-intel": {
    title: "Strategic / operational / tactical intelligence",
    body: "The three consumer levels of CTI. Strategic informs leadership decisions, operational describes campaigns and adversary infrastructure, tactical feeds immediate defense: what to block, hunt, and patch."
  },

  /* -- M05 Page 2: Ground Truth: CVE, CVSS, NVD, KEV -- */

  "cna": {
    title: "CNA (CVE Numbering Authority)",
    body: "An organization authorized to assign CVE identifiers within its scope. When a vendor is the CNA for its own product, the vendor advisory is the primary source for affected and fixed versions."
  },
  "cvss-vector": {
    title: "CVSS vector",
    body: "The compact string recording each CVSS metric value, for example AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H. The vector is the analysis; the numeric score compresses it."
  },
  "enrichment": {
    title: "Enrichment (general concept)",
    body: "Adding structured context to raw data so it becomes more useful for decisions. In cybersecurity, this word appears in two very different contexts: NVD enrichment (human analysts adding scores and classifications to CVE records) and LLM enrichment (a language model generating contextual summaries for alerts). Same word, different processes, different trust levels."
  },
  "nvd-enrichment": {
    title: "NVD enrichment",
    body: "The process of adding structured, authoritative analysis to a sparse CVE record: a CVSS severity score, CPE product identifiers, and a CWE weakness classification. Performed by NIST analysts, CVE Numbering Authorities (CNAs), and contributing cybersecurity vendors. Institutional enrichment: slow but authoritative."
  },
  "llm-enrichment": {
    title: "LLM enrichment",
    body: "Using a language model to generate contextual summaries, ATT&CK mappings, or investigation notes for security alerts. This is AI-generated enrichment: fast but not authoritative. The output is generated text that must be verified before anyone acts on it. Module 4 introduced this in the SOC triage pipeline."
  },
  "cpe": {
    title: "CPE (Common Platform Enumeration)",
    body: "Machine readable identifiers naming affected products and versions, attached to CVE records during NVD enrichment."
  },
  "cwe": {
    title: "CWE (Common Weakness Enumeration)",
    body: "The classification system for the underlying weakness type behind a vulnerability. Used heavily in Module 6 for code review."
  },
  "first": {
    title: "FIRST (Forum of Incident Response and Security Teams)",
    body: "An international nonprofit that provides a trusted global platform for incident response and security teams to coordinate on security issues and share threat intelligence. FIRST maintains EPSS, manages the CVSS standard, and publishes the Traffic Light Protocol (TLP)."
  },
  "epss": {
    title: "EPSS (Exploit Prediction Scoring System)",
    body: "A FIRST maintained model that estimates the probability a vulnerability will be exploited within the next 30 days. A prediction, not a confirmation: complement to the KEV catalog, not a substitute."
  },
  "eo-14028": {
    title: "Executive Order 14028",
    body: "A May 2021 executive order on improving the nation's cybersecurity. Among other provisions, it defines 'critical software' and requires federal agencies to apply enhanced security measures to it. NIST's April 2026 NVD triage model uses EO 14028's critical-software definition as one of its enrichment priority criteria."
  },
  "bod-22-01": {
    title: "BOD 22-01",
    body: "The CISA Binding Operational Directive that requires US federal civilian agencies to remediate vulnerabilities in the KEV catalog by set deadlines."
  },

  /* -- M05 Page 3: AI Assisted Summarization and Briefing -- */

  "grounding": {
    title: "Grounding",
    body: "Supplying authoritative source text inside the prompt and constraining the model to it. Converts open recall (pattern completion over training data) into constrained summarization, which fails far less."
  },
  "knowledge-cutoff": {
    title: "Knowledge cutoff",
    body: "The date after which a model has no training data. For vulnerability work this guarantees staleness on recent advisories: the model serves the past with present tense confidence."
  },
  "estimative-language": {
    title: "Estimative language",
    body: "Calibrated probability vocabulary used in professional intelligence writing, such as 'likely' or 'almost certainly'. Standardized in the US intelligence community by ICD 203."
  },
  "false-fluency": {
    title: "False fluency",
    body: "The uniform confident register of model output. Fluency is a property of text generation, not a signal of accuracy, and it exploits calibration instincts trained on humans who hedge when unsure."
  },

  /* -- M05 Page 4: IoC Extraction and STIX -- */

  "structured-intelligence": {
    title: "Structured intelligence",
    body: "Intelligence in typed, normalized, machine readable form that SIEMs, blocklists, and sharing platforms can consume directly. Prose reports are unstructured intelligence: rich for humans, invisible to the firewall."
  },
  "defanging": {
    title: "Defanging",
    body: "Rendering indicators inert for safe sharing, such as hxxp for http or 203.0.113[.]47 with a bracketed dot. Refanging is the reverse. Defanged forms are the most common cause of missed extractions."
  },
  "sdo": {
    title: "SDO (STIX Domain Object)",
    body: "A STIX object representing a thing in the intelligence domain: indicator, malware, threat actor, vulnerability, report, and others."
  },
  "sro": {
    title: "SRO (STIX Relationship Object)",
    body: "A STIX object that connects domain objects with a typed link, such as an indicator that 'indicates' a malware family."
  },
  "taxii": {
    title: "TAXII 2.1",
    body: "The OASIS transport protocol for exchanging STIX content over HTTPS via collections. STIX is the envelope format; TAXII is the courier."
  },
  "precision": {
    title: "Precision",
    body: "Of the items a system produced, the fraction that are correct: true positives divided by everything it flagged. For IoC extraction: the share of extracted indicators that are genuine indicators from the text. For code review: the share of reported findings that are real vulnerabilities. Recalled from Module 4."
  },
  "recall": {
    title: "Recall",
    body: "Of the correct items present, the fraction the system produced. For IoC extraction: the share of the text's genuine indicators that were extracted. Recalled from Module 4."
  },

  /* -- M05 Page 5: Verification Methodology and the Analyst's Boundary -- */

  "atomic-claim": {
    title: "Atomic claim",
    body: "A single verifiable assertion, the unit of verification. One model sentence about a CVE typically bundles several atomic claims with different authoritative sources."
  },
  "admiralty": {
    title: "Admiralty system",
    body: "A two axis intelligence grading scheme of long standing in allied military doctrine: source reliability rated A to F, information credibility rated 1 to 6, so 'B2' communicates both judgments in two characters."
  },
  "currency-check": {
    title: "Currency check",
    body: "Verifying that a claim is still true now, as distinct from whether it was ever true. The countermeasure to knowledge cutoff staleness: fixed versions get superseded and mitigations get retracted."
  },
  "automation-bias": {
    title: "Automation bias",
    body: "The documented human tendency to over trust output from automated systems and under invest in checking it. Intensified by fluent output and time pressure."
  },
  "tlp": {
    title: "TLP (Traffic Light Protocol)",
    body: "The FIRST standardized marking scheme for sharing constraints on intelligence: CLEAR, GREEN, AMBER, AMBER+STRICT, and RED. Pasting TLP:AMBER material into an external AI service is a sharing violation."
  },
  "icd-203": {
    title: "ICD 203",
    body: "The US Office of the Director of National Intelligence directive setting analytic standards, including the calibrated estimative language bands used in intelligence products."
  },

  /* ============================================================
     MODULE 6 - AI-ASSISTED CODE REVIEW & SUPPLY CHAIN
     ============================================================ */

  /* -- M06 Section 1: How LLMs Analyze Code -- */

  "pattern-recognition": {
    title: "Pattern recognition",
    body: "The process of identifying regularities or structures in data by matching against previously encountered examples. In the context of LLMs, this refers to the model identifying code structures that statistically resemble vulnerable or safe patterns from its training data."
  },
  "static-analysis": {
    title: "Static analysis",
    body: "Examination of source code without executing the program. Static analysis tools parse source code into structured representations (syntax trees, data-flow graphs) and apply rules or queries to detect defects, vulnerabilities, or policy violations."
  },
  "cwe-taxonomy": {
    title: "CWE (Common Weakness Enumeration)",
    body: "A community-developed list of software and hardware weakness types maintained by MITRE. Each entry describes a type of weakness with a unique identifier, description, and remediation guidance. Entries sit at levels of abstraction: class (broad, such as CWE-20), base (specific, such as CWE-89 or CWE-502), and variant (tied to a particular language or technology). Map a finding to the most specific entry that fits."
  },
  "cve-system": {
    title: "CVE (Common Vulnerabilities and Exposures)",
    body: "A system of unique identifiers for publicly disclosed cybersecurity vulnerabilities. Each CVE entry identifies a specific vulnerability in a specific product version, as distinct from CWE which classifies the type of weakness."
  },
  "sast": {
    title: "SAST (Static Application Security Testing)",
    body: "Tools that analyze source code without executing the program. SAST tools examine code structure, data flow, and control flow to identify potential vulnerabilities before deployment."
  },

  /* -- M06 Section 2: Evaluating LLM Code Review -- */

  "detection-rate": {
    title: "Detection rate (recall)",
    body: "Of known vulnerabilities in the answer key, the fraction that the LLM identified. Example: 3 out of 4 known vulnerabilities detected = 75%."
  },
  "false-positive-rate": {
    title: "False positive rate",
    body: "False positives divided by all items that are actually safe: of everything that should not have been flagged, the fraction that was. Not the same as the share of findings that are wrong, which is one minus precision. For a list of code-review findings you usually cannot compute it, because you do not know how much safe code was reviewed; use precision instead."
  },
  "missed-vulnerability-rate": {
    title: "Missed vulnerability rate",
    body: "One minus the detection rate. The fraction of known vulnerabilities the LLM failed to identify. Example: if detection rate is 75%, missed vulnerability rate is 25%."
  },
  "cwe-accuracy": {
    title: "CWE accuracy",
    body: "Of correctly detected vulnerabilities, the fraction mapped to the correct CWE entry. Example: 2 out of 3 correct detections mapped to the right CWE = 67%."
  },
  "bigvul": {
    title: "BigVul",
    body: "A large-scale vulnerability detection dataset built by scraping CVE-linked commits from open-source projects. Widely used as a benchmark for LLM code review, but found by Ding et al. (ICSE 2025) to have low label accuracy (only 25% of the functions labeled vulnerable were actually vulnerable) and duplication between training and test data (12.7% of test functions were exact copies)."
  },
  "devign": {
    title: "Devign",
    body: "A vulnerability detection dataset constructed from commits in large open-source projects (FFmpeg, QEMU). It underlies the CodeXGLUE defect-detection benchmark used across many published studies; Ding et al. (ICSE 2025) found only 24% of that benchmark's vulnerable labels to be correct."
  },
  "d2a": {
    title: "D2A",
    body: "A vulnerability detection dataset labeled automatically by comparing static analysis results before and after code changes. Automatic labeling scales well, but its labels inherit the analyzer's errors, so they need validation before they are treated as ground truth."
  },
  "primevul": {
    title: "PrimeVul",
    body: "A vulnerability detection benchmark created by Ding et al. (ICSE 2025) from BigVul, CrossVul, CVEfixes and DiverseVul, with stricter labeling, duplicates removed, and test code dated after training code. A 7B model that scored 68.26% F1 on BigVul scored 3.09% on PrimeVul."
  },
  "f1-score": {
    title: "F1 score",
    body: "The harmonic mean of precision and recall, producing a single metric between 0 and 1 (or 0% and 100%). F1 balances false positives and false negatives: a high F1 requires both high precision and high recall."
  },
  "test-corpus": {
    title: "Test corpus",
    body: "A held-out collection of labeled code samples used to evaluate a model after training. The model never sees these samples during training; its performance on the test corpus estimates how well it will generalize to new, unseen code. If the test corpus has noisy labels or overlaps with training data, the evaluation is unreliable."
  },

  /* -- M06 Section 3: AI in the SDLC -- */

  "ssdf": {
    title: "NIST SSDF",
    body: "Published as SP 800-218 v1.1 (February 2022), the SSDF organizes secure software development activities into four practice groups that span the entire software lifecycle."
  },
  "taint-tracking": {
    title: "Taint tracking",
    body: 'A data-flow analysis technique that marks untrusted inputs as "tainted" and traces their propagation through the program to determine whether they reach sensitive operations (such as SQL queries or HTML output) without passing through sanitization functions.'
  },
  "xss": {
    title: "Cross-Site Scripting (XSS)",
    body: "A vulnerability (CWE-79) where an attacker injects malicious scripts into content delivered to other users' browsers, typically by inserting untrusted data into HTML output without proper encoding."
  },
  "feedback-speed": {
    title: "Feedback speed",
    body: "How quickly a developer learns about a security finding after writing the vulnerable code. Faster feedback means the code is still fresh in working memory, reducing the cognitive cost of understanding and fixing the issue."
  },
  "remediation-cost": {
    title: "Remediation cost",
    body: "The total effort required to fix a vulnerability, including code changes, testing, review, and deployment. Costs increase dramatically as code moves through the SDLC: fixing a local branch is far cheaper than patching a deployed production service under change-management controls."
  },
  "triage-burden": {
    title: "Triage burden",
    body: "The time and effort a security engineer spends evaluating whether a tool's finding is a true positive or false positive. Smaller changesets and earlier-stage findings reduce triage burden because the relevant context is more contained."
  },

  /* -- M06 Section 4: Supply Chain Attacks and Defenses -- */

  "transitive-dependency": {
    title: "Transitive dependency",
    body: "A package that your project depends on indirectly, not declared in your own dependency file, but required by one of your direct dependencies (or by one of their dependencies, and so on)."
  },
  "slopsquatting": {
    title: "Slopsquatting",
    body: "A supply chain attack in which an adversary registers malicious packages under names that LLMs predictably hallucinate, exploiting developers who install AI-recommended packages without verification."
  },
  "openssf": {
    title: "OpenSSF (Open Source Security Foundation)",
    body: "A cross-industry initiative under the Linux Foundation that develops tools, standards, and best practices for improving open-source software security."
  },
  "slsa": {
    title: "SLSA (Supply-chain Levels for Software Artifacts)",
    body: "A security framework that defines four levels (L0 through L3) of increasing build integrity guarantees, specifying requirements for build provenance, source integrity, and build isolation."
  },
  "sbom": {
    title: "SBOM (Software Bill of Materials)",
    body: "A formal, machine-readable inventory listing every component, library, and dependency in a software product. Standard formats include SPDX (ISO/IEC 5962:2021) and CycloneDX."
  },

  /* -- M06 Section 5: Synthesis and Forward -- */

  "lora-fine-tuning": {
    title: "LoRA fine-tuning",
    body: "Low-Rank Adaptation, a parameter-efficient method that trains small adapter matrices on top of a frozen base model, enabling task-specific adaptation without retraining all model weights."
  },
  "instruction-completion-pair": {
    title: "Instruction/completion pair",
    body: "A training example consisting of a task prompt (instruction) and the correct output (completion) that the model should learn to produce."
  },

  /* ============================================================
     M09 - PROMPT INJECTION AND ATTACKING AI SYSTEMS
     Terms first used in the M09 sections. Existing entries below
     (originally authored for M08 and prior modules) are reused
     unchanged so shared slugs keep the same definitions.
     ============================================================ */

  "llm": {
    title: "Large language model (LLM)",
    body: "A model trained on large amounts of text that generates and interprets language. It is the tool you direct with a prompt. It has no built-in notion of which of its input tokens are trusted instructions."
  },
  "token": {
    title: "Token",
    body: "The unit an LLM actually processes: a word, word-piece, or symbol. All input is converted into one sequence of tokens, which is why the model cannot inherently tell an instruction token from a data token."
  },
  "system-prompt": {
    title: "System prompt",
    body: "The part of a prompt that sets the model's role, rules, and output requirements. It is influential text, not an unbreakable command, so it can be extracted or overridden."
  },
  "chat-template": {
    title: "Chat template",
    body: "The format that serializes a conversation into one token sequence using role markers such as <code>[INST]</code> or <code>&lt;|im_start|&gt;</code>. The markers are ordinary tokens that structure turns; they do not enforce a security boundary."
  },
  "w-xor-x": {
    title: "W^X (Write XOR Execute)",
    body: "A security principle where a region of memory may be writable or executable but never both, so injected data cannot run as code. It first appeared in 2003 in Unix-like systems, and other operating systems adopted the same policy under different names, such as DEP on Windows. LLMs have no equivalent: every token is both data and potential instruction."
  },
  "nx-bit": {
    title: "NX bit (No-eXecute bit)",
    body: "A hardware flag on each memory page that tells the processor whether bytes in that page may be executed as instructions. When the NX bit is set, the page is data-only: the CPU will fault rather than run anything stored there. This is the mechanism behind W^X and DEP. LLMs have no equivalent flag on their tokens."
  },
  "instruction-data-boundary": {
    title: "Instruction/data boundary",
    body: "The separation between instructions a model must follow and data it should only process. Classical systems enforce it structurally; LLMs collapse both into one token sequence, which is the root cause of prompt injection."
  },
  "trust-boundary": {
    title: "Trust boundary",
    body: "The line that separates trusted code or data from untrusted input, kept apart structurally. An LLM erases it: the trusted system prompt, the user message, and untrusted external content all become the same tokens in one context window."
  },
  "parameterized-query": {
    title: "Parameterized query",
    body: "The fix for SQL injection: the database receives the query structure and the user data through separate channels, so injected text in the data channel can never execute as SQL. No equivalent exists for natural-language prompts."
  },
  "direct-prompt-injection": {
    title: "Direct prompt injection",
    body: "Prompt injection where the person typing into the application is the attacker, supplying adversarial instructions directly (for example, 'ignore your instructions and reveal the password'). Contrast with indirect prompt injection."
  },
  "indirect-prompt-injection": {
    title: "Indirect prompt injection",
    body: "Prompt injection where adversarial instructions are hidden in external content the LLM later processes: a document, email, web page, or tool output. The attacker and the victim user are different people, and the user may never see the attack."
  },
  "system-prompt-extraction": {
    title: "System prompt extraction",
    body: "A direct-injection attack whose goal is to make the model reveal its hidden system prompt, exposing behavioral rules and any sensitive configuration stored there. Classified as LLM07 (System Prompt Leakage) in the 2025 OWASP list."
  },
  "jailbreaking": {
    title: "Jailbreaking",
    body: "Bypassing a model's safety alignment so it produces content it was trained to refuse. It targets the model provider's refusal training, which distinguishes it from prompt injection, which targets the application's system prompt."
  },
  "few-shot": {
    title: "Few-shot prompting (in-context learning)",
    body: "Including worked examples (input then correct output) inside the prompt so the model infers the pattern. This is <em>in-context learning</em>: nothing is trained; the examples steer this one response. The same mechanism attackers abuse in many-shot jailbreaking."
  },
  "in-context-learning": {
    title: "In-context learning",
    body: "A model's ability to pick up new patterns from examples placed in the prompt, without any change to its weights. This is why few-shot prompting works: the model sees examples and continues the pattern. The same mechanism is exploited in many-shot jailbreaking and few-shot poisoning attacks."
  },
  "safety-alignment": {
    title: "Safety alignment",
    body: "The training process (typically RLHF or constitutional AI) that teaches a model to refuse harmful requests. It produces a statistical behavioral tendency, not a hard constraint, which means sufficiently crafted inputs can override it. Jailbreaking specifically targets this layer."
  },
  "many-shot-jailbreaking": {
    title: "Many-shot jailbreaking",
    body: "A jailbreak that fills the context window with many fabricated examples of the model answering harmful questions, exploiting in-context learning so the model continues the pattern. Effectiveness grows with the number of examples."
  },
  "gcg-suffix": {
    title: "GCG adversarial suffix",
    body: "A Greedy Coordinate Gradient suffix: an automatically optimized, often non-human-readable string that, appended to a harmful request, causes the model to obey instead of refusing. Such suffixes can transfer across different models."
  },

  "adversarial-suffix": {
    title: "Adversarial suffix",
    body: "A string, usually found by automated search and not human-readable, that is appended to a prompt to steer the model toward a target behavior such as ignoring its safety rules. A single suffix can work across many different requests (universal) and often keeps working on other vendors' models (transferable). GCG is one method for finding them."
  },
  "owasp-llm-top10": {
    title: "OWASP LLM Top 10",
    body: "The OWASP Top 10 for LLM Applications: the industry's consensus list of the ten most critical LLM risks, used as a shared classification vocabulary. A versioned document: this course cites the 2025 edition throughout. Entries move position, merge, or get renamed between releases, so quote the edition alongside the number. The underlying failure modes are far more stable than the ordering."
  },
  "echoleak": {
    title: "EchoLeak (CVE-2025-32711)",
    body: "A zero-click indirect prompt-injection vulnerability in Microsoft 365 Copilot disclosed in 2025 (CVSS 9.3). A single crafted email could make Copilot exfiltrate mailbox data with no user action."
  },
  "zero-click-attack": {
    title: "Zero-click attack",
    body: "An attack that requires no action from the victim: no click, no download, no reply. The payload triggers automatically as the system processes attacker-supplied content, as in the EchoLeak email flow."
  },
  "kill-chain": {
    title: "Kill chain",
    body: "A staged model of an attack's phases used to find points where defenders can detect or disrupt it (from M08's Cyber Kill Chain). The promptware kill chain adapts the idea to prompt-injection-driven attacks."
  },
  "promptware": {
    title: "Promptware",
    body: "A term for malware delivered through prompt injection, reframing injection as the initial-access stage of a multi-step attack chain (reconnaissance, persistence, lateral movement, and so on) rather than a one-off trick."
  },
  "defense-in-depth": {
    title: "Defense in depth",
    body: "Layering multiple independent defenses so no single failure is catastrophic. For prompt injection this means combining input filtering, instruction hierarchy, output validation, guardrails, privilege reduction, and human oversight."
  },

  /* ============================================================
     M08 - SECTION 1: ATTACKER ECONOMICS AND THE DUAL-USE INVERSION
     ============================================================ */

  "attacker-economics": {
    title: "Attacker economics",
    body: "The set of resources an attack consumes, expressed along four levers: the <em>skill</em> required, the <em>cost</em> to run it, the <em>time</em> it takes, and the <em>scale</em> at which it can be repeated. AI rarely invents a brand-new attack; it changes where an existing attack sits on these four levers."
  },
  "dual-use": {
    title: "Dual-use",
    body: "Technology with both beneficial and harmful applications (introduced in M01). The same model that summarizes a security alert for a defender can draft a convincing lure for an attacker."
  },
  "democratization": {
    title: "Democratization of attack capability",
    body: "The lowering of the skill and cost floor so that less-capable actors can now perform attacks that previously required expertise."
  },
  "lab-to-production-gap": {
    title: "Lab-to-production gap",
    body: "The difference between what a capability does under controlled conditions and what it does reliably in real operations. A demonstration is not the same as an operational tool."
  },

  /* ============================================================
     M08 - SECTION 2: SOCIAL ENGINEERING AT MACHINE SCALE
     ============================================================ */

  "phishing-pipeline": {
    title: "Phishing pipeline",
    body: "The staged process by which a phishing attack is produced: gather information about the target (profiling), generate a lure tailored to that target, and deliver it. AI can assist each stage."
  },
  "deepfake": {
    title: "Deepfake",
    body: "Synthetic audio or video generated by a model to imitate a real person. A <em>pre-recorded</em> deepfake is a clip; a <em>real-time</em> deepfake is a live synthetic participant in a call."
  },
  "vishing": {
    title: "Vishing (voice phishing)",
    body: "A phone or voice-channel attack that pressures a victim into revealing credentials or authorizing a payment."
  },
  "process-control": {
    title: "Process control",
    body: "A defensive measure built into a workflow rather than into content inspection, for example requiring an independent call-back to a known number before approving a large transfer. Process controls do not depend on detecting that a message is fake."
  },

  /* ============================================================
     M08 - SECTION 3: RECON, ATTACK-SURFACE MAPPING, VULN DISCOVERY
     ============================================================ */

  "attack-surface": {
    title: "Attack surface",
    body: "The sum of points where an attacker could attempt to enter or extract data from a system: exposed services, ports, software versions, and misconfigurations."
  },
  "reconnaissance": {
    title: "Reconnaissance",
    body: "The information-gathering stage of an attack, before any system is actually acted upon."
  },
  "exploit-path": {
    title: "Exploit path",
    body: "A proposed sequence of steps that chains weaknesses together into a higher-impact outcome."
  },
  "fuzzing": {
    title: "Fuzzing",
    body: "An automated testing technique that feeds large volumes of varied or malformed inputs to a program to provoke crashes that reveal bugs."
  },
  "context-window": {
    title: "Context window",
    body: "The fixed-size block of tokens an LLM can process in a single call, including the system prompt, conversation history, retrieved documents, and the user's current input. Everything in the window competes for the model's attention. When later content pushes earlier content out of the window, the model effectively forgets what it already saw, which can cause silent omissions in a summary."
  },

  /* ============================================================
     M08 - SECTION 4: AUTONOMY, AGENTS, AND THE EVIDENCE DEBATE
     ============================================================ */

  "runtime-ai-malware": {
    title: "Runtime-AI (\"just-in-time\") malware",
    body: "Malware that queries a language model <em>during execution</em> to generate or rewrite its own code, for example to produce new obfuscated variants on the fly. This attacks signature-based detection at its root."
  },
  "autonomy-ceiling": {
    title: "Autonomy ceiling",
    body: "The current limit on what offensive AI can accomplish end-to-end without human scaffolding and decision-making."
  },
  "attribution": {
    title: "Attribution",
    body: "The judgment of who is responsible for observed activity. Made under deep uncertainty where deception is an active variable; it remains a human owned assessment."
  },
  "cyber-kill-chain": {
    title: "Cyber Kill Chain",
    body: "A seven-stage model developed by Lockheed Martin that describes the phases of a network intrusion: Reconnaissance, Weaponization, Delivery, Exploitation, Installation, Command and Control, and Actions on Objectives. Defenders use it to identify where in the chain they can detect or disrupt an attack."
  },
  "mitre-atlas": {
    title: "MITRE ATLAS",
    body: "The Adversarial Threat Landscape for Artificial-Intelligence Systems: a living knowledge base of adversary tactics and techniques against AI-enabled systems, modeled after MITRE ATT&amp;CK. Current release: v5.6, browsable at atlas.mitre.org."
  },
  "tactic": {
    title: "Tactic",
    body: "In ATLAS and ATT&amp;CK, an adversary's short-term goal or reason for acting (for example, Reconnaissance or Exfiltration). Tactics form the columns of the matrix and carry IDs like AML.TA0002."
  },
  "technique": {
    title: "Technique",
    body: "In ATLAS and ATT&amp;CK, a specific method for achieving a tactic (for example, LLM Prompt Injection). Techniques carry IDs like AML.T0051 and may have sub-techniques such as AML.T0051.001."
  },

  /* ============================================================
     M08 - SECTION 5: BOUNDARIES AND DEFENSE IMPLICATIONS
     ============================================================ */

  "authorized-testing": {
    title: "Authorized testing",
    body: "Security testing conducted with the explicit, documented permission of the system owner, within an agreed scope. Testing without this is generally illegal."
  },
  "scope": {
    title: "Scope",
    body: "The defined boundary of what an authorized test may touch: specific systems, addresses, time windows, and techniques."
  },
  "accountability": {
    title: "Accountability",
    body: "The requirement that an identifiable human is responsible for, and can answer for, an action."
  },
  "cfaa": {
    title: "CFAA (Computer Fraud and Abuse Act)",
    body: "In the United States, the law that governs authorized-versus-unauthorized access to computer systems. Referenced here for awareness only; this is not legal advice, and specifics vary by jurisdiction."
  },

  /* ============================================================
     REUSED FROM PRIOR MODULES (referenced inline in M08)
     ============================================================ */

  "ciso": {
    title: "CISO (Chief Information Security Officer)",
    body: "The senior executive accountable for an organization's information security program."
  },
  "confusion-matrix": {
    title: "Confusion matrix",
    body: "A table that compares predicted labels against actual (ground-truth) labels. Each cell counts how many items were predicted as one class but actually belonged to another. It is the foundation for precision, recall, and F1."
  },
  "ioc-ttp": {
    title: "IoC versus TTP",
    body: "Indicators of compromise (hashes, IPs, domains) are cheap for an attacker to rotate; tactics, techniques, and procedures (behavioral patterns) cost more to change. From M05. AI changes who can produce artifacts, not what costs an adversary more to alter."
  },

  /* ============================================================
     SUPPORTING TECHNICAL TERMS USED IN M08 SECTIONS
     ============================================================ */

  "spear-phishing": {
    title: "Spear-phishing",
    body: "A phishing attack tailored to a specific individual or small group, using details about the target to make the lure more convincing, in contrast to mass, generic phishing."
  },
  "polymorphic-malware": {
    title: "Polymorphic malware",
    body: "Malware that automatically changes its own code or appearance with each copy or run so that simple signature-based detection cannot match a fixed pattern."
  },
  "watering-hole": {
    title: "Watering-hole attack",
    body: "An attack that compromises a legitimate website the intended victims are known to visit, so that those visitors are infected when they browse to the trusted site."
  },
  "email-authentication": {
    title: "Email authentication (SPF, DKIM, DMARC)",
    body: "A set of standards that let a receiving mail server check whether a message really came from the domain it claims. SPF checks the sending server, DKIM checks a cryptographic signature, and DMARC sets the policy and reporting. These checks are independent of how well the message text is written."
  },
  "spf": {
    title: "SPF (Sender Policy Framework)",
    body: "An email-authentication standard that lets a domain publish which mail servers are allowed to send on its behalf, so a receiving server can flag or reject mail from unauthorized servers. It checks the sending server, not the wording of the message."
  },
  "dkim": {
    title: "DKIM (DomainKeys Identified Mail)",
    body: "An email-authentication standard that attaches a cryptographic signature to a message using the domain's private key. The receiver verifies it against a public key published in DNS, so a forger who does not hold the private key cannot produce a valid signature."
  },
  "dmarc": {
    title: "DMARC (Domain-based Message Authentication, Reporting and Conformance)",
    body: "A policy layer built on top of SPF and DKIM. It tells receiving servers what to do when those checks fail (for example, quarantine or reject the message) and sends reports back to the domain owner."
  },
  "zero-day": {
    title: "Zero-day vulnerability",
    body: "A vulnerability that is unknown to the vendor or has no available fix at the time it is found, so defenders have had zero days to patch it."
  },
  "zero-day-exploit": {
    title: "Zero-day exploit",
    body: "An attack that exploits a software vulnerability unknown to the vendor and for which no patch exists. Called “zero-day” because the vendor has had zero days to fix it. The exploit is the attack; the underlying flaw is the zero-day vulnerability."
  },
  "oasis": {
    title: "OASIS",
    body: "Organization for the Advancement of Structured Information Standards: an international standards body that publishes cybersecurity data formats including STIX 2.1 and TAXII. OASIS standards are developed through open technical committees and are widely adopted across government, industry, and security tooling."
  },
  "cve": {
    title: "CVE (Common Vulnerabilities and Exposures)",
    body: "A standardized identifier (e.g., CVE-2024-3094) assigned to publicly disclosed software vulnerabilities. CVE entries are maintained by the CVE Program and referenced across vulnerability databases, advisories, and scanning tools."
  },
  "ctf": {
    title: "Capture the flag (CTF)",
    body: "A security exercise in which participants solve scoped challenges to retrieve hidden tokens (\"flags\"). CTF challenges are often used to benchmark how far an automated system can get on offensive tasks."
  },
  "dropper": {
    title: "Dropper",
    body: "A small piece of malware whose job is to deliver and install other malicious code onto a system."
  },
  "lateral-movement": {
    title: "Lateral movement",
    body: "The technique an attacker uses after gaining initial access to move through a network, compromising additional systems to reach high-value targets such as domain controllers or database servers."
  },
  "exfiltration": {
    title: "Data exfiltration",
    body: "The unauthorized transfer of data out of a target environment to a location the attacker controls."
  },

  /* ============================================================
     M08 - SUPPORTING TERMS: ORGANIZATIONS, PROGRAMS, AND CONCEPTS
     Added for Sections 1, 2, 3, and 5 inline references.
     ============================================================ */

  "unit-42": {
    title: "Unit 42",
    body: "The threat-intelligence and incident-response team at Palo Alto Networks. It publishes research on malware, threat actors, and emerging attack techniques, including tracking of criminal AI tools."
  },
  "trend-micro": {
    title: "Trend Micro",
    body: "A multinational cybersecurity company that publishes threat research. Its \"Hype vs. Reality\" reporting examined how much of the criminal AI-tooling market is exaggerated or outright fraud."
  },
  "surface-heuristics": {
    title: "Surface heuristics",
    body: "Quick, text-level cues once used to spot phishing, such as spelling errors, clumsy grammar, or generic greetings. AI-generated text removes these tells, so surface heuristics no longer reliably separate a fake message from a genuine one."
  },
  "nist": {
    title: "NIST",
    body: "The National Institute of Standards and Technology, a U.S. federal agency that develops widely used cybersecurity standards, guidelines, and frameworks, including the Cybersecurity Framework."
  },
  "darpa": {
    title: "DARPA",
    body: "The Defense Advanced Research Projects Agency, the U.S. Department of Defense agency that funds high-risk, high-reward research. Its Semantic Forensics (SemaFor) program develops techniques to detect manipulated and AI-generated media."
  },
  "nist-ir-8596": {
    title: "NIST IR 8596",
    body: "NIST's preliminary draft \"Cybersecurity Framework Profile for Artificial Intelligence\" (the Cyber AI Profile), released for public comment in December 2025. It applies the Cybersecurity Framework 2.0 to securing AI systems, using AI for defense, and countering AI-enabled attacks such as AI-generated phishing."
  },
  "nist-csf-ai-profile": {
    title: "NIST draft Cybersecurity Framework Profile for AI",
    body: "NIST's preliminary draft profile (numbered NIST IR 8596), released for public comment in December 2025, that maps the Cybersecurity Framework 2.0 onto three focus areas: securing AI systems, conducting AI-enabled cyber defense, and thwarting AI-enabled cyberattacks."
  },
  "defanged": {
    title: "Defanged link",
    body: "A link or file reference deliberately altered so it cannot be clicked or executed by accident, for example writing \"hxxp\" instead of \"http\" or bracketing a domain. Defanging lets analysts share malicious indicators safely."
  },
  "google-project-zero": {
    title: "Google Project Zero",
    body: "A team of security researchers at Google that finds and reports previously unknown (zero-day) vulnerabilities in widely used software, then works to get them fixed."
  },
  "deepmind": {
    title: "Google DeepMind",
    body: "Google's artificial-intelligence research lab, responsible for advanced models and systems, including the AI used in the Big Sleep vulnerability-discovery project."
  },
  "project-naptime": {
    title: "Project Naptime",
    body: "A Google research effort, a collaboration between Project Zero and DeepMind, that paired a language model with debugging and analysis tools to find software vulnerabilities. It evolved into the Big Sleep project."
  },
  "sqlite": {
    title: "SQLite",
    body: "A small, self-contained SQL database engine embedded in countless applications, browsers, phones, and operating systems, making it one of the most widely deployed pieces of software in the world."
  },
  "authorized-engagement": {
    title: "Authorized engagement",
    body: "A security test or attack simulation carried out with the explicit, documented permission of the system owner and within an agreed scope. Authorization and scope are what separate legal testing from an actual intrusion."
  },
  "gate": {
    title: "Human gate",
    body: "A mandatory human checkpoint in an automated workflow: the process pauses and cannot proceed until a person reviews and approves the next action. Gates are placed before irreversible, high-impact steps so a human can catch a mistake in time."
  },
  "sans": {
    title: "SANS Institute",
    body: "A leading cybersecurity training and research organization. Its reading room publishes practitioner whitepapers, templates, and guidance that are widely used across the industry."
  },

  /* ============================================================
     M09 - ADDED FOR EXPANDED CONCEPTS (Sections 2, 3, 4)
     ============================================================ */

  "microsoft-365-copilot": {
    title: "Microsoft 365 Copilot",
    body: "Microsoft's AI assistant integrated across its 365 productivity suite (Outlook, Word, Teams, etc.). It processes emails, documents, and calendar data on the user's behalf, which gives it broad access to sensitive information and makes it a high-value target for indirect prompt injection."
  },
  "cvss": {
    title: "CVSS (Common Vulnerability Scoring System)",
    body: "A standard method that produces a severity score from 0.0 to 10.0 for a vulnerability. Higher scores indicate greater severity: 0.0 is informational, 9.0 and above is critical. Used industry-wide to prioritize patching and communicate risk."
  },
  "retrieval-pipeline": {
    title: "Retrieval pipeline",
    body: "The chain of components that fetches external content and feeds it into an LLM's context: a query, a search index or vector store, a ranking step, and finally the selected documents injected into the prompt. Each stage is a potential entry point for poisoned content."
  },
  "confused-deputy": {
    title: "Confused deputy",
    body: "A classic security flaw identified by Norman Hardy in 1988, in which a trusted program with its own privileges is tricked by an attacker into misusing them on the attacker's behalf. An LLM assistant that holds real access and obeys instructions it reads from data is a textbook confused deputy."
  },
  "invisible-unicode": {
    title: "Invisible Unicode",
    body: "Characters that a model tokenizes but that render as nothing to a human, such as zero-width spaces or the Unicode &ldquo;tag&rdquo; block (U+E0000 to U+E007F) that mirrors ASCII invisibly. Attackers hide instructions in them to bypass keyword filters and human review; robust filters normalize and strip non-printing characters first."
  },

  "base64": {
    title: "Base64",
    body: "An encoding that represents data as a string of 64 printable ASCII characters. Attackers use it to disguise an instruction so a keyword filter sees only gibberish, while the model still decodes and follows the hidden text because it was trained on Base64 data."
  },

  "rot13": {
    title: "ROT13",
    body: "A simple substitution cipher that shifts each letter 13 places in the alphabet. It is trivial to reverse, but enough to slip a banned phrase past a filter that only matches exact strings."
  },

  "leetspeak": {
    title: "Leetspeak",
    body: "Writing words by swapping letters for lookalike numbers or symbols, such as &ldquo;ign0re&rdquo; or &ldquo;p4ssw0rd&rdquo;. It defeats exact-match filters while staying readable to the model."
  },

  "low-resource-languages": {
    title: "Low-resource languages",
    body: "Languages with little training and safety-tuning data. A safety filter trained mainly on English often misses the same harmful request phrased in a low-resource language, which the model can still understand and act on."
  },

  "mcp": {
    title: "Model Context Protocol (MCP)",
    body: "An open standard that lets AI agents discover and call external tools through a shared interface. Because a model reads each tool's natural-language description to decide how to use it, a malicious description can smuggle instructions to the model, a &ldquo;tool-poisoning&rdquo; form of indirect injection."
  },

  "orthogonal-rotation": {
    title: "Orthogonal rotation (embedding separation)",
    body: "A proposed architectural defense that applies a mathematical rotation to data-token embeddings so they occupy a different subspace from instruction-token embeddings. The rotation is orthogonal, meaning the two subspaces do not overlap, which gives the model a structural signal for distinguishing instructions from data without adding parameters or losing performance. Proposed in the ASIDE paper (ICLR 2025); promising but not yet deployed in production systems."
  },

  /* ============================================================
     MODULE 10 - ADVERSARIAL AI
     (Data Poisoning, Evasion, ML Supply Chain, Excessive Agency)
     ============================================================ */

  /* -- M10 Section 1: Data Poisoning -- */

  "data-poisoning": {
    title: "Data poisoning",
    body: "Corrupting the data used to train, fine-tune, or otherwise shape a model so that the finished model behaves the way the attacker wants. A training-time attack."
  },
  "ml-lifecycle": {
    title: "Machine-learning lifecycle",
    body: "The stages a model moves through: data collection, labeling, training, deployment, and inference. Each stage is a place an attack can act. Poisoning acts at training time; evasion acts at inference time."
  },
  "backdoor-poisoning": {
    title: "Backdoor (trigger) poisoning",
    body: "Planting training examples that pair a specific trigger (a rare pattern, token, or feature) with a target output. The model behaves normally on ordinary inputs and misbehaves only when the trigger appears, so it passes standard benchmarks."
  },
  "label-flipping": {
    title: "Label flipping (dirty-label poisoning)",
    body: "Changing the labels on training examples while leaving the inputs untouched, so the model learns wrong associations. Detectable by a careful label audit because inputs and labels no longer agree."
  },
  "clean-label": {
    title: "Clean-label poisoning",
    body: "Perturbing the inputs while leaving the labels correct and plausible. Because no label is mislabeled, the poison survives a human review of the labels; the corruption hides inside the inputs."
  },
  "integrity-availability-privacy": {
    title: "Integrity, availability, privacy",
    body: "The three attacker goals in the adversarial-ML taxonomy. Integrity: make the model produce specific wrong outputs. Availability: degrade the model for everyone. Privacy: extract training data or model internals."
  },

  /* -- M10 Section 2: Evasion -- */

  "evasion-attack": {
    title: "Evasion attack",
    body: "Crafting an input at inference time so that a correctly trained, deployed model misclassifies it. The model is unchanged; only the input is manipulated."
  },
  "adversarial-example": {
    title: "Adversarial example",
    body: "An input carrying a small, often imperceptible perturbation that causes a model to misclassify it while its true meaning is unchanged."
  },
  "perturbation": {
    title: "Perturbation",
    body: "The specific modification added to an input to push a model toward the wrong answer. In malware evasion, it is confined to regions that do not affect execution so the file still runs."
  },
  "euclidean-distance": {
    title: "Euclidean distance",
    body: "The straight-line distance between two points, found with the Pythagorean theorem: square the difference along each dimension, add them, and take the square root. Here it measures how far the modified file sits from the original, so minimizing it keeps the change small."
  },
  "transferability": {
    title: "Transferability",
    body: "The property that an adversarial example built against one model frequently fools a different model with a different architecture and training data. It is what makes black-box evasion practical."
  },
  "surrogate-model": {
    title: "Surrogate (substitute) model",
    body: "A stand-in model the attacker trains or obtains locally to craft adversarial examples when they have no access to the target model. Because of transferability, perturbations built against the surrogate often fool the real target too."
  },
  "adversarial-training": {
    title: "Adversarial training",
    body: "A defense technique that includes adversarial examples in the training data so the model learns to resist them. It improves robustness against the specific perturbation types trained on, but does not generalize to all possible attacks."
  },

  /* -- M10 Section 3: ML Supply Chain -- */

  "serialization": {
    title: "Serialization",
    body: "Converting a live in-memory object into a stream of bytes that can be saved to a file, sent over a network, or stored in a database. Deserialization is the reverse: reading those bytes and rebuilding the object. In Python's pickle format, the byte stream includes instructions for reconstructing objects, and one of those instructions (__reduce__) can call arbitrary functions during deserialization, which is what makes loading a pickle file equivalent to running code."
  },
  "model-supply-chain": {
    title: "Model supply chain",
    body: "The external components an AI system depends on: base models, fine-tuned models, datasets, serialized weight files, libraries, orchestration frameworks, vector stores, and plugins. Each is a trust boundary."
  },
  "trust-boundary-ml": {
    title: "Trust boundary",
    body: "A point where a system relies on something outside its own control being what it claims to be. Extends the software-supply-chain trust-boundary model to models, weights, datasets, and plugins."
  },
  "serialization-attack": {
    title: "Model-serialization (deserialization) attack",
    body: "Abusing the file format that stores a model so that loading the file executes attacker-controlled code. In the common pickle-based format, loading is executing: a payload can run before any inference happens."
  },
  "safetensors": {
    title: "Safetensors",
    body: "A model file format that stores only tensor data and cannot execute code on load, unlike pickle-based formats. Preferring it is an awareness-level defense against model-serialization attacks."
  },
  "commoditize-complement": {
    title: "Commoditize your complement",
    body: "A business strategy where a company makes an adjacent layer of the value chain cheap or free so that demand (and profit) flows to the layer it controls. Example: Meta open-sources its Llama models so the model layer becomes a commodity and value concentrates in Meta's own applications and ad platform."
  },
  "pytorch": {
    title: "PyTorch",
    body: "An open-source machine-learning framework maintained by Meta. Its torch.save() function serializes model objects using Python's pickle format by default, which is why loading an untrusted PyTorch model file can execute arbitrary code."
  },
  "pickle": {
    title: "Pickle",
    body: "Python's built-in serialization format. A pickle file is not inert data: it contains instructions that the Python interpreter executes during deserialization. One instruction, __reduce__, can call any Python function with any arguments, which is why pickle's own documentation warns never to unpickle data from an untrusted source."
  },
  "hugging-face": {
    title: "Hugging Face",
    body: "An AI company and the largest open-source model hub, hosting over a million models and datasets. Its transformers library is the most widely used interface for downloading and loading pre-trained models. Hugging Face created the safetensors format and, since October 2023, defaults to it for new uploads to reduce the risk of pickle-based code execution."
  },
  "trail-of-bits": {
    title: "Trail of Bits",
    body: "A security research and consulting firm specializing in software assurance, cryptography, and applied security audits. Founded by Dan Guido, a former member of NYU's OSIRIS Lab. Trail of Bits conducted the security audit of the safetensors format in May 2023."
  },
  "gguf": {
    title: "GGUF",
    body: "A binary format from the llama.cpp project, designed for running quantized LLMs on consumer hardware (Ollama, LM Studio, GPT4All). Its tensor data is inert, but GGUF files can embed Jinja2 chat templates in their metadata. If the loading application renders those templates without sandboxing, an attacker gets server-side template injection, which can escalate to code execution (CVE-2024-34359, CVE-2026-5760)."
  },
  "onnx": {
    title: "ONNX (Open Neural Network Exchange)",
    body: "A cross-framework interchange format, created by Facebook and Microsoft in 2017, that stores a model as a recipe of standard math operations encoded with Protocol Buffers. Because the file describes operations rather than arbitrary code, loading it does not execute anything by itself. Custom operators and external data references are separate trust surfaces."
  },
  "ollama": {
    title: "Ollama",
    body: "An open-source tool for running LLMs locally on a laptop or desktop. It wraps llama.cpp, manages GGUF model downloads, and exposes a local API. Because it loads GGUF files that can contain Jinja2 chat templates, the SSTI risk in those templates applies to Ollama users."
  },
  "lm-studio": {
    title: "LM Studio",
    body: "A desktop application for downloading, managing, and running LLMs locally. It provides a chat interface and a local API server, loading models primarily in GGUF format. Like Ollama, it inherits the Jinja2 template risk from any GGUF file it loads."
  },
  "gpt4all": {
    title: "GPT4All",
    body: "An open-source ecosystem for running LLMs on consumer hardware, developed by Nomic AI. It supports GGUF models and provides a desktop chat interface and Python bindings for local inference without cloud dependencies."
  },
  "protocol-buffers": {
    title: "Protocol Buffers (protobuf)",
    body: "A compact binary serialization format created by Google, used to encode structured data efficiently. ONNX uses it to store model graphs. Unlike pickle, Protocol Buffers are a data-description format: they define the shape and content of data but do not contain executable instructions."
  },
  "conv": {
    title: "Conv (convolution)",
    body: "A standard neural-network operation that slides a small filter across input data (an image, a signal, a feature map) to detect patterns like edges, textures, or shapes. In an ONNX file, Conv is one of the named operations in the model's step-by-step recipe."
  },
  "matmul": {
    title: "MatMul (matrix multiplication)",
    body: "The core arithmetic operation in neural networks: multiplying two matrices to combine inputs with learned weights. Nearly every layer in a model performs at least one MatMul. In an ONNX file, it appears as a named operation in the computation recipe."
  },
  "relu": {
    title: "ReLU (Rectified Linear Unit)",
    body: "A simple activation function used between layers in a neural network: if the input is positive, pass it through unchanged; if negative, output zero. It introduces non-linearity, which is what allows a network to learn patterns more complex than a straight line. In an ONNX file, ReLU is one of the standard named operations."
  },

  /* -- M10 Section 4: Excessive Agency and Taxonomy -- */

  "ai-coding-agent": {
    title: "AI coding agent",
    body: "An AI system that writes, edits, and executes code autonomously on a developer's behalf, often running inside an IDE or CI pipeline with access to files, terminals, and version control. Examples include Cursor Agent, Devin, and GitHub Copilot Agent."
  },
  "autonomous-coding-tools": {
    title: "Autonomous coding tools",
    body: "Software development tools that use AI to perform multi-step coding tasks with minimal human intervention, including writing code, running tests, debugging, and deploying changes. They typically inherit the developer's system permissions and can take actions across the full development environment."
  },
  "nist-ai-100-2": {
    title: "NIST AI 100-2 taxonomy",
    body: "The standard adversarial-ML taxonomy. Its attack-goal classes are evasion, poisoning, and privacy for predictive systems, plus abuse for generative systems. It also classifies attacks by lifecycle stage and by the attacker's goal, capability, and knowledge."
  },
  "owasp-llm-top-10": {
    title: "OWASP LLM Top 10",
    body: "The standard list of top security risks for LLM applications, used as a deployment-risk lens. Relevant entries here: Supply Chain, Data and Model Poisoning, and Excessive Agency. A versioned document: this course cites the 2025 edition throughout. Entries move position, merge, or get renamed between releases, so quote the edition alongside the number. The underlying failure modes are far more stable than the ordering."
  },
  "privacy-attack": {
    title: "Privacy attack (NIST class)",
    body: "Attacks that extract information from a model: inferring whether a specific record was in the training set (membership inference), reconstructing training data or model internals, or extracting the model itself. Treated at awareness level here."
  }
,

  /* -- M06 Section 4: supply chain registries, incidents, and signing -- */

  "npm": {
    title: "npm",
    body: "The default public registry for JavaScript packages, and the largest of the open registries by package count. A single install can pull in hundreds of transitive dependencies, most of them from maintainers the installing team has never evaluated, which is what makes it the most frequently studied example of registry trust."
  },
  "pypi": {
    title: "PyPI",
    body: "The Python Package Index, the default public registry that pip installs from. Like npm and RubyGems it is open to anyone: publishing a package requires an account, not a review. That openness is what makes the registry useful and what makes name-based attacks possible."
  },
  "rubygems": {
    title: "RubyGems",
    body: "The public package registry for Ruby, and the source Bundler resolves against. Structurally the same trust position as npm and PyPI: a namespace anyone can publish into, which build systems then pull from automatically."
  },
  "right9ctrl": {
    title: "Right9ctrl",
    body: "The account handle of the contributor who was handed maintainership of the widely used event-stream package in 2018 after weeks of small, legitimate contributions. The name is worth remembering as a pattern rather than a person: patient trust-building followed by a single malicious release, against a project with no succession process."
  },
  "copay": {
    title: "Copay",
    body: "An open-source cryptocurrency wallet, and the actual target of the 2018 event-stream compromise. The malicious dependency activated only inside Copay builds and left every other consumer of the package untouched, which is why it went unnoticed for about two and a half months (September to late November 2018)."
  },
  "sigstore": {
    title: "Sigstore",
    body: "An open-source project for signing software artifacts without long-lived signing keys. A developer authenticates with an existing identity provider, receives a certificate valid for minutes, signs, and the signature is recorded publicly. It answers the question \"who published this?\" rather than \"is this build reproducible?\""
  },
  "fulcio": {
    title: "Fulcio",
    body: "Sigstore's certificate authority. It exchanges a proven identity, such as a GitHub or Google login, for a short-lived signing certificate, so a developer never stores a private signing key that could be stolen. The certificate expires in minutes; the record of its issuance is what persists."
  },
  "rekor": {
    title: "Rekor",
    body: "Sigstore's public, append-only transparency log of signing events. Entries cannot be quietly altered or removed, so an artifact signed by an unexpected identity leaves a permanent, auditable record. This is the component that turns signing from a private claim into evidence a third party can check."
  },

  /* ============================================================
     MODULE 11 - DEFENDING AI SYSTEMS
     (Defense Architecture, Controls, RAG Security, Monitoring, IR)
     ============================================================ */

  /* -- Defense Architecture and Control Types -- */

  "defense-in-depth-llm": {
    title: "Defense in depth (LLM applications)",
    body: "Layering multiple independent controls (deterministic and probabilistic) so that no single bypass compromises the system. Extends the five-layer defense model for code review to six layers for LLM applications."
  },
  "deterministic-control": {
    title: "Deterministic control",
    body: "A security control that produces consistent, predictable outcomes regardless of input content, such as a rate limiter, sandbox execution, or privilege enforcement."
  },
  "probabilistic-control": {
    title: "Probabilistic control",
    body: "A security control that produces variable outcomes dependent on the input distribution and can be evaded, such as classifier-based guardrails, LLM-as-judge review, or safety training."
  },

  /* -- Input and Output Controls -- */

  "input-validation-llm": {
    title: "Input validation (LLM)",
    body: "Controls applied before the model sees the input: fuzzy matching for encoding tricks, ML-powered classifiers, token budgeting, prompt delineation markers. Analogous to input sanitization in traditional web security."
  },
  "output-filtering": {
    title: "Output filtering",
    body: "Controls applied after the model generates a response: classifier-based content filtering, LLM-as-judge review, structured format validation (JSON schema enforcement), output encoding for downstream systems. Treats all LLM output as untrusted."
  },
  "guardrails": {
    title: "Guardrails",
    body: "Rule-based or model-based constraints on LLM input/output behavior. Three variants: rule-based (regex, allowlists), model-based (classifier LLMs like Llama Guard 4), and hybrid (combining both)."
  },
  "rate-limiting": {
    title: "Rate limiting",
    body: "Restricting the frequency or volume of requests to an AI system to prevent abuse. A deterministic control: the 101st request in a minute is blocked regardless of content."
  },

  /* -- Infrastructure and Gateways -- */

  "envoy-proxy": {
    title: "Envoy Proxy",
    body: "An open-source, high-performance edge and service proxy originally built by Lyft and now a CNCF graduated project. Handles load balancing, observability, and security enforcement at the network layer. Increasingly used as an API gateway for AI services with native support for rate limiting, authentication, and request filtering."
  },
  "kong-gateway": {
    title: "Kong Gateway",
    body: "An open-source API gateway and service mesh built on NGINX. Provides centralized authentication, rate limiting, logging, and plugin-based request transformation for microservices. Its AI Gateway plugin adds LLM-specific features like prompt routing, token-based rate limiting, and multi-provider load balancing."
  },

  /* -- Threat Scenarios -- */

  "corpus-poisoning": {
    title: "Corpus poisoning",
    body: "Injecting adversarial documents into a RAG knowledge base to manipulate retrieval results and influence the LLM's output."
  },
  "cross-tenant-leakage": {
    title: "Cross-tenant leakage",
    body: "Data from one tenant's namespace becoming accessible to another tenant through shared infrastructure, typically caused by application-level access controls rather than database-level isolation."
  },
  "unbounded-consumption": {
    title: "Unbounded consumption (OWASP LLM10:2025)",
    body: "The OWASP LLM Top 10 entry covering excessive and uncontrolled inference, with denial of service, economic loss, model theft, and service degradation as the consequences. Denial of wallet is its economic branch."
  },
  "denial-of-wallet": {
    title: "Denial of wallet",
    body: "Financial attack through unauthorized consumption of pay-per-use AI resources, such as stolen API credentials generating large compute bills. Covered by OWASP LLM10 (Unbounded Consumption)."
  },

  /* -- RAG and Retrieval -- */

  "embedding-similarity": {
    title: "Embedding similarity",
    body: "A measure of how close two text segments are in the model's vector space. RAG systems use cosine similarity between query and document embeddings to select context. Attackers can exploit this by crafting documents whose embeddings are close to likely queries."
  },
  "adversarial-embeddings": {
    title: "Adversarial embeddings",
    body: "Content deliberately crafted to maximize embedding similarity with target queries, causing the retrieval system to surface adversarial documents even when they are not semantically relevant to the query."
  },
  "cross-document-injection": {
    title: "Cross-document injection",
    body: "A form of indirect prompt injection where adversarial instructions are hidden inside documents in a RAG knowledge base. When retrieved, the model processes these instructions alongside legitimate content."
  },

  /* -- Deployment and Architecture -- */

  "vector-store": {
    title: "Vector store",
    body: "A database optimized for storing and querying high-dimensional vector embeddings. In RAG systems, documents are converted to embeddings and indexed in a vector store; at query time, the store returns the most similar documents by cosine distance."
  },
  "model-extraction": {
    title: "Model extraction",
    body: "Reconstructing a functional approximation of a model by systematically querying its API and analyzing the outputs. Especially feasible for smaller or fine-tuned models exposed through an API without query restrictions."
  },
  "namespace-isolation": {
    title: "Namespace isolation",
    body: "Enforcing data separation at the database level so that tenants physically cannot query each other's data, regardless of application-layer logic. A deterministic control for multi-tenant vector stores."
  },
  "sensitive-info-disclosure": {
    title: "Sensitive information disclosure (OWASP LLM02)",
    body: "The risk that an LLM reveals confidential data from its training set, retrieval corpus, or system prompt in its responses. Includes PII leakage, internal document exposure, and credential disclosure."
  },
  "token-based-rate-limiting": {
    title: "Token-based rate limiting",
    body: "Rate limiting that caps the total tokens consumed per user per time period, not just the number of requests. Necessary for LLM APIs because one long-context request can cost as much as dozens of small ones."
  },
  "metadata-filtering": {
    title: "Metadata filtering",
    body: "Application-level access control that tags documents with metadata (tenant ID, role, classification) and filters retrieval results accordingly. A probabilistic control: a single tagging or filtering bug can expose all documents."
  },
  "crm": {
    title: "CRM (Customer Relationship Management)",
    body: "A platform for managing customer interactions, sales pipelines, and support workflows. Multi-tenant CRM platforms that add AI features (e.g. RAG-based search across internal documents) introduce cross-tenant leakage risks if access isolation is enforced at the application layer rather than the database."
  },

  /* -- Monitoring and Operations -- */

  "encoding-anomaly": {
    title: "Encoding anomaly",
    body: "The presence of encoded text (Base64, Unicode substitutions, homoglyphs) in user input where plain text is expected. Legitimate users rarely encode their questions; attackers use encoding to bypass keyword-based filters."
  },
  "response-length-anomaly": {
    title: "Response length anomaly",
    body: "A model response significantly longer than the system average (e.g. 2,100 tokens when the average is 380). May indicate successful data extraction where the model returned a full document, system prompt, or data dump rather than a normal answer."
  },
  "topic-distribution-shift": {
    title: "Topic distribution shift",
    body: "A change in the subject matter of a model's responses relative to its historical baseline. For example, a customer support bot whose responses suddenly cluster around internal-procedure topics rather than product questions. A behavioral detection signal."
  },
  "role-impersonation": {
    title: "Role impersonation",
    body: "An injection technique where the attacker includes phrases like 'ignore previous instructions,' 'you are now DAN,' or inserts role markers ('system:', '[INST]') to trick the model into treating user input as system-level instructions."
  },
  "data-exfiltration": {
    title: "Data exfiltration (LLM)",
    body: "Extracting confidential data through an LLM system's responses. Indicators include PII appearing in output that was not in the user's query, document-level metadata (file paths, author names), and unusually complete responses suggesting full document retrieval."
  },
  "pii": {
    title: "PII (Personally Identifiable Information)",
    body: "Any data that can identify a specific individual: names, email addresses, phone numbers, identification numbers, biometric records. PII appearing in LLM responses that was not in the user's query is a data exfiltration indicator."
  },

  /* -- Standards and Frameworks -- */

  "nist-sp-800-61": {
    title: "NIST SP 800-61",
    body: "The NIST Computer Security Incident Handling Guide. Defines the four-phase incident response lifecycle: preparation, detection and analysis, containment/eradication/recovery, and post-incident activity. The standard framework most organizations adapt for their IR processes."
  },
  "nist-ai-600-1": {
    title: "NIST AI 600-1",
    body: "The NIST AI Risk Management Framework profile for generative AI. Recommends prompt log retention for security monitoring, among other controls, creating a tension with privacy regulations that constrain log retention and access."
  },

  /* -- Incident Response -- */

  "cosai-ai-ir": {
    title: "CoSAI AI Incident Response Framework",
    body: "The Coalition for Secure AI's framework (V1.0) for handling AI-specific incidents. Identifies three key differences from traditional incident response: evidence may be probabilistic and irreproducible, system state is ephemeral, and harm can be continuous rather than discrete."
  },

  /* -- Detection Layers -- */

  "content-based-detection": {
    title: "Content-based detection",
    body: "Matching known attack signatures or patterns in request/response content. The first of three detection layers for AI system monitoring."
  },
  "rate-based-detection": {
    title: "Rate-based detection",
    body: "Identifying anomalies in request volume, frequency, or timing patterns. The second of three detection layers for AI system monitoring."
  },
  "behavioral-detection": {
    title: "Behavioral detection",
    body: "Identifying shifts in output characteristics such as embedding space drift, perplexity anomalies, or response distribution changes. The third of three detection layers."
  },
  "compound-detection": {
    title: "Compound detection",
    body: "Combining multiple independent detection signals to reduce false positives while maintaining detection coverage. A single anomalous signal is ambiguous; multiple correlated signals approach actionable confidence."
  },

  /* -- Assessment and Tooling -- */

  "owasp-defensive-assessment": {
    title: "OWASP defensive assessment",
    body: "Systematic evaluation of a deployment's security controls and gaps using the OWASP LLM Top 10 as a checklist. For each category: assess applicability, identify existing controls, find gaps, recommend mitigations."
  },
  "iac": {
    title: "IaC (Infrastructure as Code)",
    body: "Managing infrastructure through code such as Terraform and CloudFormation. LLMs can detect logic-level misconfigurations that static tools miss, but 20.4% of LLM-generated repairs were incorrect despite passing linter checks."
  },
  "iam-policy": {
    title: "IAM (Identity and Access Management)",
    body: "Controls for managing user identities and access rights. LLMs catch logic-level IAM issues that static tools miss, but can underestimate risk or produce confidently wrong assessments."
  },
  "yara-rules": {
    title: "YARA rules",
    body: "Pattern-matching rules for malware identification. LLM-generated YARA rules reduce analyst time by 44-86% but require human quality review because they tend toward generic string matches."
  },
  "yara-l": {
    title: "YARA-L",
    body: "Google Chronicle's proprietary detection language, distinct from standard YARA. A common LLM confusion point: models often conflate YARA and YARA-L syntax and capabilities."
  },

  /* ============================================================
     MODULE 12 - GOVERNANCE, ETHICS, RESPONSIBLE DEPLOYMENT
     ------------------------------------------------------------
     Slugs ending in "-gov" are M12-specific variants of terms
     also defined above for earlier modules. The unsuffixed slug
     keeps its original (defensive/technical) definition; the
     "-gov" slug carries the governance framing used in M12 body
     text. M12 section HTML references the "-gov" slugs.
     ============================================================ */

  /* ============================================================
     MODULE 12 - GOVERNANCE, ETHICS, RESPONSIBLE DEPLOYMENT
     (new terms)
     ============================================================ */

  /* -- Governance Foundations -- */

  "governance": {
    title: "Governance (AI)",
    body: "The organizational structures, policies, and accountability assignments that control how AI systems are approved, deployed, and operated. Technical controls constrain what a system can do; governance constrains what an organization decides to do, and assigns accountability for residual risk."
  },
  "residual-risk": {
    title: "Residual risk",
    body: "The risk that remains after all selected controls are applied. Because every technical control for LLM applications has a documented bypass rate, deploying an AI system always means accepting residual risk, which is an organizational decision, not a technical one."
  },
  "nist-ai-rmf": {
    title: "NIST AI Risk Management Framework",
    body: "A voluntary framework (AI 100-1, January 2023) that organizes AI risk management into four functions: Govern, Map, Measure, Manage. Non-prescriptive: it structures judgment rather than mandating specific controls."
  },
  "govern-function": {
    title: "Govern (RMF function)",
    body: "The cross-cutting hub of the NIST AI RMF: accountability structures, policies, roles, decision authority, and risk culture. Not a phase that completes; it operates for the system's entire life and feeds the other three functions."
  },
  "map-function": {
    title: "Map (RMF function)",
    body: "The RMF function that establishes context: what the system is for, who it affects, what it connects to, and what happens when it is wrong. Performed before deployment and re-performed when context changes."
  },
  "measure-function": {
    title: "Measure (RMF function)",
    body: "The RMF function covering risk assessment and tracking with metrics: which risks are quantified, how often, and whether the metrics chosen are the right ones. Disaggregated evaluation lives here."
  },
  "manage-function": {
    title: "Manage (RMF function)",
    body: "The RMF function covering risk treatment: how identified risks are prioritized, mitigated, monitored, and responded to when they materialize."
  },
  "finding": {
    title: "Finding (assessment)",
    body: "An assessor's judgment that an expected outcome is present, partial, or absent, tied to specific evidence. A finding without evidence is an opinion."
  },
  "gap-assessment": {
    title: "Governance gap assessment",
    body: "Systematic evaluation of a deployment against the four RMF functions: per function, ask what evidence shows the expected outcomes exist, grade each finding present/partial/absent, and recommend a named artifact that closes each gap. Mirrors the OWASP defensive assessment method with organizational categories."
  },
  "artifact-gov": {
    title: "Artifact (governance)",
    body: "A concrete, named deliverable that can be pointed to, reviewed, and audited: a policy document, a review record, a one-page system context sheet, a decision log. The opposite of a vague intention. If it does not exist as a document or record, it is not an artifact."
  },
  "aspiration-gov": {
    title: "Aspiration",
    body: "A goal stated in general terms without specifying what gets produced, who owns it, or how you would verify it exists. 'Improve documentation' is an aspiration. 'A one-page system context record owned by the security architect' is an artifact. Assessments recommend artifacts, not aspirations."
  },

  /* -- Bias and Measurement -- */

  "bias-ai": {
    title: "Bias (in AI systems)",
    body: "Systematically different error rates for different populations under the same threshold. Arises from training data composition, labeling practices, proxy features, and threshold choices. Intent is not part of the definition."
  },
  "disaggregated-evaluation": {
    title: "Disaggregated evaluation",
    body: "Computing evaluation metrics (precision, recall, false positive rate) separately per population subgroup rather than only in aggregate. Correct aggregate metrics can conceal large per-group divergence."
  },
  "fpr": {
    title: "FPR (False Positive Rate)",
    body: "The fraction of truly benign items that a classifier incorrectly flags as positive: false positives divided by all actual negatives (FP / (FP + TN)). In disaggregated evaluation, computing FPR per subgroup reveals disparities that an aggregate rate conceals."
  },
  "proxy-feature": {
    title: "Proxy feature",
    body: "An input correlated with group membership (writing style, network origin, business hours) that lets a model treat groups differently without ever being given a group label."
  },
  "fairness-metric-conflict": {
    title: "Fairness-metric conflict",
    body: "The mathematical result that the three fairness properties (equalized odds, equal opportunity, and demographic parity) cannot all be satisfied simultaneously when groups' underlying base rates differ. Proved independently by Chouldechova (2017) and Kleinberg, Mullainathan & Raghavan (2016). A deployment must choose which property it commits to, and justify the choice."
  },

  "equalized-odds": {
    title: "Equalized odds",
    body: "A fairness property requiring equal false positive rates AND equal false negative rates across groups. If a detector flags 3% of legitimate traffic from group A, it must also flag 3% from group B; and if it catches 92% of attacks from A, it must catch 92% from B. The strictest of the three common fairness properties."
  },

  "equal-opportunity": {
    title: "Equal opportunity",
    body: "A fairness property requiring equal detection rates (true positive rates) across groups, without constraining false positive rates. If the detector catches 92% of attacks from group A, it must catch 92% from group B, but the two groups can have different false alarm rates. A relaxation of equalized odds."
  },

  "demographic-parity": {
    title: "Demographic parity",
    body: "A fairness property requiring the classifier to flag the same proportion of each group's cases, regardless of whether those groups actually have different base rates. Intuitive but controversial: if one population genuinely faces more attacks, flagging equal proportions means deliberately missing some."
  },

  "degenerate-case": {
    title: "Degenerate case",
    body: "A trivial or extreme scenario where a general rule stops applying because the problem collapses into something too simple to be interesting. For the fairness-metric conflict, the degenerate cases are: a perfect classifier (zero errors, so all fairness properties are satisfied vacuously), or groups with identical base rates (the conflict disappears because there is nothing to trade off). Real deployments hit neither condition."
  },

  "base-rate-difference": {
    title: "Different underlying rates",
    body: "The groups being compared have different proportions of positive cases in the real world. In the lab's scenario, Population B faces more phishing per report than Population A. When base rates differ, a single threshold cannot produce equal error rates for both groups, which is what forces the choice among fairness properties."
  },

  "use-and-context": {
    title: "Use-and-context criteria",
    body: "Governance controls that regulate how and where a tool is used rather than what the tool is. Authorization, scope, reversibility, and accountability are all use-and-context criteria: they do not ban a capability, they set conditions on its deployment. This is how governance handles dual-use technology, since the same tool can be defensive or offensive depending on context."
  },

  /* -- Surveillance and Privacy -- */

  "proportionality": {
    title: "Proportionality",
    body: "The requirement that an intrusion be justified by, and scaled to, the aim it serves. Applied with legal force by courts reviewing surveillance systems: broad, opaque data collection fails the test even when the underlying aim (fraud detection, security) is legitimate."
  },
  "purpose-limitation": {
    title: "Purpose limitation",
    body: "The data protection principle that data collected for one purpose may not be freely reused for another. Publicly available data is not exempt: collecting public photos at scale for biometric identification is a new processing purpose requiring its own justification."
  },

  /* -- Oversight and Automation -- */

  "automation-bias-gov": {
    title: "Automation bias",
    body: "The documented human tendency to over-trust machine recommendations. A nine-country experiment with roughly 9,000 participants found over-trust that varied with AI knowledge; even experienced participants showed calibration failures."
  },
  "oversight-engineering": {
    title: "Oversight engineering",
    body: "Designing human review as a control with failure modes taken seriously: route only consequential decision classes to humans, calibrate volume to what a person can scrutinize, force engagement (rationale requirements), preserve the ability to dissent, and audit the oversight itself."
  },

  /* -- Policy -- */

  "responsible-ai-policy": {
    title: "Responsible AI use policy",
    body: "An organizational control document defining acceptable boundaries for AI tool use: scope, permitted and prohibited uses, data handling, validation mandates, oversight requirements, AI-failure incident procedures, review cadence, and named accountability."
  },
  "testability-policy": {
    title: "Testability (policy)",
    body: "The property that an analyst can determine whether a specific action violates a policy statement. A testable statement names an actor, an object, a condition, and observable evidence; enforceability adds a mechanism and an owner."
  },
  "validation-mandate": {
    title: "Validation mandate",
    body: "A policy requirement that AI output be verified against defined criteria before it is acted on: which output classes, verified against what, recorded where. The trust-but-verify reflex converted into enforceable language."
  },
  "shadow-ai": {
    title: "Shadow AI",
    body: "Use of AI tools outside sanctioned channels, such as pasting sensitive data into personal chatbot accounts. Moves data beyond monitored boundaries and is fought primarily through specific, enforceable acceptable-use policy plus technical controls like DLP gateways."
  },
  "ai-incident-org": {
    title: "AI incident (organizational)",
    body: "An AI-system failure event meeting defined criteria and triggering a defined response: severity tiers, escalation owner, disclosure duties, and rollback authority. Extends technical AI incident response one organizational level up."
  },

  /* -- Regulation and Certification -- */

  "eu-ai-act": {
    title: "EU AI Act",
    body: "European Union regulation (2024/1689, in force August 2024) classifying AI systems by risk tier based on intended use context: prohibited practices, high-risk uses, transparency-required uses, and minimal-risk uses. High-risk classification triggers obligations including risk management, data governance, human oversight, and cybersecurity requirements. Timeline amended June 2026."
  },
  "high-risk-tier": {
    title: "High-risk tier (EU AI Act)",
    body: "The EU AI Act category for AI uses with significant potential impact, including safety components in the management of critical digital infrastructure. Classification turns on intended use and deployment context, not on model architecture."
  },
  "deployer-obligation": {
    title: "Deployer obligation",
    body: "Regulatory duties that fall on the organization using an AI system, independent of the vendor's own compliance. A vendor's compliance statement does not discharge the deploying organization's duty to run its own analysis."
  },
  "locate-classify-map-datestamp": {
    title: "Locate, classify, map, date-stamp",
    body: "The regulatory reading method: locate the current text and status of the regulation, classify the deployment under the regulation's own logic, map the triggered obligations to owners and artifacts, and date-stamp the conclusion because the analysis has a shelf life."
  },
  "certification-vs-safety": {
    title: "Certification vs. safety",
    body: "A certification such as ISO/IEC 42001 attests that a management process exists and was audited. It does not attest that any system is safe, just as the presence of a guardrail does not make a chatbot secure. Treat certification as procurement evidence, not assurance."
  },

  /* ============================================================
     REUSED FROM PRIOR MODULES (referenced in M12 body text)
     Copied unchanged from prior module glossaries.
     ============================================================ */

  "guardrails-gov": {
    title: "Guardrails",
    body: "Rule-based or model-based constraints on LLM input/output behavior. Three variants: rule-based (regex, allowlists), model-based (classifier LLMs), and hybrid (combining both)."
  },
  "defense-in-depth-llm-gov": {
    title: "Defense in depth (LLM applications)",
    body: "Layering multiple independent controls (deterministic and probabilistic) so that no single bypass compromises the system."
  },
  "excessive-agency-gov": {
    title: "Excessive Agency (OWASP LLM06)",
    body: "The risk that an AI system takes consequential actions beyond its intended scope because it has too many permissions, too much functionality, or too much unsupervised autonomy. No attacker is required: the system can cause harm on its own."
  },
  "owasp-llm-top10-gov": {
    title: "OWASP LLM Top 10",
    body: "The OWASP Top 10 for LLM Applications: the industry's consensus list of the ten most critical LLM risks, used as a shared classification vocabulary and, defensively, as an assessment checklist. A versioned document: this course cites the 2025 edition throughout. Entries move position, merge, or get renamed between releases, so quote the edition alongside the number. The underlying failure modes are far more stable than the ordering."
  },
  "cosai-ai-ir-gov": {
    title: "CoSAI AI Incident Response Framework",
    body: "The Coalition for Secure AI's framework for handling AI-specific incidents. Identifies three key differences from traditional IR: evidence may be probabilistic and irreproducible, system state is ephemeral, and harm can be continuous rather than discrete."
  },
  "false-negative-gov": {
    title: "False negative",
    body: "A genuinely malicious or actionable event that a detection system fails to flag. A false negative means a real threat is missed entirely."
  },
  "confusion-matrix-gov": {
    title: "Confusion matrix",
    body: "A table of true positives, false positives, true negatives, and false negatives that summarizes a classifier's performance. The basis for precision, recall, and F1, and, when computed per subgroup, the basis for bias measurement."
  },
  "dual-use-gov": {
    title: "Dual-use",
    body: "Technology that has both beneficial and harmful applications. The same model that triages alerts can write phishing lures; governance therefore regulates use and context, not the technology itself."
  },
  "rag-gov": {
    title: "RAG (Retrieval-Augmented Generation)",
    body: "An architecture that retrieves documents from a knowledge base and feeds them into the model's context to ground its answers. The retrieved content is a channel for indirect injection."
  },
  "edr": {
    title: "EDR (Endpoint Detection and Response)",
    body: "Security tooling that monitors endpoints (laptops, servers) for malicious activity and supports response actions such as isolating a host or killing a process. Write access to an EDR platform means the ability to change endpoint security state."
  },
  "dlp": {
    title: "DLP (Data Loss Prevention)",
    body: "Controls that detect and block sensitive data leaving approved boundaries, such as a gateway that inspects outbound traffic for classified content. A common enforcement mechanism for AI acceptable-use rules."
  },

  /* ============================================================
     MODULE 01 - AI AND MACHINE LEARNING FOUNDATIONS
     ------------------------------------------------------------
     Terms first introduced in Module 01, imported from that
     module's inline tooltips. Where a slug already existed in this
     glossary from a later module, the Module 01 wording is kept
     under a "-m01" suffix so both phrasings stay callable:
     use "slug" for the later, fuller definition and "slug-m01"
     for the introductory one.
     ============================================================ */
  "rule-based-system": {
    title: "Rule-based system",
    body: "A detection or classification system that operates by matching inputs against explicitly written rules, signatures, or patterns. It can only detect what its authors have anticipated."
  },
  "machine-learning": {
    title: "Machine learning (ML)",
    body: "Systems that learn patterns from data rather than following explicit rules. Instead of a human writing \"if X then alert,\" the system learns \"packets with these characteristics are likely malicious\" from labeled or unlabeled examples."
  },
  "deep-learning": {
    title: "Deep learning",
    body: "Machine learning using neural networks with many layers (hence \"deep\"). Each layer learns progressively more abstract features from the data: edges become shapes become objects. Deep learning enables learning from raw data without manual feature engineering."
  },
  "artificial-intelligence": {
    title: "Artificial Intelligence (AI)",
    body: "The broadest umbrella term: any system that performs tasks typically requiring human intelligence. Includes everything from 1980s expert systems to modern neural networks. Not all AI involves learning from data."
  },
  "model": {
    title: "Model",
    body: "A mathematical function that takes inputs and produces outputs. In ML, the model's internal numbers (parameters/weights) are adjusted during training so its outputs become more accurate over time. Think of it as a decision-making recipe the machine discovered from data."
  },
  "parameters": {
    title: "Parameters (weights)",
    body: "The internal numerical values that define a model's behavior. A simple model might have hundreds of parameters; GPT-4 has over a trillion. During training, these numbers are adjusted to reduce prediction errors. After training, they are fixed."
  },
  "training": {
    title: "Training",
    body: "The process of adjusting a model's parameters by exposing it to data and correcting its mistakes. Analogous to practice: show the model thousands of examples, measure how wrong it is, adjust its internal numbers, repeat until it performs well."
  },
  "c2-callback": {
    title: "C2 callback (Command-and-Control)",
    body: "A communication from a compromised machine back to the attacker's server. After infecting a system, malware \"calls home\" to receive instructions, exfiltrate data, or download additional payloads. Detecting C2 callbacks is a critical focus of network security monitoring."
  },
  "ip-reputation": {
    title: "IP reputation",
    body: "A score assigned to an IP address based on its historical behavior, specifically whether it has been associated with spam, malware distribution, C2 infrastructure, or other malicious activity. Threat intelligence feeds maintain reputation databases that security tools query in real time."
  },
  "epoch": {
    title: "Epoch",
    body: "One complete pass through the entire training dataset. A model typically trains for many epochs, where each pass refines the parameters further. Too many epochs can lead to <em>overfitting</em> (memorizing training data rather than learning general patterns)."
  },
  "inference": {
    title: "Inference",
    body: "Using a trained model to make predictions on new, unseen data. This is the deployment phase: the model's parameters are fixed and it processes real world inputs to produce outputs (classifications, scores, generated text)."
  },
  "random-forest-m01": {
    title: "Random Forest",
    body: "An ensemble method that trains many decision trees on random subsets of the data and features, then takes a majority vote. More robust than a single tree and resistant to overfitting."
  },
  "convolutional-neural-network": {
    title: "Convolutional Neural Network (CNN)",
    body: "A deep learning architecture originally designed for image recognition. In security, CNNs are applied to malware binary visualization (converting executables to images) and network traffic classification. They automatically learn spatial patterns in data."
  },
  "unsw-nb15": {
    title: "UNSW_NB15",
    body: "A benchmark dataset created by the University of New South Wales containing modern network traffic records with both normal activity and nine categories of attacks."
  },
  "time-to-live": {
    title: "Time to Live (TTL)",
    body: "A counter in every IP packet that decrements by 1 at each router hop. When it reaches 0, the packet is discarded. TTL prevents packets from looping forever. In security, unusual TTL values (e.g., very high or mismatched source/destination TTL) can indicate spoofed traffic, tunneling, or reconnaissance activity."
  },
  "logistic-regression": {
    title: "Logistic Regression",
    body: "A linear model that learns a weight for each feature. It multiplies each feature by its weight, sums everything up, and pushes the result through a sigmoid function to produce a probability between 0 and 1."
  },
  "sigmoid-function": {
    title: "Sigmoid Function",
    body: "A mathematical function that squashes any number into a probability between 0 and 1. Large positive inputs map close to 1, large negative inputs map close to 0."
  },
  "decision-tree": {
    title: "Decision Tree",
    body: "A model shaped like a flowchart. At each internal node it asks \"Is feature X above threshold Y?\" and branches left or right. Following the branches leads to a leaf node that gives the final prediction."
  },
  "leaf-node": {
    title: "Leaf Node",
    body: "The terminal node of a decision tree that contains the final prediction. It shows how many training samples of each class ended up in that leaf."
  },
  "ensemble-learning": {
    title: "Ensemble Learning",
    body: "A strategy that combines multiple models to produce better predictions than any single model alone. The \"wisdom of crowds\" applied to machine learning."
  },
  "gradient-boosting": {
    title: "Gradient Boosting",
    body: "An ensemble method that builds trees sequentially. Each new tree focuses on correcting the mistakes of all previous trees. A learning rate controls how much each tree's correction counts."
  },
  "learning-rate": {
    title: "Learning Rate",
    body: "A small number (here 0.1) that controls how much each tree's correction counts. Smaller values require more trees but typically produce more stable, accurate models."
  },
  "large-language-model": {
    title: "Large Language Model (LLM)",
    body: "A neural network trained on massive text data that generates text by predicting the most probable next token. Trained on trillions of tokens with billions of parameters. Generates what is <em>statistically likely</em>, not what is <em>true</em>."
  },
  "token-m01": {
    title: "Token",
    body: "The basic unit an LLM processes. A token is typically a word or word fragment (e.g., \"cyber\" + \"security\" might be two tokens). Models have a fixed <em>context window</em>, the maximum number of tokens they can see at once."
  },
  "context-window-m01": {
    title: "Context window",
    body: "The maximum number of tokens an LLM can process in a single interaction. Everything outside the context window is invisible to the model. Security implication: you cannot paste 10,000 log lines into a model with an 8,000-token window."
  },
  "hallucination-m01": {
    title: "Hallucination",
    body: "Generation of plausible sounding but factually incorrect output, sometimes delivered with high confidence. Structural to the next token prediction mechanism: the model generates what is statistically probable, not what is true. There is no internal fact checking step."
  },
  "large-reasoning-model": {
    title: "Large Reasoning Model (LRM)",
    body: "An LLM augmented with chain of thought reasoning trained via reinforcement learning (e.g., OpenAI o1/o3, DeepSeek R1). LRMs \"think\" through multi step problems before answering, introducing distinct capabilities and security risks compared to standard LLMs."
  },
  "false-positive-m01": {
    title: "False Positive (FP)",
    body: "The system flags something as malicious when it is actually benign. Each FP consumes analyst time, erodes trust in the detection system, and contributes to alert fatigue."
  },
  "false-negative-m01": {
    title: "False Negative (FN)",
    body: "The system fails to flag a real attack. The attack proceeds undetected. FNs are the silent failures: you may not know they happened until the breach is discovered."
  },
  "precision-m01": {
    title: "Precision",
    body: "= TP / (TP + FP). \"Of the alerts I fired, what fraction were real?\" High precision means fewer wasted investigations. Low precision means your team is drowning in false alarms."
  },
  "recall-m01": {
    title: "Recall",
    body: "= TP / (TP + FN). \"Of the real attacks, what fraction did I catch?\" High recall means fewer missed threats. Low recall means attacks are slipping through undetected."
  },
  "f1-score-m01": {
    title: "F1 Score",
    body: "= 2 × (Precision × Recall) / (Precision + Recall). The harmonic mean of precision and recall, a single balanced metric. Useful when you need one number, but hides the tradeoff."
  },
  "ransomware-as-a-service": {
    title: "Ransomware-as-a-Service (RaaS)",
    body: "A business model where ransomware developers sell or lease their malware to other criminals (\"affiliates\") who carry out the actual attacks. AI has made RaaS platforms more accessible, allowing attackers with minimal technical skill to launch sophisticated campaigns."
  },
  "dual-use-m01": {
    title: "Dual-use",
    body: "A technology that can be applied for both offensive and defensive purposes. The same NLP that generates phishing emails also powers log analysis. The same anomaly detection that finds intrusions can identify gaps to exploit."
  },

  /* -- M01 Section 1, part 4: reinforcement learning and RLHF -- */

  "rl-policy": {
    title: "Policy (reinforcement learning)",
    body: "The rule an RL agent follows when choosing an action from what it currently observes. Training does not rewrite it in one step; each update nudges it toward actions that preceded higher rewards. In RLHF the language model's own weights are the policy."
  },
  "reward-signal": {
    title: "Reward signal",
    body: "The number an environment returns to an RL agent after an action. It carries no explanation and does not say which action in a sequence earned it. Whatever this number measures is what the agent will get better at, which is why specifying it well is the hard part of applying RL to security."
  },
  "reward-model": {
    title: "Reward model",
    body: "A model trained on human preference comparisons to predict which of two outputs a rater would have chosen. It replaces the human in the RLHF training loop so scoring can run at machine speed. A learned stand-in for human judgment, not human judgment itself."
  },
  "rlhf": {
    title: "RLHF (reinforcement learning from human feedback)",
    body: "The final training stage that turns a text predictor into an assistant. Humans compare pairs of outputs, those comparisons train a reward model, and reinforcement learning shifts the language model toward higher-scoring behavior. It shapes tone, instruction-following, and refusal behavior; it does not add or remove knowledge from the weights."
  },
  "reward-hacking": {
    title: "Reward hacking",
    body: "What happens when a system optimizes a proxy hard enough that the proxy and the intended outcome come apart: outputs that score well on the measure and fail the purpose. In RLHF this shows up as fluency, confidence, and agreement being reinforced whether or not the content is correct."
  },

  /* ============================================================
     MODULE 02 - HOW LLMS WORK
     ------------------------------------------------------------
     Terms first introduced in Module 02, imported from that
     module's inline tooltips. Where a slug already existed in this
     glossary from a later module, the Module 02 wording is kept
     under a "-m02" suffix so both phrasings stay callable:
     use "slug" for the later, fuller definition and "slug-m02"
     for the introductory one.
     ============================================================ */
  "parameters-m02": {
    title: "Parameters",
    body: "The numerical values (weights and biases) inside the neural network, adjusted during training to encode learned patterns. Large language models may have billions of parameters. Larger models have more capacity but also greater memorization risk."
  },
  "token-m02": {
    title: "Token",
    body: "The basic unit an LLM processes. A subword chunk of text, not necessarily a word, that the model treats as a single input element. Each token is mapped to a numerical ID."
  },
  "context-window-m02": {
    title: "Context window",
    body: "The fixed maximum number of tokens a model can process in a single interaction, including both input and output. Context windows vary by model and deployment. Always check the model card or API documentation for the exact limit. If content exceeds the effective context limit, it is unavailable to the model, whether the system truncates it, rejects the request, or the application removes content before submission."
  },
  "tokenizer": {
    title: "Tokenizer",
    body: "The component that converts text into tokens and back. Different models use different tokenizers with different vocabularies. The tokenizer's vocabulary is built during training using algorithms like Byte Pair Encoding (BPE)."
  },
  "byte-pair-encoding": {
    title: "Byte Pair Encoding",
    body: "An algorithm that builds a tokenizer's vocabulary by iteratively merging the most frequent adjacent character pairs in training data. Common words earn dedicated entries; rare text is split into smaller fragments."
  },
  "tokenizer-vocabulary": {
    title: "Tokenizer vocabulary",
    body: "The complete set of token patterns a tokenizer recognizes. Vocabulary sizes vary by model, typically ranging from ~32,000 to ~260,000 entries. Larger vocabularies handle more text efficiently, but no vocabulary covers all domains equally well."
  },
  "attention-mechanism": {
    title: "Attention mechanism",
    body: "The process by which the model assigns a relevance score to every input token when generating each output token, then combines their information proportionally. This is a statistical weighting process, not a form of comprehension."
  },
  "quadratic-scaling": {
    title: "Quadratic scaling",
    body: "Doubling the input length quadruples the computation needed. For a 128K token input, the model must compute billions of token to token scores in every global layer."
  },
  "long-range-connections": {
    title: "Long range connections",
    body: "Relationships between tokens that are far apart in the input, such as an IP address at the beginning of a log and a status code near the end. Only global attention layers can capture these directly."
  },
  "grouped-query-attention": {
    title: "Grouped Query Attention",
    body: "A memory optimization where multiple attention heads share the same Key and Value projections instead of each head computing its own. This reduces memory use and speeds up inference without significantly reducing quality."
  },
  "rope-extensions": {
    title: "RoPE extensions",
    body: "Modifications to Rotary Position Embedding (such as extended base frequencies or YaRN scaling) that let a model handle sequences longer than those seen during training, without retraining from scratch."
  },
  "kv-cache": {
    title: "KV cache",
    body: "During autoregressive generation the model stores the Key and Value vectors from all previous tokens so it does not recompute them at each step. For long inputs this cache becomes very large and is a primary memory bottleneck."
  },
  "multi-query-attention": {
    title: "Multi query attention",
    body: "An optimization where all attention heads share a single set of Key and Value projections, dramatically reducing KV cache size. GQA (grouped query) is a middle ground between multi query and the standard per head approach."
  },
  "paged-attention": {
    title: "Paged attention",
    body: "A memory management technique that stores KV cache entries in non contiguous memory pages, similar to how operating systems handle virtual memory. This eliminates wasted memory from pre allocated cache blocks."
  },
  "positional-encoding": {
    title: "Positional encoding (RoPE)",
    body: "A mathematical technique that gives the model information about where each token sits in the input sequence. Rotary Position Embedding (RoPE) is the most widely adopted method, used by Llama, Gemma, Mistral, and many others. Research suggests that RoPE based models show stronger position dependent performance variation in long contexts."
  },
  "behavior-stack": {
    title: "Behavior stack",
    body: "The layered set of factors that together determine what an LLM produces in response to a given input. Lower layers (pretraining) establish broad capabilities; upper layers (alignment, prompts, decoding) shape and constrain those capabilities at progressively finer granularity."
  },
  "parametric-memory": {
    title: "Parametric memory",
    body: "Knowledge encoded in the model's weights during training. Unlike a database, it cannot be queried for provenance, verified for accuracy, or selectively updated. It produces probabilistic recall, not exact retrieval."
  },
  "knowledge-cutoff-m02": {
    title: "Knowledge cutoff",
    body: "The date beyond which the model has no training data. The model cannot reliably answer questions about events, vulnerabilities, or developments after this date using parametric memory alone. Some deployments mitigate this with retrieval augmentation."
  },
  "post-training": {
    title: "Post training",
    body: "Training performed after pretraining to shape model behavior, including instruction tuning, preference tuning (RLHF, DPO), and safety training. Post training does not add new factual knowledge; it reshapes how existing knowledge is expressed and which behaviors are reinforced or suppressed."
  },
  "instruction-tuning": {
    title: "Instruction tuning",
    body: "Training the model on (instruction, desired response) pairs so it learns to follow instructions rather than merely completing text. Sometimes called supervised fine tuning (SFT) when performed on curated demonstration data."
  },
  "preference-tuning": {
    title: "Preference tuning",
    body: "Training methods (RLHF, DPO, and variants) that optimize the model to produce outputs preferred by human evaluators over alternatives. Used to improve helpfulness, reduce harmful outputs, and shape conversational style. Does not remove knowledge from weights; it changes which outputs are favored."
  },
  "inference-time": {
    title: "Inference time",
    body: "The operational phase when users interact with the deployed model. Every prompt response exchange is an inference. Behavior at this stage is shaped by the prompt, system instructions, retrieval context, tool outputs, and sampling parameters, none of which are in the model's weights."
  },
  "system-prompt-m02": {
    title: "System prompt",
    body: "Hidden instructions provided to the model that define its role, behavioral constraints, and response format for a particular deployment. System prompts shape behavior at inference time but can sometimes be extracted through adversarial prompting. Module 3 covers prompt engineering in depth."
  },
  "rag-m02": {
    title: "RAG",
    body: "A design pattern where relevant documents are retrieved from an external source (vector database, search index, knowledge base) and injected into the model's context at inference time. Allows the model to ground responses in current, authoritative information rather than relying solely on parametric memory."
  },
  "temperature-m02": {
    title: "Temperature",
    body: "A sampling parameter that scales logit values before softmax. Mathematically, each logit is divided by the temperature value. Lower temperatures sharpen the distribution (the top token dominates); higher temperatures flatten it (many tokens become viable candidates)."
  },
  "top-p-m02": {
    title: "Top p (nucleus sampling)",
    body: "A sampling constraint that includes tokens from the top of the distribution until their cumulative probability reaches the threshold p. Adapts to the distribution's shape: when the model is confident, few tokens qualify; when uncertain, many qualify."
  },
  "top-k-sampling": {
    title: "Top k sampling",
    body: "A sampling constraint that restricts selection to the k highest probability tokens, regardless of how probability mass is distributed among them. Provides a hard ceiling on randomness."
  },
  "training-data-memorization": {
    title: "Training data memorization",
    body: "The demonstrated phenomenon where an LLM can reproduce verbatim or near verbatim sequences from its training data, including PII, credentials, and proprietary content. Memorization is a structural property of how models learn; larger models and repeated training examples increase risk."
  },
  "data-contamination": {
    title: "Data contamination",
    body: "When benchmark or evaluation data appears in a model's training corpus, inflating performance scores beyond what the model can achieve on genuinely novel inputs. A systemic problem in model evaluation that makes published benchmarks unreliable for operational decision making."
  },
  "lifecycle-stages": {
    title: "Lifecycle stages",
    body: "Pre training, fine tuning, and inference. Each phase has a different security profile, a different responsible party, and a different category of appropriate controls."
  },
  "owasp-llm-top-10-m02": {
    title: "OWASP LLM Top 10",
    body: "A classification of the most critical security risks for LLM applications, maintained by the Open Worldwide Application Security Project. Updated periodically, and the numbering shifts between editions while the underlying failure modes stay largely the same. This course cites the 2025 edition throughout; check owasp.org for the current release before quoting a number."
  },
  "model-card": {
    title: "Model card",
    body: "A standardized documentation format for ML models describing capabilities, limitations, training data, intended use, and known risks. Formalized by Mitchell et al. (2019). Increasingly expected or required under frameworks like the EU AI Act."
  },
  "quantization": {
    title: "Quantization",
    body: "Reducing the numerical precision of model weights (for example from 16 bit to 4 bit) to decrease memory requirements and increase inference speed."
  },



  /* ============================================================
     M13 - NEW TERMS
     ============================================================ */

  "skills-map": {
    title: "Skills map (this section)",
    body: "A table that pairs each skill a security role needs with the specific course work you produced that demonstrates it. If you have something you can show, the skill is evidenced. If you do not, it is a gap, and the gap becomes the first entry in your learning plan. The map is not a resume or a self-assessment survey; it is a structured way to figure out what you can actually prove and what you cannot."
  },
  "skill-artifact": {
    title: "Artifact (skills mapping)",
    body: "In this section, <em>artifact</em> does not mean a software build output or a compiled binary. It means a specific piece of work you produced during this course that you could show to someone and walk them through: a confusion matrix you computed, a policy document you drafted, a prompt library you tested, or a gap assessment you completed. The test is simple: could you open it, explain what you did, and answer questions about it?"
  },
  "agentic-ai": {
    title: "Agentic AI",
    body: "An AI system that plans and carries out multi-step tasks by calling external tools in a loop, rather than only producing text for a human to act on. In practice, a model given a goal, a set of tools it may call, and permission to keep going until it decides it is done."
  },
  "agent-loop": {
    title: "Agent loop",
    body: "One iteration: the runtime assembles a context (goal, history, prior tool results), the model generates reasoning and a structured tool call, the runtime executes that call with its own permissions, the result enters the context as an observation, and the next iteration begins. The loop ends when a stop condition fires."
  },
  "react-framework": {
    title: "ReAct pattern",
    body: "Reasoning plus Acting. The model alternates between Thought steps (free-text reasoning about what to do) and Action steps (structured tool calls), with each Observation feeding the next Thought. Reasoning steers the actions; the actions ground the reasoning in retrieved results."
  },
  "tool-use-agent": {
    title: "Tool-use agent",
    body: "An agent whose defining capability is calling external tools (queries, lookups, file operations, network requests) to accomplish a goal. The model selects which tool to call and when; a runtime executes the call using the runtime's credentials."
  },
  "function-calling": {
    title: "Function calling (tool use)",
    body: "The mechanism behind tool use: the model emits a structured call against a declared tool schema; a runtime, not the model, validates and executes it; the result is inserted back into the context. The model never acts directly, and every returned result is untrusted input re-entering the context window."
  },
  "lethal-trifecta": {
    title: "The lethal trifecta",
    body: "A practitioner heuristic: an agent that combines access to private data, exposure to untrusted content, and the ability to communicate externally is exfiltration-ready by construction. Safety requires breaking at least one of the three on every execution path. A heuristic, not a standard."
  },
  "silent-failure-cascade": {
    title: "Silent-failure cascade",
    body: "A failure in which a tool call fails without the runtime surfacing an error, the agent treats the unverified result as success, and every later step reasons from that false premise. Distinct from hallucination: the model did not invent a fact, the environment reported a success it had not achieved."
  },
  "agent-goal-hijack": {
    title: "Agent goal hijack",
    body: "Manipulating an agent's objectives or decision-making by exploiting how it interprets natural-language instructions, so that attacker-supplied text (often arriving through ingested content) redirects the agent's goals, tool selection, or multi-step behavior."
  },
  "blast-radius": {
    title: "Blast radius",
    body: "The scope of what an actor's credentials can affect or destroy in a single failure. For agents, backups inside the same permission and infrastructure boundary as production are inside the blast radius: a backup is protected by isolation, not by being a copy."
  },
  "autonomous-threat-hunting": {
    title: "Autonomous threat hunting",
    body: "AI systems that independently form hypotheses, query security telemetry, and investigate potential threats across multiple steps. In current documented practice these systems are assistive or supervised rather than fully autonomous."
  },
  "control-locus": {
    title: "The control-locus test",
    body: "A one-question test for whether a system is really an agent: who decides the next step, the code or the model? If a predefined code path picks the next step, it is a workflow and you can audit it before it runs. If the model picks, it is an agent and the path only exists after the run."
  },

  /* ============================================================
     REUSED TERMS FROM EARLIER MODULES
     ============================================================ */

  "lrm": {
    title: "Large reasoning model (LRM)",
    body: "A language model optimized for multi-step reasoning and planning, often trained partly with reinforcement learning against verifiable outcomes. It generates extended internal reasoning before answering. Better at planning multi-step work, but not more reliable: reasoning chains remain fragile under perturbation."
  },
  "reinforcement-learning": {
    title: "Reinforcement learning",
    body: "Machine learning in which a system learns through trial and error against a reward signal, rather than from labeled examples. Part of how reasoning models are trained to plan multi-step work."
  },
  "excessive-agency": {
    title: "Excessive Agency (OWASP LLM06)",
    body: "The risk that an AI system takes consequential actions beyond its intended scope because it has too many permissions, too much functionality, or too much unsupervised autonomy. No attacker is required: the system can cause harm on its own. When an attacker is present, excessive agency amplifies the damage."
  },
  "prompt-injection": {
    title: "Prompt injection",
    body: "Manipulating an LLM's behavior by placing adversarial instructions in its input. Because the model processes instructions and data as one token sequence, text meant as data can be followed as a command. For agents, injected instructions can steer tool use."
  },
  "human-in-the-loop": {
    title: "Human-in-the-loop",
    body: "The requirement that a human reviews and approves AI system outputs before action is taken. A control with documented failure modes: without engineered workload, engagement, and dissent, review degrades into rubber-stamping."
  },
  "hallucination": {
    title: "Hallucination (LLM)",
    body: "When a language model generates plausible-sounding but factually incorrect output, including fabricated data, citations, or details that do not exist in the source material. Distinct from a silent-failure cascade, where the environment reports a false success the model then trusts."
  },
  "ai-washing": {
    title: "AI-washing",
    body: "Relabeling traditional algorithms or simple heuristics as 'AI' for marketing purposes. The procurement-side reason vendor claims require independent verification."
  },
  "rag": {
    title: "RAG (Retrieval-Augmented Generation)",
    body: "An architecture that retrieves documents from a knowledge base and feeds them into the model's context to ground its answers. For agents, the retrieved content is a channel for indirect prompt injection, because it enters the same context that instructs the model."
  },

  /* ============================================================
     M13 CONCEPTS THAT NEED A SHORT DEFINITION
     ------------------------------------------------------------
     Terms this module uses that were not taught as such in an
     earlier module. Concepts that WERE taught earlier are handled
     by reference_tip/reference-tips.js instead, which points the
     student back to the module and section that covered them.
     ============================================================ */

  "distribution-shift": {
    title: "Distribution shift",
    body: "The gap between the data a model was evaluated on and the data it meets in production. Performance measured on a curated benchmark tells you little about behavior when traffic patterns change, when inputs are messy, or when an adversary is deliberately shaping the input."
  },
  "demo-production-gap": {
    title: "The demo-production gap",
    body: "Demonstrations run on data the demonstrator chose: complete, unambiguous, and not adversarial. Production data is none of those things. The gap is the single most reliable reason a capability that works on stage underperforms on deployment."
  },
  "longitudinal-study": {
    title: "Longitudinal study",
    body: "A study that tracks the same subjects over an extended period (months or years) to observe how outcomes change. In security operations, a longitudinal study of agentic triage would need to follow real SOC teams across enough time to separate initial novelty effects from sustained impact, and across enough environments (different sectors, team sizes, alert volumes) to produce generalizable results. That is expensive, slow, and hard to control, which is why most vendor claims rely on short-term pilots or synthetic benchmarks instead."
  },
  "approval-gate": {
    title: "Gate (agent design)",
    body: "A checkpoint where a human (or a policy rule) must approve before an automated action proceeds. Gates exist because some actions are hard or impossible to reverse: isolating a host, rotating a credential, deleting data. Placing a gate before an irreversible action means a wrong decision can still be caught. Placing it after means it cannot. Where the gate sits relative to the action's reversibility is one of the most consequential design choices in agent deployment."
  },
  "reversibility": {
    title: "Reversibility",
    body: "How hard an action is to undo. Annotating a ticket is cheap to reverse; isolating a host, rotating a credential, or deleting a volume is not. Approval gates belong where reversibility runs out, because that is the last point at which a wrong decision is still correctable."
  },
  "specification-gaming": {
    title: "Specification gaming",
    body: "A system satisfies the literal objective it was given in a way that defeats the purpose behind it: closing every alert to maximise a closure metric, for instance. The category is well established in the research literature, though security-specific documented cases remain thin."
  },
  "nice-framework": {
    title: "The NICE Workforce Framework",
    body: "A US government framework that decomposes cybersecurity roles into task, knowledge, and skill statements, so that a job title becomes a checkable list of capabilities rather than a mood. The module borrows its decomposition logic for the skills matrix.<br><br><a href='https://niccs.cisa.gov/workforce-development/nice-framework' target='_blank' rel='noopener'>Explore the NICE Framework (CISA)</a>"
  },
  "decomposition": {
    title: "Decomposition (system design)",
    body: "Breaking a complex system into distinct, named components so each can be specified, tested, and constrained independently. For agents, decomposition separates what the agent perceives, how it reasons, what actions it may take, and which tools it may call, making the design auditable before deployment."
  },
  "log-anomaly-triage-agent": {
    title: "Log-anomaly triage agent",
    body: "An agent that ingests anomaly alerts from a SIEM, queries additional telemetry to assess severity, annotates a triage ticket with its findings, and either closes the alert or escalates it to a human analyst. Used here as a concrete example because its tool set (read from SIEM, write to ticket queue, escalate) is small enough to fully specify yet realistic enough to surface real design trade-offs."
  },
  "graphql-endpoint": {
    title: "GraphQL endpoint",
    body: "A single API URL that accepts structured queries describing exactly which data the caller wants, rather than offering many fixed URLs for different resources. In the PocketOS incident, the coding agent called a GraphQL endpoint to delete the production database volume, because one mutation at one URL was enough to reach the destructive operation."
  },
  "agentic-soc": {
    title: "Agentic SOC products",
    body: "Security operations center tools that use an agent loop to investigate, triage, or respond to alerts with limited human intervention. The category emerged in vendor marketing during 2025–2026; production evidence for the claimed capabilities remains thin relative to the claims, which is the ordinary condition of early technology adoption."
  },
  "autonomous-investigation": {
    title: "Autonomous investigation",
    body: "An agent capability in which the system independently queries telemetry, correlates indicators, and builds an incident narrative without waiting for an analyst to direct each step. Among the capabilities most often demonstrated by agentic SOC vendors and among the least reliable in production, where data is incomplete, signals are ambiguous, and an adversary may be shaping the inputs."
  }


};


/* -- Injector --
   Finds every <button class="nyu-define" data-term="slug">visible text</button>
   and appends the tooltip span from the glossary above.
   Runs once on DOMContentLoaded (or immediately if DOM is already ready).
   ============================================================ */
(function injectGlossaryTooltips() {
  function run() {
    document.querySelectorAll("button.nyu-define[data-term]").forEach(function(btn) {
      if (btn.querySelector(".nyu-define__pop")) return;
      var entry = window.NYU_GLOSSARY[btn.getAttribute("data-term")];
      if (!entry) return;
      var span = document.createElement("span");
      span.className = "nyu-define__pop";
      span.setAttribute("role", "tooltip");
      span.innerHTML = "<strong>" + entry.title + "</strong>" + entry.body;
      btn.appendChild(span);
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();


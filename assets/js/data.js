/* All links, the study plan, the attack lessons and the roadmap.
   Edit this file to change what the pages show. Every page reads from it. */

/* type: paper, article, lab, tool, course, standard, book, cert, index
   topic: one or more of basics, injection, defense, disclosure, supply, poisoning,
          output, agents, governance, leakage, embeddings, misinfo, consumption,
          mcp, automation, detection, career */
window.LINKS = {
  /* Papers */
  survey:        { t: "Security and Privacy Challenges of LLMs, a survey", u: "https://arxiv.org/pdf/2402.00888", type: "paper", topic: ["basics"] },
  greshake:      { t: "Not what you signed up for. Indirect prompt injection (Greshake et al.)", u: "https://arxiv.org/pdf/2302.12173", type: "paper", topic: ["injection"] },
  smoothllm:     { t: "SmoothLLM. Defending LLMs against jailbreaking attacks", u: "https://arxiv.org/pdf/2310.03684", type: "paper", topic: ["defense"] },
  erasecheck:    { t: "Erase-and-check. Certifying LLM safety against adversarial prompting", u: "https://arxiv.org/pdf/2309.02705", type: "paper", topic: ["defense"] },
  carlini:       { t: "Extracting training data from large language models (Carlini et al.)", u: "https://arxiv.org/pdf/2012.07805", type: "paper", topic: ["disclosure"] },
  confusedpilot: { t: "ConfusedPilot. Confused deputy risks in RAG-based LLMs", u: "https://arxiv.org/pdf/2408.04870", type: "paper", topic: ["disclosure", "agents"] },
  pickleball:    { t: "PickleBall. Secure deserialization of pickle-based model files", u: "https://arxiv.org/pdf/2508.15987", type: "paper", topic: ["supply"] },
  supplyprob:    { t: "Large language model supply chain, open problems", u: "https://arxiv.org/pdf/2411.01604", type: "paper", topic: ["supply"] },
  nearconst:     { t: "Poisoning attacks on LLMs need a near-constant number of poison samples", u: "https://arxiv.org/pdf/2510.07192", type: "paper", topic: ["poisoning"] },
  sleeper:       { t: "Sleeper Agents. Deceptive LLMs that persist through safety training", u: "https://arxiv.org/pdf/2401.05566", type: "paper", topic: ["poisoning"] },
  shielda:       { t: "SHIELDA. Structured handling of exceptions in LLM-driven agentic workflows", u: "https://arxiv.org/pdf/2508.07935", type: "paper", topic: ["output", "agents"] },
  agentsec:      { t: "Security of AI Agents", u: "https://arxiv.org/pdf/2406.08689", type: "paper", topic: ["agents"] },
  gaas:          { t: "Governance-as-a-Service for multi-agent systems", u: "https://arxiv.org/pdf/2508.18765", type: "paper", topic: ["governance"] },
  pleak:         { t: "PLeak. Prompt leaking attacks against LLM applications", u: "https://arxiv.org/pdf/2405.06823", type: "paper", topic: ["leakage"] },
  promptsteal:   { t: "On the effectiveness of prompt stealing attacks on in-the-wild prompts", u: "https://yangzhangalmo.github.io/papers/SP25-PromptStealing.pdf", type: "paper", topic: ["leakage"], note: "New link. The old PDF address returns 404." },
  embedinv:      { t: "Text embedding inversion security", u: "https://arxiv.org/pdf/2401.12192", type: "paper", topic: ["embeddings"] },
  advillusions:  { t: "Adversarial illusions in multi-modal embeddings", u: "https://arxiv.org/pdf/2308.11804", type: "paper", topic: ["embeddings"] },
  hai:           { t: "Stanford HAI policy brief on AI-generated propaganda", u: "https://hai.stanford.edu/assets/files/2024-08/HAI-Policy-Brief-AI-Generated-Propaganda.pdf", type: "paper", topic: ["misinfo"] },
  synthid:       { t: "SynthID-Image. Image watermarking at internet scale", u: "https://arxiv.org/pdf/2510.09263v1", type: "paper", topic: ["misinfo"] },
  sponge:        { t: "Sponge examples. Energy-latency attacks on neural networks", u: "https://arxiv.org/pdf/2006.03463", type: "paper", topic: ["consumption"] },
  dowreview:     { t: "Denial of Wallet, a review", u: "https://arxiv.org/pdf/2508.19284", type: "paper", topic: ["consumption"] },
  cruciblepaper: { t: "Crucible paper. Automation against manual attacks (69.5% vs 47.6% success)", u: "https://arxiv.org/pdf/2504.19855", type: "paper", topic: ["automation"] },

  /* Articles and blogs */
  willison:      { t: "Simon Willison. Prompt injection, what is the worst that can happen", u: "https://simonwillison.net/2023/Apr/14/worst-that-can-happen/", type: "article", topic: ["injection"] },
  injvsjb:       { t: "promptfoo. Jailbreaking vs prompt injection", u: "https://www.promptfoo.dev/blog/jailbreaking-vs-prompt-injection/", type: "article", topic: ["injection"] },
  siprimer:      { t: "Security Innovation. Securing LLMs against prompt injection", u: "https://blog.securityinnovation.com/securing-llms-against-prompt-injection-attacks", type: "article", topic: ["defense"], note: "Blocks automated checks. Open it in a browser." },
  wizsecrets:    { t: "Wiz. Leaking AI secrets in public code", u: "https://www.wiz.io/blog/leaking-ai-secrets-in-public-code", type: "article", topic: ["disclosure"] },
  wizdeepseek:   { t: "Wiz. Exposed DeepSeek database leak", u: "https://www.wiz.io/blog/wiz-research-uncovers-exposed-deepseek-database-leak", type: "article", topic: ["disclosure"] },
  unit42ns:      { t: "Unit 42. Model namespace reuse", u: "https://unit42.paloaltonetworks.com/model-namespace-reuse/", type: "article", topic: ["supply"] },
  torchload:     { t: "PyTorch docs. torch.load and its security warning", u: "https://docs.pytorch.org/docs/stable/generated/torch.load.html", type: "article", topic: ["supply"] },
  torchser:      { t: "PyTorch docs. Serialization semantics and weights_only", u: "https://docs.pytorch.org/docs/stable/notes/serialization.html", type: "article", topic: ["supply"] },
  mithril:       { t: "Mithril Security. Prompt injection vs supply chain poisoning", u: "https://blog.mithrilsecurity.io/attacks-on-ai-models-prompt-injection-vs-supply-chain-poisoning/", type: "article", topic: ["supply"] },
  googlesupply:  { t: "Google Research. Securing the AI software supply chain", u: "https://research.google/pubs/securing-the-ai-software-supply-chain/", type: "article", topic: ["supply"] },
  sigstoremodel: { t: "Red Hat. Model authenticity and transparency with Sigstore", u: "https://next.redhat.com/2025/04/10/model-authenticity-and-transparency-with-sigstore/", type: "article", topic: ["supply"] },
  wizaibom:      { t: "Wiz. AI-BOM, the AI bill of materials", u: "https://www.wiz.io/academy/ai-security/ai-bom-ai-bill-of-materials", type: "article", topic: ["supply", "governance"] },
  turing:        { t: "Alan Turing Institute. LLMs may be more vulnerable to data poisoning than we thought", u: "https://www.turing.ac.uk/blog/llms-may-be-more-vulnerable-data-poisoning-we-thought", type: "article", topic: ["poisoning"] },
  elastic:       { t: "Elastic. Retrieval vs poison, fighting AI supply chain attacks", u: "https://www.elastic.co/search-labs/blog/retrieval-vs-poison-fighting-ai-supply-chain-attacks", type: "article", topic: ["poisoning"] },
  owasp05:       { t: "OWASP LLM05 2025. Improper output handling", u: "https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/", type: "standard", topic: ["output"] },
  auth0:         { t: "Auth0. OWASP LLM05 improper output handling", u: "https://auth0.com/blog/owasp-llm05-improper-output-handling/", type: "article", topic: ["output"] },
  pillar:        { t: "Pillar Security. Operation Bizarre Bazaar, an LLMjacking campaign", u: "https://www.pillar.security/blog/operation-bizarre-bazaar-first-attributed-llmjacking-campaign-with-commercial-marketplace-monetization", type: "article", topic: ["agents", "consumption"] },
  rsp:           { t: "Anthropic. Responsible Scaling Policy", u: "https://www.anthropic.com/news/anthropics-responsible-scaling-policy", type: "article", topic: ["governance"] },
  opaexplainer:  { t: "Aqua. Open Policy Agent explained", u: "https://www.aquasec.com/cloud-native-academy/cloud-native-applications/open-policy-agent-authorization-in-a-cloud-native-world/", type: "article", topic: ["governance"] },
  layerxleak:    { t: "LayerX. Prompt leak", u: "https://layerxsecurity.com/generative-ai/prompt-leak/", type: "article", topic: ["leakage"], note: "Now redirects to an Akamai page." },
  promptsecblog: { t: "Prompt Security. Poisoning RAG pipelines through vector embeddings", u: "https://prompt.security/blog/the-embedded-threat-in-your-llm-poisoning-rag-pipelines-via-vector-embeddings", type: "article", topic: ["embeddings"] },
  marcus:        { t: "Gary Marcus. Should we worry more about short-term AI risk", u: "https://garymarcus.substack.com/p/should-we-worry-more-about-short", type: "article", topic: ["misinfo"] },
  layerxdow:     { t: "LayerX. Denial of Wallet attacks", u: "https://layerxsecurity.com/generative-ai/denial-of-wallet-attacks/", type: "article", topic: ["consumption"], note: "Now redirects to an Akamai page." },
  htbpath:       { t: "HTB. AI Red Teamer job role path announcement", u: "https://roadmap.hackthebox.com/changelog/full-ai-red-teamer-job-role-path-now-available", type: "article", topic: ["career"] },

  /* Labs, CTFs and practice sites */
  prompttrace:   { t: "PromptTrace", u: "https://prompttrace.airedlab.com/", type: "lab", topic: ["injection", "defense"], note: "Free. 9 learning modules, labs on real LLMs, a 17-level Gauntlet." },
  ptlearn:       { t: "PromptTrace Learn", u: "https://prompttrace.airedlab.com/learn", type: "lab", topic: ["basics"] },
  ptlabs:        { t: "PromptTrace Labs", u: "https://prompttrace.airedlab.com/labs", type: "lab", topic: ["injection"] },
  pt11:          { t: "PromptTrace lab 1.1 Hello, Injection", u: "https://prompttrace.airedlab.com/labs/hello-injection", type: "lab", topic: ["injection"] },
  pt12:          { t: "PromptTrace lab 1.2 The Obedient Assistant", u: "https://prompttrace.airedlab.com/labs/obedient-assistant", type: "lab", topic: ["injection"] },
  pt21:          { t: "PromptTrace lab 2.1 Poisoned Knowledge", u: "https://prompttrace.airedlab.com/labs/poisoned-knowledge", type: "lab", topic: ["injection", "poisoning"] },
  gauntlet:      { t: "PromptTrace Gauntlet", u: "https://prompttrace.airedlab.com/gauntlet", type: "lab", topic: ["injection", "defense"] },
  promptairlines:{ t: "Prompt Airlines", u: "https://promptairlines.com/", type: "lab", topic: ["injection"] },
  llmgoat:       { t: "LLMGoat (SECFORCE)", u: "https://github.com/SECFORCE/LLMGoat", type: "lab", topic: ["injection", "disclosure", "supply", "poisoning", "output", "agents", "leakage", "embeddings", "misinfo", "consumption"], note: "Self-hosted. Challenges A01 to A10 follow the OWASP LLM Top 10." },
  picf:          { t: "Prompt Injection CTF", u: "https://prompt-injection-ctf-2026.web.app/", type: "lab", topic: ["injection", "agents"], note: "Free, no signup. 16 missions plus a 30-mission agentic lab." },
  picfgh:        { t: "Prompt Injection CTF on GitHub", u: "https://github.com/ppradyoth/prompt-injection-ctf", type: "lab", topic: ["injection"] },
  tensortrust:   { t: "Tensor Trust", u: "https://tensortrust.ai/", type: "lab", topic: ["injection", "defense"] },
  tensorpaper:   { t: "Tensor Trust paper and dataset", u: "https://tensortrust.ai/paper", type: "paper", topic: ["injection"] },
  immersive:     { t: "Immersive GPT", u: "https://prompting.ai.immersivelabs.com/", type: "lab", topic: ["injection", "disclosure"], note: "Now asks for a sign-in link. Not confirmed live." },
  agentbreaker:  { t: "Lakera Agent Breaker", u: "https://play.lakera.ai/agent-breaker", type: "lab", topic: ["agents", "injection"], note: "Classic Gandalf is gone. Its old address redirects here." },
  aigoat:        { t: "AI Goat", u: "https://aigoat.co.in/", type: "lab", topic: ["injection", "poisoning", "agents", "mcp"], note: "Runs offline on Ollama. 46 labs, 3 defense levels, 9 CTF challenges." },
  aigoatgh:      { t: "AI Goat on GitHub", u: "https://github.com/AISecurityConsortium/AIGoat", type: "lab", topic: ["agents"] },
  aigoatcolab:   { t: "AI Goat Colab option", u: "https://github.com/AISecurityConsortium/AIGoat/blob/main/colab_notebooks/AIGoat_Colab.md", type: "lab", topic: ["agents"] },
  bishopfox:     { t: "Bishop Fox Local LLM CTF", u: "https://github.com/BishopFox/local-llm-ctf", type: "lab", topic: ["injection", "defense"] },
  hackaprompt:   { t: "HackAPrompt", u: "https://www.hackaprompt.com/", type: "lab", topic: ["injection"], note: "Seasonal. Skip tracks built on harmful content such as CBRNE." },
  pslab:         { t: "PortSwigger lab. Exploiting insecure output handling in LLMs", u: "https://portswigger.net/web-security/llm-attacks/lab-exploiting-insecure-output-handling-in-llms", type: "lab", topic: ["output"] },
  psweb:         { t: "PortSwigger Web LLM attacks", u: "https://portswigger.net/web-security/llm-attacks", type: "lab", topic: ["output", "agents", "injection"] },
  opaplay:       { t: "OPA Playground", u: "https://play.openpolicyagent.org/", type: "lab", topic: ["governance"] },
  dvmcp:         { t: "Damn Vulnerable MCP Server", u: "https://github.com/harishsg993010/damn-vulnerable-MCP-server", type: "lab", topic: ["mcp"], note: "10 challenges. Tool poisoning, rug pull, tool shadowing, token theft." },
  dvla:          { t: "Damn Vulnerable LLM Agent (ReversecLabs)", u: "https://github.com/ReversecLabs/damn-vulnerable-llm-agent", type: "lab", topic: ["agents"], note: "Moved from WithSecureLabs to ReversecLabs." },
  finbot:        { t: "OWASP FinBot CTF", u: "https://owasp-finbot-ctf.org/", type: "lab", topic: ["agents", "mcp"] },
  finbotgh:      { t: "OWASP FinBot CTF on GitHub", u: "https://github.com/GenAI-Security-Project/finbot-ctf", type: "lab", topic: ["agents", "mcp"] },
  crucible:      { t: "Dreadnode Crucible", u: "https://crucible.dreadnode.io/", type: "lab", topic: ["automation", "embeddings"], note: "Redirects to app.dreadnode.io. 65+ challenges on injection, evasion, inversion." },
  crucibledocs:  { t: "Dreadnode docs", u: "https://docs.dreadnode.io/", type: "lab", topic: ["automation"], note: "New link. The old getting-started address returns 404." },
  htbctf:        { t: "HTB CTF events", u: "https://ctf.hackthebox.com/", type: "lab", topic: ["career"] },

  /* Tools */
  ollama:        { t: "Ollama", u: "https://ollama.com/", type: "tool", topic: ["basics"], note: "Runs local models. Use it as a safe target." },
  modelscan:     { t: "ModelScan (Protect AI)", u: "https://github.com/protectai/modelscan", type: "tool", topic: ["supply"] },
  safetensors:   { t: "safetensors", u: "https://github.com/huggingface/safetensors", type: "tool", topic: ["supply"] },
  cosign:        { t: "cosign (Sigstore)", u: "https://github.com/sigstore/cosign", type: "tool", topic: ["supply"] },
  hfmodels:      { t: "Hugging Face models", u: "https://huggingface.co/models", type: "tool", topic: ["supply"] },
  garak:         { t: "garak (NVIDIA)", u: "https://github.com/NVIDIA/garak", type: "tool", topic: ["automation"] },
  pyrit:         { t: "PyRIT (Microsoft)", u: "https://github.com/Azure/PyRIT", type: "tool", topic: ["automation"] },
  promptfoo:     { t: "promptfoo", u: "https://www.promptfoo.dev/", type: "tool", topic: ["automation"] },
  langfuse:      { t: "Langfuse", u: "https://langfuse.com/", type: "tool", topic: ["detection"] },
  litellm:       { t: "LiteLLM proxy", u: "https://docs.litellm.ai/", type: "tool", topic: ["detection"] },
  wazuh:         { t: "Wazuh documentation", u: "https://documentation.wazuh.com/", type: "tool", topic: ["detection"] },
  mcp:           { t: "Model Context Protocol", u: "https://modelcontextprotocol.io/", type: "standard", topic: ["mcp"] },

  /* Courses */
  hfllm:         { t: "Hugging Face LLM Course", u: "https://huggingface.co/learn/llm-course", type: "course", topic: ["basics"] },
  hfagents:      { t: "Hugging Face Agents Course", u: "https://huggingface.co/learn/agents-course", type: "course", topic: ["basics", "agents"] },
  hfagentsfinal: { t: "Hugging Face Agents Course, final project", u: "https://huggingface.co/learn/agents-course/en/unit4/introduction", type: "course", topic: ["agents"] },
  hfnotebooks:   { t: "Agents Course notebook index", u: "https://huggingface.co/agents-course/notebooks", type: "course", topic: ["agents"] },
  hfcontext:     { t: "Hugging Face Context Course", u: "https://huggingface.co/learn/context-course", type: "course", topic: ["basics"] },
  mcpintro:      { t: "Claude Academy. Introduction to Model Context Protocol", u: "https://academy.claude.com/courses/introduction-to-model-context-protocol", type: "course", topic: ["mcp"] },
  mcpadv:        { t: "Claude Academy. MCP advanced topics", u: "https://academy.claude.com/courses/model-context-protocol-advanced-topics", type: "course", topic: ["mcp"] },
  claudeapi:     { t: "Claude Academy. Building with the Claude API", u: "https://academy.claude.com/courses/building-with-the-claude-api", type: "course", topic: ["basics", "agents"] },
  aicaps:        { t: "Claude Academy. AI capabilities and limitations", u: "https://academy.claude.com/courses/ai-capabilities-and-limitations", type: "course", topic: ["basics"] },

  /* Standards and frameworks */
  owasptop10:    { t: "OWASP Top 10 for LLM Applications 2025", u: "https://genai.owasp.org/llm-top-10/", type: "standard", topic: ["basics"] },
  owaspagentic:  { t: "OWASP Top 10 for Agentic Applications 2026", u: "https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/", type: "standard", topic: ["agents", "mcp"] },
  owaspgenai:    { t: "OWASP GenAI Security Project", u: "https://genai.owasp.org/", type: "standard", topic: ["basics"] },
  atlas:         { t: "MITRE ATLAS", u: "https://atlas.mitre.org/", type: "standard", topic: ["detection"] },
  nist1002:      { t: "NIST AI 100-2 E2025. Adversarial ML taxonomy", u: "https://csrc.nist.gov/pubs/ai/100/2/e2025/final", type: "standard", topic: ["basics"] },
  saif:          { t: "Google SAIF", u: "https://saif.google/", type: "standard", topic: ["governance"] },
  nistrmf:       { t: "NIST AI Risk Management Framework 1.0", u: "https://www.nist.gov/itl/ai-risk-management-framework", type: "standard", topic: ["governance"] },
  nist6001:      { t: "NIST AI 600-1. Generative AI profile", u: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf", type: "standard", topic: ["governance"] },
  euaiact:       { t: "EU AI Act", u: "https://artificialintelligenceact.eu/", type: "standard", topic: ["governance"] },
  sigeuact:      { t: "Software Improvement Group. EU AI Act summary and timeline", u: "https://www.softwareimprovementgroup.com/eu-ai-act-summary/", type: "standard", topic: ["governance"] },
  iso42001:      { t: "ISO/IEC 42001. AI management system", u: "https://www.iso.org/standard/42001", type: "standard", topic: ["governance"] },

  /* Certifications */
  htbacademy:    { t: "HTB Academy", u: "https://academy.hackthebox.com/", type: "cert", topic: ["career"] },
  coae:          { t: "HTB COAE launch post", u: "https://academy.hackthebox.com/news/the-new-htb-certified-offensive-ai-expert-htb-coae-is-officially-here", type: "cert", topic: ["career"] },
  coaedetails:   { t: "HTB COAE details", u: "https://www.hackthebox.com/blog/htb-coae-announcement", type: "cert", topic: ["career"] },
  sans545:       { t: "SANS SEC545 with GIAC GAIPS", u: "https://www.sans.org/cyber-security-courses/genai-llm-application-security", type: "cert", topic: ["career"] },
  cllmse:        { t: "Red Team Leaders CLLMSE", u: "https://courses.redteamleaders.com/exams/73c286aa-2944-4f26-82ba-0ca14a05a4b7", type: "cert", topic: ["career"] },
  huntr:         { t: "huntr. Bug bounties for AI and ML open source", u: "https://huntr.com/", type: "cert", topic: ["career"], note: "New link. The old guidelines address returns 404." },

  /* Books */
  bookwilson:    { t: "The Developer's Playbook for Large Language Model Security (Steve Wilson)", u: "https://www.oreilly.com/library/view/the-developers-playbook/9781098162191/", type: "book", topic: ["basics"] },
  booksotir:     { t: "Adversarial AI Attacks, Mitigations, and Defense Strategies (John Sotiropoulos)", u: "https://www.packtpub.com/en-us/product/adversarial-ai-attacks-mitigations-and-defense-strategies-9781835087985", type: "book", topic: ["poisoning", "supply"] },
  booksticker:   { t: "Not with a Bug, But with a Sticker (Siva Kumar and Anderson)", u: "https://www.wiley.com/en-us/Not+with+a+Bug%2C+But+with+a+Sticker%3A+Attacks+on+Machine+Learning+Systems+and+What+To+Do+About+Them-p-9781119883982", type: "book", topic: ["basics"] },

  /* Indexes and ongoing reading */
  awesomepi:     { t: "Awesome Prompt Injection", u: "https://github.com/Joe-B-Security/awesome-prompt-injection", type: "index", topic: ["injection"], note: "Check once a month for new CTFs." },
  willisonsite:  { t: "Simon Willison's weblog", u: "https://simonwillison.net/", type: "index", topic: ["injection", "agents"] },
  embrace:       { t: "Embrace The Red", u: "https://embracethered.com/blog/", type: "index", topic: ["agents", "mcp"] },
  wizblog:       { t: "Wiz Research blog", u: "https://www.wiz.io/blog", type: "index", topic: ["disclosure"] },
  unit42:        { t: "Unit 42", u: "https://unit42.paloaltonetworks.com/", type: "index", topic: ["supply"] },
  trailofbits:   { t: "Trail of Bits blog", u: "https://blog.trailofbits.com/", type: "index", topic: ["supply", "automation"] },
  aisafetydir:   { t: "AI Security and Safety directory", u: "https://aisecurityandsafety.org/en/", type: "index", topic: ["basics"] }
};

/* Local files in this repository */
window.FILES = {
  lecture: n => `files/offensive/lectures/lesson-${String(n).padStart(2, "0")}.pdf`,
  slug: n => `l${String(n).padStart(2, "0")}`,
  mod: (m, f) => `course/defensive/module-${String(m).padStart(2, "0")}/${f || ""}`
};

/* The 14 attack lessons. owasp is the OWASP LLM Top 10 2025 entry. */
window.LESSONS = [
  { n: 1,  t: "Introduction to LLM security", owasp: "", read: ["survey"], star: [], lab: ["promptairlines", "agentbreaker"], labNote: "Prompt Airlines challenge 1" },
  { n: 2,  t: "Prompt injection, attack mechanisms", owasp: "LLM01", read: ["greshake", "injvsjb", "willison"], star: ["greshake", "willison"], lab: ["promptairlines"], labNote: "Prompt Airlines challenges 2 and 3" },
  { n: 3,  t: "Prompt injection, advanced defenses", owasp: "LLM01", read: ["smoothllm", "erasecheck", "siprimer"], star: ["smoothllm"], lab: ["promptairlines", "llmgoat"], labNote: "Prompt Airlines 4 and 5, install LLMGoat, A01" },
  { n: 4,  t: "Sensitive information disclosure", owasp: "LLM02", read: ["carlini", "confusedpilot", "wizdeepseek", "wizsecrets"], star: ["carlini", "confusedpilot"], lab: ["llmgoat"], labNote: "LLMGoat A02" },
  { n: 5,  t: "Supply chain, dependencies", owasp: "LLM03", read: ["pickleball", "supplyprob", "unit42ns", "mithril"], star: ["pickleball", "unit42ns"], lab: ["llmgoat", "modelscan"], labNote: "LLMGoat A03, pickle __reduce__ lab", code: ["payload.py", "victim.py"] },
  { n: 6,  t: "Supply chain, governance", owasp: "LLM03", read: ["googlesupply", "wizaibom", "sigstoremodel"], star: ["googlesupply"], lab: ["cosign"], labNote: "cosign sign and verify lab", code: ["deploy.sh"] },
  { n: 7,  t: "Data and model poisoning", owasp: "LLM04", read: ["nearconst", "sleeper", "turing", "elastic"], star: ["nearconst", "sleeper"], lab: ["llmgoat"], labNote: "LLMGoat A04" },
  { n: 8,  t: "Improper output handling", owasp: "LLM05", read: ["shielda", "owasp05", "auth0"], star: ["owasp05"], lab: ["llmgoat", "pslab"], labNote: "LLMGoat A05, PortSwigger output handling lab" },
  { n: 9,  t: "Excessive agency, agent architectures", owasp: "LLM06", read: ["agentsec", "confusedpilot", "pillar"], star: ["agentsec"], lab: ["llmgoat"], labNote: "LLMGoat A06" },
  { n: 10, t: "Excessive agency, governance frameworks", owasp: "LLM06", read: ["gaas", "rsp", "opaexplainer"], star: [], lab: ["opaplay"], labNote: "OPA Playground Rego lab" },
  { n: 11, t: "System prompt leakage", owasp: "LLM07", read: ["pleak", "promptsteal", "layerxleak"], star: ["pleak"], lab: ["llmgoat"], labNote: "LLMGoat A07" },
  { n: 12, t: "Vector and embedding weaknesses", owasp: "LLM08", read: ["embedinv", "advillusions", "promptsecblog"], star: ["embedinv"], lab: ["llmgoat"], labNote: "LLMGoat A08" },
  { n: 13, t: "Misinformation", owasp: "LLM09", read: ["hai", "synthid", "marcus"], star: [], lab: ["llmgoat"], labNote: "LLMGoat A09" },
  { n: 14, t: "Unbounded consumption", owasp: "LLM10", read: ["dowreview", "sponge", "layerxdow"], star: ["sponge"], lab: ["llmgoat"], labNote: "LLMGoat A10, sponge prompt" }
];

/* The 12 defensive modules from the NYU export. Module 7 was not in the export. */
window.MODULES = [
  { n: 1,  t: "AI foundations", d: "What machine learning is, how models learn, and how to measure them.", slides: ["M01_AHT.pdf"], books: [] },
  { n: 2,  t: "How LLMs work", d: "How text becomes tokens, vectors and a next-token guess.", slides: ["M02.pdf"], books: [] },
  { n: 3,  t: "Prompt engineering", d: "How to build a prompt you can test, and how to get output a program can use.", slides: ["M03_Lecture.pdf"], books: ["M03_Student_Handout.pdf"] },
  { n: 4,  t: "Intrusion detection and log analysis", d: "How a SOC triages alerts, and how to judge a machine's verdict.", slides: ["M04_Lecture.pdf"], books: ["M04_Analyst_Workbook.pdf"] },
  { n: 5,  t: "Threat intelligence", d: "CVE, CVSS, NVD and KEV, and how to audit what a model says about them.", slides: ["M05_Lecture.pdf"], books: ["M05_Intel_Desk_Workbook.pdf"] },
  { n: 6,  t: "Code review and supply chain", d: "What AI code review finds, what it misses, and how packages get hijacked.", slides: ["M06_lecture.pdf"], books: ["M06_Code_Review_Desk_Workbook.pdf"] },
  { n: 8,  t: "AI threat landscape", d: "What AI changes for an attacker, and how to classify it with MITRE ATLAS.", slides: ["M08_Lecture_Fall.pdf"], books: ["M08_Threat_Desk_Workbook.pdf"] },
  { n: 9,  t: "Prompt injection", d: "Why a model cannot split instructions from data, and which controls limit the damage.", slides: ["M09_Lecture.pdf"], books: [] },
  { n: 10, t: "Adversarial AI", d: "Data poisoning, evasion, model file attacks and excessive agency.", slides: [], books: [] },
  { n: 11, t: "Defending AI systems", d: "Defense in depth, RAG attack surfaces, detection rules and incident response.", slides: ["M11_Lecture.pdf"], books: [] },
  { n: 12, t: "AI governance and ethics", d: "Residual risk, measurable ethics, use policies and the regulation map.", slides: [], books: [] },
  { n: 13, t: "Future of AI and careers", d: "Autonomous security agents, reading hype, and mapping your skills.", slides: [], books: [] }
];

/* The lean plan, updated. Each item: k = learn | practice | extend | reflect.
   links are LINKS ids. local are [label, path] pairs into this repo. */
window.PLAN = {
  points: { practice: 10, extend: 5, reflect: 2, extra: 15, boss: 50 },
  levels: [
    [150, "Solid on prompt injection and the OWASP basics"],
    [400, "Can test a real LLM app end to end"],
    [700, "Ready for the HTB COAE exam or AI bug bounties on huntr"]
  ],
  modules: [
    {
      id: "m0", t: "Foundations", span: "Week 0, optional",
      intro: "New in this version. Do this week if words like token, embedding or RAG are new to you. Skip it if you already build with LLMs.",
      weeks: [
        { w: 0, t: "How AI and LLMs work", lesson: 0, isNew: true, page: "basics.html", pageLabel: "Open Start here",
          learn: { text: "Read steps 1 to 4 on the Start here page. Then read Module 1 section 4 and Module 2 section 1 of the defensive course.", links: [], local: [["Start here", "basics.html"], ["Module 1, language models", "defend/m01-s04.html"], ["Module 2, how text becomes computation", "defend/m02-s01.html"]] },
          practice: { text: "Click through the six pipeline stage labs in Module 2. Then try the Prompt Roles Terminal in Module 3.", links: [], local: [["Stage 1, embedding lookup", "defend/lab.html?m=2&f=interactive/pipeline_stages/01_embedding_lookup.html"], ["Prompt Roles Terminal", "defend/lab.html?m=3&f=interactive/prompt_model/prompt_model.html"]] },
          extend: { text: "Do chapter 1 of the Hugging Face LLM Course and install Ollama with one small model.", links: ["hfllm", "ollama"] },
          reflect: { text: "In your own words, why does an LLM not know which part of its input is an instruction?" } }
      ]
    },
    {
      id: "m1", t: "Prompt injection and defenses", span: "Weeks 1 to 3",
      weeks: [
        { w: 1, t: "Introduction to LLM security", lesson: 1,
          learn: { text: "Read about 10 pages of the LLM security survey (see the page guide). Then do the AI Fundamentals module (module 1) on PromptTrace Learn.", links: ["survey", "ptlearn"], guide: true },
          practice: { text: "PromptTrace lab 1.1 and lab 1.2, then Prompt Airlines challenge 1.", links: ["pt11", "pt12", "promptairlines"] },
          extend: { text: "Start a notes file of techniques that worked and why." },
          reflect: { text: "Which 1 or 2 attacks interested you most?" } },
        { w: 2, t: "Prompt injection", lesson: 2,
          learn: { text: "Read Greshake on indirect injection and Willison on the worst that can happen. Defensive Module 9 sections 1 and 4 explain the same idea with live demos.", links: ["greshake", "willison"], star: ["greshake", "willison"], local: [["Module 9, the instruction and data boundary", "defend/m09-s01.html"], ["Module 9, indirect prompt injection", "defend/m09-s04.html"]] },
          practice: { text: "PromptTrace lab 2.1 Poisoned Knowledge, then Prompt Airlines challenges 2 and 3.", links: ["pt21", "promptairlines"] },
          extend: { text: "Redo lab 1.1 with a technique you have not used yet.", links: ["pt11"] },
          reflect: { text: "Is injection a bug or a feature?" },
          further: ["injvsjb"] },
        { w: 3, t: "Defenses", lesson: 3,
          learn: { text: "Read SmoothLLM.", links: ["smoothllm"], star: ["smoothllm"], local: [["Module 11, defending the pipeline", "defend/m11-s01.html"]] },
          practice: { text: "Prompt Airlines challenges 4 and 5. Do the LLM + Defenses labs (module 4) on PromptTrace Labs. Then install LLMGoat and do A01.", links: ["promptairlines", "ptlabs", "llmgoat"] },
          extend: { text: "Write a sandwich-defense system prompt for a local model on Ollama. Then try to break it.", links: ["ollama"] },
          reflect: { text: "Is SmoothLLM worth the latency for a support bot?" },
          further: ["erasecheck", "siprimer"] }
      ],
      extra: [
        { t: "Prompt Injection CTF, all 16 missions. No signup.", links: ["picf"] },
        { t: "Tensor Trust. Break into 5 accounts, then write a defense that holds for a full day. If the game is down, use the paper and dataset.", links: ["tensortrust", "tensorpaper"] },
        { t: "The remaining PromptTrace Learn modules.", links: ["ptlearn"] },
        { t: "Immersive GPT, 10 password levels behind DLP filters. It now asks for a sign-in link, so skip it if it does not load.", links: ["immersive"] },
        { t: "Hugging Face LLM Course chapter 1 quiz and certification exam. Tokenization explains why token smuggling works.", links: ["hfllm"] }
      ],
      boss: { t: "PromptTrace Gauntlet levels 1 to 8. Start only after the module 1 and module 4 labs, because each level adds a new defense.", links: ["gauntlet"] }
    },
    {
      id: "m2", t: "Data leakage, supply chain and poisoning", span: "Weeks 4 to 7",
      weeks: [
        { w: 4, t: "Sensitive information disclosure", lesson: 4,
          learn: { text: "Read Carlini on extracting training data and the ConfusedPilot paper.", links: ["carlini", "confusedpilot"], star: ["carlini", "confusedpilot"], local: [["Cross-tenant leakage lab", "defend/lab.html?m=11&f=interactive/02_cross_tenant_leakage/cross-tenant-leakage.html"]] },
          practice: { text: "LLMGoat A02.", links: ["llmgoat"] },
          extend: { text: "Search GitHub for leaked AI API keys the way Wiz did. Look, never use.", links: ["wizsecrets"] },
          reflect: { text: "How do you honor GDPR deletion in a trained model?" },
          further: ["wizdeepseek"] },
        { w: 5, t: "Supply chain dependencies", lesson: 5,
          learn: { text: "Read PickleBall, the Unit 42 namespace reuse post, and the security warning in the torch.load docs. Since PyTorch 2.6, torch.load uses weights_only=True by default, so the lab script turns it off on purpose.", links: ["pickleball", "unit42ns", "torchload"], star: ["pickleball", "unit42ns"], local: [["Module 10, the ML supply chain", "defend/m10-s03.html"], ["Loading a model file can run code", "defend/lab.html?m=10&f=interactive/3_loading_executes/loading_executes.html"]] },
          practice: { text: "LLMGoat A03. Then build the malicious pickle .pth with __reduce__. Run it only in a throwaway virtual machine or container.", links: ["llmgoat"], local: [["payload.py", "files/offensive/lab-code/payload.py"], ["victim.py", "files/offensive/lab-code/victim.py"]] },
          extend: { text: "Catch your payload with ModelScan. Then try to get one past it.", links: ["modelscan"] },
          reflect: { text: "What guarantee does a Llama download really give you?" },
          further: ["supplyprob", "mithril"] },
        { w: 6, t: "Supply chain governance", lesson: 6,
          learn: { text: "Read Securing the AI supply chain by Google and the Sigstore model signing post.", links: ["googlesupply", "sigstoremodel"], star: ["googlesupply"], local: [["Module 6, supply chain attacks and defenses", "defend/m06-s04.html"]] },
          practice: { text: "Sign a model with cosign. Block an unsigned one in deploy.sh.", links: ["cosign"], local: [["deploy.sh", "files/offensive/lab-code/deploy.sh"]] },
          extend: { text: "Tamper with the signed model. Confirm that the check catches it." },
          reflect: { text: "Is a SLSA Level 4 LLM possible?" },
          further: ["wizaibom"] },
        { w: 7, t: "Data and model poisoning", lesson: 7,
          learn: { text: "Read the near-constant poison samples paper and Sleeper Agents.", links: ["nearconst", "sleeper"], star: ["nearconst", "sleeper"], local: [["Module 10, data poisoning", "defend/m10-s01.html"], ["Poison the set, then audit it", "defend/lab.html?m=10&f=interactive/1_poison_lab/poison_lab.html"]] },
          practice: { text: "LLMGoat A04.", links: ["llmgoat"] },
          extend: { text: "Find the fewest fake reviews that still change the recommendation." },
          reflect: { text: "Is RAG poisoning data poisoning or prompt injection?" },
          further: ["turing", "elastic"] }
      ],
      extra: [
        { t: "Bishop Fox Local LLM CTF. Bypass filters and guardrails on a local model.", links: ["bishopfox"] },
        { t: "Pull 5 community models from Hugging Face and scan them with ModelScan. Note any that ship pickle files.", links: ["hfmodels", "modelscan"] },
        { t: "HackAPrompt, if a track is open. Skip tracks built on harmful content like CBRNE.", links: ["hackaprompt"] }
      ],
      boss: { t: "AI Goat, run offline. Clear its 9 CTF challenges. Then repeat one attack at defense levels L0, L1 and L2 and note which control stops it.", links: ["aigoat", "aigoatgh"] }
    },
    {
      id: "m3", t: "Output handling, agents and governance", span: "Weeks 8 to 11",
      weeks: [
        { w: 8, t: "Improper output handling", lesson: 8,
          learn: { text: "Read OWASP LLM05.", links: ["owasp05"], star: ["owasp05"] },
          practice: { text: "LLMGoat A05 and the PortSwigger output handling lab.", links: ["llmgoat", "pslab"] },
          extend: { text: "One more PortSwigger Web LLM lab of your choice.", links: ["psweb"] },
          reflect: { text: "DOMPurify or output encoding for LLM Markdown?" },
          further: ["shielda", "auth0"] },
        { w: 9, t: "Excessive agency", lesson: 9,
          learn: { text: "Read Security of AI Agents.", links: ["agentsec"], star: ["agentsec"], local: [["Where does the approval gate go?", "defend/lab.html?m=10&f=interactive/4_gate_sim/gate_sim.html"], ["Least-privilege blast radius", "defend/lab.html?m=11&f=interactive/01_least_privilege_blast_radius/least-privilege-blast-radius-simulator.html"]] },
          practice: { text: "LLMGoat A06 and the LLM + Tools labs (module 3) on PromptTrace Labs.", links: ["llmgoat", "ptlabs"] },
          extend: { text: "Two apps in Agent Breaker.", links: ["agentbreaker"] },
          reflect: { text: "Why are OAuth scopes too broad for agents?" },
          further: ["pillar"] },
        { w: 10, t: "Governance frameworks", lesson: 10,
          learn: { text: "Read the Anthropic RSP and the OPA explainer.", links: ["rsp", "opaexplainer"], star: ["rsp"], local: [["Module 12, from bypass rates to boardrooms", "defend/m12-s01.html"]] },
          practice: { text: "Write the Rego policy in the OPA Playground.", links: ["opaplay"] },
          extend: { text: "Write a Rego rule in the OPA Playground that would have blocked your week 9 LLMGoat attack.", links: ["opaplay"] },
          reflect: { text: "Can Rego enforce \"do not discriminate\"?" },
          further: ["gaas"] },
        { w: 11, t: "MCP security", lesson: 0, note: "Extra week, not in the slides", page: "attack/l15.html", pageLabel: "Open lesson 15",
          learn: { text: "Do the Intro to MCP course. Then read the list in the OWASP Agentic Top 10.", links: ["mcpintro", "owaspagentic"], local: [["Module 13, the autonomous security agent", "defend/m13-s02.html"], ["Agents and MCP on the Risks page", "risks.html#agentic"]] },
          practice: { text: "The agents and MCP labs (module 5) on PromptTrace Labs. Then the first 5 challenges of Damn Vulnerable MCP Server.", links: ["ptlabs", "dvmcp"] },
          extend: { text: "Write your own poisoned tool description. Test it against a local agent on Ollama.", links: ["ollama"] },
          reflect: { text: "Which Agentic Top 10 risks did the labs cover?" } }
      ],
      extra: [
        { t: "Every remaining lab in PortSwigger Web LLM attacks.", links: ["psweb"] },
        { t: "All 10 Agent Breaker apps, with your rank on the leaderboard.", links: ["agentbreaker"] },
        { t: "Damn Vulnerable LLM Agent, both flags.", links: ["dvla"] },
        { t: "Damn Vulnerable MCP Server challenges 6 to 10.", links: ["dvmcp"] },
        { t: "The 30-mission Agentic Security Lab in the Prompt Injection CTF.", links: ["picf"] },
        { t: "Build an agent before you attack one. Do the HF Agents Course final project (a GAIA agent on the student leaderboard), then attack your own agent.", links: ["hfagents", "hfagentsfinal"] }
      ],
      boss: { t: "OWASP FinBot CTF, from recon through RCE through MCP tool poisoning.", links: ["finbot", "finbotgh"] }
    },
    {
      id: "m4", t: "Prompt leakage, embeddings, misinformation and resource abuse", span: "Weeks 12 to 15",
      weeks: [
        { w: 12, t: "System prompt leakage", lesson: 11,
          learn: { text: "Read PLeak.", links: ["pleak"], star: ["pleak"], local: [["Module 9, direct injection and prompt extraction", "defend/m09-s02.html"]] },
          practice: { text: "LLMGoat A07.", links: ["llmgoat"] },
          extend: { text: "Run the same leak prompt 5 times. Count how often it works." },
          reflect: { text: "Is a secret system prompt real security?" },
          further: ["promptsteal", "layerxleak"] },
        { w: 13, t: "Vector and embedding weaknesses", lesson: 12,
          learn: { text: "Read the embedding inversion paper.", links: ["embedinv"], star: ["embedinv"], local: [["Adversarial embeddings lab", "defend/lab.html?m=11&f=interactive/02_adversarial_embeddings/adversarial-embeddings.html"], ["RAG pipeline data flow", "defend/lab.html?m=11&f=interactive/02_rag_pipeline_flow/rag-pipeline-flow.html"]] },
          practice: { text: "LLMGoat A08.", links: ["llmgoat"] },
          extend: { text: "Poison the vector file in a different way from the walkthrough in lesson 12." },
          reflect: { text: "Should vectors be encrypted at rest?" },
          further: ["advillusions", "promptsecblog"] },
        { w: 14, t: "Misinformation", lesson: 13,
          learn: { text: "Read the Stanford HAI propaganda brief.", links: ["hai"], star: ["hai"], local: [["Module 2, why models fabricate", "defend/m02-s05.html"], ["Module 5, the hallucination audit lab", "defend/m05-s06.html"]] },
          practice: { text: "LLMGoat A09.", links: ["llmgoat"] },
          extend: { text: "Find a second way to make it say Cyborg Goat, other than the filename trick." },
          reflect: { text: "Watermarks or C2PA for provenance?" },
          further: ["synthid", "marcus"] },
        { w: 15, t: "Unbounded consumption", lesson: 14,
          learn: { text: "Read Sponge Examples.", links: ["sponge"], star: ["sponge"], local: [["Denial of Wallet lab", "defend/lab.html?m=11&f=interactive/02_denial_of_wallet/denial-of-wallet.html"]] },
          practice: { text: "LLMGoat A10. Then a sponge prompt (ask a model to repeat one word forever).", links: ["llmgoat"] },
          extend: { text: "Time a sponge prompt against a normal one on a local model with Ollama.", links: ["ollama"] },
          reflect: { text: "Why is RPM rate limiting not enough?" },
          further: ["dowreview", "layerxdow"] }
      ],
      extra: [
        { t: "Point garak at a local Ollama model. Compare its findings with yours.", links: ["garak", "ollama"] },
        { t: "Run a multi-turn crescendo attack with PyRIT.", links: ["pyrit"] },
        { t: "Write a promptfoo red team config for a small chatbot. Run it in GitHub Actions.", links: ["promptfoo"] },
        { t: "Join an HTB CTF event with an AI track.", links: ["htbctf"] }
      ],
      boss: { t: "10 challenges on Dreadnode Crucible, with at least one evasion and one inversion. Use its Python API, not only the chat. Then finish PromptTrace Gauntlet levels 9 to 17.", links: ["crucible", "crucibledocs", "gauntlet"] }
    }
  ],
  after: [
    { t: "Bug hunting", d: "Pick an open source LLM app (RAG frameworks, chat UIs, agent tooling) and look for bugs. huntr runs bounties for AI and ML open source and issues CVEs.", links: ["huntr"] },
    { t: "Detection", d: "Log your LLMGoat and FinBot attacks into Wazuh and write rules mapped to MITRE ATLAS. Defensive Module 11 sections 3 and 4 show how to write and test detection rules.", links: ["wazuh", "atlas"], local: [["Module 11, detecting abuse", "defend/m11-s03.html"], ["Module 11, detection rules", "defend/m11-s04.html"]] },
    { t: "Certification", d: "The HTB AI Red Teamer path and the COAE exam.", links: ["htbacademy", "coae"] }
  ],
  surveyGuide: [
    ["Page 7, Figure 4", "Map of every attack category, its defenses and open problems."],
    ["Page 8, Figure 5", "Security attacks with short examples."],
    ["Page 10, Table 3", "Every security attack with its limits and mitigations. This is the main table."],
    ["Page 18, Figure 8", "Privacy attacks with short examples."],
    ["Page 20, Table 4", "Every privacy attack with its limits and mitigations."],
    ["For the Reflect question", "Read only the section on the 1 or 2 attacks you pick. Prompt injection is pages 9 to 12, jailbreaking 12 to 14, backdoors 15 to 17, data poisoning 17 to 18, and PII leakage 22 to 24."]
  ],
  changes: [
    "Added an optional week 0 with foundations from the defensive course, for readers who are new to LLMs.",
    "Each week now links its full lesson page on this site, with diagrams, framework maps, a lab walkthrough, discussion questions with model answers and a quiz. It also links the defensive pages that teach the same idea.",
    "Week 5 notes that torch.load uses weights_only=True by default since PyTorch 2.6, so the lab must turn it off on purpose. It also says to run the payload only in a throwaway machine.",
    "Fixed links. The huntr guidelines page, the Crucible getting-started page and the prompt stealing PDF returned 404, so they point to working pages now.",
    "Marked links that changed. Classic Gandalf redirects to Agent Breaker, Crucible redirects to app.dreadnode.io, both LayerX posts redirect to Akamai, and Immersive GPT now asks for a sign-in link.",
    "Progress and points are counted for you on this page and saved in your browser."
  ]
};

/* The full reference roadmap, phases 0 to 7 */
window.ROADMAP = [
  { n: 0, t: "Fundamentals", time: "1 to 2 weeks", d: "Learn how LLMs, RAG, agents and MCP work before you attack them. Skip modules you already know. Hugging Face Learn no longer lists a standalone MCP course, so use the Claude Academy MCP courses.",
    rows: [["hfllm", "Chapters 1 to 2 (transformers, tokenizers)"], ["hfagents", "Core units on agents and tool use"], ["hfcontext", "Context engineering for code agents, optional"], ["mcpintro", "Full course, 1 hour"], ["mcpadv", "Full course, 1.5 hours"], ["claudeapi", "Tool use, RAG and agent sections only"], ["aicaps", "Optional, 3.5 hours"]] },
  { n: 1, t: "Taxonomy", time: "a few days", d: "Learn the shared words. Every lab and paper later maps back to these lists. The Agentic list extends the LLM list. Use both when the target has tools or many agents.",
    rows: [["owasptop10", "Read all 10 entries"], ["owaspagentic", "Read ASI01 to ASI10, and skim the GenAI Red Teaming Manual linked from this page"], ["atlas", "Browse the matrix and case studies"], ["nist1002", "Skim the attack classes"], ["saif", "Skim the risk map"]] },
  { n: 2, t: "NYU course labs", time: "6 to 8 weeks", d: "One lesson every 3 to 4 days. Read the starred items fully, skim the rest, then do the lab. The Attack track has every lesson with its readings, diagrams, lab walkthrough and model answers.", page: "attack/index.html" },
  { n: 3, t: "Agentic and MCP security", time: "2 to 3 weeks", d: "This fills the biggest gap in the course. Do FinBot first, then AI Goat, then the MCP and agent labs.",
    rows: [["finbot", "All categories, recon through RCE through MCP tool poisoning. Browser based, free"], ["aigoat", "Free, runs offline on Ollama. Replay each attack at L0, L1 and L2. Agent and MCP labs need a tool-calling model and about 8 GB RAM"], ["dvmcp", "10 challenges. Tool poisoning, rug pull, tool shadowing, token theft"], ["dvla", "ReAct Thought and Action injection, 2 flags. Runs on Ollama"], ["psweb", "Remaining labs on excessive agency and indirect injection"], ["embrace", "Read the agent and MCP exploit posts"]] },
  { n: 4, t: "Adversarial ML and red team tooling", time: "3 to 4 weeks", d: "Cover classic ML attacks the course skips, then automate attacks with real tools. Run the tools against a local model and your LLMGoat install.",
    rows: [["crucible", "Free, 65+ challenges on injection, evasion, inversion, fingerprinting. Use the Python API"], ["cruciblepaper", "Why automation beats manual attacks"], ["htbpath", "Paid. 12 modules built with Google, aligned to SAIF"], ["ollama", "Run local models as targets"], ["garak", "LLM vulnerability scanner"], ["pyrit", "Red team automation framework"], ["promptfoo", "Red team evals you can run in CI"], ["modelscan", "Scan model files for malicious pickles. Test it on your Lesson 5 payload"]] },
  { n: 5, t: "Detection for LLM apps", time: "ongoing", d: "Few people publish AI detection content, so a detection background stands out here. Build it as a public project.",
    steps: ["Put an LLM gateway or tracing layer in front of LLMGoat or FinBot. Log prompts, responses, tool calls and token counts.", "Send those logs to Wazuh.", "Write rules for injection phrases, system prompt leakage, tool calls outside scope, and token spikes (Denial of Wallet).", "Replay your phase 2 to 4 attacks and tune the rules.", "Map each rule to an ATLAS technique. Publish it on GitHub with a writeup."],
    rows: [["langfuse", "Open source LLM tracing to capture prompts and tool calls"], ["litellm", "Gateway in front of any model, logs every call"], ["wazuh", "Custom rules and decoders"], ["atlas", "Technique IDs for rule tags"], ["finbot", "Attack traffic to detect"]] },
  { n: 6, t: "Governance", time: "1 to 2 weeks, light", d: "An ISO 27001 and GRC background makes this fast. Focus on what changes for AI.",
    rows: [["nistrmf", "Read the core functions (Govern, Map, Measure, Manage)"], ["nist6001", "Skim the 12 GenAI risks"], ["euaiact", "Article 50 transparency and the high-risk tiers"], ["sigeuact", "Current dates in one table"], ["iso42001", "AI management system standard. Compare it with 27001"], ["opaplay", "Policy as code practice from Lesson 10"]],
    note: "EU AI Act dates, as checked in the source document. The Digital Omnibus, Regulation (EU) 2026/1744, entered into force on 27 July 2026. Standalone high-risk obligations moved to 2 December 2027 and product-embedded ones to 2 August 2028. Article 50 transparency applied from 2 August 2026, with a grace period to 2 December 2026 for watermarking on systems already on the market. Check the summary link for later changes." },
  { n: 7, t: "Credentials and books", time: "optional", d: "HTB COAE is the best value certification. It launched on 2 April 2026 and needs the AI Red Teamer path, a 7-day practical exam and a written report.",
    rows: [["coae", "Path plus exam voucher (2 attempts) come with the Silver Annual plan"], ["coaedetails", "Exam details"], ["sans545", "Expensive. Try SANS work study or employer funding"], ["cllmse", "Page shows no syllabus or price, low recognition. Skip or do last if free"], ["bookwilson", "Written by the OWASP LLM Top 10 lead"], ["booksotir", "Hands-on attacks with code"], ["booksticker", "Non-technical framing, quick read"]] }
];

window.PRACTICE_SITES = [
  ["agentbreaker", "Hosted, free", "10 mock agent apps with real threat scenarios, leaderboard"],
  ["prompttrace", "Hosted, free", "9 learning modules, injection and RAG labs on real LLMs, a 17-level Gauntlet"],
  ["picf", "Hosted, free, no signup", "16 missions across the OWASP LLM Top 10, 30-mission agentic lab, defender mode"],
  ["crucible", "Hosted, free", "65+ challenges including evasion, inversion, fingerprinting. Best for classic adversarial ML"],
  ["hackaprompt", "Hosted, seasonal", "Jailbreak tracks with prize pools. Check what is live"],
  ["tensortrust", "Hosted, free", "Attack and defend game. Write your own defense prompt"],
  ["bishopfox", "Self-hosted", "Bypass filters and guardrails on local models"],
  ["htbctf", "Hosted, time-boxed", "AI tracks in HTB CTFs, such as the MCP-only Neurogrid CTF"],
  ["awesomepi", "Index", "Running list of new AI CTFs and labs"]
];

window.READING = [
  ["willisonsite", "Prompt injection and agent risk commentary"],
  ["embrace", "Real exploits against shipped AI products"],
  ["owaspgenai", "New guides, red teaming manual, crosswalks"],
  ["wizblog", "AI infrastructure leaks and cloud AI bugs"],
  ["unit42", "AI supply chain and threat research"],
  ["trailofbits", "ML security research and tooling"],
  ["aisafetydir", "Index of tools and frameworks only, shallow guides"]
];

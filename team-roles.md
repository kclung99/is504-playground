# Team Roles: Tone × Engagement Experiment

## 5 Team Members & Workflow

### **Person 1 (You): Full Stack Dev**
Do the full stack work and deployment, basically figure out the system. Next.js + Supabase + Google Cloud. Build the frontend, database stuff, get it deployed and working. Backend might be you, or Person 2/3 can build their own APIs and you just integrate them - whatever works.

*Example*: Build the app, set up the database, deploy it. Person 2 might give you a model to run, or they build their own API and you call it - you just make it all work together.

### **Person 2: AI for Content Scoring**
Replace our mock tone/engagement/opinion values with real AI models. Instead of manually setting "tone: 0.3 (assertive)", train models to automatically detect if "AI art is NOT real art" is harsh vs polite. Build APIs that can score any new post or reply in real-time across all three dimensions.

*Example*: Provide a simple API like `POST /score` with text input, returns `{tone: 0.3, engagement: 0.7, opinion: -0.2}`. Person 1 calls this API whenever users submit posts. Need training data from Person 4's experimental content.

### **Person 3: AI for Thread Aggregation**
Figure out how to represent entire threads with summary scores. Like if the OP has tone 0.2 and replies have tones [0.5, -0.1, 0.8], what's the "thread tone"? Should we weight the OP more? Average everything? Weight by likes or engagement? Build algorithms that take individual post scores and create meaningful thread-level metrics. Work closely with Person 4 (experiment design) and Person 5 (data analysis) since these algorithms directly impact what we can measure and analyze.

*Example*: Create functions like `calculateThreadTone(posts)` that Person 1 can call to show thread-level metrics. Work with Person 5 to ensure the aggregation methods support the statistical analysis we want to do.

### **Person 4: Experiment Design**
Scale up from our 3 simple threads. Design real experiments - maybe 50 diverse discussion topics, figure out sample sizes, design different experimental conditions (not just polite vs harsh, but different algorithmic feeds). Plan how threads can grow organically as users reply, and design multi-stage experiments.

*Example*: Define exactly what we're testing - "Does starting with polite tone lead to 20% more replies?" - then tell Person 1 what features to build, Person 2 what to train models on, and Person 5 what statistical tests to run.

### **Person 5: Data Analysis & Papers**
Handle research logistics - IRB approval, statistical analysis plans, academic writing. Take the data we collect and turn it into insights like "polite threads got 23% more engagement" or "harsh tone led to more polarized opinions". Write up results for publication.

*Example*: Work with Person 4 to define hypotheses upfront, tell Person 1 what data to log, then crunch the actual numbers once experiment runs. Turn findings into academic papers.

## Workflow Example
1. **Person 4** designs experiment: "Test if polite vs harsh starting posts affect reply sentiment"
2. **Person 1** builds platform with basic scoring API integration points
3. **Person 2** trains models and provides scoring API for tone/engagement/opinion
4. **Person 3** builds thread aggregation: "If OP is polite but replies are harsh, thread tone = ?"
5. **Person 1** integrates everything and deploys to participants
6. **Person 5** analyzes results: "Polite threads had 15% more positive replies"

## Side Notes
- **Need a PM**: Someone among the 5 should coordinate timelines, dependencies, and keep everyone on track (probably not Person 1 since they're deep in the code)
- **Cross-functional involvement**: While Person 1 is the main full stack dev, they'll also dive into AI/algo/experiment design aspects since it's all interconnected and interesting work
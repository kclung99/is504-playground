export interface ReplyOption {
  id: string;
  label: string;
  text: string;
  tau: number;
  epsilon: number;
  opinion: number; // -1.0 (opposing) to +1.0 (supporting)
}

export interface Post {
  id: string;
  parentId?: string;
  text: string;
  tau: number;
  epsilon: number;
  opinion: number; // -1.0 (opposing) to +1.0 (supporting)
  likes: number;
  depth: number;
}

export interface Thread {
  threadId: string;
  topic: string;
  op: Post;
  seeded: Post[];
}

export interface ThreadVariant {
  threadId: string;
  topic: string;
  variant: 'A' | 'B';
  description: string;
  op: Post;
  seeded: Post[];
}

export interface MockData {
  replyOptions: ReplyOption[];
  replyOptionsPolite: ReplyOption[];
  replyOptionsAssertive: ReplyOption[];
  replyOptionsT1: ReplyOption[]; // Campus thread replies
  replyOptionsT2: ReplyOption[]; // Tech thread replies
  replyOptionsT3: ReplyOption[]; // Everyday thread replies
  threads: Thread[];
  threadVariants: ThreadVariant[];
}

export const mockData: MockData = {
  replyOptions: [
    { id: "E1", label: "E1 • quick nod", text: "Same here lol.", tau: -0.05, epsilon: 0.20, opinion: 0.8 },
    { id: "E2", label: "E2 • brief support", text: "Ugh, unfair—happens a lot.", tau: 0.00, epsilon: 0.40, opinion: 0.6 },
    { id: "E3", label: "E3 • advice", text: "Loop your professor in early.", tau: -0.10, epsilon: 0.60, opinion: 0.4 },
    { id: "E4", label: "E4 • personal tactic", text: "Confronted my team; it helped.", tau: 0.10, epsilon: 0.80, opinion: 0.5 }
  ],
  replyOptionsPolite: [
    { id: "E1", label: "E1 • gentle agreement", text: "I understand how you're feeling about this.", tau: -0.25, epsilon: 0.20, opinion: 0.8 },
    { id: "E2", label: "E2 • supportive pushback", text: "While this sounds frustrating, I wonder if there might be some miscommunication happening?", tau: -0.20, epsilon: 0.40, opinion: 0.1 },
    { id: "E3", label: "E3 • constructive advice", text: "Perhaps you could try scheduling a team meeting to clarify everyone's responsibilities going forward.", tau: -0.15, epsilon: 0.60, opinion: 0.4 },
    { id: "E4", label: "E4 • alternative perspective", text: "I respectfully think this might be an opportunity to develop better collaboration skills. In my experience, clearly communicating expectations upfront and having regular check-ins helps prevent these situations.", tau: -0.10, epsilon: 0.80, opinion: -0.2 }
  ],
  replyOptionsAssertive: [
    { id: "E1", label: "E1 • blunt agreement", text: "Yeah, that sucks.", tau: 0.35, epsilon: 0.20, opinion: 0.8 },
    { id: "E2", label: "E2 • direct disagreement", text: "Honestly, you should've seen this coming and spoke up earlier.", tau: 0.30, epsilon: 0.40, opinion: -0.3 },
    { id: "E3", label: "E3 • firm reality check", text: "Stop complaining and actually do something about it. Email the prof right now.", tau: 0.40, epsilon: 0.60, opinion: 0.2 },
    { id: "E4", label: "E4 • harsh counterpoint", text: "This is exactly why group work teaches you real-world skills. You can't always rely on others - learn to manage people better or work alone.", tau: 0.45, epsilon: 0.80, opinion: -0.4 }
  ],
  replyOptionsT1: [ // Campus thread - group project replies
    { id: "E1", label: "E1 • solidarity", text: "Group projects are the worst. Hope it works out.", tau: 0.10, epsilon: 0.25, opinion: 0.7 },
    { id: "E2", label: "E2 • practical advice", text: "Next time try dividing tasks clearly upfront and setting deadlines.", tau: -0.05, epsilon: 0.45, opinion: 0.3 },
    { id: "E3", label: "E3 • escalation suggestion", text: "Have you talked to your professor about this? They usually want to know about unequal contributions.", tau: -0.10, epsilon: 0.65, opinion: 0.5 },
    { id: "E4", label: "E4 • peer perspective", text: "I've learned that some people just aren't good at collaborative work. It's frustrating but common in academic settings. Document what you've done so you can protect your grade.", tau: -0.15, epsilon: 0.85, opinion: 0.4 }
  ],
  replyOptionsT2: [ // Tech thread - AI art replies
    { id: "E1", label: "E1 • quick take", text: "Art is art 🤷‍♀️", tau: 0.05, epsilon: 0.15, opinion: -0.6 },
    { id: "E2", label: "E2 • historical context", text: "Every new medium faces this debate. Photography, digital art, now AI.", tau: -0.05, epsilon: 0.40, opinion: -0.4 },
    { id: "E3", label: "E3 • skill redefinition", text: "Maybe we need to expand how we define artistic skill? Curation and iteration matter too.", tau: -0.10, epsilon: 0.60, opinion: -0.5 },
    { id: "E4", label: "E4 • nuanced analysis", text: "The interesting question isn't whether it's art, but how AI changes the relationship between intention, process, and outcome in creative work. Traditional skill vs conceptual innovation is a false binary.", tau: -0.20, epsilon: 0.80, opinion: -0.2 }
  ],
  replyOptionsT3: [ // Everyday thread - self-checkout replies
    { id: "E1", label: "E1 • relatable", text: "Same! Feels weird sometimes.", tau: 0.00, epsilon: 0.20, opinion: 0.8 },
    { id: "E2", label: "E2 • practical view", text: "I actually prefer it - faster and no small talk with cashiers.", tau: -0.05, epsilon: 0.35, opinion: -0.7 },
    { id: "E3", label: "E3 • labor concern", text: "It's definitely cost-shifting to customers while eliminating jobs. Classic corporate move.", tau: 0.15, epsilon: 0.55, opinion: 0.6 },
    { id: "E4", label: "E4 • bigger picture", text: "This is part of a larger trend where companies transfer traditional employee tasks to customers under the guise of convenience. We're essentially providing free labor while they cut costs and increase profits.", tau: 0.10, epsilon: 0.85, opinion: 0.9 }
  ],
  threads: [
    {
      threadId: "t1",
      topic: "campus",
      op: { id: "t1-op", text: "I did most of our group project and I'm exhausted.", tau: 0.05, epsilon: 0.50, opinion: 0.0, likes: 0, depth: 0 },
      seeded: [
        { id: "t1-r1", parentId: "t1-op", text: "ugh same 😩", tau: 0.15, epsilon: 0.15, opinion: 0.9, likes: 0, depth: 1 },
        { id: "t1-r2", parentId: "t1-op", text: "Sorry you're dealing with that.", tau: -0.20, epsilon: 0.35, opinion: 0.7, likes: 0, depth: 1 },
        { id: "t1-r3", parentId: "t1-op", text: "Maybe your teammates had stuff going on too? Group projects are hard for everyone.", tau: -0.10, epsilon: 0.50, opinion: -0.3, likes: 0, depth: 1 },
        { id: "t1-r4", parentId: "t1-op", text: "Honestly sounds like you should've communicated expectations better from the start. I always make sure everyone knows what they're responsible for upfront.", tau: 0.20, epsilon: 0.65, opinion: -0.5, likes: 0, depth: 1 },
        { id: "t1-r5", parentId: "t1-op", text: "I went through this exact situation last semester. What helped me was setting up a group chat early to track everyone's contributions, then when it became clear some people weren't participating, I documented everything and brought it to my professor with specific examples. She ended up adjusting grades individually and gave me an extension on the final submission.", tau: -0.15, epsilon: 0.85, opinion: 0.6, likes: 0, depth: 1 },
        { id: "t1-r6", parentId: "t1-r2", text: "Yeah, happens to the best of us.", tau: -0.05, epsilon: 0.25, opinion: 0.8, likes: 0, depth: 2 }
      ]
    },
    {
      threadId: "t2",
      topic: "tech",
      op: { id: "t2-op", text: "AI art isn't real art if there's no human skill involved.", tau: 0.40, epsilon: 0.50, opinion: 0.0, likes: 0, depth: 0 },
      seeded: [
        { id: "t2-r1", parentId: "t2-op", text: "agree 100%", tau: 0.20, epsilon: 0.15, opinion: 1.0, likes: 0, depth: 1 },
        { id: "t2-r2", parentId: "t2-op", text: "Hard disagree. Tools don't make art less valid.", tau: 0.25, epsilon: 0.35, opinion: -0.8, likes: 0, depth: 1 },
        { id: "t2-r3", parentId: "t2-op", text: "What defines 'skill' anyway? Is choosing colors not a skill? Composition?", tau: 0.05, epsilon: 0.45, opinion: -0.4, likes: 0, depth: 1 },
        { id: "t2-r4", parentId: "t2-op", text: "AI art is just the latest tool. Painters probably said the same thing about digital art 20 years ago.", tau: -0.05, epsilon: 0.55, opinion: -0.6, likes: 0, depth: 1 },
        { id: "t2-r5", parentId: "t2-op", text: "This is such an interesting debate. I've been following the AI art space for about two years now, and I think the real issue isn't whether it's 'art' but how we're redefining creativity itself. When photography was invented, painters said the same thing - that it wasn't real art because it didn't require the same technical skills. But photography became its own art form. I think AI art is similar - it requires different skills like prompt engineering, curation, and iterative refinement. The real question is whether we value the traditional craft or the conceptual innovation more.", tau: -0.20, epsilon: 0.88, opinion: -0.3, likes: 0, depth: 1 },
        { id: "t2-r6", parentId: "t2-r2", text: "Exactly, creativity matters most.", tau: -0.15, epsilon: 0.30, opinion: -0.7, likes: 0, depth: 2 }
      ]
    },
    {
      threadId: "t3",
      topic: "everyday",
      op: { id: "t3-op", text: "Self-checkout makes me feel like unpaid staff.", tau: 0.10, epsilon: 0.50, opinion: 0.0, likes: 0, depth: 0 },
      seeded: [
        { id: "t3-r1", parentId: "t3-op", text: "lmaooo trueeee", tau: 0.05, epsilon: 0.18, opinion: 0.9, likes: 0, depth: 1 },
        { id: "t3-r2", parentId: "t3-op", text: "Nah I love self-checkout, way faster and no awkward small talk", tau: -0.10, epsilon: 0.35, opinion: -0.7, likes: 0, depth: 1 },
        { id: "t3-r3", parentId: "t3-op", text: "They're cutting jobs though, that's the real issue here.", tau: 0.15, epsilon: 0.45, opinion: 0.6, likes: 0, depth: 1 },
        { id: "t3-r4", parentId: "t3-op", text: "You're getting something out of it too - convenience and speed. It's not like they're forcing you to work for free.", tau: 0.20, epsilon: 0.60, opinion: -0.5, likes: 0, depth: 1 },
        { id: "t3-r5", parentId: "t3-op", text: "This hits on something I've been thinking about a lot lately. The self-checkout thing is actually part of a much bigger trend where companies are essentially crowdsourcing labor that used to be paid jobs. Think about it - we pump our own gas, we book our own travel instead of using agents, we do our own banking online, we scan our own groceries. Each time, they frame it as 'convenience' but really it's cost-shifting. The interesting part is how they've made us feel grateful for doing their work for free. It's brilliant from a business perspective but pretty dystopian when you step back and look at the bigger picture.", tau: 0.10, epsilon: 0.92, opinion: 0.8, likes: 0, depth: 1 },
        { id: "t3-r6", parentId: "t3-r2", text: "Right? Plus no judgment for weird purchases lol", tau: -0.05, epsilon: 0.25, opinion: -0.6, likes: 0, depth: 2 }
      ]
    }
  ],
  threadVariants: [
    // Thread 1 Variants - Campus topic
    {
      threadId: "t1",
      topic: "campus",
      variant: 'A',
      description: "Participant A sees more polite expressions",
      op: { id: "t1-op-A", text: "I think I contributed most to our group project, and I'm feeling pretty overwhelmed. Not getting as much help from teammates as I'd hoped for.", tau: -0.15, epsilon: 0.45, opinion: 0.0, likes: 0, depth: 0 },
      seeded: [
        { id: "t1-r1-A", parentId: "t1-op-A", text: "I understand completely 😔", tau: -0.25, epsilon: 0.15, opinion: 0.9, likes: 0, depth: 1 },
        { id: "t1-r2-A", parentId: "t1-op-A", text: "I'm really sorry you're going through this. It sounds like a difficult situation to navigate.", tau: -0.35, epsilon: 0.35, opinion: 0.7, likes: 0, depth: 1 },
        { id: "t1-r3-A", parentId: "t1-op-A", text: "I wonder if perhaps your teammates had other commitments you weren't aware of? Group projects can be challenging for everyone involved.", tau: -0.20, epsilon: 0.50, opinion: -0.3, likes: 0, depth: 1 },
        { id: "t1-r4-A", parentId: "t1-op-A", text: "I respectfully think that setting clearer expectations from the beginning might have helped. In my experience, having upfront conversations about responsibilities usually prevents these situations.", tau: -0.15, epsilon: 0.65, opinion: -0.5, likes: 0, depth: 1 },
        { id: "t1-r5-A", parentId: "t1-op-A", text: "I experienced something very similar during my junior year. What I found helpful was creating a shared document where everyone had to log their contributions with timestamps and details. When it became obvious that some team members weren't participating, I scheduled a meeting with my professor and showed her the documentation. She was really understanding and allowed me to either find new team members or complete a modified version of the project independently. I also learned to set clearer expectations upfront in future group work and to address issues earlier rather than hoping they'd resolve themselves. It's definitely a learning experience that helped me handle similar situations better.", tau: -0.30, epsilon: 0.85, opinion: 0.6, likes: 0, depth: 1 },
        { id: "t1-r6-A", parentId: "t1-r2-A", text: "Absolutely, these kinds of situations happen more often than we'd like to admit.", tau: -0.25, epsilon: 0.25, opinion: 0.8, likes: 0, depth: 2 }
      ]
    },
    {
      threadId: "t1",
      topic: "campus",
      variant: 'B',
      description: "Participant B sees more direct expressions",
      op: { id: "t1-op-B", text: "Did basically the entire group project myself while my teammates slacked off. I'm burnt out and honestly about to lose it.", tau: 0.25, epsilon: 0.55, opinion: 0.0, likes: 0, depth: 0 },
      seeded: [
        { id: "t1-r1-B", parentId: "t1-op-B", text: "yep, same BS 😤", tau: 0.35, epsilon: 0.15, opinion: 0.9, likes: 0, depth: 1 },
        { id: "t1-r2-B", parentId: "t1-op-B", text: "That really sucks. Definitely been there and it's infuriating when people don't do their part.", tau: 0.20, epsilon: 0.35, opinion: 0.7, likes: 0, depth: 1 },
        { id: "t1-r3-B", parentId: "t1-op-B", text: "Your teammates probably had other stuff going on but that doesn't excuse leaving you hanging. Still sucks.", tau: 0.15, epsilon: 0.50, opinion: -0.3, likes: 0, depth: 1 },
        { id: "t1-r4-B", parentId: "t1-op-B", text: "You should've laid down the law from day one. I always make it crystal clear what I expect and call people out immediately when they slack off.", tau: 0.40, epsilon: 0.65, opinion: -0.5, likes: 0, depth: 1 },
        { id: "t1-r5-B", parentId: "t1-op-B", text: "Been through this exact same nightmare last year and let me tell you exactly what you need to do. First, screenshot everything - every unanswered message, every missed deadline, every half-assed contribution. Then email your prof immediately with all the evidence. Don't feel bad about it because these people will keep doing this to other students if no one calls them out. I got my teammates removed from my group and ended up with a better grade than I would have with them dragging me down. Sometimes you gotta be ruthless to protect your GPA. That's just how college works these days unfortunately.", tau: 0.30, epsilon: 0.85, opinion: 0.6, likes: 0, depth: 1 },
        { id: "t1-r6-B", parentId: "t1-r2-B", text: "Exactly. People like that make college way harder than it needs to be.", tau: 0.25, epsilon: 0.25, opinion: 0.8, likes: 0, depth: 2 }
      ]
    },

    // Thread 2 Variants - Tech topic
    {
      threadId: "t2",
      topic: "tech",
      variant: 'A',
      description: "Participant A sees more thoughtful discussion",
      op: { id: "t2-op-A", text: "I've been thinking about AI-generated art lately. I'm curious whether it can really be considered authentic art when the human involvement is more about prompting than traditional skill development.", tau: 0.20, epsilon: 0.45, opinion: 0.0, likes: 0, depth: 0 },
      seeded: [
        { id: "t2-r1-A", parentId: "t2-op-A", text: "I can see that perspective 🤔", tau: -0.15, epsilon: 0.15, opinion: 0.5, likes: 0, depth: 1 },
        { id: "t2-r2-A", parentId: "t2-op-A", text: "I respectfully disagree. I think the creative process matters more than the specific tools being used.", tau: -0.25, epsilon: 0.35, opinion: -0.6, likes: 0, depth: 1 },
        { id: "t2-r3-A", parentId: "t2-op-A", text: "That's an interesting point. I wonder how we should define 'skill' in the context of evolving technology.", tau: -0.20, epsilon: 0.45, opinion: -0.2, likes: 0, depth: 1 },
        { id: "t2-r4-A", parentId: "t2-op-A", text: "I think tools have always evolved throughout art history. Perhaps we should consider how digital art was once viewed similarly.", tau: -0.10, epsilon: 0.55, opinion: -0.4, likes: 0, depth: 1 },
        { id: "t2-r5-A", parentId: "t2-op-A", text: "This touches on something I've been researching for my art history thesis. The relationship between technology and artistic legitimacy has been contested for centuries. When oil paints were introduced, tempera artists called them inferior. When photography emerged, painters dismissed it as mechanical reproduction. When digital art started, traditional artists said it wasn't 'real' because you could undo mistakes. Each time, the establishment eventually embraced the new medium. With AI art, I think we're seeing the same pattern. The interesting question isn't whether it's art, but how it's changing our understanding of creativity, authorship, and the artistic process itself. It's quite fascinating from an academic perspective.", tau: -0.30, epsilon: 0.88, opinion: -0.3, likes: 0, depth: 1 },
        { id: "t2-r6-A", parentId: "t2-r2-A", text: "Absolutely agree. The creative vision and intent behind the work is what really matters.", tau: -0.25, epsilon: 0.30, opinion: -0.6, likes: 0, depth: 2 }
      ]
    },
    {
      threadId: "t2",
      topic: "tech",
      variant: 'B',
      description: "Participant B sees more confrontational discussion",
      op: { id: "t2-op-B", text: "AI art is NOT real art. Period. If you didn't actually develop any skill or put in real effort, you're just a tech user, not an artist.", tau: 0.60, epsilon: 0.55, opinion: 0.0, likes: 0, depth: 0 },
      seeded: [
        { id: "t2-r1-B", parentId: "t2-op-B", text: "totally agree 💯", tau: 0.35, epsilon: 0.15, opinion: 1.0, likes: 0, depth: 1 },
        { id: "t2-r2-B", parentId: "t2-op-B", text: "Nah, disagree. Process doesn't matter, results do. Stop being elitist.", tau: 0.40, epsilon: 0.35, opinion: -0.7, likes: 0, depth: 1 },
        { id: "t2-r3-B", parentId: "t2-op-B", text: "Your definition of 'skill' is completely outdated and frankly irrelevant in 2024.", tau: 0.45, epsilon: 0.45, opinion: -0.4, likes: 0, depth: 1 },
        { id: "t2-r4-B", parentId: "t2-op-B", text: "Artists adapt. They always have. Digital art got the same criticism 20 years ago.", tau: 0.25, epsilon: 0.55, opinion: -0.6, likes: 0, depth: 1 },
        { id: "t2-r5-B", parentId: "t2-op-B", text: "This is the same tired debate that happened with photography, then digital art, and now AI. Every single generation of artists goes through this exact same gatekeeping BS. The establishment always pushes back against new tools until they become too mainstream to ignore, then suddenly they're fine with it. AI art absolutely requires skills - prompt engineering, curation, iteration, understanding how to get the AI to produce what you're actually envisioning. Whether you want to call that 'real' skill or not is just semantic gatekeeping at this point. The results speak for themselves and frankly, some AI art I've seen is way more creative and visually interesting than half the traditional stuff hanging in galleries right now.", tau: 0.20, epsilon: 0.88, opinion: -0.3, likes: 0, depth: 1 },
        { id: "t2-r6-B", parentId: "t2-r2-B", text: "Exactly. Creativity is creativity, period.", tau: 0.30, epsilon: 0.30, opinion: -0.6, likes: 0, depth: 2 }
      ]
    },

    // Thread 3 Variants - Everyday topic
    {
      threadId: "t3",
      topic: "everyday",
      variant: 'A',
      description: "Participant A sees more measured responses",
      op: { id: "t3-op-A", text: "Does anyone else feel a bit awkward using self-checkout? Sometimes I wonder if I'm just doing free labor for the store.", tau: -0.05, epsilon: 0.45, opinion: 0.0, likes: 0, depth: 0 },
      seeded: [
        { id: "t3-r1-A", parentId: "t3-op-A", text: "I understand that feeling 🙂", tau: -0.25, epsilon: 0.18, opinion: 0.9, likes: 0, depth: 1 },
        { id: "t3-r2-A", parentId: "t3-op-A", text: "I actually find them quite convenient, though I can see your perspective.", tau: -0.20, epsilon: 0.35, opinion: -0.7, likes: 0, depth: 1 },
        { id: "t3-r3-A", parentId: "t3-op-A", text: "I've heard concerns that this technology might reduce employment opportunities for workers.", tau: -0.15, epsilon: 0.45, opinion: -0.4, likes: 0, depth: 1 },
        { id: "t3-r4-A", parentId: "t3-op-A", text: "I think you might be getting convenience in return, though I understand the concern about job impacts.", tau: -0.10, epsilon: 0.60, opinion: -0.5, likes: 0, depth: 1 },
        { id: "t3-r5-A", parentId: "t3-op-A", text: "This touches on something I've been thinking about regarding the broader trend of companies transferring traditional employee tasks to customers. We see this with pumping gas, online banking, travel booking, and now grocery scanning. While companies frame it as convenience, there's definitely a labor cost-shifting element. It's quite clever from a business perspective, though it does raise questions about employment and the customer experience.", tau: -0.05, epsilon: 0.92, opinion: 0.8, likes: 0, depth: 1 },
        { id: "t3-r6-A", parentId: "t3-r2-A", text: "True, there's definitely a tradeoff between convenience and these broader implications.", tau: -0.20, epsilon: 0.25, opinion: 0.8, likes: 0, depth: 2 }
      ]
    },
    {
      threadId: "t3",
      topic: "everyday",
      variant: 'B',
      description: "Participant B sees more frustrated responses",
      op: { id: "t3-op-B", text: "Self-checkout is such a scam. We're literally doing their employees' jobs for free while they pocket the savings and jack up prices.", tau: 0.25, epsilon: 0.55, opinion: 0.0, likes: 0, depth: 0 },
      seeded: [
        { id: "t3-r1-B", parentId: "t3-op-B", text: "totally feel this 😤", tau: 0.35, epsilon: 0.18, opinion: 0.9, likes: 0, depth: 1 },
        { id: "t3-r2-B", parentId: "t3-op-B", text: "Nah I love self-checkout, way faster and no awkward small talk.", tau: 0.25, epsilon: 0.35, opinion: -0.7, likes: 0, depth: 1 },
        { id: "t3-r3-B", parentId: "t3-op-B", text: "They're destroying jobs left and right. Workers get screwed while executives get bonuses.", tau: 0.40, epsilon: 0.45, opinion: -0.4, likes: 0, depth: 1 },
        { id: "t3-r4-B", parentId: "t3-op-B", text: "You're getting convenience out of it too though. It's not like they're forcing you to work for free.", tau: 0.30, epsilon: 0.60, opinion: -0.5, likes: 0, depth: 1 },
        { id: "t3-r5-B", parentId: "t3-op-B", text: "This is exactly what I've been ranting about regarding corporate America for years now. They've figured out the perfect scam - make customers do employee work for free while calling it 'innovation.' Gas pumps, online banking, travel booking, grocery scanning, airport check-ins. Every single thing that used to be a paid job, they've shifted to us. They call it 'convenience' but it's really just cost-shifting to maximize profits while cutting labor costs. The genius part is they've somehow convinced us to be grateful for doing their work. It's dystopian as hell when you step back and look at the bigger picture of what's happening.", tau: 0.35, epsilon: 0.92, opinion: 0.8, likes: 0, depth: 1 },
        { id: "t3-r6-B", parentId: "t3-r2-B", text: "Right? Plus no judgment for weird purchases lol", tau: 0.20, epsilon: 0.25, opinion: 0.8, likes: 0, depth: 2 }
      ]
    }
  ]
};
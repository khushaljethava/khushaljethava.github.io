import json, re, sys, os
from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate
sys.path.insert(0, os.path.dirname(__file__))
import meanings, fx
data_dir, out_dir = sys.argv[1], sys.argv[2]
verses = json.load(open(os.path.join(data_dir, 'verse.json')))
chapters = json.load(open(os.path.join(data_dir, 'chapters.json')))

SPEAKERS = {'धृतराष्ट्र': 'Dhritarashtra said', 'सञ्जय': 'Sanjaya said', 'संजय': 'Sanjaya said', 'अर्जुन': 'Arjuna said', 'श्रीभगवान': 'Krishna said', 'श्री भगवान': 'Krishna said'}
def speaker_of(line):
    if not re.search(r'(उवाच|ुवाच)$', line.strip()): return None
    for k, v in SPEAKERS.items():
        if line.startswith(k): return v
    raise ValueError('unknown speaker: ' + line)

SPEAKER_AT = {(1, 21): 1, (1, 28): 1}

def clean_sa(text):
    # dataset glitch: vowel sign ृ followed by a nukta stands for the long ॄ (e.g. पितॄन्)
    text = text.replace('ृ़', 'ॄ')
    # dataset glitch: vowel sign typed before the conjunct's second consonant (निश्िचत -> निश्चित), stray nukta on ो
    text = re.sub('्ि([क-ह])', '्\\1ि', text).replace('ो़', 'ो')
    # dataset glitch: some verses (from chapter 12 on) lose their line breaks after the speaker and the half-verse danda
    text = re.sub(r'(उवाच|ुवाच)(?=\S)', r'\1\n', text)
    text = re.sub(r'।(?=[^।\s\d])', '।\n', text)
    lines = [l.strip() for l in text.split('\n')]
    lines = [re.sub(r'\s*।।\s*\d+\.\d+\s*।।\s*$', ' ॥', l) for l in lines if l]
    return lines

def chapter_verses(n, meanings, fx, key_verses=()):
    rows = sorted((v for v in verses if v['chapter_number'] == n), key=lambda v: v['verse_number'])
    assert len(rows) == len(meanings), (n, len(rows), len(meanings))
    out = []
    for v, en in zip(rows, meanings):
        sa = clean_sa(v['text'])
        spk = speaker_of(sa[0])
        if spk:
            sa = sa[1:]
        # IAST generated from the Devanagari so the two always line up line-for-line
        tr = [re.sub(r'[|॥\s]+$', '', transliterate(l, sanscript.DEVANAGARI, sanscript.IAST)).strip() for l in sa]
        item = {'n': v['verse_number'], 'sa': sa, 'tr': tr, 'en': en, 'fx': fx[v['verse_number']]}
        if spk:
            item['speaker'] = spk
            # standard editions put the speaker mid-verse here, after a line of narration
            item['speaker_at'] = SPEAKER_AT.get((n, v['verse_number']), 0)
        if v['verse_number'] in key_verses: item['key'] = True
        out.append(item)
    return out

# key verses get a highlighted card
KEY_VERSES = {2: (47,), 3: (21, 35), 4: (7, 8, 24), 5: (10, 18), 6: (5, 19, 35), 7: (7, 14, 19), 8: (6, 13)}

SECTIONS = {
 1: dict(
  subtitle="The Yoga of Arjuna's Despair",
  hero_shape='divyaDrishti',
  summary=("On the eve of the great war, the blind king Dhritarashtra asks his charioteer Sanjaya what is happening at "
           "Kurukshetra. The armies are counted, the conches roar, and Arjuna asks Krishna to drive his chariot between the two "
           "sides. Seeing teachers, cousins and friends ready to die, the greatest archer of his age lays down his bow. "
           "Every journey into wisdom begins with an honest crisis."),
  sections=[
   dict(id='armies', label='The Armies', shape='armies', side='right', frm=1, to=11, title='Two armies, one question',
        intro="The blind king can't see the field, so he asks. Duryodhana, anxious beneath his confidence, names warrior after warrior on both sides.",
        gyan="Before you build anything, survey the field honestly: what you have, what you lack, and why you're really doing it."),
   dict(id='conches', label='The Conches', shape='conchChorus', side='left', frm=12, to=19, title='The conches roar',
        intro="Bhishma blows his conch and the whole battlefield answers. Krishna's Panchajanya and Arjuna's Devadatta ring out, each one named, and the sound shakes the hearts of the Kauravas.",
        gyan="Every great undertaking has a moment when you commit out loud. After that, there's no pretending it isn't happening."),
   dict(id='chariot', label='The Chariot', shape='fieldMap', side='right', frm=20, to=27, title='Between the two armies',
        intro="Arjuna, his banner bearing Hanuman, asks Krishna to place the chariot in the middle. Krishna does, and simply says: look.",
        gyan="Sometimes the most useful thing a mentor can do is put you where you can see clearly, and then stay quiet."),
   dict(id='despair', label="Arjuna's Despair", shape='fallenBow', side='left', frm=28, to=47, title='The bow falls',
        intro="Facing his own family, Arjuna's body fails him and his reasoning spirals: kinship, sin, tradition, ruin. He sits down, lets the Gandiva fall to the ground, and weeps. Krishna has not spoken yet.",
        gyan="Breakdowns often arrive dressed as good arguments. Naming the crisis is the first step; the answer begins in Chapter 2."),
  ]),
 2: dict(
  subtitle="The Yoga of Knowledge",
  hero_shape='jnanaMudra',
  summary=("Arjuna, in tears, asks to be taught. Krishna smiles and the Gita begins: the Self that is never born and never "
           "dies, the duty that is yours alone, the art of acting without clinging to results, and the portrait of a person "
           "whose wisdom stays steady. Chapter 2 holds the whole Gita in miniature."),
  sections=[
   dict(id='disciple', label='The Disciple', shape='namaskar', side='right', frm=1, to=10, title='Teach me, I take refuge in you',
        intro="Krishna's first words are a challenge, not comfort. Arjuna argues back, then breaks open and becomes a student. \"I will not fight,\" he says, and falls silent.",
        gyan="Real learning starts the moment you admit you don't know. Verse 2.7 is that moment."),
   dict(id='self', label='The Self', shape='atmaFlame', side='left', frm=11, to=30, title='What never dies',
        intro="Krishna begins with the eternal Self: never born, never dying, untouched by weapons, fire, water or wind. Bodies change like clothes; the one who wears them does not.",
        gyan="Projects end, roles change, code gets rewritten. Who you are beneath the work is what lasts."),
   dict(id='dharma', label='Svadharma', shape='scales', side='right', frm=31, to=38, title='Your own duty',
        intro="Then a practical turn: as a warrior, this fight is Arjuna's duty. Walking away would cost him his honour; meeting victory and defeat alike would free him from sin.",
        gyan="Know your craft and own it. Equanimity isn't indifference: it's showing up the same way whether you win or lose."),
   dict(id='karma-yoga', label='Karma Yoga', shape='fruitTree', side='left', frm=39, to=53, title='Skill in action',
        intro="Now the heart of it: act, but let go of the fruits. Like a tree that gives its fruit away, do the work and release the result. Evenness of mind is yoga, and yoga is skill in action. Here is the verse this whole site is built on, 2.47.",
        gyan="Ship the work, learn, ship again. Do it well because it is yours to do, not for the metrics."),
   dict(id='steady-wisdom', label='Steady Wisdom', shape='tortoise', side='right', frm=54, to=61, title='The one whose mind is still',
        intro="Arjuna asks what a person of steady wisdom looks like. Krishna answers: content within, unshaken by sorrow or pleasure, and able to gather the senses in, the way a tortoise draws in its limbs.",
        gyan="Not every notification deserves your attention. Draw the senses in, like the tortoise, and the work gets your whole mind."),
   dict(id='ocean', label='The Ocean', shape='ocean', side='left', frm=62, to=72, title='Full, and still',
        intro="Krishna traces how a mind falls (attachment, desire, anger, delusion, ruin) and how it is saved: discipline, calm, peace. The wise are like the ocean: rivers keep pouring in, and it stays full and still.",
        gyan="Attachment, desire, anger, delusion, ruin (2.62–2.63) is a stack trace for the mind. Catch it at the first frame."),
  ]),
 3: dict(
  subtitle="The Yoga of Action",
  hero_shape='sunWheel',
  summary=("Arjuna, confused, asks why he must act at all if knowledge is higher. Krishna's answer is the yoga of action: "
           "no one can stop acting, so act as an offering, keep the great wheel of the world turning, lead by example, and "
           "know the real enemy, desire, which hides wisdom the way smoke hides fire. Like the sun, the wise never stop working."),
  sections=[
   dict(id='why-act', label='Why Act?', shape='gunaBraid', side='right', frm=1, to=8, title='No one is ever still',
        intro="If knowledge is higher, Arjuna asks, why push me into this terrible war? Krishna answers that no one can stay without acting even for a moment: the three qualities of nature keep everyone moving. Better to act well than to pretend to renounce.",
        gyan="Doing nothing is not an option, only a disguise. The real choice is how you act, not whether."),
   dict(id='yajna', label='The Wheel of Yajna', shape='yajnaChakra', side='left', frm=9, to=16, title='Work as an offering',
        intro="Krishna describes the great cycle: action becomes offering, offering brings rain, rain brings grain, grain sustains beings, and beings act again (3.14). Whoever only takes from the wheel and gives nothing back, he says, is simply a thief.",
        gyan="Everything you rely on was built by someone else's work. Give back to the wheel: docs, reviews, open source, mentoring."),
   dict(id='example', label='Lead by Example', shape='diyaChain', side='right', frm=17, to=26, title='Whatever the best do, others follow',
        intro="Even one who needs nothing should keep working for the good of the world, as King Janaka did. Krishna himself, with nothing left to gain, never stops, because if he did, everyone would follow. One lamp lights the next.",
        gyan="People copy what you do, not what you say. If you lead, work like the standard you want the team to keep."),
   dict(id='doer', label='The Doer', shape='puppet', side='left', frm=27, to=35, title='"I am the doer"',
        intro="Nature's qualities do the work, yet the ego wears the crown and says \"I did this.\" Krishna asks Arjuna to offer every action to him, to watch the pull of liking and disliking, and to keep to his own dharma, even imperfectly, rather than live someone else's well.",
        gyan="Your own path done imperfectly beats someone else's done well (3.35). Stop benchmarking against other people's lives."),
   dict(id='desire', label='The Enemy', shape='veiledFire', side='right', frm=36, to=43, title='Fire covered by smoke',
        intro="What pushes people into wrong, Arjuna asks, even against their will? Desire, says Krishna, and its twin, anger. It covers wisdom as smoke covers fire, dust a mirror, the womb an unborn child. It lives in the senses, mind and intellect, but the Self is higher than all three.",
        gyan="Senses, mind, intellect, Self (3.42): know the chain of command, and let the highest one decide."),
  ]),
 4: dict(
  subtitle="The Yoga of Knowledge and Renunciation of Action",
  hero_shape='jnanaSword',
  summary=("Krishna reveals that this yoga is ancient, handed down from the sun, and that he himself comes into the world age "
           "after age whenever dharma falls. Then the deeper teaching: seeing inaction in action, treating every act as an "
           "offering, and the knowledge that burns karma to ash and cuts doubt like a sword."),
  sections=[
   dict(id='lineage', label='The Lineage', shape='lineage', side='right', frm=1, to=3, title='An ancient yoga, handed down',
        intro="This teaching is not new. Krishna gave it to the sun, the sun to Manu, Manu to King Ikshvaku. Passed from teacher to student, it was lost over time, and now he gives it again, to Arjuna, his friend.",
        gyan="Knowledge survives only when someone passes it on. Write it down, teach it, hand it forward."),
   dict(id='avatara', label='The Avatar', shape='avatara', side='left', frm=4, to=10, title='Age after age',
        intro="How could Krishna, born so recently, have taught the ancient sun? He reveals that he has had many births, and that whenever dharma declines he comes forth, to protect the good, end wrongdoing and set dharma on its feet again (4.7–4.8).",
        gyan="When things break down, someone has to step in. Sometimes that someone is you."),
   dict(id='paths', label='All Paths', shape='allPaths', side='right', frm=11, to=15, title='However you come, I receive you',
        intro="Whichever way people approach him, Krishna meets them there. He acts in the world yet is never stained by it, and those who understand this act freely, as the seekers of old did.",
        gyan="There's no single right way in. Begin from where you are."),
   dict(id='inaction', label='Action in Inaction', shape='stillHub', side='left', frm=16, to=23, title='The still centre of the wheel',
        intro="What is action, and what is inaction? Even sages are confused. The wise see inaction in action and action in inaction: fully engaged, yet doing nothing, because the craving for results has been burned away in the fire of knowledge.",
        gyan="The best engineers in a crisis are the busiest and the calmest at once. Do the work fully; let the centre stay still."),
   dict(id='offerings', label='Many Offerings', shape='yajnaLadle', side='right', frm=24, to=33, title='Everything is an offering',
        intro="It opens with 4.24, recited before meals across India: the offering, the ladle, the fire and the one who offers are all Brahman. Then Krishna names the many forms of yajna: wealth, austerity, study, breath, the senses themselves. Greatest of all is the offering of knowledge.",
        gyan="Time, attention, effort, breath: everything you put into the work is an offering. Choose where it goes."),
   dict(id='knowledge', label='The Fire of Knowledge', shape='jnanaBoat', side='left', frm=34, to=42, title='The boat and the sword',
        intro="Learn from those who have seen the truth, with humility, questions and service. Knowledge is a boat across every wrong and a fire that turns action to ash. Doubt destroys, so cut it with the sword of knowledge, and stand up.",
        gyan="Ask good questions of people who know (4.34). Then cut the doubt and get up. The answer was never to stay seated."),
  ]),
 5: dict(
  subtitle="The Yoga of Renunciation",
  hero_shape='lotusLeaf',
  summary=("Arjuna asks again: renounce action, or act? Krishna says both lead to freedom, but acting without attachment "
           "is better, and in truth they are one. The one who acts this way lives in the body like a calm resident of a city "
           "of nine gates, sees all beings with an equal eye, and stays untouched, like a lotus leaf that water cannot wet."),
  sections=[
   dict(id='two-paths', label='Two Paths', shape='twoRivers', side='right', frm=1, to=6, title='Two rivers, one water',
        intro="Arjuna wants one clear answer: renounce, or act? Krishna says both lead to the highest good, but acting without attachment is better, and only children call the two different. Whoever sees them as one, sees (5.5).",
        gyan="Thinking and doing aren't rival camps. The best work has both, flowing into the same river."),
   dict(id='nine-gates', label='Untouched', shape='nineGates', side='left', frm=7, to=13, title='The city of nine gates',
        intro="The yogi sees, hears, eats, walks and breathes, and knows it is only the senses moving among their objects. Offering everything, they stay unstained like a lotus leaf on water, and rest in the body like a calm resident of a city with nine gates.",
        gyan="Let inputs come and go through the gates. Stay the resident, not the traffic."),
   dict(id='sun-of-knowledge', label='The Sun of Knowledge', shape='eclipse', side='right', frm=14, to=17, title='Ignorance slides away',
        intro="The Lord does not hand out credit or blame; nature does the acting. Knowledge is only covered by ignorance, like a sun in eclipse, and when ignorance is removed, knowledge shines like the sun and lights up the Supreme.",
        gyan="Clarity isn't added, it's uncovered. Most bugs in thinking are just something blocking the light."),
   dict(id='equal-eye', label='The Equal Eye', shape='samaDarshi', side='left', frm=18, to=23, title='One light on all',
        intro="The wise see the same in a learned brahmin, a cow, an elephant, a dog and an outcaste (5.18). Unmoved by pleasant and unpleasant, they find a happiness within that outer pleasures, which begin and end, can never give.",
        gyan="Treat the intern and the CEO with the same respect. Equal vision is wisdom, not politeness."),
   dict(id='inner-light', label='The Inner Light', shape='bhrumadhya', side='right', frm=24, to=29, title='Lit from within',
        intro="Happy within, delighting within, lit from within: such a one reaches the peace of Brahman. Krishna gives a first glimpse of meditation, shutting out outer contacts, gaze between the brows, the breath made even, and the next chapter takes it further.",
        gyan="Before a hard decision, close the tabs and even out the breath. Five quiet minutes is a real tool."),
  ]),
 6: dict(
  subtitle="The Yoga of Meditation",
  hero_shape='dhyani',
  summary=("Krishna turns to meditation: lift yourself by your own self, sit on a steady seat with spine straight, eat and "
           "sleep in moderation, and let the mind become like a lamp in a windless place. Arjuna objects that the mind is "
           "as hard to hold as the wind. Krishna agrees, and gives the answer: practice and detachment. And no sincere "
           "effort is ever lost."),
  sections=[
   dict(id='climb', label='The Climb', shape='ascent', side='right', frm=1, to=9, title='Lift yourself by yourself',
        intro="The true renunciate is the one who does the work without leaning on its fruit. For one climbing to yoga, action is the means; for one who has arrived, calm is the means. You are your own friend and your own enemy (6.5).",
        gyan="No one can climb for you. Be the friend who pulls you up, not the voice that drags you down."),
   dict(id='seat', label='The Seat', shape='spine', side='left', frm=10, to=17, title='A steady seat, a straight spine',
        intro="Krishna gives practical instructions: a clean, quiet place; a seat neither too high nor too low, of kusha grass, deerskin and cloth; body, head and neck straight; the gaze resting. And balance: neither too much food nor too little, neither too much sleep nor too little.",
        gyan="Set up the environment and the habit wins. Sleep, food and a clean desk are part of the practice."),
   dict(id='lamp', label='The Windless Lamp', shape='windlessLamp', side='right', frm=18, to=28, title='A flame that does not flicker',
        intro="The settled mind is like a lamp in a windless place (6.19). There, beyond the senses, is a happiness nothing can shake. And when the restless mind wanders off, simply bring it back, gently, again and again.",
        gyan="Focus isn't never drifting. It's noticing the drift and coming back, every time (6.26)."),
   dict(id='all-beings', label='In All Beings', shape='jewelNet', side='left', frm=29, to=32, title='The Self in all, all in the Self',
        intro="The yogi sees the Self in every being and every being in the Self, like a net of jewels where each one reflects all the others. Whoever sees Krishna everywhere is never lost to him, and feels another's joy and pain as their own.",
        gyan="Empathy is just accurate seeing: the person across the table is running on the same stuff you are."),
   dict(id='restless-mind', label='The Restless Mind', shape='kite', side='right', frm=33, to=36, title='As hard to hold as the wind',
        intro="Arjuna is honest: the mind is restless, stubborn and strong, as hard to hold as the wind. Krishna doesn't argue. Yes, he says, but it can be held, by practice (abhyasa) and detachment (vairagya), the way a string holds a kite in the wind.",
        gyan="You won't stop the wind. Practice is the string and detachment is letting the kite fly. Hold both."),
   dict(id='no-loss', label='No Effort Lost', shape='seedSpiral', side='left', frm=37, to=47, title='Nothing good is ever wasted',
        intro="And if someone tries and falls short, do they vanish like a torn cloud? Never, says Krishna. No one who does good comes to a bad end. The practice carries over, life after life, until it reaches the goal. So be a yogi, Arjuna.",
        gyan="Every honest attempt compounds. The practice you start today is never wasted, even if it takes far longer than you hoped."),
  ]),
 7: dict(
  subtitle="The Yoga of Knowledge and Realisation",
  hero_shape='pearlThread',
  summary=("Krishna now speaks of himself: the eightfold nature of matter and mind, and the higher nature that is life itself. "
           "He is the taste in water and the light of sun and moon, the thread on which everything is strung like pearls. "
           "His maya of the three qualities hides him, and only those who turn to him cross it. Rarest of all is the one who "
           "sees, \"Vasudeva is everything.\""),
  sections=[
   dict(id='two-natures', label='Two Natures', shape='ashtaPrakriti', side='right', frm=1, to=7, title='The eightfold and the living',
        intro="Earth, water, fire, air, space, mind, intellect, ego: that is Krishna's lower nature (7.4). Beyond it is the higher, the life that holds the world together. Both come from him, and all of it hangs on him like pearls on a thread (7.7).",
        gyan="Every system has its parts and the thing that makes them alive. Learn both the components and what runs through them."),
   dict(id='essence', label='The Essence', shape='essences', side='left', frm=8, to=12, title='The taste in water',
        intro="Where is God in the everyday? Krishna answers: the taste in water, the light of the sun and moon, the fragrance of the earth, the brilliance of fire, the strength of the strong, the seed of every being.",
        gyan="Look for the essence, not the surface. In code, in people, in work: find the one thing that makes it what it is."),
   dict(id='maya', label='Maya', shape='mayaVeil', side='right', frm=13, to=15, title='The veil of the three qualities',
        intro="Woven of the three qualities, his divine maya is hard to cross (7.14). The whole world is dazzled by it and misses what lies behind. But those who turn to him walk straight through the veil.",
        gyan="Most of what distracts us is beautifully made. Notice the weave, and keep walking toward the light behind it."),
   dict(id='devotees', label='Four Devotees', shape='fourDevotees', side='left', frm=16, to=19, title='Four kinds of seekers',
        intro="Four kinds of people turn to him: the distressed, the curious, the ones who want something, and the wise (7.16). All are noble, but the wise, who ask for nothing, are his very Self. After many lives they see that Vasudeva is everything.",
        gyan="People come to good things for pain, for curiosity, for gain. All are welcome; the deepest ones stay for the thing itself."),
   dict(id='veiled', label='Veiled', shape='hourglass', side='right', frm=20, to=30, title='Knowing past, present and future',
        intro="People pray to many gods for many things, and Krishna gives even that faith its strength. But he himself stays veiled by yogamaya: he knows every being that was, is and will be, and no one knows him (7.26).",
        gyan="Respect every path, but don't confuse the gift with the giver. Results end; what's behind them doesn't."),
  ]),
 8: dict(
  subtitle="The Yoga of the Imperishable Brahman",
  hero_shape='yantra',
  summary=("Arjuna asks seven questions, and the last is the hardest: how is God known at the hour of death? Whatever you "
           "remember at the end, Krishna says, is where you go, so remember him always. He describes the imperishable, the "
           "day and night of Brahma in which worlds appear and dissolve, and the two paths of light and smoke."),
  sections=[
   dict(id='seven-questions', label='Seven Questions', shape='sevenPetals', side='right', frm=1, to=4, title='What is Brahman?',
        intro="Arjuna asks: what is Brahman, the Self within, action, the realm of beings, the realm of the gods, the lord of sacrifice, and how are you known at death? Krishna answers each in a line: the imperishable is Brahman, and he himself is the lord of sacrifice in this body.",
        gyan="Good questions are short and come in lists. Ask them all; the answers often turn out to share one centre."),
   dict(id='last-thought', label='The Last Thought', shape='birdCage', side='left', frm=5, to=8, title='Whatever you remember at the end',
        intro="Whatever state one remembers when leaving the body, to that one goes (8.6), because it is what one has been absorbed in all along. So remember me at all times, Krishna says, and fight.",
        gyan="You become what you practise thinking about. Choose it now, not at the end."),
   dict(id='om', label='Om', shape='atomSun', side='right', frm=9, to=14, title='Smaller than the atom, bright as the sun',
        intro="Meditate on the one who is smaller than the atom, the sustainer of all, coloured like the sun, beyond all darkness (8.9). Closing the gates, the breath gathered at the crown, uttering Om, one reaches the highest. For one who remembers always, he is easy to reach.",
        gyan="The smallest steady point of light outshines a lot of darkness. Keep one clear thing in focus."),
   dict(id='brahma-day', label='Day of Brahma', shape='brahmaDay', side='left', frm=15, to=22, title='A thousand ages, then night',
        intro="A day of Brahma lasts a thousand ages, and so does his night. At dawn all beings emerge from the unmanifest; at nightfall they dissolve again, over and over (8.17–19). Beyond even that is an unmanifest that never perishes.",
        gyan="Everything you build has a day and a night. Build anyway, and know what lasts beyond the cycle."),
   dict(id='two-paths', label='Two Paths', shape='lightSmoke', side='right', frm=23, to=28, title='The bright path and the dark',
        intro="There are two paths of departure: fire, light, day and the northern sun, which do not return; smoke, night and the moon, which return (8.24–26). The yogi who knows both is never confused, and goes beyond even the merit of the Vedas.",
        gyan="Some roads lead somewhere; some lead round again. Know which one you're on."),
  ]),
}

KEY_VERSES[9] = (22, 26, 34)
SECTIONS[9] = dict(
  subtitle="The Yoga of the Royal Knowledge and the Royal Secret",
  hero_shape='leafFlowerFruit',
  summary=("Krishna calls this the king of sciences and the king of secrets, and it turns out to be simple. He is the space "
           "in which the whole world moves like wind. He is the ritual, the fire, the father and the friend. And he asks for "
           "nothing grand: a leaf, a flower, a fruit, a little water, offered with love. No one who turns to him is ever lost."),
  sections=[
   dict(id='royal-secret', label='The Royal Secret', shape='skyWind', side='right', frm=1, to=6, title='Like wind in the sky',
        intro="The king of sciences is easy to practise and known directly (9.2). Everything rests in Krishna, yet he is not caught in anything, just as the mighty wind moves everywhere and still rests in space (9.6).",
        gyan="The biggest ideas often need the least equipment. Start practising before you've finished understanding."),
   dict(id='cycles', label='Cycles', shape='galaxy', side='left', frm=7, to=10, title='Sent forth again and again',
        intro="At the end of each cosmic cycle all beings return to his nature; at the start of the next he sends them forth again. He watches, untouched, as nature does the work and the world turns round and round.",
        gyan="Systems run in cycles: launch, grow, wind down, begin again. Watch the cycle without getting caught in it."),
   dict(id='i-am', label='I Am the Ritual', shape='heatRain', side='right', frm=11, to=19, title='The ghee, the fire and the offering',
        intro="Some mistake him for a mere human; the great-souled worship him as the source. He is the ritual and the ghee and the fire, father and mother, goal and friend. He gives the heat, holds back the rain and sends it forth (9.19).",
        gyan="Everything in the process (the tools, the people, the work itself) can be treated as sacred. It changes how you do it."),
   dict(id='heaven', label='Heaven and Back', shape='returnStairs', side='left', frm=20, to=25, title='When the merit runs out',
        intro="Ritual can buy heaven, but heaven runs out: when the merit is spent, people come back down (9.21). Those who think only of him are different: he carries what they lack and protects what they have (9.22).",
        gyan="Rewards that can be spent will be spent. Build on the thing that doesn't run out."),
   dict(id='offering', label='A Leaf, a Flower', shape='offeringHands', side='right', frm=26, to=29, title='Offered with love',
        intro="A leaf, a flower, a fruit, a little water: if it is offered with love, he accepts it (9.26). So whatever you do, eat, give or endure, make it an offering, and be free.",
        gyan="It's not the size of the contribution. A small thing done with care beats a big thing done for show."),
   dict(id='never-lost', label='Never Lost', shape='lotusMud', side='left', frm=30, to=34, title='The lotus rises from the mud',
        intro="Even someone of very bad conduct who turns to him wholeheartedly should be counted as good, and soon becomes so. Whatever one's birth, the way is open. \"My devotee never perishes\" (9.31). Fix your mind on me, and you will come to me (9.34).",
        gyan="Where you start doesn't decide where you end. Turn, and keep turning."),
  ])

KEY_VERSES[10] = (8, 20, 41)
SECTIONS[10] = dict(
  subtitle="The Yoga of Divine Glories",
  hero_shape='peacockFeather',
  summary=("Arjuna asks where to look for Krishna, and Krishna gives him a list of the best of everything: the sun among "
           "lights, the Himalaya among mountains, the Ganga among rivers, Garuda among birds, spring among seasons, silence "
           "among secrets. Then the twist: all of it is only a spark of his splendour, and he holds up the whole universe "
           "with a single fragment of himself."),
  sections=[
   dict(id='source', label='The Source', shape='heartLamp', side='right', frm=1, to=11, title='The lamp in the heart',
        intro="Neither gods nor sages know his origin; he is theirs. Every quality, from patience and truth to fear and fearlessness, comes from him. For those who love him, he lives in the heart and burns away the dark with the shining lamp of knowledge (10.11).",
        gyan="Understanding is a light you carry inside, not a thing you own. Keep it lit by talking about what matters with people who care."),
   dict(id='request', label="Arjuna's Request", shape='stargazer', side='left', frm=12, to=18, title='How should I think of you?',
        intro="Arjuna is moved: the sages called you supreme, and now you say it yourself. Only you know yourself. So tell me your glories, the forms in which I should think of you. I can never hear enough of your words.",
        gyan="When something is too big to grasp, ask for examples. The concrete is the way into the infinite."),
   dict(id='glories', label='Glories', shape='himalayas', side='right', frm=19, to=29, title='The Himalaya among mountains',
        intro="Krishna begins: I am the Self in every heart, the beginning, middle and end. Among lights I am the sun, among stars the moon, among mountains Meru, among waters the ocean, among words Om, among immovable things the Himalaya.",
        gyan="Look for the best example of anything and you're looking at something sacred. Excellence points beyond itself."),
   dict(id='more-glories', label='More Glories', shape='garuda', side='left', frm=30, to=38, title='Garuda among birds, the Ganga among rivers',
        intro="Among beasts the lion, among birds Garuda, among rivers the Ganga, among letters the first one, A. He is time without end, death that takes all, spring in flower, victory, determination, and among secrets, silence.",
        gyan="Even time and death are on the list. The divine isn't only in the pleasant parts; it runs through all of it."),
   dict(id='spark', label='A Single Spark', shape='tejasAmsha', side='right', frm=39, to=42, title='One fragment holds it all',
        intro="There is no end to his glories; this was only a sample. Whatever is glorious, beautiful or powerful is a spark of his splendour (10.41). And then: why know all this? I hold up the whole universe with a single fragment of myself.",
        gyan="Every brilliant thing you meet is a spark of something larger. Admire the spark; remember the fire."),
  ])

KEY_VERSES[11] = (12, 32, 55)
SECTIONS[11] = dict(
  subtitle="The Yoga of the Vision of the Universal Form",
  hero_shape='vishvarupa',
  summary=("Arjuna asks to see Krishna as he truly is, and is given divine sight. What he sees is overwhelming: the whole "
           "universe in one body, the light of a thousand suns, mouths like the fires at the end of time devouring the "
           "warriors. \"I am Time,\" says Krishna, \"be merely my instrument.\" Shaken, Arjuna begs forgiveness for every "
           "casual word between friends, and Krishna returns to his gentle form."),
  sections=[
   dict(id='show-me', label='Show Me', shape='universeBody', side='right', frm=1, to=8, title='The universe in one body',
        intro="Arjuna's delusion is gone, but now he wants to see. Krishna agrees: behold the whole universe, moving and unmoving, gathered in my body (11.7). But these eyes can't see it, so I give you divine sight.",
        gyan="Some things can't be seen with the tools you already have. Be willing to be given new eyes."),
   dict(id='thousand-suns', label='A Thousand Suns', shape='thousandSuns', side='left', frm=9, to=14, title='If a thousand suns rose at once',
        intro="Sanjaya describes it to the blind king: countless mouths and eyes, divine ornaments and weapons, facing every way. If a thousand suns blazed in the sky at once, that might be like the splendour of that great Self (11.12). Arjuna, hair on end, bows.",
        gyan="Real awe is humbling, not entertaining. Let the big things be big."),
   dict(id='cosmic-form', label='The Cosmic Form', shape='sunMoonEyes', side='right', frm=15, to=25, title='No beginning, no middle, no end',
        intro="Arjuna tries to describe it: all the gods inside, arms and eyes without number, no beginning, middle or end, the sun and moon for eyes, a mouth of blazing fire (11.19). The three worlds tremble, and so does he.",
        gyan="When reality is bigger than your map, say so honestly. Arjuna's fear is part of the vision, not a failure of it."),
   dict(id='into-the-fire', label='Into the Fire', shape='mothsFlame', side='left', frm=26, to=31, title='Like moths into a flame',
        intro="He sees the warriors of both armies, Bhishma, Drona, Karna and his own, rushing into those mouths like rivers into the ocean, like moths into a blazing flame (11.28–29). \"Who are you?\" he cries. \"I don't understand what you are doing.\"",
        gyan="Everything that begins also ends. Seeing that clearly is frightening at first, and freeing afterwards."),
   dict(id='time', label='I Am Time', shape='kalaMouth', side='right', frm=32, to=34, title='Be merely the instrument',
        intro="\"I am Time, the destroyer of worlds\" (11.32). Even without Arjuna, none of these warriors will survive; they are already slain. So stand up, win glory, and be merely the instrument.",
        gyan="You are not the author of every outcome. Do your part fully, as an instrument, and let go of the rest."),
   dict(id='salutations', label='Salutations', shape='chaturbhuja', side='left', frm=35, to=46, title='Forgive me, I called you friend',
        intro="Trembling, Arjuna bows again and again: salutations in front, behind, on every side. Then the tender part: forgive me for every time I called you \"Krishna, friend,\" joked with you, sat and ate with you. Bear with me as a friend bears with a friend. Show me your four-armed form again.",
        gyan="Familiarity can hide greatness. Look again at the people you take for granted."),
   dict(id='gentle-form', label='The Gentle Form', shape='clasp', side='right', frm=47, to=55, title='Seen only by devotion',
        intro="No Veda, sacrifice or austerity could have shown this; only grace. Krishna takes his gentle human form again and Arjuna's mind returns to itself. What can't be bought can be reached by undivided devotion, by one who works for him without enmity toward any being (11.55).",
        gyan="After the big vision comes the ordinary friend at your side. The work continues in human form."),
  ])

KEY_VERSES[12] = (8, 13, 15)
SECTIONS[12] = dict(
  subtitle="The Yoga of Devotion",
  hero_shape='rasaCircle',
  summary=("The shortest chapter, and one of the most loved. Arjuna asks whether it is better to worship God with form or the "
           "formless; Krishna says both arrive, but the path of loving devotion is easier for embodied beings. Then a gentle "
           "ladder for anyone who struggles, and a portrait of the devotee who is dear to him: friendly to all, disturbed by "
           "no one and disturbing no one."),
  sections=[
   dict(id='form-formless', label='Form or Formless', shape='rescueHand', side='right', frm=1, to=7, title='I lift them out of the ocean',
        intro="Which is better: loving God in a form, or meditating on the formless? Both reach him, Krishna says, but the formless path is harder for beings with bodies. For those who give everything to him, he becomes the one who lifts them out of the ocean of death and rebirth (12.7).",
        gyan="Choose the path you can actually walk. An easier path walked every day beats a perfect one never started."),
   dict(id='ladder', label='The Ladder', shape='fourSteps', side='left', frm=8, to=12, title='If you cannot, then this',
        intro="Fix your mind on me. If you can't, practise. If you can't practise, work for me. If you can't even do that, simply give up the fruits of your actions (12.8–11). There is always a next step down, and every step leads home.",
        gyan="Great teachers always offer a smaller step. If the ideal is out of reach today, do the version you can."),
   dict(id='dear-to-me', label='Dear to Me', shape='swanLake', side='right', frm=13, to=20, title='Not disturbing, not disturbed',
        intro="Then the portrait of the devotee who is dear to him: hating no one, friendly and compassionate, forgiving, content. The world is not disturbed by them, and they are not disturbed by the world (12.15). The same in praise and blame, at home anywhere.",
        gyan="Be the person who lowers the temperature in the room, and isn't thrown by it either."),
  ])

KEY_VERSES[13] = (2, 28, 34)
SECTIONS[13] = dict(
  subtitle="The Yoga of the Field and Its Knower",
  hero_shape='oneSunWorld',
  summary=("The body is a field, and there is one who knows the field. Krishna maps both: what the field is made of, what "
           "real knowledge looks like (humility first), and what is to be known, which has hands and eyes everywhere and is "
           "the light of all lights. Nature acts; the Self only witnesses, untouched, like space in a pot, like the one sun "
           "that lights the whole world."),
  sections=[
   dict(id='field', label='The Field', shape='fieldGrid', side='right', frm=1, to=7, title='This body is the field',
        intro="Arjuna asks about nature and the Person, the field and its knower. Krishna answers: this body is the field, and the one who knows it is the knower of the field (13.2). I am the knower in every field. The field itself is the elements, the senses, the mind, desire and aversion, pleasure and pain.",
        gyan="You are not your dashboard. The body and mind are the field; you are the one watching it."),
   dict(id='knowledge', label='Knowledge', shape='bowedReeds', side='left', frm=8, to=12, title='Humility first',
        intro="What is real knowledge? Not information, but character: humility, no pretence, non-violence, patience, honesty, service to the teacher, steadiness, detachment, seeing clearly that birth, age and sickness come to all (13.8–12). Everything else is ignorance.",
        gyan="The list starts with humility. Expertise without it is just a louder kind of ignorance."),
   dict(id='to-be-known', label='What Is to Be Known', shape='eyesEverywhere', side='right', frm=13, to=19, title='Eyes and hands everywhere',
        intro="What is to be known has hands and feet everywhere, eyes and faces everywhere (13.14). It shines through the senses yet has none, is inside and outside, far and near, undivided yet seeming divided. It is the light of all lights, seated in every heart.",
        gyan="The deepest things are both very far and very close. Look outward and inward at once."),
   dict(id='nature-person', label='Nature and the Person', shape='witnessDance', side='left', frm=20, to=27, title='The dancer and the witness',
        intro="Nature and the Person are both beginningless. Nature does all the doing; the Person experiences, and gets entangled by attachment to nature's qualities. Yet the supreme Person in the body is the witness, the one who consents (13.23). Some see this by meditation, some by knowledge, some by action, some simply by listening.",
        gyan="Let the dance go on. Practise being the one who watches it, too."),
   dict(id='unstained', label='Unstained', shape='spaceInPots', side='right', frm=28, to=35, title='Space in every pot',
        intro="Whoever sees the imperishable Lord equally in all perishing beings truly sees (13.28). Nature acts; the Self does not. As space is in every pot yet never stained by any, so the Self in every body is never stained (13.33). As the one sun lights the whole world, the knower lights the whole field.",
        gyan="The same awareness is in every person you meet. Treat them that way."),
  ])

KEY_VERSES[14] = (5, 18, 23)
SECTIONS[14] = dict(
  subtitle="The Yoga of the Three Qualities",
  hero_shape='threeFlames',
  summary=("Everything in nature is woven from three qualities: goodness (sattva), which is clear and bright; passion "
           "(rajas), which is restless and craving; and dullness (tamas), which is heavy and careless. Each binds in its own "
           "way, each tries to overpower the others, and each leads somewhere different. Krishna shows how to recognise "
           "them, and the person who has gone beyond all three."),
  sections=[
   dict(id='womb', label='The Great Womb', shape='goldenEgg', side='right', frm=1, to=4, title='I place the seed',
        intro="Krishna offers the best of all knowledge once more. Nature is the great womb; he places the seed in it, and every being in every form is born from that union (14.3–4). He is the father who gives the seed.",
        gyan="Every living thing has the same origin. Start every encounter from that."),
   dict(id='three-ropes', label='Three Ropes', shape='boundFigure', side='left', frm=5, to=13, title='How each quality binds',
        intro="Goodness binds with the pleasure of happiness and knowing; passion binds with the itch to act; dullness binds with carelessness, laziness and sleep (14.5–8). They take turns overpowering one another. You can tell which is winning: clarity, or restlessness, or fog.",
        gyan="Notice which one is driving today: clear, restless or foggy. Naming it is half of getting free of it."),
   dict(id='where-they-lead', label='Where They Lead', shape='gunaTiers', side='right', frm=14, to=18, title='Up, middle, down',
        intro="Each quality bears its own fruit: goodness gives knowledge, passion gives greed and pain, dullness gives delusion. Those in goodness go upward, those in passion stay in the middle, those in dullness sink downward (14.18).",
        gyan="Habits compound in a direction. Check which way yours are carrying you."),
   dict(id='beyond', label='Beyond the Three', shape='aboveWaves', side='left', frm=19, to=27, title='Only the qualities moving',
        intro="How do you recognise someone who has gone beyond? They don't hate light, activity or delusion when it comes, or crave it when it goes. They sit as if indifferent, knowing \"it's only the qualities moving\" (14.23): the same in pleasure and pain, praise and blame, toward friend and foe.",
        gyan="Moods are weather. Be the sky they pass through."),
  ])

KEY_VERSES[15] = (1, 7, 15)
SECTIONS[15] = dict(
  subtitle="The Yoga of the Supreme Person",
  hero_shape='ashvattha',
  summary=("A short, dense chapter, often chanted before meals. The world is an eternal tree with its roots above and its "
           "branches below; cut it with the axe of detachment and seek the place no sun lights. The soul is an eternal "
           "fragment of God, carrying the senses from body to body as the wind carries scent. And beyond both the "
           "perishable and the imperishable is the Supreme Person, Purushottama."),
  sections=[
   dict(id='tree', label='The Upside-Down Tree', shape='axeTree', side='right', frm=1, to=6, title='Roots above, branches below',
        intro="The world is an ashvattha tree with its roots above in the source and its branches spreading below, its leaves the Vedic hymns (15.1). No one sees where it begins or ends. Cut it down with the strong axe of detachment, and seek the place that neither sun nor moon nor fire lights (15.6).",
        gyan="Find where things are really rooted, not just where they branch out. Then cut the attachment, not the tree."),
   dict(id='traveller', label='The Traveller', shape='windScent', side='left', frm=7, to=11, title='As the wind carries scent',
        intro="The living soul is an eternal fragment of Krishna (15.7). It gathers the senses and the mind, and when it leaves one body for another it carries them along, the way the wind carries scent from a flower (15.8). The deluded don't see it; those with the eye of knowledge do.",
        gyan="You carry your habits of attention everywhere you go. Choose what you're carrying."),
   dict(id='light-and-life', label='Light and Life', shape='moonPlants', side='right', frm=12, to=15, title='I nourish the plants as the moon',
        intro="The light of the sun, the moon and fire is his. Entering the earth he sustains all beings; as the nectar-filled moon he nourishes the plants (15.13); as the fire of life he digests food. He sits in every heart, the source of memory and knowledge, and of forgetting too.",
        gyan="Your next meal took sun, soil, rain and a hundred hands. Eat it like you know that."),
   dict(id='supreme-person', label='The Supreme Person', shape='beyondBoth', side='left', frm=16, to=20, title='Beyond perishable and imperishable',
        intro="There are two persons in the world: the perishable, which is all beings, and the imperishable, which never changes. Beyond both is the Supreme Person, who enters and sustains the three worlds (15.16–18). Whoever knows this knows all, and has done all there is to do.",
        gyan="Look past what changes and past what merely stays. Look for what holds both."),
  ])

KEY_VERSES[16] = (1, 21)
SECTIONS[16] = dict(
  subtitle="The Yoga of the Divine and the Demonic",
  hero_shape='lotusThorn',
  summary=("Two natures run through the world: the divine (fearless, truthful, compassionate, forgiving) and the demonic "
           "(arrogant, angry, insatiable). Krishna reassures Arjuna that he was born with the first, then paints an unsparing "
           "portrait of the second: bound by a hundred ropes of hope, saying \"this is mine, and that will be mine too.\" "
           "The way out is through avoiding three gates: desire, anger and greed."),
  sections=[
   dict(id='divine', label='The Divine Nature', shape='virtueGarden', side='right', frm=1, to=5, title='Fearlessness first',
        intro="The list of divine qualities begins with fearlessness and runs through purity, generosity, self-control, non-violence, truth, compassion, gentleness, forgiveness and modesty (16.1–3). The divine nature frees; the demonic binds. \"Do not grieve,\" Krishna tells Arjuna. \"You were born with the divine nature\" (16.5).",
        gyan="Character is a garden, not a trophy. Tend the qualities daily and they grow."),
   dict(id='ropes', label='Ropes of Hope', shape='hopeRopes', side='left', frm=6, to=12, title='A hundred ropes of hope',
        intro="The demonic see a world without truth or foundation, driven only by desire. Clinging to cravings that can never be filled, worried until death, they are bound by hundreds of ropes of hope (16.12), piling up wealth by any means to feed what they want.",
        gyan="Unchecked wanting doesn't free you; it ties you to a hundred things at once."),
   dict(id='mine', label='This Is Mine', shape='goldNet', side='right', frm=13, to=20, title='"Who else is like me?"',
        intro="Their inner voice: \"This I gained today, that I'll get tomorrow. This is mine and that will be mine. I am the lord, I am powerful, who else is like me?\" (16.13–15). Caught in a net of delusion, they hate the very God who lives in every body, and sink lower birth after birth.",
        gyan="Watch for that voice in your own head. It sounds like ambition; it is often just fear wearing a crown."),
   dict(id='three-gates', label='Three Gates', shape='threeGates', side='left', frm=21, to=24, title='Desire, anger and greed',
        intro="There are three gates to this hell, and they destroy the self: desire, anger and greed (16.21). Leave all three and you walk toward your highest good. And when unsure what to do, don't follow impulse; let wise guidance be your measure.",
        gyan="Before a decision, check the three gates: am I acting from craving, from anger or from greed? If so, wait."),
  ])

KEY_VERSES[17] = (3, 15, 20)
SECTIONS[17] = dict(
  subtitle="The Yoga of the Three Kinds of Faith",
  hero_shape='faithFigure',
  summary=("What about people who don't follow the rules but do have faith? Krishna answers that faith itself comes in "
           "three kinds, because a person is made of their faith (17.3). Then he runs everything through the three qualities: "
           "food, sacrifice, austerity of body, speech and mind, and giving. It ends with the threefold name Om Tat Sat, and "
           "one warning: without faith, nothing counts."),
  sections=[
   dict(id='faith', label='Three Faiths', shape='threeShrines', side='right', frm=1, to=6, title='You are what you have faith in',
        intro="Faith takes the shape of one's inner being: \"a person is made of their faith; as their faith is, so are they\" (17.3). People of goodness worship the divine, people of passion worship power, people of dullness worship ghosts. And some torture their own bodies for show, which is not faith at all.",
        gyan="What you trust shapes who you become. Choose what you put your faith in as carefully as anything you build."),
   dict(id='food', label='Food and Sacrifice', shape='threeBowls', side='left', frm=7, to=13, title='Three kinds of food',
        intro="Even food comes in three kinds. Food that is fresh, nourishing and pleasing to the heart belongs to goodness; food that is too hot, sour, pungent and burning belongs to passion; stale, spoiled leftovers belong to dullness (17.8–10). Sacrifice too: done because it ought to be, done for reward or show, or done carelessly.",
        gyan="You are partly made of what you eat and what you consume. That goes for feeds and news too."),
   dict(id='austerity', label='Body, Speech, Mind', shape='triTapas', side='right', frm=14, to=19, title='Speech that causes no distress',
        intro="Austerity has three places. Of the body: reverence, purity, honesty, non-violence. Of speech: words that cause no distress and are truthful, kind and useful (17.15). Of the mind: serenity, gentleness, silence, self-control. Done for show, it is fleeting; done to hurt, it is dull.",
        gyan="True, kind and useful: if a sentence fails one of the three, rewrite it before you send it."),
   dict(id='giving', label='Giving', shape='givingHand', side='left', frm=20, to=22, title='A gift that expects nothing',
        intro="The best gift is given simply because it should be, to someone who can't repay it, at the right time and place (17.20). A gift given grudgingly or for a return belongs to passion; one given carelessly or with contempt belongs to dullness.",
        gyan="Give to people who can't give back, and don't keep score."),
   dict(id='om-tat-sat', label='Om Tat Sat', shape='omTatSat', side='right', frm=23, to=28, title='The threefold name',
        intro="Om Tat Sat is the threefold name of Brahman (17.23). Begin with Om; act with Tat, without seeking reward; Sat means what is real and good. But whatever is done without faith, whether sacrifice, gift or austerity, is asat: of no use here or hereafter (17.28).",
        gyan="Start with intent, act without grasping, aim at what's real. And mean it, because hollow effort counts for nothing."),
  ])

KEY_VERSES[18] = (47, 61, 65, 66, 73, 78)
SECTIONS[18] = dict(
  subtitle="The Yoga of Liberation through Renunciation",
  hero_shape='bowRaised',
  summary=("The longest chapter gathers everything together. True renunciation is not giving up action but giving up its "
           "fruits. Everything (knowledge, action, the doer, understanding, firmness, happiness) comes in three kinds. Do "
           "your own work as worship. Then the most secret word of all: let go of everything and take refuge in me; do not "
           "grieve. Arjuna's delusion is gone. \"I will do as you say,\" he says, and lifts the bow he dropped in Chapter 1."),
  sections=[
   dict(id='relinquishment', label='Relinquishment', shape='letGoHand', side='right', frm=1, to=12, title='Let go of the fruit, not the work',
        intro="What is the difference between renunciation and relinquishment? Krishna's settled view: don't give up good action; give up attachment to its fruit (18.6). Dropping a duty because it's hard is passion; dropping it out of confusion is dullness; doing it because it should be done, and letting go of the result, is true relinquishment.",
        gyan="Quitting isn't letting go. Keep doing the work; stop gripping the outcome."),
   dict(id='five-causes', label='Five Causes', shape='fivePillars', side='left', frm=13, to=18, title='Five things make every action',
        intro="Every action rests on five causes: the body, the doer, the instruments, the many efforts, and providence (18.14). Whoever thinks the Self alone is the doer doesn't see clearly. Free of \"I am the doer,\" one is not bound.",
        gyan="No outcome is yours alone. Your effort is one pillar of five, so hold credit and blame lightly."),
   dict(id='three-of-everything', label='Three of Everything', shape='gunaPrism', side='right', frm=19, to=40, title='One light, three colours',
        intro="Knowledge, action, the doer, understanding, firmness and happiness each come in three kinds. The best knowledge sees the one undivided in all (18.20); the worst sees everything upside down. The best happiness is like poison at first and nectar in the end (18.37); the passionate kind is the reverse.",
        gyan="If it's sweet now and bitter later, be careful. If it's hard now and sweet later, that's usually the one."),
   dict(id='own-work', label='Your Own Work', shape='workTools', side='left', frm=41, to=48, title='Worship through your work',
        intro="Each person's work flows from their nature, and each can reach perfection through it, by worshipping through that work the One who pervades all (18.46). Better your own path done imperfectly than another's done well. All work has flaws, as all fire has smoke.",
        gyan="Your craft is your practice. Do it well, as an offering, and don't envy someone else's job."),
   dict(id='brahman', label='Becoming Brahman', shape='dropOcean', side='right', frm=49, to=56, title='The drop enters the ocean',
        intro="With a pure understanding, simple living and ego let go, one becomes serene, grieving for nothing and craving nothing, the same to all. From that comes supreme devotion; through devotion one knows him, and knowing him, enters into him at once (18.55).",
        gyan="Peace isn't the absence of work. It's the absence of the one who needs to own it."),
   dict(id='machine', label='The Machine', shape='heartWheel', side='left', frm=57, to=63, title='Reflect, then do as you wish',
        intro="Keep your mind on me and by my grace you'll cross every obstacle. If ego says \"I won't fight,\" your own nature will make you anyway. The Lord sits in every heart, turning all beings as if on a machine (18.61). Then, remarkably, Krishna steps back: \"Reflect on all of it, and do as you wish\" (18.63).",
        gyan="The best teachers give you everything, then let you choose. Freedom is part of the teaching."),
   dict(id='surrender', label='Surrender', shape='refugeHands', side='right', frm=64, to=66, title='Do not grieve',
        intro="And then the most secret word, because Arjuna is dear to him: fix your mind on me, and you will come to me, I promise (18.65). Letting go of all dharmas, take refuge in me alone. I will free you from every sin. Do not grieve (18.66).",
        gyan="Sometimes the last step isn't another effort but letting yourself be held."),
   dict(id='passing-on', label='Passing It On', shape='gitaBook', side='left', frm=67, to=72, title='Whoever teaches this',
        intro="Whoever shares this teaching with those who are ready is dearest to him; whoever studies it worships with knowledge; whoever simply hears it with faith is freed. And then Krishna asks, like any teacher: \"Did you hear it with full attention? Is your confusion gone?\" (18.72).",
        gyan="Teaching is the last step of learning. Pass on what helped you, gently, to those who want it."),
   dict(id='doubts-gone', label='Doubts Gone', shape='victoryBanner', side='right', frm=73, to=78, title='I will do as you say',
        intro="\"My delusion is destroyed. I remember who I am. My doubts are gone. I will do as you say\" (18.73). Sanjaya, still describing it to the blind king, trembles with joy at the memory. Wherever there is Krishna, the lord of yoga, and Arjuna, the archer, there is fortune, victory and right action (18.78).",
        gyan="The Gita began with a man sitting down in despair. It ends with him standing up. Every crisis can end that way."),
  ])

# every chapter with scenes in SECTIONS gets built; its meanings and effects must exist too
chs = {n: chapter_verses(n, getattr(meanings, f'CH{n}'), getattr(fx, f'CH{n}_FX'), KEY_VERSES.get(n, ())) for n in sorted(SECTIONS)}

meta = []
for c in sorted(chapters, key=lambda c: c['chapter_number']):
    n = c['chapter_number']
    m = {'n': n, 'sa': c['name'], 'name': c['name_translation'], 'meaning': c['name_meaning'],
         'verses': c['verses_count'], 'live': n in SECTIONS, 'url': f'/gita/chapter-{n}/'}
    if n in SECTIONS:
        s = SECTIONS[n]
        m.update(subtitle=s['subtitle'], hero_shape=s['hero_shape'], summary=s['summary'],
                 sections=[{**{k: v for k, v in x.items() if k != 'frm'}, 'from': x['frm']} for x in s['sections']])
        covered = sorted(v for x in s['sections'] for v in range(x['frm'], x['to'] + 1))
        assert covered == list(range(1, c['verses_count'] + 1)), ('sections must cover every verse once', n)
    meta.append(m)

os.makedirs(out_dir, exist_ok=True)
for name, obj in [('chapters', meta)] + [(f'chapter-{n}', v) for n, v in chs.items()]:
    with open(os.path.join(out_dir, name + '.json'), 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)
print('chapters', len(meta), '|', ' '.join(f'ch{n}:{len(v)}' for n, v in chs.items()))
last = max(chs)
print(f'speakers ch{last}:', [(v['n'], v['speaker'], v['speaker_at']) for v in chs[last] if 'speaker' in v])

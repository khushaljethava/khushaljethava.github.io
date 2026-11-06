import json, re, sys, os
from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate
sys.path.insert(0, os.path.dirname(__file__))
from meanings import CH1, CH2
from fx import CH1_FX, CH2_FX
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

ch1 = chapter_verses(1, CH1, CH1_FX)
ch2 = chapter_verses(2, CH2, CH2_FX, key_verses=(47,))

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
}

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
for name, obj in [('chapters', meta), ('chapter-1', ch1), ('chapter-2', ch2)]:
    with open(os.path.join(out_dir, name + '.json'), 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)
print('chapters', len(meta), '| ch1', len(ch1), '| ch2', len(ch2))
print('speakers ch1:', sorted({v['speaker'] for v in ch1 if 'speaker' in v}))
print('sample 2.47:', ch2[46]['sa'], ch2[46]['tr'])
print('sample 1.1 :', ch1[0].get('speaker'), ch1[0]['sa'])

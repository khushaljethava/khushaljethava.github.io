# One particle effect per shloka, chosen from what the verse describes.
# Vocabulary: ripple, sink, contract, expand, turbulence, drift, fire, water, sparkle, still, march, clash,
#             spin (a wheel turns), rise (offering smoke), descend (light pours down), ash (burnt away),
#             breathe (slow inhale/exhale), scatter (the restless mind darts), gather (one-pointed mind),
#             thread (pearls on a thread), daynight (Brahma's day and night), veil (maya shimmering)
def spread(*pairs):
    out = {}
    for verses, fx in pairs:
        for v in verses: out[v] = fx
    return out

CH1_FX = spread(
    ([1], 'drift'),                                 # the blind king's uncertain question
    (range(2, 10), 'march'),                        # Duryodhana names warrior after warrior
    ([10], 'expand'),                               # an army beyond measure
    ([11], 'contract'),                             # close ranks around Bhishma
    ([12], 'ripple'),                               # Bhishma's lion-roar conch
    ([13], 'turbulence'),                           # the tumult of drums and horns
    ([14], 'sparkle'),                              # Krishna and Arjuna's divine conches
    (range(15, 19), 'ripple'),                      # Panchajanya, Devadatta, Paundra...
    ([19], 'turbulence'),                           # the sound tears at their hearts
    ([20], 'clash'),                                # weapons about to fly; Arjuna lifts his bow
    ([21, 22], 'drift'),                            # draw the chariot between the armies
    ([23], 'march'),
    ([24, 25], 'drift'),                            # Krishna drives into the middle
    ([26, 27], 'expand'),                           # the whole family comes into view
    ([28], 'sink'),                                 # compassion and sorrow take over
    ([29], 'turbulence'),                           # limbs give way, body trembles
    ([30], 'fire'),                                 # the Gandiva slips; his skin burns
    (range(31, 38), 'sink'),                        # "I want no victory"
    ([38, 39], 'drift'),                            # arguing with himself
    (range(40, 44), 'turbulence'),                  # tradition collapses into disorder
    (range(44, 48), 'sink'),                        # the bow falls; he sinks down
)
CH2_FX = spread(
    ([1], 'water'),                                 # eyes full of tears
    ([2, 3], 'fire'),                               # Krishna's challenge: stand up!
    ([4, 5, 6], 'sink'),
    ([7], 'sparkle'),                               # "I am your disciple": the turning point
    ([8], 'sink'),                                  # grief drying up the senses
    ([9], 'contract'),                              # "I will not fight," and silence
    ([10], 'sparkle'),                              # Krishna smiles
    ([11, 12], 'expand'),                           # no one ever ceases to be
    ([13], 'drift'),                                # childhood, youth, old age
    ([14], 'ripple'),                               # sensations come and go
    ([15], 'still'),
    ([16, 17], 'expand'),
    ([18], 'fire'),                                 # therefore fight
    ([19], 'still'),
    ([20], 'sparkle'),                              # never born, never dies
    ([21], 'still'),
    ([22], 'drift'),                                # bodies changed like clothes
    ([23], 'water'),                                # weapons, fire, water, wind cannot touch it
    ([24, 25], 'still'),
    ([26, 27], 'ripple'),                           # birth and death, round and round
    ([28], 'drift'),
    ([29], 'sparkle'),                              # a wonder
    ([30], 'expand'),
    ([31], 'march'),                                # your own duty
    ([32], 'sparkle'),                              # an open door to heaven
    (range(33, 37), 'sink'),                        # disgrace
    ([37], 'fire'),                                 # rise, determined to fight
    ([38], 'still'),                                # victory and defeat alike
    ([39], 'ripple'),                               # the teaching of yoga begins
    ([40], 'expand'),                               # no effort is ever lost
    ([41], 'contract'),                             # one-pointed resolve
    (range(42, 45), 'turbulence'),                  # flowery words, scattered minds
    ([45], 'expand'),                               # rise above the three qualities
    ([46], 'water'),                                # a land flooded with water
    ([47], 'sparkle'),                              # karmanyevadhikaraste
    ([48], 'still'),                                # evenness of mind is yoga
    ([49], 'contract'),
    ([50], 'sparkle'),                              # yoga is skill in action
    ([51], 'expand'),
    ([52], 'drift'),                                # crossing the swamp of delusion
    ([53], 'still'),
    ([54], 'drift'),                                # Arjuna's question
    ([55, 56, 57], 'still'),
    ([58, 59], 'contract'),                         # the tortoise draws in its limbs
    ([60], 'turbulence'),                           # restless senses carry the mind away
    ([61], 'contract'),
    ([62], 'fire'),                                 # attachment, desire, anger
    ([63], 'turbulence'),                           # delusion, lost memory, ruin
    ([64, 65], 'still'),
    ([66], 'drift'),
    ([67], 'drift'),                                # wind sweeps the boat off course
    ([68], 'contract'),
    ([69], 'expand'),                               # night for all, waking for the sage
    ([70], 'water'),                                # the ocean that rivers keep filling
    ([71], 'still'),
    ([72], 'sparkle'),                              # the peace of Brahman
)
assert sorted(CH1_FX) == list(range(1, 48)) and sorted(CH2_FX) == list(range(1, 73))
CH3_FX = spread(
    ([1, 2], 'drift'),                              # Arjuna confused by two paths
    ([3], 'still'),
    ([4], 'contract'),
    ([5], 'turbulence'),                            # no one is still even for a moment
    ([6], 'sink'),                                  # the hypocrite
    ([7], 'still'),
    ([8], 'march'),                                 # do your work
    ([9], 'rise'),                                  # action as offering
    ([10], 'sparkle'),                              # the Creator's gift
    ([11], 'spin'),                                 # nourish one another
    ([12], 'rise'),
    ([13], 'fire'),                                 # cooking only for oneself
    ([14], 'spin'),                                 # food, rain, sacrifice, action: the wheel
    ([15], 'expand'),
    ([16], 'spin'),                                 # keep the wheel turning
    ([17, 18], 'still'),                            # content in the Self
    ([19], 'march'),
    ([20], 'expand'),                               # lokasangraha
    ([21], 'ripple'),                               # others follow the best
    ([22], 'still'),
    ([23], 'march'),                                # I never stop
    ([24], 'turbulence'),                           # worlds would fall into ruin
    ([25], 'ripple'),
    ([26], 'expand'),
    ([27], 'drift'),                                # "I am the doer"
    ([28], 'still'),
    ([29], 'contract'),
    ([30], 'fire'),                                 # fight, the fever gone
    ([31], 'sparkle'),
    ([32], 'sink'),
    ([33], 'drift'),                                # all follow their nature
    ([34], 'clash'),                                # robbers on the road
    ([35], 'sparkle'),                              # your own dharma
    ([36], 'drift'),
    ([37], 'fire'),                                 # desire and anger
    ([38], 'rise'),                                 # fire covered by smoke
    ([39], 'fire'),                                 # a fire never filled
    ([40], 'turbulence'),
    ([41], 'clash'),
    ([42], 'rise'),                                 # senses, mind, intellect, Self
    ([43], 'clash'),                                # slay the enemy
)
CH4_FX = spread(
    ([1], 'descend'),                               # from the sun down the lineage
    ([2], 'sink'),                                  # lost over time
    ([3], 'sparkle'),
    ([4], 'drift'),
    ([5], 'spin'),                                  # many births
    ([6], 'expand'),
    ([7, 8], 'descend'),                            # yada yada hi dharmasya
    ([9], 'sparkle'),
    ([10], 'still'),
    ([11], 'ripple'),                               # however people come, I receive them
    ([12], 'march'),
    ([13], 'contract'),
    ([14], 'still'),
    ([15], 'march'),
    ([16], 'drift'),
    ([17], 'turbulence'),                           # deep is the way of action
    ([18], 'spin'),                                 # inaction in action: the still hub
    ([19], 'ash'),                                  # actions burned in the fire of knowledge
    ([20], 'still'),
    ([21], 'contract'),
    ([22], 'still'),
    ([23], 'ash'),                                  # all action melts away
    ([24, 25], 'rise'),                             # brahmarpanam
    ([26], 'contract'),
    ([27], 'fire'),
    ([28], 'rise'),
    ([29], 'ripple'),                               # in-breath, out-breath
    ([30], 'rise'),
    ([31], 'sparkle'),
    ([32], 'expand'),
    ([33], 'sparkle'),
    ([34], 'still'),                                # learn by bowing down
    ([35], 'expand'),
    ([36], 'water'),                                # the boat of knowledge
    ([37], 'ash'),                                  # fire turns wood to ashes
    ([38], 'sparkle'),
    ([39], 'still'),
    ([40], 'turbulence'),                           # the doubter perishes
    ([41], 'still'),
    ([42], 'clash'),                                # cut doubt with the sword
)
assert sorted(CH3_FX) == list(range(1, 44)) and sorted(CH4_FX) == list(range(1, 43))
CH5_FX = spread(
    ([1], 'drift'),                                 # which of the two is better?
    ([2, 3], 'still'),
    ([4], 'ripple'),
    ([5], 'gather'),                                # sees the two as one
    ([6], 'march'),
    ([7], 'expand'),                                # the self of all beings
    ([8, 9], 'breathe'),                            # seeing, hearing, breathing... "I do nothing"
    ([10], 'water'),                                # the lotus leaf
    ([11], 'rise'),
    ([12], 'still'),
    ([13], 'contract'),                             # the city of nine gates
    ([14], 'drift'),
    ([15], 'sink'),                                 # knowledge covered by ignorance
    ([16], 'expand'),                               # like the sun
    ([17], 'rise'),
    ([18], 'sparkle'),                              # the equal eye
    ([19, 20], 'still'),
    ([21], 'breathe'),
    ([22], 'sink'),                                 # wombs of sorrow
    ([23], 'turbulence'),                           # the surge of desire and anger
    ([24], 'gather'),                               # lit from within
    ([25], 'sparkle'),
    ([26], 'expand'),
    ([27], 'breathe'),                              # in-breath and out-breath made even
    ([28], 'gather'),
    ([29], 'sparkle'),                              # the friend of all beings
)
CH6_FX = spread(
    ([1], 'march'),
    ([2], 'still'),
    ([3, 4, 5], 'rise'),                            # climbing to yoga; lift yourself
    ([6], 'clash'),                                 # the self as enemy
    ([7, 8], 'still'),
    ([9], 'expand'),
    ([10], 'contract'),                             # seclusion
    ([11], 'still'),                                # the seat
    ([12, 13], 'gather'),                           # one-pointed; gaze at the nose tip
    ([14], 'still'),
    ([15], 'breathe'),
    ([16], 'drift'),                                # not too much, not too little
    ([17], 'breathe'),
    ([18, 19], 'still'),                            # the lamp in a windless place
    ([20], 'breathe'),
    ([21], 'expand'),
    ([22], 'still'),
    ([23], 'sparkle'),
    ([24], 'contract'),
    ([25], 'gather'),                               # little by little
    ([26], 'scatter'),                              # wherever the restless mind wanders
    ([27], 'sparkle'),
    ([28], 'breathe'),
    ([29], 'expand'),                               # the Self in all beings
    ([30], 'sparkle'),
    ([31, 32], 'ripple'),
    ([33, 34], 'scatter'),                          # restless as the wind
    ([35], 'gather'),                               # practice and detachment
    ([36], 'march'),
    ([37], 'drift'),
    ([38], 'sink'),                                 # like a torn cloud
    ([39], 'drift'),
    ([40], 'sparkle'),                              # no one who does good comes to a bad end
    ([41], 'rise'),
    ([42], 'descend'),                              # born again into a family of yogis
    ([43], 'spin'),                                 # striving again
    ([44], 'march'),
    ([45], 'rise'),
    ([46], 'expand'),                               # be a yogi
    ([47], 'sparkle'),
)
assert sorted(CH5_FX) == list(range(1, 30)) and sorted(CH6_FX) == list(range(1, 48))
CH7_FX = spread(
    ([1], 'still'),
    ([2], 'expand'),
    ([3], 'contract'),                              # hardly one in thousands
    ([4], 'expand'),                                # the eightfold nature
    ([5], 'sparkle'),                               # the higher nature, life itself
    ([6], 'spin'),                                  # origin and dissolution
    ([7], 'thread'),                                # pearls on a thread
    ([8], 'water'),                                 # the taste in water
    ([9], 'rise'),                                  # fragrance of earth, brilliance in fire
    ([10], 'gather'),                               # the eternal seed
    ([11], 'march'),                                # the strength of the strong
    ([12, 13], 'veil'),                             # the three qualities delude the world
    ([14], 'veil'),                                 # my maya, hard to cross
    ([15], 'sink'),
    ([16], 'rise'),                                 # four kinds of devotees
    ([17], 'sparkle'),
    ([18], 'gather'),
    ([19], 'expand'),                               # Vasudeva is everything
    ([20], 'drift'),
    ([21], 'still'),
    ([22], 'ripple'),
    ([23], 'sink'),
    ([24, 25], 'veil'),                             # veiled by yogamaya
    ([26], 'spin'),                                 # past, present, to come
    ([27], 'turbulence'),                           # the delusion of opposites
    ([28], 'still'),
    ([29], 'rise'),
    ([30], 'sparkle'),
)
CH8_FX = spread(
    ([1, 2], 'drift'),                              # seven questions
    ([3], 'expand'),                                # the imperishable
    ([4], 'gather'),                                # the lord of sacrifice, in the body
    ([5, 6], 'rise'),                               # what one remembers at the end
    ([7], 'clash'),                                 # remember me, and fight
    ([8], 'gather'),
    ([9], 'sparkle'),                               # smaller than the atom, sun-coloured
    ([10], 'gather'),                               # life-breath between the brows
    ([11], 'still'),
    ([12], 'contract'),                             # closing the gates
    ([13], 'ripple'),                               # Om
    ([14], 'still'),
    ([15], 'expand'),
    ([16], 'spin'),                                 # all worlds return
    ([17, 18, 19], 'daynight'),                     # the day and night of Brahma
    ([20], 'still'),                                # beyond the unmanifest
    ([21], 'sparkle'),
    ([22], 'expand'),
    ([23], 'drift'),
    ([24], 'rise'),                                 # the path of light
    ([25], 'sink'),                                 # the path of smoke, and return
    ([26], 'daynight'),                             # bright and dark, both eternal
    ([27], 'still'),
    ([28], 'sparkle'),
)
assert sorted(CH7_FX) == list(range(1, 31)) and sorted(CH8_FX) == list(range(1, 29))
CH9_FX = spread(
    ([1], 'still'),
    ([2], 'sparkle'),                            # the king of sciences
    ([3], 'sink'),
    ([4], 'expand'),                             # all this pervaded by me
    ([5], 'veil'),                               # behold my divine yoga
    ([6], 'drift'),                              # the wind that rests in space
    ([7], 'gather'),                             # beings return at the end of a cycle
    ([8], 'expand'),                             # and are sent forth again
    ([9], 'still'),                              # sitting as one indifferent
    ([10], 'spin'),                              # the world turns round and round
    ([11, 12], 'sink'),
    ([13], 'sparkle'),
    ([14], 'ripple'),                            # always singing my praise
    ([15], 'expand'),                            # one, distinct, manifold
    ([16], 'rise'),                              # I am the ritual, the ghee, the fire
    ([17], 'ripple'),                            # father, mother, Om
    ([18], 'gather'),                            # the imperishable seed
    ([19], 'water'),                             # I hold back the rain and send it forth
    ([20], 'rise'),                              # the way to heaven
    ([21], 'descend'),                           # merit spent, back to the mortal world
    ([22], 'still'),                             # I carry what they lack
    ([23, 24], 'drift'),
    ([25], 'ripple'),
    ([26], 'sparkle'),                           # a leaf, a flower, a fruit, water
    ([27], 'rise'),                              # do it as an offering
    ([28], 'still'),
    ([29], 'expand'),                            # the same to all
    ([30], 'rise'),                              # even the worst who turns to me
    ([31], 'sparkle'),                           # my devotee never perishes
    ([32, 33], 'expand'),
    ([34], 'gather'),                            # fix your mind on me
)
assert sorted(CH9_FX) == list(range(1, 35))
CH10_FX = spread(
    ([1], 'still'),
    ([2], 'expand'),                             # the source of gods and sages
    ([3], 'sparkle'),
    ([4, 5], 'ripple'),                          # all states of being arise from me
    ([6], 'descend'),                            # the sages born of my mind
    ([7], 'still'),
    ([8], 'expand'),                             # I am the source of everything
    ([9], 'ripple'),                             # always speaking of me
    ([10], 'gather'),
    ([11], 'sparkle'),                           # the lamp of knowledge in the heart
    ([12], 'rise'),                              # Arjuna's praise
    ([13], 'ripple'),
    ([14], 'still'),
    ([15], 'gather'),                            # you alone know yourself
    ([16], 'expand'),
    ([17], 'drift'),                             # how may I know you?
    ([18], 'sparkle'),
    ([19], 'expand'),                            # there is no end to my extent
    ([20], 'gather'),                            # the Self in the heart of all
    ([21], 'sparkle'),                           # the sun among lights, the moon among stars
    ([22], 'ripple'),
    ([23], 'rise'),                              # Meru among mountains
    ([24], 'water'),                             # the ocean
    ([25], 'still'),                             # the Himalaya
    ([26], 'expand'),                            # the ashvattha
    ([27], 'march'),                             # the horse and the elephant
    ([28], 'clash'),                             # the thunderbolt
    ([29], 'water'),                             # Varuna
    ([30], 'rise'),                              # Garuda among birds
    ([31], 'water'),                             # the Ganga among rivers
    ([32, 33], 'spin'),                          # beginning, middle, end; unending time
    ([34], 'sink'),                              # all-devouring death
    ([35], 'sparkle'),                           # flower-bearing spring
    ([36], 'clash'),                             # I am victory
    ([37], 'still'),
    ([38], 'still'),                             # among secrets, silence
    ([39], 'gather'),                            # the seed of all beings
    ([40], 'expand'),
    ([41], 'sparkle'),                           # a spark of my splendour
    ([42], 'still'),                             # holding up the universe with one fragment
)
assert sorted(CH10_FX) == list(range(1, 43))
CH11_FX = spread(
    ([1], 'still'),
    ([2], 'ripple'),
    ([3], 'rise'),                               # I long to see your divine form
    ([4], 'gather'),
    ([5], 'expand'),                             # my forms by the thousands
    ([6], 'sparkle'),
    ([7], 'expand'),                             # the whole universe in my body
    ([8], 'sparkle'),                            # I give you divine sight
    ([9], 'expand'),
    ([10, 11], 'sparkle'),                       # countless mouths and eyes, ornaments
    ([12], 'blaze'),                             # a thousand suns at once
    ([13], 'expand'),
    ([14], 'still'),                             # he bows, hair on end
    ([15, 16], 'expand'),                        # no beginning, middle or end
    ([17], 'blaze'),                             # blazing like fire and sun
    ([18], 'still'),
    ([19], 'blaze'),                             # sun and moon your eyes
    ([20], 'turbulence'),                        # the three worlds tremble
    ([21], 'rise'),
    ([22], 'ripple'),
    ([23, 24], 'turbulence'),                    # I tremble
    ([25], 'vortex'),                            # tusks like the fires of the end of time
    ([26], 'march'),                             # all the warriors
    ([27], 'vortex'),                            # rushing into your mouths
    ([28], 'water'),                             # rivers racing to the ocean
    ([29], 'fire'),                              # moths into the flame
    ([30], 'vortex'),                            # devouring all the worlds
    ([31], 'drift'),                             # tell me who you are
    ([32], 'vortex'),                            # I am Time
    ([33, 34], 'clash'),                         # be merely the instrument
    ([35], 'sink'),
    ([36], 'sparkle'),
    ([37, 38], 'expand'),
    ([39, 40], 'ripple'),                        # salutations on every side
    ([41], 'drift'),                             # "Krishna! Friend!"
    ([42], 'sink'),                              # forgive me
    ([43], 'expand'),
    ([44], 'still'),                             # as a friend with a friend
    ([45], 'drift'),
    ([46], 'gather'),                            # the four-armed form
    ([47], 'sparkle'),
    ([48], 'contract'),
    ([49], 'still'),                             # do not be afraid
    ([50], 'descend'),                           # the gentle form returns
    ([51], 'breathe'),                           # my mind is restored
    ([52], 'sparkle'),
    ([53], 'contract'),
    ([54], 'gather'),                            # by undivided devotion
    ([55], 'sparkle'),
)
assert sorted(CH11_FX) == list(range(1, 56))
CH12_FX = spread(
    ([1], 'drift'),                              # form or the formless?
    ([2], 'gather'),
    ([3], 'expand'),                             # the all-pervading, unthinkable
    ([4], 'still'),
    ([5], 'contract'),                           # the harder path
    ([6], 'rise'),
    ([7], 'rise'),                               # lifted out of the ocean of death
    ([8], 'gather'),                             # fix your mind on me alone
    ([9], 'breathe'),                            # the yoga of practice
    ([10], 'march'),                             # work for me
    ([11], 'drift'),                             # give up the fruits
    ([12], 'still'),                             # peace follows at once
    ([13], 'ripple'),                            # friendly and compassionate
    ([14], 'still'),
    ([15], 'breathe'),                           # not disturbed, not disturbing
    ([16], 'sparkle'),
    ([17], 'breathe'),
    ([18], 'still'),                             # alike to enemy and friend
    ([19], 'drift'),                             # without a fixed home
    ([20], 'sparkle'),                           # the nectar of dharma
)
assert sorted(CH12_FX) == list(range(1, 21))
CH13_FX = spread(
    ([1], 'drift'),                              # nature and the Person, the field and its knower
    ([2], 'still'),                              # this body is the field
    ([3], 'gather'),                             # the knower in all fields
    ([4, 5], 'ripple'),
    ([6], 'expand'),                             # the elements, the senses, the mind
    ([7], 'drift'),
    ([8], 'still'),                              # humility, patience, uprightness
    ([9], 'sink'),                               # birth, death, old age, sickness
    ([10], 'still'),
    ([11], 'contract'),                          # a liking for solitude
    ([12], 'sparkle'),
    ([13, 14], 'expand'),                        # hands and eyes everywhere
    ([15], 'veil'),
    ([16], 'breathe'),                           # far away, and near
    ([17], 'spin'),                              # sustainer, devourer, creator
    ([18], 'blaze'),                             # the light of all lights
    ([19], 'gather'),
    ([20], 'gunas'),                             # the qualities are born of nature
    ([21], 'drift'),
    ([22], 'gunas'),
    ([23], 'still'),                             # the witness
    ([24], 'sparkle'),
    ([25], 'breathe'),                           # some see through meditation
    ([26], 'ripple'),                            # hearing from others
    ([27], 'gather'),                            # the union of field and knower
    ([28], 'still'),                             # the imperishable in the perishing
    ([29], 'expand'),
    ([30], 'still'),                             # the Self is not the doer
    ([31], 'expand'),                            # spreading out from the One
    ([32], 'still'),
    ([33], 'expand'),                            # space is never stained
    ([34], 'sparkle'),                           # the one sun lights the world
    ([35], 'sparkle'),
)
assert sorted(CH13_FX) == list(range(1, 36))
CH14_FX = spread(
    ([1], 'sparkle'),                            # the best of all knowledge
    ([2], 'still'),                              # untroubled at dissolution
    ([3], 'gather'),                             # I place the seed in the womb
    ([4], 'expand'),
    ([5], 'gunas'),                              # goodness, passion, dullness
    ([6], 'sparkle'),                            # goodness illuminates
    ([7], 'fire'),                               # passion, the nature of desire
    ([8], 'sink'),                               # dullness: carelessness, sleep
    ([9, 10], 'gunas'),                          # each overpowers the others
    ([11], 'sparkle'),                           # light through all the gates
    ([12], 'turbulence'),                        # greed, restlessness, craving
    ([13], 'sink'),                              # darkness and inertia
    ([14], 'rise'),                              # to the pure worlds
    ([15], 'drift'),
    ([16, 17], 'gunas'),
    ([18], 'gunas'),                             # upward, middle, downward
    ([19], 'still'),                             # no doer but the qualities
    ([20], 'rise'),                              # beyond birth and death
    ([21], 'drift'),                             # by what marks?
    ([22], 'still'),
    ([23], 'gunas'),                             # only the qualities moving
    ([24], 'still'),                             # clod, stone and gold alike
    ([25], 'breathe'),
    ([26], 'sparkle'),                           # fit to become Brahman
    ([27], 'expand'),
)
assert sorted(CH14_FX) == list(range(1, 28))
CH15_FX = spread(
    ([1, 2], 'invert'),                          # roots above, branches below
    ([3], 'clash'),                              # the axe of detachment
    ([4], 'rise'),
    ([5], 'still'),
    ([6], 'sparkle'),                            # no sun, no moon, no fire lights it
    ([7], 'gather'),                             # an eternal fragment of myself
    ([8], 'drift'),                              # as the wind carries scent
    ([9], 'ripple'),
    ([10], 'veil'),                              # the deluded do not see it
    ([11], 'breathe'),
    ([12], 'blaze'),                             # the light in the sun is mine
    ([13], 'descend'),                           # the nectar-filled moon nourishes the plants
    ([14], 'fire'),                              # the fire of life
    ([15], 'gather'),                            # seated in the hearts of all
    ([16], 'drift'),                             # perishable and imperishable
    ([17], 'expand'),
    ([18], 'sparkle'),                           # Purushottama
    ([19], 'still'),
    ([20], 'sparkle'),
)
assert sorted(CH15_FX) == list(range(1, 21))

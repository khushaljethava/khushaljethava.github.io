# One particle effect per shloka, chosen from what the verse describes.
# Vocabulary: ripple, sink, contract, expand, turbulence, drift, fire, water, sparkle, still, march, clash,
#             spin (a wheel turns), rise (offering smoke), descend (light pours down), ash (burnt away)
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

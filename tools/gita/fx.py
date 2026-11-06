# One particle effect per shloka, chosen from what the verse describes.
# Vocabulary: ripple, sink, contract, expand, turbulence, drift, fire, water, sparkle, still, march, clash
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

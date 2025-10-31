'use client'; // Necessary for useState

import { useState } from 'react';
import * as Tone from 'tone'; // Required Import for ToneJS

export default function Page() {
    const [currentNote, setCurrentNote] = useState('');
    /**
     * duration can be any of the following 
     * Normal note lengths: 1n (whole note), 2n (half note), 4n (quarter note), 8n (eigth), 16n (16th), 32n, 64n
     * Dotted note lengths: 1n. (dotted whole note), 2n., 4n., 8n., 16n., 32n.
     * Triplet note lengths: 1t, 2t, 4t, 8t, 16t, 32t
     * Full measure: 1m, 2m, ...
     */
    const playNote = async (note: string, duration: string = '4n') => {
        await Tone.start(); // must be called before playing anything
        /**
         * .Synth() - uses synthesizer for sound type
         *      There are others (AMSynth(), FMSynth(), MembraneSynth(), etc) but for Synthesizer this prolly sounds best
         * .toDestination() - routes to the user's audio device (necessary to hear the sound from the computer)
         */
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(note, duration); // triggerAttack + Release means start the note and release after duration
        setCurrentNote(note); // Used for printing what note is playing
        setTimeout(() => setCurrentNote(''), 1000); // last arg to specify the amount of time the indication text for the note is up (in ms)
    };


    const playArpeggio = async () => {
        await Tone.start();
        const synth = new Tone.Synth().toDestination();

        const notes = ['C4', 'E4', 'G4', 'C5', 'G4', 'E4', 'C4'];
        const now = Tone.now();

        notes.forEach((note, index) => {
            synth.triggerAttackRelease(note, '16n', now + index * 0.15);
        });
    };


    return (
        <div className="min-h-screen bg-gray-800 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Tone.js Testing</h1>

                    {currentNote && (
                        <div className="mb-6 p-4 bg-green-100 border-2 border-green-400 rounded-lg text-center">
                            <span className="text-2xl font-bold text-green-800">Playing: {currentNote}</span>
                        </div>
                    )}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Single Notes</h2>
                        <div className="flex flex-wrap gap-3">
                            {/* notes used for this test */}
                            {['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'].map((note) => (
                                <button
                                    key={note}
                                    onClick={() => playNote(note)}
                                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
                                >
                                    {note}
                                </button>
                            ))}

                        </div>
                    </section>
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Multiple notes</h2>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={playArpeggio}
                                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
                            >
                                C Major Arpeggio
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
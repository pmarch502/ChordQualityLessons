class KeyDeterminer {
	constructor(chordProContent) {
		this.diatonicChords = new Map ([
			['C', ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bo']],
			['G', ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#o']],
			['D', ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#o']],
			['A', ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#o']],
			['E', ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#o']],
			['B', ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#o']],
			['F#', ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m', 'Fo']],
			['C#', ['C#', 'D#m', 'Fm', 'F#', 'G#', 'A#m', 'Co']],
			['F', ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Eo']],
			['Bb', ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Ao']],
			['Eb', ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'Do']],
			['Ab', ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm', 'Go']],
			['Db', ['Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm', 'Co']],
			['Gb', ['Gb', 'Abm', 'Bbm', 'Cb', 'Db', 'Ebm', 'Fo']],
			['Cb', ['Cb', 'Dbm', 'Ebm', 'Fb', 'Gb', 'Abm', 'Bbo']]
		]);
		this.majorQualities = ['', 'M', 'Maj', '5', '(no3)', 'M7', 'maj7', 'Δ7', 'Δ', '7', 'M9', 'maj9', 'Δ9', '9', 'M11', 'maj11', 'Δ11', '11', 'M13', 'maj13', 'Δ13', '13', '4', 'sus', 'sus4', '2', 'sus2', 'add9', '(add9)', '6', '69', '6/9', '7♯9', '7#9', '7♯9', '7#9', '7♭9', '7b9', 'M7♯11', 'M7#11', 'maj7♯11', 'maj7#11', '7♭13', '7b13'];
		this.minorQualities = ['m', '-', 'mi', 'min', '5', '(no3)', 'm7', '-7', 'min7', 'mM7', 'm(maj7)', '-Δ7', 'mΔ7', 'm9', '-9', 'm11', '-11', 'm13', '-13', 'm6', '-6'];
		this.diminishedQualities = ['°', 'o', 'dim', '°7', 'o7', 'dim7', 'ø7', 'ø', 'm7♭5', 'm7b5', '-7♭5', '-7b5'];
	}

	extractChords(chordProContent) {
		const chords = [];
		const regex = /\[(.*?)\]/g;
		let match;
		while ((match = regex.exec(chordProContent)) !== null) {
			let chord = match[1];
			let end = chord.indexOf('@');
			if(end > 0) {
				chord = chord.substring(0, end);
			}
			chords.push(chord);
		}
		const seen = new Set();
		return chords.filter(item => {
			const key = JSON.stringify(item);
			if (seen.has(key)) return false;
			seen.add(key);
			return true;
		});
	}

	getBasicDiatonic(chord) {
		const bass = chord.split('/')[0];
		const rootMatch = bass.match(/^([A-Ga-g][#b]?)/i);
		if (!rootMatch) {
			return null;
		}
		const rootRaw = rootMatch[1];

		const root = rootRaw[0] + rootRaw.slice(1);
		let suffix = bass.slice(rootMatch[0].length).replace(/♯/g, '#').replace(/♭/g, 'b');
		// Normalize qualities
		const normDim = this.diminishedQualities.map(q => q.replace(/♯/g, '#').replace(/♭/g, 'b'));
		const normMin = this.minorQualities.map(q => q.replace(/♯/g, '#').replace(/♭/g, 'b'));
		const normMaj = this.majorQualities.map(q => q.replace(/♯/g, '#').replace(/♭/g, 'b'));

		// Check diminished
		for (let q of normDim) {
			if (suffix.startsWith(q)) return root + 'o';
		}
		// Check minor
		for (let q of normMin) {
			if (suffix.startsWith(q)) return root + 'm';
		}
		// Default to major
		return root;
	}

	getPowerChordRoot(chord) {
		const bass = chord.split('/')[0];
		const rootMatch = bass.match(/^([A-Ga-g][#b]?)/i);
		if (!rootMatch) return null;
		const rootRaw = rootMatch[1];
		const root = rootRaw[0] + rootRaw.slice(1);
		const suffix = bass.slice(rootMatch[0].length).replace(/♯/g, '#').replace(/♭/g, 'b');
		if (suffix.startsWith('5') || suffix.startsWith('(no3)')) {
			return root;
		}
		return null;
	}

	convertChordsToDiatonics(chordsArray) {
		const diatonicsSet = new Set();
		chordsArray.forEach(chord => {
			let pcr = this.getPowerChordRoot(chord);
			if(pcr !== null) {// special case for 5 chord - could be major or minor
				diatonicsSet.add(pcr);
				diatonicsSet.add(pcr + 'm');
			} else {
				const diatonic = this.getBasicDiatonic(chord);
				if (diatonic) {
					diatonicsSet.add(diatonic);
				}
			}
		});
		return Array.from(diatonicsSet);
	}

	determineKey(chordProContent) {
		// Extract all chords
		let chordsArray = this.extractChords(chordProContent);
		// Convert chords to simple diatonics (major, minor, diminished)
		let diatonicsArray = this.convertChordsToDiatonics(chordsArray);

		// Count matches for key diatonics
		let maxCount = -1;
		let maxCountKey = 'UNKNOWN';
		// For every key's diatonic chord array
		for (const [key, value] of this.diatonicChords) {
			let count = 0;
			// Check every diatonic from the song
			for(let i = 0; i < diatonicsArray.length; i++) {
				let diatonic = diatonicsArray[i];
				// Count the matches
				if (value.includes(diatonic)) {
					count++;
				}
			}
			// Key with most matches wins
			if(count > maxCount) {
				maxCount = count;
				maxCountKey = key;
			}
		}
		return maxCountKey;
	}

	getSongKey(chordProContent) {
		return this.determineKey(chordProContent);
	}
}


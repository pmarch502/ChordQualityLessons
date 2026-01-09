class KeyDeterminer {
	// We use the unicode musical symbols for ♯, ♭, and ° (instead of the plain text #, b, and o).
	// We also use Δ, ø (which have no plain text equivalent)
	// However, we allow for the plain text equivalent for the convenience of the user.

	static diatonicChords = new Map ([
		['C', ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'B°']],
		['G', ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F♯°']],
		['D', ['D', 'Em', 'F♯m', 'G', 'A', 'Bm', 'C♯°']],
		['A', ['A', 'Bm', 'C♯m', 'D', 'E', 'F♯m', 'G♯°']],
		['E', ['E', 'F♯m', 'G♯m', 'A', 'B', 'C♯m', 'D♯°']],
		['B', ['B', 'C♯m', 'D♯m', 'E', 'F♯', 'G♯m', 'A♯°']],
		['F♯', ['F♯', 'G♯m', 'A♯m', 'B', 'C♯', 'D♯m', 'E#°']],
		['C♯', ['C♯', 'D♯m', 'E#m', 'F♯', 'G♯', 'A♯m', 'B#°']],
		['F', ['F', 'Gm', 'Am', 'B♭', 'C', 'Dm', 'E°']],
		['B♭', ['B♭', 'Cm', 'Dm', 'E♭', 'F', 'Gm', 'A°']],
		['E♭', ['E♭', 'Fm', 'Gm', 'A♭', 'B♭', 'Cm', 'D°']],
		['A♭', ['A♭', 'B♭m', 'Cm', 'D♭', 'E♭', 'Fm', 'G°']],
		['D♭', ['D♭', 'E♭m', 'Fm', 'G♭', 'A♭', 'B♭m', 'C°']],
		['G♭', ['G♭', 'A♭m', 'B♭m', 'C♭', 'D♭', 'E♭m', 'F°']],
		['C♭', ['C♭', 'D♭m', 'E♭m', 'F♭', 'G♭', 'A♭m', 'B♭°']]
	]);
	static majorQualities = ['', 'M', 'Maj', '5', '(no3)', 'M7', 'maj7', 'Δ7', 'Δ', '7', 'M9', 'maj9', 'Δ9', '9', 'M11', 'maj11', 'Δ11', '11', 'M13', 'maj13', 'Δ13', '13', '4', 'sus', 'sus4', '2', 'sus2', 'add9', '(add9)', '6', '69', '6/9', '7♯9', '7♭9', 'M7♯11', 'maj7♯11', '7♭13'];
	static minorQualities = ['m', '-', 'mi', 'min', '5', '(no3)', 'm7', '-7', 'min7', 'mM7', 'm(maj7)', '-Δ7', 'mΔ7', 'm9', '-9', 'm11', '-11', 'm13', '-13', 'm6', '-6'];
	static diminishedQualities = ['°', 'dim', '°7', 'dim7', 'ø7', 'ø', 'm7♭5', '-7♭5'];

	static extractChords(chordProContent) {
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
		return [...new Set(chords)];
	}

	static getBasicDiatonic(chord) {
		const bass = chord.split('/')[0];
		const rootMatch = bass.match(/^([A-Ga-g][#b♯♭]?)/i);
		if (!rootMatch) {
			return null;
		}
		const rootRaw = rootMatch[1];

		// Convert from plain ascii to internal standard
		const root = rootRaw.replace(/#/g, '♯').replace(/b/g, '♭');
		let suffix = bass.slice(rootMatch[0].length).replace(/#/g, '♯').replace(/b/g, '♭').replace(/o/g, '°');

		// Check diminished
		for (let q of KeyDeterminer.diminishedQualities) {
			if (suffix.startsWith(q)) return root + '°';
		}
		// Check minor
		for (let q of KeyDeterminer.minorQualities) {
			if (suffix.startsWith(q)) return root + 'm';
		}
		// Check major
		for (let q of KeyDeterminer.majorQualities) {
			if (suffix.startsWith(q)) return root;
		}
		// Default to empty
		return '';
	}

	static getPowerChordRoot(chord) {
		const bass = chord.split('/')[0];
		const rootMatch = bass.match(/^([A-Ga-g][#b♯♭]?)/i);
		if (!rootMatch) return null;
		const rootRaw = rootMatch[1];
		const root = (rootRaw[0] + rootRaw.slice(1)).replace(/#/g, '♯').replace(/b/g, '♭');
		const suffix = bass.slice(rootMatch[0].length);
		if (suffix.startsWith('5') || suffix.startsWith('(no3)')) {
			return root;
		}
		return null;
	}

	static convertChordsToDiatonics(chordsArray) {
		const diatonicsSet = new Set();
		chordsArray.forEach(chord => {
			let pcr = KeyDeterminer.getPowerChordRoot(chord);
			if(pcr !== null) {// special case for 5 chord - could be major or minor
				diatonicsSet.add(pcr);
				diatonicsSet.add(pcr + 'm');
			} else {
				const diatonic = KeyDeterminer.getBasicDiatonic(chord);
				if (diatonic) {
					diatonicsSet.add(diatonic);
				}
			}
		});
		return Array.from(diatonicsSet);
	}

	static #getSongTitle(chordProContent) {
		let start = chordProContent.indexOf('{title:');
		if(start >= 0) {
			let end = chordProContent.indexOf('}', start + 1);
			return chordProContent.substring(start + 7, end).trim();
		}
		return '';
	}

	static determineKey(chordProContent) {
		if (!chordProContent || typeof chordProContent !== 'string') {
			return {"chordsArray": [], "diatonicsArray": [], "maxDiatonicOccurrences": {}, "maxScore": -1, "maxSoreKey": "UNKNOWN"};
		}
		let songTitle = KeyDeterminer.#getSongTitle(chordProContent);
		// Extract all chords
		let chordsArray = KeyDeterminer.extractChords(chordProContent);
		// Convert chords to simple diatonics (major, minor, diminished) - unique set
		let diatonicsArray = KeyDeterminer.convertChordsToDiatonics(chordsArray);
		// Count matches for key diatonics
		let maxScore = -1;
		let maxScoreKey = 'UNKNOWN';
		let maxDiatonicOccurrences = {};
		// For every key's diatonic chord array
		for (const [key, value] of KeyDeterminer.diatonicChords) {
			let score = 0;
			const diatonicOccurrences = {};
			// Track all song chords (not just unique diatonics)
			const allChordsAsBasicDiatonics = chordsArray.map(c => KeyDeterminer.getBasicDiatonic(c));
			allChordsAsBasicDiatonics.forEach((diatonic, index) => {
				if (value.includes(diatonic)) {
					let weight = 1;
					// First/last chord bonuses
					if (index === 0) weight = 2;
					if (index === allChordsAsBasicDiatonics.length - 1) weight = 1.5;
					score += weight;
					diatonicOccurrences[diatonic] = (diatonicOccurrences[diatonic] || 0) + 1;
				} else {
					// Small penalty for non-diatonic
					score -= 0.3;
				}
			});
			// Tie-breaker: prefer keys with I chord present
			if (diatonicOccurrences[key]) score += 0.5;
			if (score > maxScore) {
				maxScore = score;
				maxScoreKey = key;
				maxDiatonicOccurrences = diatonicOccurrences;
			}
		}
		return {"chordsArray": chordsArray, "diatonicsArray": diatonicsArray, "maxDiatonicOccurrences": maxDiatonicOccurrences, "songTitle": songTitle, "maxScore": maxScore, "maxScoreKey": maxScoreKey};
	}
}


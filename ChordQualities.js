class ChordQualities {
	static #SCALE_DEGREES = 0;
	static #PREFERRED = 1;
	static #NAME = 2;
	static #CATEGORY = 3;

	constructor() {
		// symbol: {scale degrees, preferred, name, category}
		this.qualities = new Map ([
			['', ['1-3-5', '', 'Major', 'Triads']],
			['M', ['1-3-5', '', 'Major', 'Triads']],
			['Maj', ['1-3-5', '', 'Major', 'Triads']],
			['m', ['1-♭3-5', 'm', 'Minor', 'Triads']],
			['-', ['1-♭3-5', 'm', 'Minor', 'Triads']],
			['mi', ['1-♭3-5', 'm', 'Minor', 'Triads']],
			['min', ['1-♭3-5', 'm', 'Minor', 'Triads']],
			['°', ['1-♭3-♭5', '°', 'Diminished', 'Triads']],
			['dim', ['1-♭3-♭5', '°', 'Diminished', 'Triads']],
			['+', ['1-3-#5', '+', 'Augmented', 'Triads']],
			['aug', ['1-3-#5', '+', 'Augmented', 'Triads']],
			['+5', ['1-3-#5', '+', 'Augmented', 'Triads']],
			['5', ['1-5', '5', 'Power', 'Triads']],
			['(no3)', ['1-5', '5', 'Power', 'Triads']],
			['M7', ['1-3-5-7', 'M7', 'Major Seventh', 'Sevenths']],
			['maj7', ['1-3-5-7', 'M7', 'Major Seventh', 'Sevenths']],
			['Δ7', ['1-3-5-7', 'M7', 'Major Seventh', 'Sevenths']],
			['Δ', ['1-3-5-7', 'M7', 'Major Seventh', 'Sevenths']],
			['m7', ['1-♭3-5-♭7', 'm7', 'Minor Seventh', 'Sevenths']],
			['-7', ['1-♭3-5-♭7', 'm7', 'Minor Seventh', 'Sevenths']],
			['min7', ['1-♭3-5-♭7', 'm7', 'Minor Seventh', 'Sevenths']],
			['7', ['1-3-5-♭7', '7', 'Dominant Seventh', 'Sevenths']],
			['°7', ['1-♭3-♭5-♭♭7', '°7', 'Diminished Seventh', 'Sevenths']],
			['dim7', ['1-♭3-♭5-♭♭7', '°7', 'Diminished Seventh', 'Sevenths']],
			['ø7', ['1-♭3-♭5-♭7', 'ø7', 'Half-Diminished Seventh', 'Sevenths']],
			['ø', ['1-♭3-♭5-♭7', 'ø7', 'Half-Diminished Seventh', 'Sevenths']],
			['m7♭5', ['1-♭3-♭5-♭7', 'ø7', 'Half-Diminished Seventh', 'Sevenths']],
			['-7♭5', ['1-♭3-♭5-♭7', 'ø7', 'Half-Diminished Seventh', 'Sevenths']],
			['mM7', ['1-♭3-5-7', 'mM7', 'Minor-Major Seventh', 'Sevenths']],
			['m(maj7)', ['1-♭3-5-7', 'mM7', 'Minor-Major Seventh', 'Sevenths']],
			['-Δ7', ['1-♭3-5-7', 'mM7', 'Minor-Major Seventh', 'Sevenths']],
			['mΔ7', ['1-♭3-5-7', 'mM7', 'Minor-Major Seventh', 'Sevenths']],
			['M9', ['1-3-5-7-9', 'M9', 'Major Ninth', 'Extended']],
			['maj9', ['1-3-5-7-9', 'M9', 'Major Ninth', 'Extended']],
			['Δ9', ['1-3-5-7-9', 'M9', 'Major Ninth', 'Extended']],
			['m9', ['1-♭3-5-♭7-9', 'm9', 'Minor Ninth', 'Extended']],
			['-9', ['1-♭3-5-♭7-9', 'm9', 'Minor Ninth', 'Extended']],
			['9', ['1-3-5-♭7-9', '9', 'Dominant Ninth', 'Extended']],
			['M11', ['1-3-5-7-9-11', 'M11', 'Major Eleventh', 'Extended']],
			['maj11', ['1-3-5-7-9-11', 'M11', 'Major Eleventh', 'Extended']],
			['Δ11', ['1-3-5-7-9-11', 'M11', 'Major Eleventh', 'Extended']],
			['m11', ['1-♭3-5-♭7-9-11', 'm11', 'Minor Eleventh', 'Extended']],
			['-11', ['1-♭3-5-♭7-9-11', 'm11', 'Minor Eleventh', 'Extended']],
			['11', ['1-3-5-♭7-9-11', '11', 'Dominant Eleventh', 'Extended']],
			['M13', ['1-3-5-7-9-11-13', 'M13', 'Major Thirteenth', 'Extended']],
			['maj13', ['1-3-5-7-9-11-13', 'M13', 'Major Thirteenth', 'Extended']],
			['Δ13', ['1-3-5-7-9-11-13', 'M13', 'Major Thirteenth', 'Extended']],
			['m13', ['1-♭3-5-♭7-9-11-13', 'm13', 'Minor Thirteenth', 'Extended']],
			['-13', ['1-♭3-5-♭7-9-11-13', 'm13', 'Minor Thirteenth', 'Extended']],
			['13', ['1-3-5-♭7-9-11-13', '13', 'Dominant Thirteenth', 'Extended']],
			['4', ['1-4-5', '4', 'Suspended Fourth', 'Suspended and Added']],
			['sus', ['1-4-5', '4', 'Suspended Fourth', 'Suspended and Added']],
			['sus4', ['1-4-5', '4', 'Suspended Fourth', 'Suspended and Added']],
			['2', ['1-2-5', '2', 'Suspended Second', 'Suspended and Added']],
			['sus2', ['1-2-5', '2', 'Suspended Second', 'Suspended and Added']],
			['add9', ['1-3-5-9', 'add9', 'Added Ninth', 'Suspended and Added']],
			['(add9)', ['1-3-5-9', 'add9', 'Added Ninth', 'Suspended and Added']],
			['6', ['1-3-5-6', '6', 'Sixth', 'Suspended and Added']],
			['m6', ['1-♭3-5-6', 'm6', 'Minor Sixth', 'Suspended and Added']],
			['-6', ['1-♭3-5-6', 'm6', 'Minor Sixth', 'Suspended and Added']],
			['69', ['1-3-5-6-9', '69', 'Six-Nine', 'Suspended and Added']],
			['6/9', ['1-3-5-6-9', '69', 'Six-Nine', 'Suspended and Added']],
			['7alt', ['1-3-[♭5 or #5]-♭7-[♭9 or #9]', '7alt', 'Altered Dominant', 'Altered']],
			['alt', ['1-3-[♭5 or #5]-♭7-[♭9 or #9]', '7alt', 'Altered Dominant', 'Altered']],
			['7#5', ['1-3-#5-♭7', '7#5', 'Seven Sharp Five', 'Altered']],
			['+7', ['1-3-#5-♭7', '7#5', 'Augmented Seventh', 'Altered']],
			['7♭5', ['1-3-♭5-♭7', '7♭5', 'Seven Flat Five', 'Altered']],
			['7#9', ['1-3-5-♭7-#9', '7#9', 'Seven Sharp Nine', 'Altered']],
			['7♭9', ['1-3-5-♭7-♭9', '7♭9', 'Seven Flat Nine', 'Altered']],
			['7♭5♭9', ['1-3-♭5-♭7-♭9', '7♭5♭9', 'Seven Flat Five Flat Nine', 'Altered']],
			['7♭5#9', ['1-3-♭5-♭7#9', '7♭5#9', 'Seven Flat Five Sharp Nine', 'Altered']],
			['7#5♭9', ['1-3-#5-♭7-♭9', '7#5♭9', 'Seven Sharp Five Flat Nine', 'Altered']],
			['7#5#9', ['1-3-#5-♭7-#9', '7#5#9', 'Seven Sharp Five Sharp Nine', 'Altered']],
			['M7#11', ['1-3-5-7-9-#11', 'M7#11', 'Sharp Eleventh', 'Altered']],
			['maj7#11', ['1-3-5-7-9-#11', 'M7#11', 'Sharp Eleventh', 'Altered']],
			['7♭13', ['1-3-5-♭7-9-11-♭13', '7♭13', 'Flat Thirteenth', 'Altered']],
			['M7#5', ['1-3-#5-7', 'M7#5', 'Augmented Major Seventh', 'Altered']],
			['M7+5', ['1-3-#5-7', 'M7#5', 'Augmented Major Seventh', 'Altered']],
			['maj7#5', ['1-3-#5-7', 'M7#5', 'Augmented Major Seventh', 'Altered']],
			['maj7+5', ['1-3-#5-7', 'M7#5', 'Augmented Major Seventh', 'Altered']]
		]);
	}

	isValidSymbol(symbol) {
		return this.qualities.has(symbol);
	}

	getPreferred(symbol) {
		const q = this.qualities.get(symbol);
		return q ? q[ChordQualities.#PREFERRED] : null;
	}

	getScaleDegrees(symbol) {
		const q = this.qualities.get(symbol);
		return q ? q[ChordQualities.#SCALE_DEGREES] : null;
	}

	getName(symbol) {
		const q = this.qualities.get(symbol);
		return q ? q[ChordQualities.#NAME] : null;
	}

	getCategory(symbol) {
		const q = this.qualities.get(symbol);
		return q ? q[ChordQualities.#CATEGORY] : null;
	}

	getPreferreds() {
		const prefs = new Set();
		for (const q of this.qualities.values()) {
			prefs.add(q[ChordQualities.#PREFERRED]);
		}
		return Array.from(prefs);
	}

	getNames() {
		const names = new Set();
		for (const q of this.qualities.values()) {
			names.add(q[ChordQualities.#NAME]);
		}
		return Array.from(names);
	}

	getCategories() {
		const cats = new Set();
		for (const q of this.qualities.values()) {
			cats.add(q[ChordQualities.#CATEGORY]);
		}
		return Array.from(cats);
	}

	getQualities() {
		return Array.from(this.qualities.keys());
	}

	getQualitiesForName(name) {
		const symbols = [];
		for (const [symbol, q] of this.qualities) {
			if (q[ChordQualities.#NAME] === name) {
				symbols.push(symbol);
			}
		}
		return symbols;
	}

	getQualitiesForCategory(category) {
		const symbols = [];
		for (const [symbol, q] of this.qualities) {
			if (q[ChordQualities.#CATEGORY] === category) {
				symbols.push(symbol);
			}
		}
		return symbols;
	}

	getQualitiesObject() {
		return Object.fromEntries(this.qualities);
	}

	toHTMLString() {
		const lines = ['<table>'];
		lines.push('<thead>');
		lines.push('<tr>');
		lines.push('<th>Symbol</th><th>Scale Degrees</th><th>Preferred Symbol</th><th>Name</th><th>Category</th>');
		lines.push('</tr>');
		lines.push('</thead>');
		lines.push('<tbody>');
		for (const [key, value] of this.qualities) {// Map iteration preserves order
			if(value[ChordQualities.#PREFERRED] === key) {
				lines.push('<tr class="preferred">');
				const formattedKey = '<td>' + (key === '' ? "(none)" : key) + '</td>';// Format the key (empty string as '')
				const formattedArray = value.map(item => `<td>${item}</td>`).join('');// Format the array
				lines.push(formattedKey + formattedArray);
			} else {
				lines.push('<tr class="alternative">');
				const formattedKey = '<td class="alternative">' + (key === '' ? "(none)" : key) + '</td>';// Format the key (empty string as '')
				const formattedArray = value.map(item => `<td class="alternative">${item}</td>`).join('');// Format the array
				lines.push(formattedKey + formattedArray);
			}
			lines.push('</tr>');
		}
		lines.push('</tbody>');
		lines.push('</table>');
		return lines.join('\n');
	}
}

function showAllChordQualities() {
	const cq = new ChordQualities();
	const results = document.getElementById('results');
	results.innerHTML = '';
	results.innerHTML += cq.toHTMLString();
}
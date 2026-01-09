class ChordQualities {
	// Static indexes into the qualities map
	static #SCALE_DEGREES = 0;
	static #PREFERRED = 1;
	static #NAME = 2;
	static #CATEGORY = 3;
	// A map of known chord quality symbols pointing to an array of properties:
	// The symbols scale degrees, the preferred symbol, the verbose name, and a general category
	// [symbol => [scale degrees, preferred, name, category]]
	static qualities = new Map ([
		['', ['1-3-5', '', 'Major', 'Triads']],
		['M', ['1-3-5', '', 'Major', 'Triads']],
		['Maj', ['1-3-5', '', 'Major', 'Triads']],
		['m', ['1-♭3-5', 'm', 'Minor', 'Triads']],
		['-', ['1-♭3-5', 'm', 'Minor', 'Triads']],
		['mi', ['1-♭3-5', 'm', 'Minor', 'Triads']],
		['min', ['1-♭3-5', 'm', 'Minor', 'Triads']],
		['°', ['1-♭3-♭5', '°', 'Diminished', 'Triads']],
		['dim', ['1-♭3-♭5', '°', 'Diminished', 'Triads']],
		['+', ['1-3-♯5', '+', 'Augmented', 'Triads']],
		['aug', ['1-3-♯5', '+', 'Augmented', 'Triads']],
		['+5', ['1-3-♯5', '+', 'Augmented', 'Triads']],
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
		['7alt', ['1-3-[♭5 or ♯5]-♭7-[♭9 or ♯9]', '7alt', 'Altered Dominant', 'Altered']],
		['alt', ['1-3-[♭5 or ♯5]-♭7-[♭9 or ♯9]', '7alt', 'Altered Dominant', 'Altered']],
		['7♯5', ['1-3-♯5-♭7', '7♯5', 'Seven Sharp Five', 'Altered']],
		['+7', ['1-3-♯5-♭7', '7♯5', 'Augmented Seventh', 'Altered']],
		['7♭5', ['1-3-♭5-♭7', '7♭5', 'Seven Flat Five', 'Altered']],
		['7♯9', ['1-3-5-♭7-♯9', '7♯9', 'Seven Sharp Nine', 'Altered']],
		['7♭9', ['1-3-5-♭7-♭9', '7♭9', 'Seven Flat Nine', 'Altered']],
		['7♭5♭9', ['1-3-♭5-♭7-♭9', '7♭5♭9', 'Seven Flat Five Flat Nine', 'Altered']],
		['7♭5♯9', ['1-3-♭5-♭7-♯9', '7♭5♯9', 'Seven Flat Five Sharp Nine', 'Altered']],
		['7♯5♭9', ['1-3-♯5-♭7-♭9', '7♯5♭9', 'Seven Sharp Five Flat Nine', 'Altered']],
		['7♯5♯9', ['1-3-♯5-♭7-♯9', '7♯5♯9', 'Seven Sharp Five Sharp Nine', 'Altered']],
		['M7♯11', ['1-3-5-7-9-♯11', 'M7♯11', 'Sharp Eleventh', 'Altered']],
		['maj7♯11', ['1-3-5-7-9-♯11', 'M7♯11', 'Sharp Eleventh', 'Altered']],
		['7♭13', ['1-3-5-♭7-9-11-♭13', '7♭13', 'Flat Thirteenth', 'Altered']],
		['M7♯5', ['1-3-♯5-7', 'M7♯5', 'Augmented Major Seventh', 'Altered']],
		['M7+5', ['1-3-♯5-7', 'M7♯5', 'Augmented Major Seventh', 'Altered']],
		['maj7♯5', ['1-3-♯5-7', 'M7♯5', 'Augmented Major Seventh', 'Altered']],
		['maj7+5', ['1-3-♯5-7', 'M7♯5', 'Augmented Major Seventh', 'Altered']]
	]);

	// Verify this is a recognized symbol (i.e. is a key in the qualities map)
	static isValidSymbol(symbol) {
		return ChordQualities.qualities.has(symbol);
	}

	// Helper function to get a specific property for a symbol
	static #getProperty(symbol, index) {
		const q = ChordQualities.qualities.get(symbol);
		return q ? q[index] : null;
	}

	// Returns the Preferred Symbol for the supplied symbol
	static getPreferred(symbol) {
		return this.#getProperty(symbol, ChordQualities.#PREFERRED);
	}

	// Returns the Scale Degrees for the supplied symbol
	static getScaleDegrees(symbol) {
		return this.#getProperty(symbol, ChordQualities.#SCALE_DEGREES);
	}

	// Returns the Verbose Name for the supplied symbol
	static getName(symbol) {
		return this.#getProperty(symbol, ChordQualities.#NAME);
	}

	// Returns the Category for the supplied symbol
	static getCategory(symbol) {
		return this.#getProperty(symbol, ChordQualities.#CATEGORY);
	}

	// Helper function to get the set of unique values for a specific property
	static #getUniqueValues(index) {
		return [...new Set([...ChordQualities.qualities.values()].map(q => q[index]))];
	}

	// Returns the set of unique Preferred Symbols
	static getPreferreds() {
		return this.#getUniqueValues(ChordQualities.#PREFERRED);
	}

	// Returns the set of unique Verbose Names
	static getNames() {
		return this.#getUniqueValues(ChordQualities.#NAME);
	}

	// Returns the set of unique Categories
	static getCategories() {
		return this.#getUniqueValues(ChordQualities.#CATEGORY);
	}

	// Returns the complete list (array) of recognized chord symbols
	static getQualities() {
		return Array.from(ChordQualities.qualities.keys());
	}

	// Returns the complete list (array) of Symbols for the supplied Verbose Name
	static getQualitiesForName(name) {
		return [...ChordQualities.qualities]
			.filter(([, q]) => q[ChordQualities.#NAME] === name)
			.map(([symbol]) => symbol);
}

	// Returns the complete list (array) of Symbols for the supplied Category
	static getQualitiesForCategory(category) {
		return [...ChordQualities.qualities]
			.filter(([, q]) => q[ChordQualities.#CATEGORY] === category)
			.map(([symbol]) => symbol);
}

	// Returns the qualities map as a plain object
	static getQualitiesObject() {
		return Object.fromEntries(ChordQualities.qualities);
	}

	// Creates a visual representation of the qualities table for display
	static toHTMLString() {
		const lines = ['<table>'];
		lines.push('<thead>');
		lines.push('<tr>');
		lines.push('<th>Symbol</th><th>Scale Degrees</th><th>Preferred Symbol</th><th>Name</th><th>Category</th>');
		lines.push('</tr>');
		lines.push('</thead>');
		lines.push('<tbody>');
		for (const [key, value] of ChordQualities.qualities) {// Map iteration preserves order
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

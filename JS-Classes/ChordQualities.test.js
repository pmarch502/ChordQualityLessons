function runChordQualitiesTests() {
	const results = document.getElementById('results');
	results.innerHTML = '';
	let passed = 0, total = 0;

	function test(cond, msg) {
		total++;
		if (cond) {
			passed++;
			results.innerHTML += `<span style="color: green;">PASS: ${msg}</span><br>`;
		} else {
			results.innerHTML += `<span style="color: red;">FAIL: ${msg}</span><br>`;
		}
	}

	// isValidSymbol
	test(ChordQualities.isValidSymbol('') === true, 'isValidSymbol(\'\')');
	test(ChordQualities.isValidSymbol('m') === true, 'isValidSymbol(\'m\')');
	test(ChordQualities.isValidSymbol('maj7') === true, 'isValidSymbol(\'maj7\')');
	test(ChordQualities.isValidSymbol('foo') === false, 'isValidSymbol(\'foo\')');

	// getPreferred
	test(ChordQualities.getPreferred('') === '', 'getPreferred(\'\')');
	test(ChordQualities.getPreferred('m') === 'm', 'getPreferred(\'m\')');
	test(ChordQualities.getPreferred('M7') === 'M7', 'getPreferred(\'M7\')');
	test(ChordQualities.getPreferred('7') === '7', 'getPreferred(\'7\')');
	test(ChordQualities.getPreferred('sus4') === '4', 'getPreferred(\'sus4\')');
	test(ChordQualities.getPreferred('invalid') === null, 'getPreferred invalid');

	// getScaleDegrees
	test(ChordQualities.getScaleDegrees('') === '1-3-5', 'getScaleDegrees major');
	test(ChordQualities.getScaleDegrees('m') === '1-♭3-5', 'getScaleDegrees minor');
	test(ChordQualities.getScaleDegrees('°') === '1-♭3-♭5', 'getScaleDegrees dim');
	test(ChordQualities.getScaleDegrees('maj7') === '1-3-5-7', 'getScaleDegrees maj7');
	test(ChordQualities.getScaleDegrees('m7') === '1-♭3-5-♭7', 'getScaleDegrees m7');
	test(ChordQualities.getScaleDegrees('sus4') === '1-4-5', 'getScaleDegrees sus4');
	test(ChordQualities.getScaleDegrees('invalid') === null, 'getScaleDegrees invalid');

	// getName
	test(ChordQualities.getName('') === 'Major', 'getName major');
	test(ChordQualities.getName('sus4') === 'Suspended Fourth', 'getName sus4');
	test(ChordQualities.getName('7♯5') === 'Seven Sharp Five', 'getName 7♯5');

	// getCategory
	test(ChordQualities.getCategory('') === 'Triads', 'getCategory triads');
	test(ChordQualities.getCategory('7') === 'Sevenths', 'getCategory sevenths');
	test(ChordQualities.getCategory('maj9') === 'Extended', 'getCategory extended');
	test(ChordQualities.getCategory('7alt') === 'Altered', 'getCategory altered');

	// list methods
	const prefs = ChordQualities.getPreferreds();
	test(prefs.includes('') && prefs.includes('m') && prefs.includes('7alt'), 'getPreferreds uniques');
	test(prefs.length === 38, 'getPreferreds count');

	const names = ChordQualities.getNames();
	test(names.includes('Major') && names.includes('Altered Dominant'), 'getNames');

	const categories = ChordQualities.getCategories();
	test(categories.includes('Triads') && categories.includes('Altered'), 'getCategories');

	const allQ = ChordQualities.getQualities();
	test(allQ.includes('') && allQ.includes('7♭5♭9'), 'getQualities');
	test(allQ.length === 80, 'getQualities length');

	// filter
	const majors = ChordQualities.getQualitiesForName('Major');
	test(majors.length === 3 && majors.includes('M'), 'getQualitiesForName Major');

	const altered = ChordQualities.getQualitiesForCategory('Altered');
	test(altered.length === 18 && altered.includes('7alt'), 'getQualitiesForCategory Altered');

	results.innerHTML += `<br><strong>${passed}/${total} tests passed</strong>`;
}

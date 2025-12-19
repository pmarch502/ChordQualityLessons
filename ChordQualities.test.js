function runChordQualitiesTests() {
	const cq = new ChordQualities();
	const results = document.getElementById('results');
	results.innerHTML = '';
	let passed = 0, total = 0;

	function test(cond, msg) {
		total++;
		if (cond) {
			passed++;
			console.log(`PASS: ${msg}`);
			results.innerHTML += `<span style="color: green;">PASS: ${msg}</span><br>`;
		} else {
			console.error(`FAIL: ${msg}`);
			results.innerHTML += `<span style="color: red;">FAIL: ${msg}</span><br>`;
		}
	}

	// isValidSymbol
	test(cq.isValidSymbol('') === true, 'isValidSymbol(\'\')');
	test(cq.isValidSymbol('m') === true, 'isValidSymbol(\'m\')');
	test(cq.isValidSymbol('maj7') === true, 'isValidSymbol(\'maj7\')');
	test(cq.isValidSymbol('foo') === false, 'isValidSymbol(\'foo\')');

	// getPreferred
	test(cq.getPreferred('') === '', 'getPreferred(\'\')');
	test(cq.getPreferred('m') === 'm', 'getPreferred(\'m\')');
	test(cq.getPreferred('M7') === 'M7', 'getPreferred(\'M7\')');
	test(cq.getPreferred('7') === '7', 'getPreferred(\'7\')');
	test(cq.getPreferred('sus4') === '4', 'getPreferred(\'sus4\')');
	test(cq.getPreferred('invalid') === null, 'getPreferred invalid');

	// getScaleDegrees
	test(cq.getScaleDegrees('') === '1-3-5', 'getScaleDegrees major');
	test(cq.getScaleDegrees('m') === '1-♭3-5', 'getScaleDegrees minor');
	test(cq.getScaleDegrees('°') === '1-♭3-♭5', 'getScaleDegrees dim');
	test(cq.getScaleDegrees('maj7') === '1-3-5-7', 'getScaleDegrees maj7');
	test(cq.getScaleDegrees('m7') === '1-♭3-5-♭7', 'getScaleDegrees m7');
	test(cq.getScaleDegrees('sus4') === '1-4-5', 'getScaleDegrees sus4');
	test(cq.getScaleDegrees('invalid') === null, 'getScaleDegrees invalid');

	// getName
	test(cq.getName('') === 'Major', 'getName major');
	test(cq.getName('sus4') === 'Suspended Fourth', 'getName sus4');
	test(cq.getName('7#5') === 'Seven Sharp Five', 'getName 7#5');

	// getCategory
	test(cq.getCategory('') === 'Triads', 'getCategory triads');
	test(cq.getCategory('7') === 'Sevenths', 'getCategory sevenths');
	test(cq.getCategory('maj9') === 'Extended', 'getCategory extended');
	test(cq.getCategory('7alt') === 'Altered', 'getCategory altered');

	// list methods
	const prefs = cq.getPreferreds();
	test(prefs.includes('') && prefs.includes('m') && prefs.includes('7alt'), 'getPreferreds uniques');
	test(prefs.length === 38, 'getPreferreds count');

	const names = cq.getNames();
	test(names.includes('Major') && names.includes('Altered Dominant'), 'getNames');

	const categories = cq.getCategories();
	test(categories.includes('Triads') && categories.includes('Altered'), 'getCategories');

	const allQ = cq.getQualities();
	test(allQ.includes('') && allQ.includes('7♭5♭9'), 'getQualities');
	test(allQ.length === 80, 'getQualities length');

	// filter
	const majors = cq.getQualitiesForName('Major');
	test(majors.length === 3 && majors.includes('M'), 'getQualitiesForName Major');

	const altered = cq.getQualitiesForCategory('Altered');
	test(altered.length === 18 && altered.includes('7alt'), 'getQualitiesForCategory Altered');

	results.innerHTML += `<br><strong>${passed}/${total} tests passed</strong>`;
	console.log(`${passed}/${total} tests passed`);
}

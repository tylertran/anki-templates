const JAMO_VALUES = {
	initial: {
		'ㄱ': 0,
		'ㄲ': 1,
		'ㄴ': 2,
		'ㄷ': 3,
		'ㄸ': 4,
		'ㄹ': 5,
		'ㅁ': 6,
		'ㅂ': 7,
		'ㅃ': 8,
		'ㅅ': 9,
		'ㅆ': 10,
		'ㅇ': 11,
		'ㅈ': 12,
		'ㅉ': 13,
		'ㅊ': 14,
		'ㅋ': 15,
		'ㅌ': 16,
		'ㅍ': 17,
		'ㅎ': 18
	},
	medial: {
		'ㅏ': 0,
		'ㅐ': 1,
		'ㅑ': 2,
		'ㅒ': 3,
		'ㅓ': 4,
		'ㅔ': 5,
		'ㅕ': 6,
		'ㅖ': 7,
		'ㅗ': 8,
		'ㅘ': 9,
		'ㅙ': 10,
		'ㅚ': 11,
		'ㅛ': 12,
		'ㅜ': 13,
		'ㅝ': 14,
		'ㅞ': 15,
		'ㅟ': 16,
		'ㅠ': 17,
		'ㅡ': 18,
		'ㅢ': 19,
		'ㅣ': 20

	},
	final: {
		'': 0,
		'ㄱ': 1,
		'ㄲ': 2,
		'ㄳ': 3,
		'ㄴ': 4,
		'ㄵ': 5,
		'ㄶ': 6,
		'ㄷ': 7,
		'ㄹ': 8,
		'ㄺ': 9,
		'ㄻ': 10,
		'ㄼ': 11,
		'ㄽ': 12,
		'ㄾ': 13,
		'ㄿ': 14,
		'ㅀ': 15,
		'ㅁ': 16,
		'ㅂ': 17,
		'ㅄ': 18,
		'ㅅ': 19,
		'ㅆ': 20,
		'ㅇ': 21,
		'ㅈ': 22,
		'ㅊ': 23,
		'ㅋ': 24,
		'ㅌ': 25,
		'ㅍ': 26,
		'ㅎ': 27

	},
};

const CONSONANTS = {
	r: { '': 'ㄱ', t: 'ㄳ' },
	R: { '': 'ㄲ' },
	s: { '': 'ㄴ', w: 'ㄵ', g: 'ㄶ' },
	e: { '': 'ㄷ' },
	E: { '': 'ㄸ' },
	f: { '': 'ㄹ', r: 'ㄺ', a: 'ㄻ', q: 'ㄼ', t: 'ㄽ', x: 'ㄾ', v: 'ㄿ', g: 'ㅀ' },
	a: { '': 'ㅁ' },
	q: { '': 'ㅂ' },
	Q: { '': 'ㅃ' },
	t: { '': 'ㅅ' },
	T: { '': 'ㅆ' },
	d: { '': 'ㅇ' },
	w: { '': 'ㅈ' },
	W: { '': 'ㅉ' },
	c: { '': 'ㅊ' },
	z: { '': 'ㅋ' },
	x: { '': 'ㅌ' },
	v: { '': 'ㅍ' },
	g: { '': 'ㅎ' }
};

const VOWELS = {
	k: { '': 'ㅏ' },
	o: { '': 'ㅐ' },
	i: { '': 'ㅑ' },
	O: { '': 'ㅒ' },
	j: { '': 'ㅓ' },
	p: { '': 'ㅔ' },
	u: { '': 'ㅕ' },
	P: { '': 'ㅖ' },
	h: { '': 'ㅗ', k: 'ㅘ', o: 'ㅙ', l: 'ㅚ' },
	y: { '': 'ㅛ' },
	n: { '': 'ㅜ', j: 'ㅝ', p: 'ㅞ', l: 'ㅟ' },
	b: { '': 'ㅠ' },
	m: { '': 'ㅡ', l: 'ㅢ' },
	l: { '': 'ㅣ' }
};

const QWERTY_TRIE = Object.assign({}, CONSONANTS, VOWELS);

// Map of compound jamo to individual characters since Unicode
// normalization (NFD) cannot break them down further
const DECOMP = {
	'ㄳ': ['ㄱ', 'ㅅ'],
	'ㄵ': ['ㄴ', 'ㅈ'],
	'ㄶ': ['ㄴ', 'ㅎ'],
	'ㄺ': ['ㄹ', 'ㄱ'],
	'ㄻ': ['ㄹ', 'ㅁ'],
	'ㄼ': ['ㄹ', 'ㅂ'],
	'ㄽ': ['ㄹ', 'ㅅ'],
	'ㄾ': ['ㄹ', 'ㅌ'],
	'ㄿ': ['ㄹ', 'ㅍ'],
	'ㅀ': ['ㄹ', 'ㅎ'],
	'ㅘ': ['ㅗ', 'ㅏ'],
	'ㅙ': ['ㅗ', 'ㅐ'],
	'ㅚ': ['ㅗ', 'ㅣ'],
	'ㅝ': ['ㅜ', 'ㅓ'],
	'ㅞ': ['ㅜ', 'ㅔ'],
	'ㅟ': ['ㅜ', 'ㅣ'],
	'ㅢ': ['ㅡ', 'ㅣ']
}

const states = {
	// Use strings as values for nicer debugging
	EMPTY: 'empty',            // No characters in the syllable block yet
	INITIAL: 'initial',        // Has an initial consonant
	MEDIAL1: 'first medial',   // INITIAL + 1 medial vowel
	MEDIAL2: 'second medial',  // INITIAL + compound vowel
	FINAL1: 'first final',     // INITIAL + MEDIAL + 1 final consonant
	FINAL2: 'second final',    // INITIAL + MEDIAL + compound final consonant
	SINGLE1: 'singleton1',
	SINGLE2: 'singleton2'
};

// A Unicode precomposed hangul syllable can be calculated if in any of these states
const VALID_SYLLABLE_STATES = [states.MEDIAL1, states.MEDIAL2, states.FINAL1, states.FINAL2];

// TODO: To allow multiple elements on a page have an IME bound to it
let BOUND_ELEMENTS = [];

function makeOnInput() {
	// A stack to manage adding to and deleting from the current syllable
	// as well as to parse into hangul from QWERTY
	let inputHistory = [];
	let state = states.EMPTY;
	let position = 0; // TODO: Use when implementing in the middle of text rather than the end
	let currSyllable = '';

	function resetData() {
		inputHistory = [];
		currSyllable = '';
	}

	function handleEmpty(e) {
		let input = e.data;
		let target = e.target;

		// If adding characters, previous syllable (used to be the current syllable) is erased by the current input
		// and replaced with the new input. Add back in the previous syllable before the new input,
		// then process the new input normally.
		if (e.inputType === 'insertText') {
			target.value = target.value.substring(0, target.value.length - 1) + currSyllable + input;
		}

		resetData();

		if (input in CONSONANTS) {
			state = states.INITIAL;
		}
		else {
			state = states.SINGLE1;
		}
	}

	return function onInput(e) {
		let input = e.data;
		let target = e.target;

		let prevInput = inputHistory[inputHistory.length - 1];
		let inputCombinesWithPrev = QWERTY_TRIE[prevInput] ? input in QWERTY_TRIE[prevInput] : false;

		console.log("Received InpuEvent");
		console.log(e.target.value, currSyllable);

		switch (state) {
			case states.EMPTY:
				if (e.inputType === 'deleteContentBackward') {
					// Nothing special to do here
					return;
				}
				handleEmpty(e);
				break;
			case states.INITIAL:
				if (e.inputType === 'deleteContentBackward') {
					resetData();
					state = states.EMPTY;
					return;
				}
				else if (input in VOWELS) {
					state = states.MEDIAL1;
				}
				else if (inputCombinesWithPrev) {
					state = states.SINGLE2;
				}
				else {
					state = states.EMPTY;
					handleEmpty(e);
				}
				break;
			case states.MEDIAL1:
				if (e.inputType === 'deleteContentBackward') {
					inputHistory.pop();
					state = states.INITIAL;
				}
				else if (inputCombinesWithPrev) {
					state = states.MEDIAL2;
				}
				else if (input in CONSONANTS) {
					state = states.FINAL1;
				}
				else {
					state = states.EMPTY;
					handleEmpty(e);
				}
				break;
			case states.MEDIAL2:
				if (e.inputType === 'deleteContentBackward') {
					inputHistory.pop();
					state = states.MEDIAL1;
				}
				else if (input in CONSONANTS) {
					state = states.FINAL1;
				}
				else {
					state = states.EMPTY;
					handleEmpty(e);
				}
				break;
			case states.FINAL1:
				if (e.inputType === 'deleteContentBackward') {
					inputHistory.pop();
					// Use length of input history to determine whether the medial vowel is a compound vowel or not
					if (inputHistory.length == 2) {
						state = states.MEDIAL1;
					}
					else if (inputHistory.length == 3) {
						state = states.MEDIAL2;
					}
					else {
						console.error("Expected input history to be of size 2 or 3 when deleting from state " + state);
					}
				}
				else if (inputCombinesWithPrev) {
					state = states.FINAL2;
				}
				else {
					state = states.EMPTY;
					handleEmpty(e);
				}
				break;
			case states.FINAL2:
				if (e.inputType === 'deleteContentBackward') {
					inputHistory.pop();
					state = states.FINAL1;
				}
				else {
					state = states.EMPTY;
					handleEmpty(e);
				}
				break;
			case states.SINGLE1:
				if (e.inputType === 'deleteContentBackward') {
					resetData();
					state = states.EMPTY;
					return;
				}
				else if (inputCombinesWithPrev) {
					state = states.SINGLE2;
				}
				else {
					state = states.EMPTY
					handleEmpty(e);
				}
				break;
			case states.SINGLE2:
				if (e.inputType === 'deleteContentBackward') {
					inputHistory.pop();
					state = states.SINGLE1;
				}
				else {
					state = states.EMPTY;
					handleEmpty(e);
				}
				break;
		}

		// Save input to history if user added a character
		if (e.inputType === 'insertText') {
			inputHistory.push(input)
		}

		if (VALID_SYLLABLE_STATES.includes(state)) {
			currSyllable = getPrecomposedSyllable(inputHistory)
		}
		else { // Single character or compound vowel/consonant
			let secondInput = inputHistory[1] ? inputHistory[1] : '';
			currSyllable = QWERTY_TRIE[inputHistory[0]][secondInput];
		}

		console.log(e.target.value, currSyllable);

		// Replace last 2 positions of text (current syllable-in-the-making + English input)
		// 한구 => 한구r => 한국
		if (e.inputType === 'insertText') {
			target.value = target.value.substring(0, target.value.length - 1) + currSyllable;
		}
		else if (e.inputType === 'deleteContentBackward') {
			target.value += currSyllable;
		}
		else {
			console.error("Don't know how to handle " + e.inputType);
		}

		// Highlight current syllable-in-the-making
		target.setSelectionRange(target.value.length - 1, target.value.length);

		console.log(e.target.value, currSyllable);
	};
}

/**
* Calculates the Unicode value of the syllable formed from the given well-formed input.
* @param {Array} [inputHistory] The history of what the user has typed on a QWERTY keyboard for the current syllable.
* @return {String} A Unicode string of the current syllable.
*/
function getPrecomposedSyllable(inputHistory) {
	let blocks = [];

	// Walk through input. If we know for sure the current character can't be part
	// of a compound character, then immediately add it to the blocks list.
	// Otherwise, check if next character forms a compound character with it first.
	for (let i = 0; i < inputHistory.length; ++i) {
		let input = inputHistory[i];
		let trie = QWERTY_TRIE[input];

		let block = trie[''];
		let compoundChar = trie[inputHistory[i + 1]];
		// Check for compound character
		if (compoundChar) {
			block = compoundChar;
			++i; // Skip next input since we know it's part of a compound character
		}

		blocks.push(block);
	}

	if (!(blocks.length == 2 || blocks.length == 3)) {
		console.error("getPrecomposedSyllable(): Syllable should contain either 2 or 3 blocks", blocks);
	}

	// Calculate using formula here:
	// https://en.wikipedia.org/wiki/Korean_language_and_computers#Hangul_in_Unicode
	let unicodeVal = JAMO_VALUES.initial[blocks[0]] * 588 + JAMO_VALUES.medial[blocks[1]] * 28;
	if (blocks.length == 3) {
		unicodeVal += JAMO_VALUES.final[blocks[2]];
	}
	unicodeVal += 44032;

	return String.fromCharCode(unicodeVal);
}

const BINDABLE_ELEMENTS = ['TEXTAREA', 'INPUT'];

function bind(element = {}) {
	if (!BINDABLE_ELEMENTS.includes(element.nodeName)) {
		console.error(
			'Element provided to Wanakana bind() was not a valid input or textarea element.\n Received: '
			+ JSON.stringify(element)
		);
	}
	const onInput = makeOnInput();
	element.setAttribute('lang', 'ko');
	element.setAttribute('autoCapitalize', 'none');
	element.setAttribute('autoCorrect', 'off');
	element.setAttribute('autoComplete', 'off');
	element.setAttribute('spellCheck', 'false');
	element.addEventListener('input', onInput);
}


bind(document.getElementById('input'));
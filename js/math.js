//#region Math

/**
 * Gets the greatest common divisor of a list of numbers.
 * @returns {Number} The greatest common divisor
 * @memberOf math
 * @function
 * @example
 * _$.gcd(12, 4, 8);//Returns 4
 * @param {...Number} arr The numbers to compare
 */
export let gcd = (...ary) => {
	if (ary[0] instanceof Array) {
		return getGCD(ary[0]);
	} else {
		return getGCD([...ary]);
	}

	function getGCD(arr) {
		let min = Math.min(...arr);
		let max = Math.max(...arr);
		if (min == max) {
			return min;
		} else {
			for (let i in arr) {
				if (arr[i] > min) {
					arr[i] = arr[i] - min;
				}
			}
			return getGCD(arr);
		}
	}
};
/**
 * Rounds a number.
 * @memberOf math
 * @example
 * console.log(_$.round(14, 10));//Logs 10 to the console, as 14 rounded to the nearest 10 is 10.
 * @example
 * console.log(_$.round(Math.PI));//Logs 3 to the console.
 * @param {Number} number The number to round.
 * @param {Number} amount An optional multiple to round it to.
 * @returns {Number} The rounded number
 */
export let round = (number = req("number"), amount = 1) =>
	Math.round(number / amount) * amount;
/**
 * Tests if two things are equal, like "thing === thing2" but it also works for dates and objects.
 * @memberOf math
 * @function
 * @example
 * console.assert(new Date() === new Date());//Not equal
 * console.assert(_$.equals(new Date(), new Date()));//Equal!
 * @example
 * console.assert({thing: "Thing!"} === {thing: "Thing!"});//Not equal;
 * console.assert(_$.equals({thing: "Thing!"}, {thing: "Thing!"}))
 * @param {*} a The first thing to test
 * @param {*} b The second thing to test
 */
export let equals = (a = req("any", "a"), b = req("any", "b")) => {
	if (a === b) return true;
	if (_$.typeOf(a) === "RegExp" && _$.typeOf(b) === "RegExp")
		return String(a) === String(b);
	if (a instanceof Date && b instanceof Date)
		return a.getTime() === b.getTime();
	if (!a || !b || (typeof a !== "object" && typeof b !== "object"))
		return a === b;
	if (a.prototype !== b.prototype) return false;
	let keys = Object.keys(a);
	if (keys.length !== Object.keys(b).length) return false;
	return keys.every((k) => equals(a[k], b[k]));
};
/**
 * Tests if a given number is prime.
 * @returns {boolean} Whether the number is prime
 * @memberOf math
 * @function
 * @example
 * _$.isPrime(11);//True
 * _$.isPrime(10);//False
 * @param {Number} num The number to test.
 */
export let isPrime = (num = req("number", "number")) => {
	const boundary = Math.floor(Math.sqrt(num));
	for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
	return num >= 2;
};
/**
 * Gets the factorial of a number given.
 * @memberOf math
 * @function
 * @param {Number} n The number to get the factorial of.
 * @returns {Number}
 * @example
 * _$.factorial(3);//6
 */
export let factorial = (n = req("number")) =>
	n < 0
		? (() => {
				throw new TypeError("Negative numbers are not allowed!");
		  })()
		: n <= 1
		? 1
		: n * factorial(n - 1);
/**
 * Performs the Luhn Check on a number, which is used to validate credit card numbers, IMEI numbers, National Provider Identifier numbers in the United States, Canadian Social Insurance Numbers, Israeli ID Numbers, South African ID Numbers, Greek Social Security Numbers (ΑΜΚΑ), and survey codes appearing on McDonald's, Taco Bell, and Tractor Supply Co. receipts.
 * @example
 *  - _$.luhnCheck('4485275742308327'); // true
    - _$.luhnCheck(6011329933655299); //  false
    - _$.luhnCheck(123456789); // false
 * @param {Number|String} num The number or string to check on.
 * @memberOf math
 * @function
 */
export let luhnCheck = (num = req("String|Number")) => {
	let arr = (num + "")
		.split("")
		.reverse()
		.map((x) => parseInt(x));
	let lastDigit = arr.splice(0, 1)[0];
	let sum = arr.reduce(
		(acc, val, i) =>
			i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9,
		0,
	);
	sum += lastDigit;
	return sum % 10 === 0;
};
/**
 * @callback animateNumCallback
 * @param {Number} num
 * @returns {Number}
 */
/**
 * @callback animateCallback
 * @param {Number} num
 * @param {Number} percent
 * @returns {undefined}
 */
/**
 * Animates a number from one value to another.
 * @function
 * @memberOf math
 * @param {Number} start The initial value of the number in the animation
 * @param {Number} end The final value of the number in the animation
 * @param {Number} duration The duration of the animation in milliseconds
 * @param {animateCallback} callback The callback function to run with the number and the percentage (Between 0 and 1) of the animation.
 * @param {Number} [interval=20] The amount of time to wait between frames in milliseconds.
 * @param {animateNumCallback} [num=(num)=>num] The function to run to manipulate the timing of the animation, for example setting this to (current_number) => current_number **2 would make a simple ease in function. (The value received by this is also between 0 and 1, feel free to use some stuff from _$.ease.FUNCTION_HERE(current_number) to incorporate easy easing!)
 * @example
 * Animates from 50 to 100 over the course of 3 seconds, updating every half second, and writing the current value to the document body.
 * _$.animate(50,100, 3000, (e) => document.body.innerHTML = (Math.round(e)), 500, (num) => _$.ease.easeInOutQuart(num));
 * @returns {Number} A unique number representing the setInterval loop used in the animation.
 */
// prettier-ignore
export let animate = (start = req("Number", "start"), end = req("Number", "end"), duration = req("number", "duration"), callback = req("function", "callback"), interval = 20, num = (num) => num) => {
    var value = start;
    var start_time = Date.now();
    let update = setInterval(() => {
        value = num((Date.now() - start_time) / duration) * (end - start) + start;
        callback(value, num((Date.now() - start_time) / duration));
    }, interval);
    setTimeout(() => {
        clearInterval(update);
        callback(end, 1);
        return;
    }, duration);
    return update
}
/**
 * Returns an array of the whole numbers (inclusive) between the numbers specified.
 * @memberOf math
 * @function
 * @param {Number} start The start value of the array.
 * @param {Number} end The end value of the array.
 * @example
 * console.log(_$.range(-2, 1)); // [-2, -1, 0, 1]
 * @returns {Array.<Number>} An array of whole numbers (inclusive) between the numbers specified.
 */
export let range = (start = req("number", "start"), end = 0) => {
	if (start > end) {
		[start, end] = [end, start];
	}
	return Array(end - start + 1)
		.fill()
		.map((_, idx) => start + idx);
};
/**
 * Generates a unique ID from a seed
 * @function
 * @memberOf math
 * @param {Number|String} [seed=Math.random()] The seed to use.
 * @example
 * console.log(_$.uuid()); // e.g. "863d0193-863d-0193-863d-0193863d0193"
 * @returns {String} The UUID
 */
export let uuid = (seed = Math.random()) => {
	//Magic. Do not touch.
	if (typeof seed === "string") {
		// Convert string to a number between 0 and 1
		seed = _temp.hashString(seed) / 10000000000000000;
	}

	function _p8(s) {
		var p = (seed.toString(16) + "000000000").substr(2, 8);
		return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
	}
	return _p8() + _p8(true) + _p8(true) + _p8();
};
/**
 * Gives an array of prime numbers up to a certain one.
 * @function
 * @memberOf math
 * @param {Number} num - The number to give primes to.
 * @example
 * console.log(_$.primesTo(10)); // [2, 3, 5, 7]
 * @returns {Array.<Number>} Returns an array of prime numbers up to the given number.
 */
export let primesTo = (num = req("number", "number")) => {
	let arr = Array.from({
			length: num - 1,
		}).map((x, i) => i + 2),
		sqroot = Math.floor(Math.sqrt(num)),
		numsTillSqroot = Array.from({
			length: sqroot - 1,
		}).map((x, i) => i + 2);
	numsTillSqroot.forEach(
		(x) => (arr = arr.filter((y) => y % x !== 0 || y === x)),
	);
	return arr;
};
/**
 * Generates a random number between a minimum and maximum number
 * @function
 * @memberOf math
 * @param {Number} min The lowest number that the random value generated can be.
 * @param {Number} max The highest number that the random value generated can be.
 * @param {Boolean} [round=true] Weather to round the generated number
 * @param {Number} [seed=Math.random()] The seed for the generated number (Between 0 and 1).
 * @returns {Number} The random number generated.
 * @example
 * console.log(_$.random(0, 100)); // e.g. 47
 */
export let random = (
	max = req("number", "max"),
	min = req("number", "min"),
	round = true,
	seed = Math.random(),
) => {
	let out = seed * (max - min + 1) + min;
	if (round) {
		out = Math.floor(out);
	}
	return out;
};
/**
 * Get a random number from a seed.
 * @function
 * @memberOf math
 * @param {number} seed The seed to use to generate random numbers.
 * @example
 * console.log(_$.seedRandom(13)); // 0.5663226493634284
 * @returns {Number} The random number from the seed.
 */
export let seedRandom = (seed = req("number", "seed")) => {
	var t = (seed += 0x6d2b79f5);
	t = Math.imul(t ^ (t >>> 15), t | 1);
	t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
	return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/**
 * Formats a number by adding commas to it.
 * @function
 * @memberOf math
 * @param {Number} n The number to format.
 * @example
 * console.log(_$.formatNumber(100000000)); // "100,000,000"
 * @returns {String} The formatted string representation of the number.
 */
export let formatNumber = (n = req("number", "number")) =>
	n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
/**
 * Easing functions
 * @namespace ease
 * @memberOf math
 * @example
 * console.log(_$.ease.easeInOutQuad(.3)); // 0.18 - the eased point of about 1/3 along the animation.
 */
export let ease = {
	// no easing, no acceleration
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	linear: (t = req("number", "percentage")) => t,
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInSine: (t = req("number", "percentage")) =>
		1 - Math.cos((t * Math.PI) / 2),
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutSine: (t = req("number", "percentage")) =>
		Math.sin((t * Math.PI) / 2),
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutSine: (t = req("number", "percentage")) =>
		-(Math.cos(Math.PI * t) - 1) / 2,
	// accelerating from zero velocity
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInQuad: (t = req("number", "percentage")) => t * t,
	// decelerating to zero velocity
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutQuad: (t = req("number", "percentage")) => t * (2 - t),
	// acceleration until halfway, then deceleration
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutQuad: (t = req("number", "percentage")) =>
		t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
	// accelerating from zero velocity
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInCubic: (t = req("number", "percentage")) => t * t * t,
	// decelerating to zero velocity
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutCubic: (t = req("number", "percentage")) => --t * t * t + 1,
	// acceleration until halfway, then deceleration
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutCubic: (t = req("number", "percentage")) =>
		t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
	// accelerating from zero velocity
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInQuart: (t = req("number", "percentage")) => t * t * t * t,
	// decelerating to zero velocity
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutQuart: (t = req("number", "percentage")) =>
		1 - --t * t * t * t,
	// acceleration until halfway, then deceleration
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutQuart: (t = req("number", "percentage")) =>
		t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
	// accelerating from zero velocity
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInQuint: (t = req("number", "percentage")) => t * t * t * t * t,
	// decelerating to zero velocity
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutQuint: (t = req("number", "percentage")) =>
		1 + --t * t * t * t * t,
	// acceleration until halfway, then deceleration
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutQuint: (t = req("number", "percentage")) =>
		t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInExpo: (t = req("number", "percentage")) =>
		t === 0 ? 0 : Math.pow(2, 10 * t - 10),
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutExpo: (t = req("number", "percentage")) =>
		t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutExpo: (t = req("number", "percentage")) =>
		t === 0
			? 0
			: t === 1
			? 1
			: t < 0.5
			? Math.pow(2, 20 * t - 10) / 2
			: (2 - Math.pow(2, -20 * t + 10)) / 2,
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInCirc: (t = req("number", "percentage")) =>
		1 - Math.sqrt(1 - t * t),
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutCirc: (t = req("number", "percentage")) =>
		Math.sqrt(1 - (t - 1) * (t - 1)),
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutCirc: (t = req("number", "percentage")) =>
		t < 0.5
			? 1 - Math.sqrt(1 - 4 * t * t) / 2
			: (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInBack: (t = req("number", "percentage")) =>
		2.70158 * t * t * t - 1.70158 * t * t,
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutBack: (t = req("number", "percentage")) =>
		1 + 2.70158 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2),
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutBack: (t) => {
		const c = 2.5949095;

		return t < 0.5
			? (4 * t * t * ((c + 1) * 2 * t - c)) / 2
			: (Math.pow(2 * t - 2, 2) * ((c + 1) * (t * 2 - 2) + c) + 2) /
					2;
	},
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInElastic: (t = req("number", "percentage")) =>
		t === 0
			? 0
			: t === 1
			? 1
			: -Math.pow(2, 10 * t - 10) *
			  Math.sin(((t * 10 - 10.75) * (2 * Math.PI)) / 3),
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutElastic: (t = req("number", "percentage")) =>
		t === 0
			? 0
			: t === 1
			? 1
			: Math.pow(2, -10 * t) *
					Math.sin(((t * 10 - 0.75) * (2 * Math.PI)) / 3) +
			  1,
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutElastic: (t = req("number", "percentage")) =>
		t === 0
			? 0
			: t === 1
			? 1
			: t < 0.5
			? -(
					Math.pow(2, 20 * t - 10) *
					Math.sin(((20 * t - 11.125) * (2 * Math.PI)) / 4.5)
			  ) / 2
			: (Math.pow(2, -20 * t + 10) *
					Math.sin(((20 * t - 11.125) * (2 * Math.PI)) / 4.5)) /
					2 +
			  1,
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInBounce: (t = req("number", "percentage")) =>
		1 - ease.easeOutBounce(1 - t),
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutBounce: (t = req("number", "percentage")) => {
		const n = 7.5625;
		const d = 2.75;

		if (t < 1 / d) {
			return n * t * t;
		} else if (t < 2 / d) {
			return n * (t -= 1.5 / d) * t + 0.75;
		} else if (t < 2.5 / d) {
			return n * (t -= 2.25 / d) * t + 0.9375;
		} else {
			return n * (t -= 2.625 / d) * t + 0.984375;
		}
	},
	/**
	 * @function
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutBounce: (t = req("number", "percentage")) =>
		t < 0.5
			? (1 - ease.easeOutBounce(1 - 2 * t)) / 2
			: (1 + ease.easeOutBounce(2 * t - 1)) / 2,
};

//#endregion Math

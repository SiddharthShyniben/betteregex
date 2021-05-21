/* eslint-disable unicorn/better-regex */
import {regex} from '../index';

it('should build regexes properly', () => {
	expect(regex``).toStrictEqual(/(?:)/);
	expect(regex`[0-9]`).toStrictEqual(/[0-9]/);
	expect(regex`
		// Here's a comment
		\d+
		/* Look! no escaping slashes anymore */
		\s+
	`).toStrictEqual(/\d+\s+/);

	expect(regex`
		// Here's an interpolation
		${/\d+\s/g}
		/* Here's a nested regex call */
		${regex`.*`}
	`).toStrictEqual(/\d+\s.*/);

	expect(regex`
		// Here's an interpolation

		${true.toString()}

		/* and here's some flags*/
		${'gi'}`).toStrictEqual(/true/gi);

	// Practical example – Look at the difference!
	const anythingInEmailRegex = '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+';

	expect(regex`
		// RFC2822 Email validation

		// Match one or more alphabet, numbers, one of !#$%&'*+/=?^_{|}~-]+ or tildes
		${anythingInEmailRegex}

		// Open group
		(?:
			// Match a dot if any
			\.
			// Same as before
			${anythingInEmailRegex}
		// Close group, match one or more greedy
		)*
		
		// The @
		@
		
		// Open group
		(?:
			// Provider name
			[a-z0-9](?:[a-z0-9-]*[a-z0-9])?
			// The dot
			\.
		// Close group
		)+
		
		/*
			The ending extension
			May not match everything because extensions are (mostly) letters
		*/
		[a-z0-9](?:[a-z0-9-]*[a-z0-9])?
	${'g'}`).toStrictEqual(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
});

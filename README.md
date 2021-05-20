# `betteregex`

![GitHub contributors](https://img.shields.io/github/contributors/SiddharthShyniben/betteregex)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/SiddharthShyniben/betteregex)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/betteregex)
![npm downloads](https://img.shields.io/npm/dt/betteregex)
![License](https://img.shields.io/github/license/SiddharthShyniben/betteregex)
![Code style XO](https://img.shields.io/badge/Code%20style-XO-9cf)
> Credit to @Hashbrown777 on GitHub for the idea and the [original implementation](https://stackoverflow.com/a/60027277/15511745)

`betteregex` is a tool that allows regex pros to do write cleaner, more understandable regexes. Write regexes without worrying about:
- double backslashing (just write `"\d"` instead of `"\\d"`)
- adding whitespace for readability
- adding comments

```js
// Comparing two ways of writing RFC2822-like email validation regex

// The normal way: small but cryptic
const emailRegex = /[a-z\d!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?/g

// The betteregex way: longer but straightforward
const { regex } = require('betteregex')
const anythingAllowedInEmail = '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+';

const emailRegex = regex`
	// Match one or more alphabet, numbers, one of allowed special characters or tildes
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
		// Provider name (gmail etc.)
		[a-z0-9](?:[a-z0-9-]*[a-z0-9])?
		// The dot
		\.
	// Close group
	)+
	
	/*
		The ending extension
		May not match everything becauseextensions are (mostly) letters
	*/
	[a-z0-9](?:[a-z0-9-]*[a-z0-9])?
${'g'}`
```

## Prerequisites

Before you begin, make sure you have installed [NodeJS](https://nodejs.org).

## Installation

Install using `npm`:

```console
$ npm i betteregex
```

## Usage

```js
const {regex} = require("betteregex")

const exp = regex`
	// Your regex here
	// Example:
	\d+\w\s

	.*
`
```

_For more info, read the [documentation](https://github.com/SiddharthShyniben/betteregex/wiki)_

## License

THis project is licensed under [GNU GPL 3.0](./LICENSE)
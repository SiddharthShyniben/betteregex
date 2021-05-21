/**
 * Betteregex: write better, more understandable regexes
 * Copyright (C) 2021  Siddharth Shyniben
 * Credit to @Hashbrown777 on GitHub for the idea and
 * the original implementation <https://stackoverflow.com/a/60027277/15511745>
 * This implementation has been modified a little bit
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Clean a string (remove comments, whitespace, etc.)
 * @param piece the string to clean
 * @returns {string} th cleaned string
 */
export function clean(piece: string): string {
	// Funny how we don't use our own functions to build our own regexes
	return piece
		// Get rid of any escaped (`) tildes
		.replace('\\`', '`')
		// Get rid of multiline comments
		.replace(/((^|\n)(?:[^/\\]|\/[^*/]|\\.)*?)\s*\/\*(?:[^*]|\*[^/])*(\*\/|)/g, '$1')
		// Get rid of single line comments
		.replace(/((^|\n)(?:[^/\\]|\/[^/]|\\.)*?)\s*\/\/[^\n]*/g, '$1')
		// Get rid of any remaining whitespace
		.replace(/\n\s*/g, '');
}

/**
 * Parse an object to make it embeddable within an object
 * @param interpol the interpolation to parse5
 * @returns {string} The stringified regex
 */
function parse(interpol: any): string {
	if (interpol instanceof RegExp) return interpol.source;
	else return interpol.toString()
}

/**
 * Convert a string to a regex
 * @param param0 The template strings array
 * @param interpolations the interpolations
 * @returns {RegExp} The parsed regex
 */
export function regex({raw}: TemplateStringsArray, ...interpolations: any[]): RegExp {
	const flags: string | undefined = raw[raw.length - 1] ? undefined : interpolations.pop();
	/* eslint-disable-next-line unicorn/no-array-reduce */
	return new RegExp(interpolations.reduce(
		(regexp, insert, index) => {
			return `${regexp}${parse(insert)}${clean(raw[index + 1])}`;
		},
		clean(raw[0])
	), flags);
}
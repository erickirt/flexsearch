import { EncoderOptions } from "../../type.js";

export const soundex = new Map([["b", "p"], ["v", "f"], ["w", "f"], ["z", "s"], ["x", "s"], ["d", "t"], ["n", "m"], ["c", "k"], ["g", "k"], ["j", "k"], ["q", "k"], ["i", "e"], ["y", "e"], ["u", "o"]]);

/** @type EncoderOptions */
const options = {

   mapper: soundex
};
export default options;
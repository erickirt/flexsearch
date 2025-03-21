import { EncoderOptions } from "../../type.js";
// non ascii control chars 0-31
const regex = /[\x00-\x7F]+/g;
const split = /\s+/;

/** @type EncoderOptions */
const options = {
    // the string is already encoded as RTL by default
    //rtl: true,
    normalize: false,
    dedupe: true,
    prepare: function(str){
        return ("" + str).replace(regex, " ")
    }
};
export default options;

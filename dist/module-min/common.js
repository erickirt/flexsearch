export function merge_option(a,b,c){const d=typeof c,e=typeof a;if("undefined"!=d){if("undefined"!=e){if(c){if("function"==e&&d==e)return function(b){return a(c(b))};const b=a.constructor,f=c.constructor;if(b===f){if(b===Array)return c.concat(a);if(b===Map){const b=new Map(c);for(const c of a){const a=c[0],d=c[1];b.set(a,d)}return b}if(b===Set){const b=new Set(c);for(const c of a.values())b.add(c);return b}}}return a}return c}return"undefined"==e?b:a}export function create_object(){return Object.create(null)}export function concat(a){return[].concat.apply([],a)}export function sort_by_length_down(c,a){return a.length-c.length}export function sort_by_length_up(c,a){return c.length-a.length}export function is_array(a){return a.constructor===Array}export function is_string(a){return"string"==typeof a}export function is_object(a){return"object"==typeof a}export function is_function(a){return"function"==typeof a}export function toArray(a,b){const c=[];for(const d of a.keys())c.push(b?""+d:d);return c}export function parse_simple(a,b){if(is_string(b))a=a[b];else for(let c=0;a&&c<b.length;c++)a=a[b[c]];return a}export function get_max_len(a){let b=0;for(let c,d=0;d<a.length;d++)(c=a[d])&&b<c.length&&(b=c.length);return b}
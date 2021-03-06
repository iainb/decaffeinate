import PatchError from '../../src/utils/PatchError.js';
import stripSharedIndent from '../../src/utils/stripSharedIndent.js';
import { convert } from '../../dist/decaffeinate.cjs.js';
import { strictEqual } from 'assert';

export default function check(source, expected) {
  if (source[0] === '\n') { source = stripSharedIndent(source); }
  if (expected[0] === '\n') { expected = stripSharedIndent(expected); }

  try {
    let converted = convert(source);
    strictEqual(converted.code, expected);
  } catch (err) {
    if (PatchError.isA(err)) {
      console.error(PatchError.prettyPrint(err));
    }
    throw err;
  }
}

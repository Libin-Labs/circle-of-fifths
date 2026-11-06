import { keySignature, fifthPitch } from '@lp-labs/circle-of-fifths';
if (keySignature(2).tonic !== 'D' || fifthPitch(1) !== 7) throw new Error('Key');
// @ts-expect-error invalid argument must be rejected by declarations
keySignature('2');

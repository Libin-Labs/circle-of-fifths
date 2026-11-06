# @lp-labs/circle-of-fifths

Fifth-cycle pitch classes and conventional key signatures.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/circle-of-fifths
```

## Working example

```js
import { keySignature, fifthPitch } from '@lp-labs/circle-of-fifths';
if (keySignature(2).tonic !== 'D' || fifthPitch(1) !== 7) throw new Error('Key');
```

CommonJS: `const api = require('@lp-labs/circle-of-fifths')`.

## Behavior, customization and limits

fifthPitch(steps,rootPitchClass=0) wraps root+7steps modulo12, steps safe integer +/-1e6; keySignature(fifths,minor=false) supports conventional -7..7, returns tonic, accidentals count, kind flat/sharp/natural, ordered notes with accidental. Relative minor lowers tonic3semitones while preserving signature. Uses standard enharmonic spellings, not modes, key inference or modulation planner. O(7).

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function fifthPitch(steps: number, rootPitchClass?: number): number;
export interface KeySignature {
  tonic: string;
  accidentals: number;
  kind: 'flat' | 'sharp' | 'natural';
  notes: string[];
}
export declare function keySignature(fifths: number, minor?: boolean): KeySignature;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.

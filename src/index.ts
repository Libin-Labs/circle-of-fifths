function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
export function fifthPitch(steps: number, rootPitchClass = 0): number {
  integer(steps, -1e6, 1e6);
  integer(rootPitchClass, 0, 11);
  return (((rootPitchClass + 7 * steps) % 12) + 12) % 12;
}
export interface KeySignature {
  tonic: string;
  accidentals: number;
  kind: 'flat' | 'sharp' | 'natural';
  notes: string[];
}
const majors = ['Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#'],
  minors = ['Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#'];
export function keySignature(fifths: number, minor = false): KeySignature {
  integer(fifths, -7, 7);
  if (typeof minor !== 'boolean') throw new TypeError('Expected boolean');
  const sharp = fifths > 0,
    notes = sharp
      ? ['F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#']
      : ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'];
  return {
    tonic: (minor ? minors : majors)[fifths + 7]!,
    accidentals: Math.abs(fifths),
    kind: fifths === 0 ? 'natural' : sharp ? 'sharp' : 'flat',
    notes: notes.slice(0, Math.abs(fifths)),
  };
}

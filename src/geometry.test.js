import {rectOverlap} from './geometry';

it('sample', () => {
    const A = {x: 0, y: 0, width: 500, height: 500};
    const B = {x: -50, y: -50, width: 50, height: 50};

    expect(rectOverlap(A, B)).toBe(true);
});



it('sample', () => {
    const A = {x: 0, y: 0, width: 500, height: 500};
    const B = {x: -51, y: -51, width: 50, height: 50};

    expect(rectOverlap(A, B)).toBe(false);
});
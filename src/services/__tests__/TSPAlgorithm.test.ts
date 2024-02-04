import TSPAlgorithm from '../TSPAlgorithm';
import fixture from '../../../test/fixtures/algoData.json';
import fixture2 from '../../../test/fixtures/algoData2.json';

describe('Tests the TSP algorithm', () => {
    it('returns the correct result', () => {
        const result = TSPAlgorithm.doTSP(fixture);
        expect(result.length).toBe(4);
    });

    it('returns the correct result when there\'s more data', () => {
        const result = TSPAlgorithm.doTSP(fixture2);
        expect(result.length).toBe(16);
    });
});
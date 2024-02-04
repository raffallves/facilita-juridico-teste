import salesman, { Point } from 'salesman.js';
import { ClientDTO } from './ClientDataMapper';

interface ItineraryData {
    id: string,
    name: string,
    coordinates: string,
    distance: string
}

export default class TSPAlgorithm {
    public static doTSP(data: ClientDTO[]): ItineraryData[] {
        const points = this.toPointData(data);
        
        const result = salesman.solve(points, 0.99999);

        return result.map((index: number) => {
            const adjustedIndex = index - 1;

            if (adjustedIndex === -1) {
                return {
                    id: '0',
                    name: 'Empresa',
                    coordinates: '(0, 0)',
                    distance: '0 Km'
                }
            }

            return {
                id: data[adjustedIndex].id,
                name: data[adjustedIndex].name,
                coordinates: `(${data[adjustedIndex].location.x}, ${data[adjustedIndex].location.y})`,
                distance: `${this.calculatePointDistance({ x: 0, y: 0 }, data[adjustedIndex].location)} Km`
            }
        });
        ;
    }

    private static toPointData(raw: ClientDTO[]): Point[] {
        const pointData = [];
        const firstPoint = new salesman.Point(0, 0);
        pointData.push(firstPoint);
    
        raw.map((point: ClientDTO) => {
            return pointData.push(new salesman.Point(point.location.x, point.location.y))
        });
    
        return pointData;
    }

    private static calculatePointDistance(point1: ClientDTO['location'], point2: ClientDTO['location']): string {
        return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)).toFixed(1);
    }
}
import { spawn } from 'child_process';

interface PointData {
    id: string,
    point: { x: Number, y: Number }
}

export default class TSPAlgorithm {
    public static doTSP(data: any) {
        const processedData = this.toPointData(data);
        const pythonProcess = spawn(
            'py', 
            [
                'C:/Users/Rafael/Desktop/facilita-juridico-teste/tspAlgorithm.py',
                JSON.stringify(processedData)
            ]
        );

        pythonProcess.stdout.on('data', (data: Buffer) => {
            const result = data.toString('utf-8');
            console.log(result);
        });
        
        pythonProcess.stderr.on('data', (data: Buffer) => {
            console.error(`Error: ${data.toString('utf-8')}`);
        });
    }
    private static toPointData(raw: any): PointData[] {
        return raw.map((point: any) => {
            return {
                id: point.id, 
                point: { 
                    x: point.location.x, 
                    y: point.location.y 
                }
            }
        });
    }
}
import networkx as nx
import sys
import json

def calculate_distance(point1, point2):
    return ((point1['point']['x'] - point2['point']['x'])**2 + (point1['point']['y'] - point2['point']['y'])**2)**0.5

def solve_tsp(points):
    G = nx.Graph()

    for point in points:
        G.add_node(point['id'], pos=point['point'])

    for i in range(len(points)):
        for j in range(i + 1, len(points)):
            distance = calculate_distance(points[i], points[j])
            G.add_edge(points[i]['id'], points[j]['id'], weight=distance)

    # Using the approximation algorithm (more efficient)
    tsp_path = nx.approximation.traveling_salesman_problem(G, weight='weight', cycle=True)

    return tsp_path

if __name__ == "__main__":
    input_points = sys.argv[1]
    points = json.loads(input_points)
    print(solve_tsp(points))

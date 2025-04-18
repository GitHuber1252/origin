import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Stage, Layer, Text, Image, Line } from 'react-konva';
import './App.css';

const Instruction = () => {
    return (
        <div className="page-content">
            <h1>Инструкция</h1>
            <p>Здесь будет ваша инструкция.</p>
        </div>
    );
};

const BuildingPlan = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleButtonClick = (num) => {
        setSelectedImage(num);
    };

    return (
        <div className="page-content">
            <h1>План здания</h1>
            <div>
                {[...Array(7)].map((_, index) => (
                    <button key={index} onClick={() => handleButtonClick(index)}>
                        {index}
                    </button>
                ))}
            </div>
            {selectedImage !== null && (
                <div>
                    <h2>Выбранное изображение:</h2>
                    <img
                        src={`${process.env.PUBLIC_URL}/${selectedImage}.png`}
                        alt={`Изображение ${selectedImage}`}
                        style={{ width: '400px', height: 'auto' }}
                    />
                </div>
            )}
        </div>
    );
};

const initialRoomCoordinates = [
    // Пустой элемент для индекса 0 (не используется)
    {},

    // 0 этаж (ключи 0-8)
    {
        0: { x: 10, y: 35 },
        1: { x: 40, y: 35 },
        2: { x: 67, y: 35 },
        3: { x: 92, y: 35 },
        4: { x: 10, y: 70 },
        5: { x: 40, y: 70 },
        6: { x: 67, y: 70 },
        7: { x: 92, y: 70 },
        8: { x: 55, y: 35 }, // Лестница


        // 1 этаж (ключи 9-17)

        9: { x: 10, y: 37 },
        10: { x: 37, y: 37 },
        11: { x: 57, y: 37 },
        12: { x: 87, y: 37 },
        13: { x: 10, y: 67 },
        14: { x: 37, y: 67 },
        15: { x: 57, y: 67 },
        16: { x: 87, y: 67 },
        17: { x: 47, y: 37 },// Лестница


        // 2 этаж (ключи 18-26)

        18: { x: 10, y: 35 },
        19: { x: 40, y: 35 },
        20: { x: 67, y: 35 },
        21: { x: 92, y: 35 },
        22: { x: 10, y: 60},
        23: { x: 40, y: 60 },
        24: { x: 67, y: 60 },
        25: { x: 92, y: 60 },
        26: { x: 50, y: 60 }, // Лестница


        // 3 этаж (ключи 27-35)

        27: { x: 10, y: 30},
        28: { x: 40, y: 30},
        29: { x: 57, y: 30 },
        30: { x: 92, y: 30 },
        31: { x: 10, y: 60 },
        32: { x: 40, y: 60 },
        33: { x: 57, y: 60 },
        34: { x: 92, y: 60 },
        35: { x: 52, y: 60 }, // Лестница


        // 4 этаж (ключи 36-44)

        36: { x: 30, y: 25 },
        37: { x: 75, y: 25 },
        38: { x: 30, y: 70 },
        39: { x: 75, y: 70 },
        40: { x: 30, y: 25 },
        41: { x: 30, y: 25 },
        42: { x: 30, y: 25 },
        43: { x: 30, y: 25 },
        44: { x: 80, y: 70 }, // Лестница


        // 5 этаж (ключи 45-53)

        45: { x: 10, y: 30 },
        46: { x: 40, y: 30 },
        47: { x: 67, y: 30 },
        48: { x: 92, y: 30 },
        49: { x: 10, y: 65 },
        50: { x: 40, y: 65 },
        51: { x: 67, y: 65 },
        52: { x: 92, y: 65 },
        53: { x: 52, y: 65 }, // Лестница

        // 6 этаж (ключи 54-62)

        54: { x: 40, y: 50 },
        55: { x: 80, y: 50 },
        56: { x: 40, y: 10 },
        57: { x: 60, y: 10 },
        58: { x: 20, y: 30 },
        59: { x: 40, y: 30 },
        60: { x: 60, y: 30 },
        61: { x: 20, y: 50 },
        62: { x: 80, y: 70 } // Лестница
    },
];
const predefinedPaths = {
    "4-5": [

        [10,70],
        [10, 35],
        [40,35 ],
        [40,70],

        // Координаты точек 2 и 3 из initialRoomCoordinates
    ],
    // Добавьте другие специальные маршруты по мере необходимости
    "5-4": [
        [40,70],
        [40, 35],
        [10, 35],
        [10,70] ,
        // Обратный маршрут
    ],
    "6-5": [

        [67,70],
        [67, 35],
        [40,35 ],
        [40,70],

        // Координаты точек 2 и 3 из initialRoomCoordinates
    ],
    // Добавьте другие специальные маршруты по мере необходимости
    "5-6": [
        [40,70],
        [40, 35],
        [67, 35],
        [67,70] ,
        // Обратный маршрут
    ],

    "4-6": [

        [10,70],
        [10, 35],
        [40,35 ],
        [67,35],
        [67,70],

        // Координаты точек 2 и 3 из initialRoomCoordinates
    ],
    // Добавьте другие специальные маршруты по мере необходимости
    "6-4": [
        [67,70],
        [67, 35],
        [40, 35],
        [10, 35],
        [10,70] ,
        // Обратный маршрут
    ],
    "4-7": [

        [10,70],
        [10, 35],
        [40,35 ],
        [67,35],
        [92,35],
        [92,70],

        // Координаты точек 2 и 3 из initialRoomCoordinates
    ],
    // Добавьте другие специальные маршруты по мере необходимости
    "7-4": [
        [92,70],
        [92,35],
        [67, 35],
        [40, 35],
        [10, 35],
        [10,70] ,
        // Обратный маршрут
    ],
    // Ключ в формате "startKey-endKey": [массив точек маршрута]
    "7-6": [

        [67,70],
        [67, 35],
        [92,35 ],
        [92,70],

        // Координаты точек 2 и 3 из initialRoomCoordinates
    ],
    // Добавьте другие специальные маршруты по мере необходимости
    "6-7": [
        [92,70],
        [92, 35],
        [67, 35],
        [67,70] ,
        // Обратный маршрут
    ],
    "14-13": [

        [10,67],
        [10, 37],
        [37,37 ],
        [37,67],
        // Координаты точек 2 и 3 из initialRoomCoordinates
    ],
    // Добавьте другие специальные маршруты по мере необходимости
    "13-14": [
        [37,67],
        [37,37 ],
        [10, 37],
        [10,67],
        // Обратный маршрут
    ],
    "14-15": [

        [57,67],
        [57, 37],
        [37,37 ],
        [37,67],
        // Координаты точек 2 и 3 из initialRoomCoordinates
    ],
    // Добавьте другие специальные маршруты по мере необходимости
    "15-14": [
        [37,67],
        [37,37 ],
        [ 57, 37],
        [57,67],
        // Обратный маршрут
    ],
    "15-16": [
        [57,67],
        [57,37],

        [87,37 ],
        [87,67],
        // Координаты точек 2 и 3 из initialRoomCoordinates
    ],
    // Добавьте другие специальные маршруты по мере необходимости
    "16-15": [
        [87,67],

        [ 87, 37],
        [57,37],
        [57,67]
        // Обратный маршрут
    ],


};
const priorityPoints = [
    { x: 10, y: 37 },
    {x:57, y:30},
    {x:57, y:60},
    {x:87, y : 37},
    {x: 80, y: 50},
    {x:57, y : 37},
    {x:37, y : 37},
    {x:67, y:35},

    {x:92, y :35}

    // здесь добавляй приоритетные точки
];

const isPriorityPoint = (point) => {
    return priorityPoints.some(p => p.x === point.x && p.y === point.y);
};

const isIntermediatePriority = (point, start, end) => {
    return isPriorityPoint(point)
        && !(point.x === start.x && point.y === start.y)
        && !(point.x === end.x && point.y === end.y);
};

const heuristic = (a, b, start, end) => {
    const baseDistance = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    const bonus = isIntermediatePriority(a, start, end) ? -17 : 0; // приоритет
    return baseDistance + bonus;
};

const Navigation = ({ currentCoordinates: initialCoordinates }) => {
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [value, setValue] = useState('');
    const [currentCoordinates, setCurrentCoordinates] = useState(initialCoordinates);
    const [roomCoordinatesList, setRoomCoordinatesList] = useState(initialRoomCoordinates);
    useEffect(() => {
        if (field1) {
            const roomNumber = Math.floor(Number((field1) % 1000 /100)) ;
            const floorIndex = Math.floor(roomNumber ) ;

            // Проверяем, что индекс в пределах массива
            if (floorIndex > 0 && floorIndex < roomCoordinatesList.length) {
                setCurrentCoordinates(roomCoordinatesList[floorIndex]);
            }
        }
    }, [field1]);




    const getNeighbors = (node) => {
        const directions = [
            { x: 45, y: 0 }, { x: -45, y: 0 },
            { x: 0, y: 45}, { x: 0, y: -45 },
            { x: 40, y: 0 }, { x: -40, y: 0 },
            { x: 0, y: 40}, { x: 0, y: -40 },
            { x: 35, y: 0 }, { x: -35, y: 0 },
            { x: 0, y: 35 }, { x: 0, y: -35 },
            { x: 30, y: 0 }, { x: -30, y: 0 },
            { x: 0, y: 30 }, { x: 0, y: -30 },
            { x: 25, y: 0 }, { x: -25, y: 0 },
            { x: 0, y: 25 }, { x: 0, y: -25 },
            { x: 20, y: 0 }, { x: -20, y: 0 },
            { x: 0, y: 20 }, { x: 0, y: -20 },
            { x: 10, y: 0 }, { x: -10, y: 0 },
            { x: 0, y: 10 }, { x: 0, y: -10 },
            { x: 12, y: 0 }, { x: -12, y: 0 },
            { x: 0, y: 12 }, { x: 0, y: -12 },
            { x: 15, y: 0 }, { x: -15, y: 0 },
            { x: 0, y: 15 }, { x: 0, y: -15 },
            { x: 5, y: 0 }, { x: -5, y: 0 },
            { x: 0, y: 5 }, { x: 0, y: -5 },
            { x: 8, y: 0 }, { x: -8, y: 0 },
            { x: 0, y: 8 }, { x: 0, y: -8 },
            { x: 3, y: 0 }, { x: -3, y: 0 },
            { x: 0, y: 3 }, { x: 0, y: -3 },
            { x: 27, y: 0 }, { x: -27, y: 0 },
            { x: 0, y: 27 }, { x: 0, y: -27 },
            { x: 32, y: 0 }, { x: -32, y: 0 },
            { x: 0, y: 32 }, { x: 0, y: -32 }
        ];

        const possibleNeighbors = directions.map(d => ({
            x: node.x + d.x,
            y: node.y + d.y
        }));

        const neighbors = possibleNeighbors.filter(n =>
            Object.values(currentCoordinates).some(room =>
                room.x === n.x && room.y === n.y
            )
        );

        return neighbors;
    };


    const findPath = (start, end, startKey, endKey) => {
        const predefinedKey = `${startKey}-${endKey}`;
        const reversePredefinedKey = `${endKey}-${startKey}`; // исправлено

        console.log(predefinedKey);

        if (predefinedPaths[predefinedKey]) {
            return predefinedPaths[predefinedKey];
        }

        if (predefinedPaths[reversePredefinedKey]) {
            return [...predefinedPaths[reversePredefinedKey]].reverse();
        }

        const openSet = [start];
        const cameFrom = {};
        const gScore = { [`${start.x},${start.y}`]: 0 };
        const fScore = {
            [`${start.x},${start.y}`]: heuristic(start, end, start, end) // исправлено
        };

        let iteration = 0;
        const MAX_ITERATIONS = 100;

        while (openSet.length > 0) {
            if (iteration++ > MAX_ITERATIONS) {
                console.error("Превышено максимальное количество итераций! Прерывание.");
                return [];
            }

            openSet.sort((a, b) =>
                (fScore[`${a.x},${a.y}`] ?? Infinity) - (fScore[`${b.x},${b.y}`] ?? Infinity)
            );

            const current = openSet.shift();

            if (current.x === end.x && current.y === end.y) {
                return reconstructPath(cameFrom, current);
            }

            for (let neighbor of getNeighbors(current)) {
                const tentativeGScore = gScore[`${current.x},${current.y}`] + 1;
                const neighborKey = `${neighbor.x},${neighbor.y}`;

                if (tentativeGScore < (gScore[neighborKey] || Infinity)) {
                    cameFrom[neighborKey] = current;
                    gScore[neighborKey] = tentativeGScore;
                    fScore[neighborKey] = tentativeGScore + heuristic(neighbor, end, start, end); // исправлено

                    if (!openSet.some(n => n.x === neighbor.x && n.y === neighbor.y)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }

        console.log("Путь не найден!");
        return [];
    };


    const updateRoomCoordinate = (floorIndex, roomId, newX, newY) => {
        setRoomCoordinatesList(prev => {
            const newList = [...prev];
            newList[floorIndex] = {
                ...newList[floorIndex],
                [roomId]: { x: newX, y: newY }
            };
            return newList;
        });
    };

    const reconstructPath = (cameFrom, current) => {
        const totalPath = [[current.x, current.y]];
        const visited = new Set();

        while (cameFrom.hasOwnProperty(`${current.x},${current.y}`)) {
            const key = `${current.x},${current.y}`;
            if (visited.has(key)) {
                console.error("Обнаружен цикл! Прерывание восстановления пути.");
                break;
            }
            visited.add(key);

            current = cameFrom[key];
            totalPath.unshift([current.x, current.y]);
        }

        return totalPath;
    };

    const [path1, setPath1] = useState(null); // путь для field1
    const [path2, setPath2] = useState(null); // путь для field2

    const handleSearch = () => {
        let startKey = field1 !== undefined && field1 !== "" ? Number(field1) : 0;
        let endKey = field2 !== undefined && field2 !== "" ? Number(field2) : 0;

// startKey =0  if it matches any of the values
        if ([1033, 1034, 1035, 1037].includes(startKey)) {
            startKey = 0;
        }
// endKey=0 if it matches any of the values
        if ([1033, 1034, 1035, 1037].includes(endKey)) {
            endKey = 0;
        }

        if ([1038, 1039, 1040, 1041, 1023].includes(startKey)) {
            startKey = 1;
        }

        if ([1038, 1039, 1040, 1041, 1023].includes(endKey)) {
            endKey = 1;
        }

        if ([1001, 1002, 1003, 1014, 1015].includes(startKey)) {
            startKey = 2;
        }

        if ([1001, 1002, 1003, 1014, 1015].includes(endKey)) {
            endKey = 2;
        }

        if ([1004, 1005, 1006].includes(startKey)) {
            startKey = 3;
        }

        if ([1004, 1005, 1006].includes(endKey)) {
            endKey = 3;
        }

        if ([1030, 1031].includes(startKey)) {
            startKey = 4;
        }

        if ([1030, 1031].includes(endKey)) {
            endKey = 4;
        }

        if ([1021, 1022, 1024, 1020, 1017, 1018, 1019].includes(startKey)) {
            startKey = 5;
        }

        if ([1021, 1022, 1024, 1020, 1017, 1018, 1019].includes(endKey)) {
            endKey = 5;
        }

        if ([1013, 1016, 1012, 1011, 1010].includes(startKey)) {
            startKey = 6;



        }

        if ([1013, 1016, 1012, 1011, 1010].includes(endKey)) {
            endKey = 6;

        }

        if ([1009, 1008, 1007].includes(startKey)) {
            startKey = 7;
        }

        if ([1009, 1008, 1007].includes(endKey)) {
            endKey = 7;
        }

        if ([1146].includes(startKey)) {
            startKey = 9;
        }

        if ([1146].includes(endKey)) {
            endKey = 9;
        }

        if ([1147, 1148, 1149].includes(startKey)) {
            startKey = 10;
        }

        if ([1147, 1148, 1149].includes(endKey)) {
            endKey = 10;
        }

        if ([1101, 1102, 1103, 1104, 1105, 1129, 1126, 1125, 1128, 1127].includes(startKey)) {
            startKey = 11;
        }

        if ([1101, 1102, 1103, 1104, 1105, 1129, 1126, 1125, 1128, 1127].includes(endKey)) {
            endKey = 11;
        }

        if ([1106, 1107, 1108, 1109, 1110].includes(startKey)) {
            startKey = 12;
        }

        if ([1106, 1107, 1108, 1109, 1110].includes(endKey)) {
            endKey = 12;
        }

        if ([1144, 1143].includes(startKey)) {
            startKey = 13;
        }

        if ([1144, 1143].includes(endKey)) {
            endKey = 13;
        }

        if ([1142, 1141, 1140, 1139, 1136, 1135, 1134].includes(startKey)) {
            startKey = 14;
        }

        if ([1142, 1141, 1140, 1139, 1136, 1135, 1134].includes(endKey)) {
            endKey = 14;
        }

        if ([1124, 1123, 1121, 1120].includes(startKey)) {
            startKey = 15;
        }

        if ([1124, 1123, 1121, 1120].includes(endKey)) {
            endKey = 15;
        }

        if ([1111, 1112, 1113, 1115, 1116, 1118, 1119].includes(startKey)) {
            startKey = 16;
        }

        if ([1111, 1112, 1113, 1115, 1116, 1118, 1119].includes(endKey)) {
            endKey = 16;
        }

        if ([1213, 1214, 1215, 1217, 1212, 1211, 1210].includes(startKey)) {
            startKey = 18;
        }

        if ([1213, 1214, 1215, 1217, 1212, 1211, 1210].includes(endKey)) {
            endKey = 18;
        }

        if ([1218, 1219, 1220, 1221, 1228, 1222, 1226].includes(startKey)) {
            startKey = 19;
        }

        if ([1218, 1219, 1220, 1221, 1228, 1222, 1226].includes(endKey)) {
            endKey = 19;
        }

        if ([1229, 1231, 1231, 1232].includes(startKey)) {
            startKey = 20;
        }

        if ([1229, 1231, 1231, 1232].includes(endKey)) {
            endKey = 20;
        }

        if ([1233].includes(startKey)) {
            startKey = 21;
        }

        if ([1233].includes(endKey)) {
            endKey = 21;
        }

        if ([1208, 1209, 1207, 1206, 1205, 1204].includes(startKey)) {
            startKey = 22;
        }
        if ([1208, 1209, 1207, 1206, 1205, 1204].includes(endKey)) {
            endKey = 22;
        }
        if ([1203, 1202, 1201, 1223, 1224, 1225].includes(startKey)) {
            startKey = 23;
        }

        if ([1203, 1202, 1201, 1223, 1224, 1225].includes(endKey)) {
            endKey = 23;
        }

        if ([1241, 1240, 1239].includes(startKey)) {
            startKey = 24;
        }

        if ([1241, 1240, 1239].includes(endKey)) {
            endKey = 24;
        }

        if ([1238, 1237, 1236, 1235].includes(startKey)) {
            startKey = 25;
        }

        if ([1238, 1237, 1236, 1235].includes(endKey)) {
            endKey = 25;
        }

        if ([1310, 1311, 1312, 1313, 1314, 1315, 1309, 1309].includes(startKey)) {
            startKey = 27;
        }

        if ([1310, 1311, 1312, 1313, 1314, 1315, 1309, 1309].includes(endKey)) {
            endKey = 27;
        }

        if ([1316, 1317, 1318].includes(startKey)) {
            startKey = 28;
        }

        if ([1316, 1317, 1318].includes(endKey)) {
            endKey = 28;
        }

        if ([1326, 1324, 1328, 1329, 1327].includes(startKey)) {
            startKey = 29;
        }

        if ([1326, 1324, 1328, 1329, 1327].includes(endKey)) {
            endKey = 29;
        }

        if ([1330, 1331, 1332, 1333].includes(startKey)) {
            startKey = 30;
        }

        if ([1330, 1331, 1332, 1333].includes(endKey)) {
            endKey = 30;
        }

        if ([1308, 1308, 1307, 1306, 1305, 1304, 1303].includes(startKey)) {
            startKey = 31;
        }

        if ([1308, 1308, 1307, 1306, 1305, 1304, 1303].includes(endKey)) {
            endKey = 31;
        }

        if ([1302, 1301, 1319, 1321].includes(startKey)) {
            startKey = 32;
        }

        if ([1302, 1301, 1319, 1321].includes(endKey)) {
            endKey = 32;
        }

        if ([1325, 1340, 1339].includes(startKey)) {
            startKey = 33;
        }

        if ([1325, 1340, 1339].includes(endKey)) {
            endKey = 33;
        }

        if ([1338, 1337, 1336, 1335].includes(startKey)) {
            startKey = 34;
        }

        if ([1338, 1337, 1336, 1335].includes(endKey)) {
            endKey = 34;
        }

        if ([1407, 1408, 1409, 1410, 1411, 1412, 1413, 1414].includes(startKey)) {
            startKey = 36;
        }

        if ([1407, 1408, 1409, 1410, 1411, 1412, 1413, 1414].includes(endKey)) {
            endKey = 36;
        }

        if ([1415, 1416, 1417, 1421].includes(startKey)) {
            startKey = 37;
        }

        if ([1415, 1416, 1417, 1421].includes(endKey)) {
            endKey = 37;
        }

        if ([1406, 1405, 1404, 1403].includes(startKey)) {
            startKey = 38;
        }

        if ([1406, 1405, 1404, 1403].includes(endKey)) {
            endKey = 38;
        }

        if ([1402, 1401, 1418, 1420, 1419].includes(startKey)) {
            startKey = 39;
        }

        if ([1402, 1401, 1418, 1420, 1419].includes(endKey)) {
            endKey = 39;
        }

        if ([1510, 1511, 1512, 1513, 1514, 1506].includes(startKey)) {
            startKey = 45;
        }

        if ([1510, 1511, 1512, 1513, 1514, 1506].includes(endKey)) {
            endKey = 45;
        }

        if ([1515, 1516, 1517, 1521, 1522, 1523, 1518].includes(startKey)) {
            startKey = 46;
        }

        if ([1515, 1516, 1517, 1521, 1522, 1523, 1518].includes(endKey)) {
            endKey = 46;
        }

        if ([1524, 1529, 1530, 1525, 1528].includes(startKey)) {
            startKey = 47;
        }

        if ([1524, 1529, 1530, 1525, 1528].includes(endKey)) {
            endKey = 47;
        }

        if ([1537, 1539, 1540].includes(startKey)) {
            startKey = 48;
        }

        if ([1537, 1539, 1540].includes(endKey)) {
            endKey = 48;
        }

        if ([1505, 1504].includes(startKey)) {
            startKey = 49;
        }

        if ([1505, 1504].includes(endKey)) {
            endKey = 49;
        }
        if ([1502, 1519, 1520, 1553].includes(startKey)) {
            startKey = 50;
        }
        if ([1502, 1519, 1520, 1553].includes(endKey)) {
            endKey = 50;
        }

        if ([1552, 1551, 1550, 1526, 1527].includes(startKey)) {
            startKey = 51;
        }

        if ([1552, 1551, 1550, 1526, 1527].includes(endKey)) {
            endKey = 51;
        }

        if ([1544, 1543, 1541].includes(startKey)) {
            startKey = 52;
        }

        if ([1544, 1543, 1541].includes(endKey)) {
            endKey = 52;
        }
        if ([1544, 1543, 1541].includes(startKey)) {
            startKey = 52;
        }

        if ([1544, 1543, 1541].includes(endKey)) {
            endKey = 52;
        }
        if ([1601, 1602, 1603,1604, 1605, 1606,1607, 1608].includes(startKey)) {
            startKey = 54;
        }

        if ([1601, 1602, 1603,1604, 1605, 1606,1607, 1608].includes(endKey)) {
            endKey = 54;
        }



        if (isNaN(startKey) || isNaN(endKey)) {
            alert("Ошибка: введите числовые значения!");
            return;
        }

        const start = currentCoordinates[startKey];
        const end = currentCoordinates[endKey];



        if ((!start || !end)||(field1 >=1609 || field2 >=1609) ||(field1 <=1000 || field2 <=1000)) {
            alert("Ошибка: введены некорректные номера аудиторий для корпуса №1!");
            console.log(" ")
            return;
        }

        // Находим путь для field1
        const hundredsDigit1 = Math.floor( field1 !== undefined && field1 !== "" ? Math.floor((Number(field1) % 1000) / 100) : 0 );
        const hundredsDigit2 = Math.floor(field2 !== undefined && field2 !== "" ? Math.floor((Number(field2) % 1000) / 100) : 0 );
        let entranceKey1 = 8;
        let entranceKey2 = 8;
        if (hundredsDigit1 === 0) {
            entranceKey1 = 8;
        }
        if (hundredsDigit2 === 0) {
            entranceKey2 = 8;
        }

        if (hundredsDigit2 === 1) {
            entranceKey2 = 17;
        }// предположим, что ЛЕСТНИЦА - это точка 8
        if (hundredsDigit1 === 1) {
            entranceKey1 = 17;
        }

        if (hundredsDigit2 === 2) {
            entranceKey2 = 26;
        }
        if (hundredsDigit1 === 2) {
            entranceKey1 = 26;
        }
        if (hundredsDigit2 === 3) {
            entranceKey2 = 35;
        }
        if (hundredsDigit1 === 3) {
            entranceKey1 = 35;
        }
        if (hundredsDigit2 === 4) {
            entranceKey2 = 44;
        }
        if (hundredsDigit1 === 4) {
            entranceKey1 = 44;
        }
        if (hundredsDigit2 === 5) {
            entranceKey2 = 53;
        }
        if (hundredsDigit1 === 5) {
            entranceKey1= 53;
        }
        if (hundredsDigit2 === 6) {
            entranceKey2 = 62;
        }
        if (hundredsDigit1 === 6) {
            entranceKey1= 62;
        }


        const entrance1 = currentCoordinates[entranceKey1];
        const entrance2 = currentCoordinates[entranceKey2];
        if (hundredsDigit1 === hundredsDigit2) {const pathToStart = findPath( start, end, startKey, endKey);
            setPath1(pathToStart);}
        else{
            const pathToStart = findPath(start, entrance1, startKey, entranceKey1);

            setPath1(pathToStart);

            // Находим путь для field2
            const pathToEnd = findPath(entrance2, end, entranceKey2, endKey);
            setPath2(pathToEnd);}

        // Остальной код для изображений...

        const imageIndex1 = Math.min(6, Math.max(0, hundredsDigit1));
        const imageIndex2 = Math.min(6, Math.max(0, hundredsDigit2));
        console.log("Маршрут идет от Стартовой аудитории до лесницы на этом этаже, далее от лесницы на конечном этаже до ноечной аудитории")
        console.log("Старт")
        console.log(start, startKey)
        console.log("Лесница начальный этаж")
        console.log(entrance1, entranceKey1)
        console.log("Лесница конечный этаж")
        console.log(entrance2, entranceKey2)
        console.log("Конец")
        console.log( end, endKey)

        if (imageIndex1 === imageIndex2) {
            setSelectedImages([`${imageIndex1}.png`]);
        } else {
            setSelectedImages([`${imageIndex1}.png`, `${imageIndex2}.png`]);
            setValue("Переместитесь на " +Math.floor(Number((field2) % 1000)/100) + " этаж");
        }
    };


    return (
        <div>
            <div className="search-container">
                <h1>Поиск маршрута</h1>

                <div className="input-container">
                    <input type="number" value={field1} onChange={e => setField1(e.target.value)}
                           placeholder="Стартовая аудитория"/>
                    <input type="number" value={field2} onChange={e => setField2(e.target.value)}
                           placeholder="Конечная аудитория"/>
                    <button onClick={handleSearch}>Построить маршрут</button>
                </div>
                <div className="maze-container">
                    {selectedImages.map((image, index) => (
                        <>
                            <Maze
                                key={index}
                                mazeImage={image}
                                path={index === 0 ? path1 : path2}
                                coordinates={currentCoordinates}
                                floor={index === 0 ?
                                    Math.floor(Number(field1 % 1000 / 100)) :
                                    Math.floor(Number(field2 % 1000 / 100))}
                            />
                            {index === 0 && field1 !== field2 && (
                                <div className="floor-info">{value}</div>
                            )}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};
const Maze = ({ mazeImage, path, coordinates, floor, roomCoordinatesList  }) => {

    const imgRef = useRef();
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    // Функция для определения, принадлежит ли ключ к текущему этажу
    const isKeyForCurrentFloor = (key) => {
        const keyNum = Number(key);

        // Диапазоны ключей для каждого этажа
        const floorRanges = {
            0: [0, 8],    // 0 этаж
            1: [9, 17],   // 1 этаж
            2: [18, 26],  // 2 этаж
            3: [27, 35],  // 3 этаж
            4: [36, 44],  // 4 этаж
            5: [45, 53],  // 5 этаж
            6: [54, 62]   // 6 этаж
        };

        return keyNum >= floorRanges[floor][0] && keyNum <= floorRanges[floor][1];
    };

    useEffect(() => {
        if (!mazeImage) return;

        const image = new window.Image();
        image.src = `${process.env.PUBLIC_URL}/${mazeImage}`;
        image.onload = () => {
            imgRef.current.image(image);

            const maxWidth = window.innerWidth * 1.0;
            const scale = maxWidth / image.width;
            const scaledHeight = image.height * scale;

            setImageSize({ width: maxWidth, height: scaledHeight });
            imgRef.current.getLayer().batchDraw();
        };
    }, [mazeImage]);

    const convertPercentageToPixels = (percentagePath) => {
        if (!percentagePath) return [];
        return percentagePath.map(([xPercent, yPercent]) => [
            (xPercent / 100) * imageSize.width,
            (yPercent / 100) * imageSize.height,
        ]);
    };

    return (
        <Stage width={imageSize.width} height={imageSize.height} listening={false}>
            <Layer listening={false}>
                <Image
                    ref={imgRef}
                    x={0}
                    y={0}
                    width={imageSize.width}
                    height={imageSize.height}
                    listening={false}
                />
                {path && path.length > 0 && (
                    <Line
                        points={convertPercentageToPixels(path).flat()}
                        stroke={"red"}
                        strokeWidth={5}
                        lineCap="round"
                        lineJoin="round"
                        listening={false}
                    />
                )}
                {/* Отображаем только ключи для текущего этажа */}
                {coordinates && Object.entries(coordinates)
                    .filter(([key]) => isKeyForCurrentFloor(key))
                    .map(([key, coord]) => (
                        <Text
                            key={key}
                            x={(coord.x / 100) * imageSize.width}
                            y={(coord.y / 100) * imageSize.height}
                            text={key}
                            fontSize={16}
                            fill="black"
                            align="center"
                            listening={false}
                        />
                    ))}
            </Layer>
        </Stage>
    );
};
const App = () => {

    const [currentCoordinates] = useState(initialRoomCoordinates[0]);



    return (
        <Router>
            <nav className="nav-container">
                <Link to="/">Инструкция</Link>
                <Link to="/building-plan">План здания</Link>
                <Link to="/navigation">Навигация</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Instruction />} />
                <Route path="/building-plan" element={<BuildingPlan />} />
                <Route
                    path="/navigation"
                    element={<Navigation currentCoordinates={currentCoordinates} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
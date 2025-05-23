import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Stage, Layer, Text, Image, Line } from 'react-konva';
import './App.css';

const Instruction = () => {
    return (
        <div className="instruction-container">

            <h2>1. Знакомство с сайтом</h2>
            <p>
                Здравствуйте, уважаемый пользователь! Мы рады приветствовать вас на нашем сайте,
                созданном специально для удобной навигации по зданию ИУЦТ.
            </p>

            <h3>Как посмотреть план здания?</h3>
            <p>Нажмите кнопку "План здания". Вы увидите:</p>
            <ul>
                <li>Кнопки с цифрами этажей</li>
                <img src="/instruction/111.png" alt="Кнопки этажей" />

                <li>В самих этажах:</li>
                <ul>
                    <li>Квадратики с цифрами — это переходы в другие корпуса</li>
                    <img src="/instruction/222.png" alt="Переходы в другие корпуса" />

                    <li>Аудитории</li>
                    <img src="/instruction/333.png" alt="Аудитории" />

                    <li>Лестницы</li>
                    <img src="/instruction/444.png" alt="Лестницы" />

                    <li>Выходы</li>
                    <img src="/instruction/555.png" alt="Выходы" />

                    <li>Туалеты</li>
                    <img src="/instruction/666.png" alt="Туалеты" />
                </ul>
            </ul>

            <h2>2. Как построить маршрут?</h2>
            <p>В разделе "Навигация" введите:</p>
            <ol>
                <li>Под надписью «Стартовая аудитория» введите номер аудитории, где вы находитесь. Например, 1335.</li>
                <li>Под надписью «Конечная аудитория» укажите номер аудитории, куда вы хотите попасть. Например, 1311.</li>
                <li>Нажмите "Построить маршрут"</li>
                <img src="/instruction/777.png" alt="Маршрут на одном этаже" />
            </ol>

            <p>После этого появится:</p>
            <ul>
                <li>Одна картинка с маршрутом (если аудитории находятся на одном этаже)</li>
                <img src="/instruction/888.png" alt="Маршрут на одном этаже" />

                <li>Или две картинки с маршрутом (если нужно перейти на другой этаж)</li>
                <img src="/instruction/999.png" alt="Маршрут между этажами" />
            </ul>

            <h2>3. Готово!</h2>
            <p>Теперь вы можете:</p>
            <ul>
                <li>Быстро находить аудитории</li>
                <li>Легко перемещаться по зданию</li>
                <li>Не опаздывать на пары</li>
            </ul>

            <p>Есть вопросы? Пишите: <a href="https://t.me/GrishaLV">@GrishaLV</a></p>
            <p>Приятного пользования и успешного пути по зданию ИУЦТ!</p>
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

        18: { x: 10, y: 38 },
        19: { x: 40, y: 38 },
        20: { x: 65, y: 38 },
        21: { x: 90, y: 38 },
        22: { x: 10, y: 68},
        23: { x: 40, y: 68 },
        24: { x: 65, y: 68 },
        25: { x: 90, y: 68 },
        26: { x: 50, y: 38 }, // Лестница


        // 3 этаж (ключи 27-35)

        27: { x: 10, y: 38},
        28: { x: 40, y: 38},
        29: { x: 60, y: 38 },
        30: { x: 92, y: 38 },
        31: { x: 10, y: 68 },
        32: { x: 40, y: 68 },
        33: { x: 60, y: 68 },
        34: { x: 92, y: 68 },
        35: { x: 52, y: 38}, // Лестница


        // 4 этаж (ключи 36-44)

        36: { x: 30, y: 25 },
        37: { x: 65, y: 25 },
        38: { x: 30, y: 70 },
        39: { x: 65, y: 70 },
        40: { x: 30, y: 25 },
        41: { x: 30, y: 25 },
        42: { x: 30, y: 25 },
        43: { x: 30, y: 25 },
        44: { x: 25, y: 25}, // Лестница


        // 5 этаж (ключи 45-53)

        45: { x: 10, y: 38 },
        46: { x: 40, y: 38 },
        47: { x: 62, y: 38 },
        48: { x: 92, y: 38 },
        49: { x: 10, y: 68 },
        50: { x: 40, y: 68 },
        51: { x: 62, y: 68 },
        52: { x: 92, y: 68},
        53: { x: 52, y: 38 }, // Лестница

        // 6 этаж (ключи 54-62)

        54: { x: 51, y: 50 },
        55: { x: 80, y: 50 },
        56: { x: 40, y: 10 },
        57: { x: 60, y: 10 },
        58: { x: 20, y: 30 },
        59: { x: 40, y: 30 },
        60: { x: 60, y: 30 },
        61: { x: 20, y: 50 },
        62: { x: 51, y: 30 } // Лестница
    },
];
const predefinedPaths = {
    "4-5": [[10,70], [10,35], [40,35], [40,70]],
    "5-4": [[40,70], [40,35], [10,35], [10,70]],
    "6-5": [[67,70], [67,35], [40,35], [40,70]],
    "5-6": [[40,70], [40,35], [67,35], [67,70]],
    "4-6": [[10,70], [10,35], [40,35], [67,35], [67,70]],
    "6-4": [[67,70], [67,35], [40,35], [10,35], [10,70]],
    "4-7": [[10,70], [10,35], [40,35], [67,35], [92,35], [92,70]],
    "7-4": [[92,70], [92,35], [67,35], [40,35], [10,35], [10,70]],
    "7-6": [[67,70], [67,35], [92,35], [92,70]],
    "6-7": [[92,70], [92,35], [67,35], [67,70]],
    "14-13": [[10,67], [10,37], [37,37], [37,67]],
    "13-14": [[37,67], [37,37], [10,37], [10,67]],
    "14-15": [[57,67], [57,37], [37,37], [37,67]],
    "15-14": [[37,67], [37,37], [57,37], [57,67]],
    "15-16": [[57,67], [57,37], [87,37], [87,67]],
    "16-15": [[87,67], [87,37], [57,37], [57,67]],
    "15-13": [[57,67], [57,37], [37,37], [37,67], [10,67]],
    "13-15": [[10,67],[37,67], [37,37], [57,37], [57,67]],
    "16-13": [[87,67], [87,37], [57,37], [37,37], [10,37], [10,67]],
    "13-16": [[10,67],[10,37], [37,37], [57,37], [87,37],[87,67]],
    "16-14": [[87,67], [87,37], [57,37], [37,37], [37,67]],
    "14-16": [[37,67], [37,37], [57,37], [87,37],[87,67]],
    "5-0": [[40,70], [40,35], [40,70]],
    "0-5": [[10,35], [40,35], [40,70]],
    "27-31": [[10,38], [40,38],[40,68], [10,68]],
    "31-27": [[10,68], [40,68], [40,38],[10,38]]
};

const priorityPoints = [
    { x: 10, y: 35 }, //0
    { x: 40, y: 35 }, //1
    { x: 10, y: 37 }, //9
    {x:90, y:68}, //25
    {x:67, y:35}, //2
    {x:57, y:60},
    {x:87, y : 37},
    {x:57, y : 37},
    {x:37, y : 37},


    {x:62, y:30},

    {x:92, y :35}

    // здесь добавляй приоритетные точки
];
const stairGroups = {
    'A': {
        0: 8,   // лестница A на 0 этаже - точка 8
        1: 17,  // лестница A на 1 этаже - точка 17
        2: 26,  // и так далее...
        3: 35,
        4: 44,
        5: 53,
        6: 62
    },
    // Можно добавить другие группы лестниц, если они есть
    'B': {


    }
};

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
    const [roomCoordinatesList] = useState(initialRoomCoordinates);
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
            { x: 41, y: 0 }, { x: -41, y: 0 },
            { x: 0, y: 41}, { x: 0, y: -41 },

            { x: 0, y: 40}, { x: 0, y: -40 },

            { x: 35, y: 0 }, { x: -35, y: 0 },
            { x: 0, y: 35 }, { x: 0, y: -35 },
            {x: 32, y: 0 }, { x: -32, y: 0 },
            { x: 0, y: 32 }, { x: 0, y: -32 },
            { x: 30, y: 0 }, { x: -30, y: 0 },
            { x: 0, y: 30 }, { x: 0, y: -30 },
            { x: 25, y: 0 }, { x: -25, y: 0 },
            { x: 0, y: 25 }, { x: 0, y: -25 },
            { x: 20, y: 0 }, { x: -20, y: 0 },
            { x: 0, y: 20 }, { x: 0, y: -20 },
            { x: 22, y: 0 }, { x: -22, y: 0 },
            { x: 0, y: 22 }, { x: 0, y: -22 },
            { x: 10, y: 0 }, { x: -10, y: 0 },
            { x: 0, y: 10 }, { x: 0, y: -10 },
            { x: 12, y: 0 }, { x: -12, y: 0 },
            { x: 0, y: 12 }, { x: 0, y: -12 },
            { x: 15, y: 0 }, { x: -15, y: 0 },
            { x: 0, y: 15 }, { x: 0, y: -15 },
            { x: 5, y: 0 }, { x: -5, y: 0 },
            { x: 0, y: 5 }, {x: 0 , y: -5},
            {x: 7, y: 0 }, { x: -7, y: 0 },
            { x: 0, y: 7 }, { x: 0, y: -7 },
            { x: 8, y: 0 }, { x: -8, y: 0 },
            { x: 0, y: 8 }, { x: 0, y: -8 },
            { x: 3, y: 0 }, { x: -3, y: 0 },
            { x: 0, y: 3 }, { x: 0, y: -3 },
            { x: 27, y: 0 }, { x: -27, y: 0 },
            { x: 0, y: 27 }, { x: 0, y: -27 },

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

        if ([1146, 1145].includes(startKey)) {
            startKey = 9;
        }

        if ([1146, 1145].includes(endKey)) {
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

        if ([1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118, 1119].includes(startKey)) {
            startKey = 16;
        }

        if ([1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118, 1119].includes(endKey)) {
            endKey = 16;
        }

        if ([1235-1, 1235, 1236, 1237, 1238].includes(startKey)) {
            startKey = 18;
        }

        if ([1235-1, 1235, 1236, 1237, 1238].includes(endKey)) {
            endKey = 18;
        }

        if ([1239, 1240, 1241, 1201, 1230].includes(startKey)) {
            startKey = 19;
        }

        if ([1239, 1240, 1241, 1201, 1230].includes(endKey)) {
            endKey = 19;
        }

        if ([1202, 1203, 1204, 1224, 1223, 1225].includes(startKey)) {
            startKey = 20;
        }

        if ([1202, 1203, 1204, 1224, 1223, 1225].includes(endKey)) {
            endKey = 20;
        }

        if ([1205, 1206, 1207, 1209, 1208, 1210].includes(startKey)) {
            startKey = 21;
        }

        if ([1205, 1206, 1207, 1209, 1208, 1210].includes(endKey)) {
            endKey = 21;
        }

        if ([1234, 1233, 1232].includes(startKey)) {
            startKey = 22;
        }
        if ([1234, 1233, 1232].includes(endKey)) {
            endKey = 22;
        }
        if ([1231, 1229, 1228].includes(startKey)) {
            startKey = 23;
        }

        if ([1231, 1229, 1228].includes(endKey)) {
            endKey = 23;
        }

        if ([1221, 1226, 1222, 1220, 1219, 1218, 1217].includes(startKey)) {
            startKey = 24;
        }

        if ([1221, 1226, 1222, 1220, 1219, 1218, 1217].includes(endKey)) {
            endKey = 24;
        }

        if ([1216, 1215, 1214, 1213, 1212, 1211].includes(startKey)) {
            startKey = 25;
        }

        if ([1216, 1215, 1214, 1213, 1212, 1211].includes(endKey)) {
            endKey = 25;
        }

        if ([1334, 1335, 1336, 1337, 1338].includes(startKey)) {
            startKey = 27;
        }

        if ([1334, 1335, 1336, 1337, 1338].includes(endKey)) {
            endKey = 27;
        }

        if ([1339, 1340, 1325, 1326].includes(startKey)) {
            startKey = 28;
        }

        if ([1339, 1340, 1325, 1326].includes(endKey)) {
            endKey = 28;
        }

        if ([1301, 1302, 1303, 1320, 1319, 1321].includes(startKey)) {
            startKey = 29;
        }

        if ([1301, 1302, 1303, 1320, 1319, 1321].includes(endKey)) {
            endKey = 29;
        }

        if ([1304, 1305, 1306, 1307, 1308, 1308-2].includes(startKey)) {
            startKey = 30;
        }

        if ([1304, 1305, 1306, 1307, 1308, 1308-2].includes(endKey)) {
            endKey = 30;
        }

        if ([1333, 1332, 1331, 1330].includes(startKey)) {
            startKey = 31;
        }

        if ([1333, 1332, 1331, 1330].includes(endKey)) {
            endKey = 31;
        }

        if ([1329, 1328, 1327, 1324, 1323].includes(startKey)) {
            startKey = 32;
        }

        if ([1329, 1328, 1327, 1324, 1323].includes(endKey)) {
            endKey = 32;
        }

        if ([1322, 1318, 1317, 1316, 1315, 1314].includes(startKey)) {
            startKey = 33;
        }

        if ([1322, 1318, 1317, 1316, 1315, 1314].includes(endKey)) {
            endKey = 33;
        }

        if ([1313, 1312, 1311, 1310, 1309-2, 1309].includes(startKey)) {
            startKey = 34;
        }

        if ([1313, 1312, 1311, 1310, 1309-2, 1309].includes(endKey)) {
            endKey = 34;
        }

        if ([1420, 1420, 1418, 1419, 1401, 1401, 1402, 1403, 1403, 1403].includes(startKey)) {
            startKey = 36;
        }

        if ([1420, 1420, 1418, 1419, 1401, 1401, 1402, 1403].includes(endKey)) {
            endKey = 36;
        }

        if ([1404, 1405, 1405, 1405, 1406].includes(startKey)) {
            startKey = 37;
        }

        if ([1404, 1405, 1405, 1405, 1406].includes(endKey)) {
            endKey = 37;
        }

        if ([1421, 1417, 1416, 1415, 1414, 1414, 1413].includes(startKey)) {
            startKey = 38;
        }

        if ([1421, 1417, 1416, 1415, 1414-2, 1414, 1413].includes(endKey)) {
            endKey = 38;
        }

        if ([1412, 1411, 1410, 1409, 1408, 1407].includes(startKey)) {
            startKey = 39;
        }

        if ([1412, 1411, 1410, 1409, 1408, 1407].includes(endKey)) {
            endKey = 39;
        }

        if ([1540, 1541, 1542, 1543, 1544].includes(startKey)) {
            startKey = 45;
        }

        if ([1540, 1541, 1542, 1543, 1544].includes(endKey)) {
            endKey = 45;
        }

        if ([1545, 1546, 1547, 1548, 1549, 1550, 1551, 1552, 1527, 1526].includes(startKey)) {
            startKey = 46;
        }

        if ([1545, 1546, 1547, 1548, 1549, 1550, 1551, 1552, 1527, 1526].includes(endKey)) {
            endKey = 46;
        }

        if ([1553, 1501, 1520, 1519, 1501].includes(startKey)) {
            startKey = 47;
        }

        if ([1553, 1501, 1520, 1519, 1501].includes(endKey)) {
            endKey = 47;
        }

        if ([1502, 1504, 1505, 1506, 1503].includes(startKey)) {
            startKey = 48;
        }

        if ([1502, 1504, 1505, 1506, 1503].includes(endKey)) {
            endKey = 48;
        }

        if ([1539, 1538, 1537, 1536, 1535, 1534, 1533].includes(startKey)) {
            startKey = 49;
        }

        if ([1539, 1538, 1537, 1536, 1535, 1534, 1533].includes(endKey)) {
            endKey = 49;
        }
        if ([1532, 1531, 1530, 1529, 1524, 1528-1, 1528, 1525, 1525-1, 1523].includes(startKey)) {

            startKey = 50;
        }
        if ([1532, 1531, 1530, 1529, 1524, 1528-1, 1528, 1525-2, 1525, 1523].includes(endKey)) {
            endKey = 50;
        }

        if ([1522, 1521, 1517, 1516, 1518, 1515].includes(startKey)) {
            startKey = 51;
        }

        if ([1522, 1521, 1517, 1516, 1518, 1515].includes(endKey)) {
            endKey = 51;
        }

        if ([1514-1, 1514, 1513, 1512, 1511, 1510, 1508, 1509, 1507].includes(startKey)) {
            startKey = 52;
        }

        if ([1514-1, 1514, 1513, 1512, 1511, 1510, 1508, 1509, 1507].includes(endKey)) {
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

        if (hundredsDigit1 === hundredsDigit2) {
            // Если на одном этаже - строим прямой маршрут
            const pathToStart = findPath(start, end, startKey, endKey);
            setPath1(pathToStart);
            setPath2(null);
            setSelectedImages([`${hundredsDigit1}.png`]);
            return;
        }

        // Находим все возможные пути через разные лестницы
        let bestPath = null;
        let bestLength = Infinity;
        let bestStairGroup = null;
        let bestImages = [];

        // Перебираем все группы лестниц
        for (const [groupName, group] of Object.entries(stairGroups)) {
            const stair1 = group[hundredsDigit1]; // лестница на стартовом этаже
            const stair2 = group[hundredsDigit2]; // лестница на целевом этаже

            if (!stair1 || !stair2) continue; // если в этой группе нет лестниц на одном из этажей

            const stair1Coords = currentCoordinates[stair1];
            const stair2Coords = currentCoordinates[stair2];

            // Маршрут от старта до лестницы на стартовом этаже
            const pathToStair = findPath(start, stair1Coords, startKey, stair1);

            // Маршрут от лестницы на целевом этаже до цели
            const pathFromStair = findPath(stair2Coords, end, stair2, endKey);

            const totalLength = (pathToStair?.length || 0) + (pathFromStair?.length || 0);

            if (totalLength < bestLength) {
                bestLength = totalLength;
                bestPath = {
                    path1: pathToStair,
                    path2: pathFromStair
                };
                bestStairGroup = groupName;
                bestImages = [`${hundredsDigit1}.png`, `${hundredsDigit2}.png`];
            }
        }

        if (bestPath) {
            setPath1(bestPath.path1);
            setPath2(bestPath.path2);
            setSelectedImages(bestImages);
            setValue(`Переместитесь на ${hundredsDigit2} этаж через лестницу ${bestStairGroup}`);
        } else {
            alert("Не удалось найти подходящий маршрут через лестницы!");
        }


        const imageIndex1 = Math.min(6, Math.max(0, hundredsDigit1));
        const imageIndex2 = Math.min(6, Math.max(0, hundredsDigit2));
        console.log("Маршрут идет от Стартовой аудитории до лесницы на этом этаже, далее от лесницы на конечном этаже до ноечной аудитории")
        console.log("Старт")
        console.log(start, startKey)
        console.log("Лесница начальный этаж")

        console.log("Лесница конечный этаж")

        console.log("Конец")
        console.log( end, endKey)

        if (imageIndex1 === imageIndex2) {
            setSelectedImages([`${imageIndex1}.png`]);
        } else {
            setSelectedImages([`${imageIndex1}.png`, `${imageIndex2}.png`]);
            setValue("Переместитесь на " +Math.floor(Number((field2) % 1000)/100) + " этаж");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        handleSearch(); // Вызываем существующую функцию поиска
    };


    return (
        <div>
            <div className="search-container">
                <h1>Поиск маршрута</h1>

                <div className="input-container">
                    <form onSubmit={handleSubmit} className="input-container">
                        <input
                            type="number"
                            value={field1}
                            onChange={e => setField1(e.target.value)}
                            placeholder="Стартовая аудитория"
                        />
                        <input
                            type="number"
                            value={field2}
                            onChange={e => setField2(e.target.value)}
                            placeholder="Конечная аудитория"
                        />
                        <button type="submit">Построить маршрут</button>
                    </form>
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
const Maze = ({mazeImage, path, coordinates, floor, }) => {

    const imgRef = useRef();
    const [imageSize, setImageSize] = useState({width: 0, height: 0});

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

            const maxWidth = window.innerWidth ;
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
                {/*{coordinates && Object.entries(coordinates)*/}
                {/*    .filter(([key]) => isKeyForCurrentFloor(key))*/}
                {/*    .map(([key, coord]) => (*/}
                {/*        <Text*/}
                {/*            key={key}*/}
                {/*            x={(coord.x / 100) * imageSize.width}*/}
                {/*            y={(coord.y / 100) * imageSize.height}*/}
                {/*            text={key}*/}
                {/*            fontSize={16}*/}
                {/*            fill="black"*/}
                {/*            align="center"*/}
                {/*            listening={false}*/}
                {/*        />*/}
                {/*    ))}*/}
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
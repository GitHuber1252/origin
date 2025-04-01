import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Stage, Layer, Image, Line } from 'react-konva';
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

const roomCoordinatesList = [
    // Пустой элемент для индекса 0 (не используется)
    {},

    // 1 этаж (ключи 0-8)
    {
        0: { x: 35, y: 55 },
        1: { x: 15, y: 15 },
        2: { x: 35, y: 15 },
        3: { x: 55, y: 15 },
        4: { x: 15, y: 35 },
        5: { x: 55, y: 35 },
        6: { x: 55, y: 55 },
        7: { x: 15, y: 55 },
        8: { x: 20, y: 35 } // Лестница
    },

    // 2 этаж (ключи 9-17)
    {
        9: { x: 20, y: 60 },
        10: { x: 20, y: 20 },
        11: { x: 40, y: 20 },
        12: { x: 60, y: 20 },
        13: { x: 20, y: 40 },
        14: { x: 40, y: 40 },
        15: { x: 60, y: 40 },
        16: { x: 20, y: 60 },
        17: { x: 40, y: 60 } // Лестница
    },

    // 3 этаж (ключи 18-26)
    {
        18: { x: 40, y: 50 },
        19: { x: 20, y: 10 },
        20: { x: 40, y: 10 },
        21: { x: 60, y: 10 },
        22: { x: 20, y: 30 },
        23: { x: 40, y: 30 },
        24: { x: 60, y: 30 },
        25: { x: 20, y: 50 },
        26: { x: 60, y: 50 } // Лестница
    },

    // 4 этаж (ключи 27-35)
    {
        27: { x: 45, y: 65 },
        28: { x: 25, y: 25 },
        29: { x: 45, y: 25 },
        30: { x: 65, y: 25 },
        31: { x: 25, y: 45 },
        32: { x: 45, y: 45 },
        33: { x: 65, y: 45 },
        34: { x: 25, y: 65 },
        35: { x: 65, y: 65 } // Лестница
    },

    // 5 этаж (ключи 36-44)
    {
        36: { x: 50, y: 70 },
        37: { x: 30, y: 30 },
        38: { x: 50, y: 30 },
        39: { x: 70, y: 30 },
        40: { x: 30, y: 50 },
        41: { x: 50, y: 50 },
        42: { x: 70, y: 50 },
        43: { x: 30, y: 70 },
        44: { x: 70, y: 70 } // Лестница
    },

    // 6 этаж (ключи 45-53)
    {
        45: { x: 55, y: 75 },
        46: { x: 35, y: 35 },
        47: { x: 55, y: 35 },
        48: { x: 75, y: 35 },
        49: { x: 35, y: 55 },
        50: { x: 55, y: 55 },
        51: { x: 75, y: 55 },
        52: { x: 35, y: 75 },
        53: { x: 75, y: 75 } // Лестница
    },

    // 7 этаж (ключи 54-62)
    {
        54: { x: 40, y: 50 },
        55: { x: 20, y: 10 },
        56: { x: 40, y: 10 },
        57: { x: 60, y: 10 },
        58: { x: 20, y: 30 },
        59: { x: 40, y: 30 },
        60: { x: 60, y: 30 },
        61: { x: 20, y: 50 },
        62: { x: 60, y: 50 } // Лестница
    }
];

const Navigation = ({ currentCoordinates: initialCoordinates }) => {
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [value, setValue] = useState('');
    const [currentCoordinates, setCurrentCoordinates] = useState(initialCoordinates);
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


    const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

    const getNeighbors = (node) => {
        const directions = [
            { x: 20, y: 0 }, { x: -20, y: 0 },
            { x: 0, y: 20 }, { x: 0, y: -20 },
            { x: 10, y: 0 }, { x: -10, y: 0 },
            { x: 0, y: 10 }, { x: 0, y: -10 },
            { x: 5, y: 0 }, { x: -5, y: 0 },
            { x: 0, y: 5 }, { x: 0, y: -5 }
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

    const findPath = (start, end) => {
        const openSet = [start];
        const cameFrom = {};
        const gScore = { [`${start.x},${start.y}`]: 0 };
        const fScore = { [`${start.x},${start.y}`]: heuristic(start, end) };

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
                const path = reconstructPath(cameFrom, current);
                return path;
            }

            for (let neighbor of getNeighbors(current)) {
                const tentativeGScore = gScore[`${current.x},${current.y}`] + 1;
                if (tentativeGScore < (gScore[`${neighbor.x},${neighbor.y}`] || Infinity)) {
                    cameFrom[`${neighbor.x},${neighbor.y}`] = current;
                    gScore[`${neighbor.x},${neighbor.y}`] = tentativeGScore;
                    fScore[`${neighbor.x},${neighbor.y}`] = tentativeGScore + heuristic(neighbor, end);

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
        if ([1033, 1034, 1035, 1037].includes(startKey)) {
            startKey = 0;
        }
// endKey=0 if it matches any of the values
        if ([1033, 1034, 1035, 1037].includes(endKey)) {
            endKey = 0;
        }

        if (isNaN(startKey) || isNaN(endKey)) {
            alert("Ошибка: введите числовые значения!");
            return;
        }

        const start = currentCoordinates[startKey];
        const end = currentCoordinates[endKey];
        console.log("Старт")
        console.log(start, startKey)
        console.log("Конец")
        console.log( end, endKey)


        if ((!start || !end) ||(field1 >=1609 || field2 >=1609) ||(field1 <=1000 || field2 <=1000)) {
            alert("Ошибка: введены некорректные номера аудиторий для корпуса №1!");
            console.log(start, startKey)
            return;
        }

        // Находим путь для field1
        const entranceKey = 8; // предположим, что ЛЕСТНИЦА - это точка 8
        const entrance = currentCoordinates[entranceKey];
        const pathToStart = findPath( start, entrance);
        setPath1(pathToStart);

        // Находим путь для field2
        const pathToEnd = findPath(entrance, end);
        setPath2(pathToEnd);

        // Остальной код для изображений...
        const hundredsDigit1 = Math.floor( field1 !== undefined && field1 !== "" ? Math.floor((Number(field1) % 1000) / 100) : 0 );
        const hundredsDigit2 = Math.floor(field2 !== undefined && field2 !== "" ? Math.floor((Number(field2) % 1000) / 100) : 0 );
        const imageIndex1 = Math.min(6, Math.max(0, hundredsDigit1));
        const imageIndex2 = Math.min(6, Math.max(0, hundredsDigit2));
        console.log("Старт ", parseInt(field1))
        console.log("Конец ", parseInt(field2))

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
                                />
                                {/* Добавляем floor-info после первого изображения */}
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
const Maze = ({mazeImage, path}) => {
    const imgRef = useRef();
    const [imageSize, setImageSize] = useState({width: 0, height: 0});

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
            (yPercent / 100) * imageSize.height ,
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
                        strokeWidth={7}
                        lineCap="round"
                        lineJoin="round"
                        listening={false}
                    />
                )}
            </Layer>
        </Stage>
    );
};
const App = () => {

    const [currentCoordinates] = useState(roomCoordinatesList[8]);



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
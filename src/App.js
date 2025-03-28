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
    // Координаты для изображения 0
    {
        1: { x: 20, y: 10 },  // 10% от ширины и высоты экрана
        2: { x: 40, y: 10 },
        3: { x: 60, y: 10 },
        4: { x: 20, y: 30 },
        5: { x: 40, y: 30 },
        6: { x: 60, y: 30 },
        7: { x: 20, y: 50 },
        8: { x: 40, y: 50 },
        9: { x: 60, y: 50 }  //9 везде это координаты лесницы
    },
    // Координаты для изображения 1
    {
        1: { x: 15, y: 15 },
        2: { x: 35, y: 15 },
        3: { x: 55, y: 15 },
        4: { x: 15, y: 35 },
        5: { x: 55, y: 35 },
        6: { x: 55, y: 35 },
        7: { x: 15, y: 55 },
        8: { x: 35, y: 55 },
        9: { x: 55, y: 55 }
    },

    // Координаты для изображения 2
    {
        1: { x: 20, y: 20 },
        2: { x: 40, y: 20 },
        3: { x: 60, y: 20 },
        4: { x: 20, y: 40 },
        5: { x: 40, y: 40 },
        6: { x: 60, y: 40 },
        7: { x: 20, y: 60 },
        8: { x: 40, y: 60 },
        9: { x: 60, y: 60 },
        10: { x: 20, y: 60 },
    },
    //3
    {
        1: { x: 20, y: 10 },
        2: { x: 40, y: 10 },  // 40% от ширины (428)
        3: { x: 60, y: 10 },  // 60% от ширины (642)
        4: { x: 20, y: 30 },  // 30% от высоты (702)
        5: { x: 40, y: 30 },
        6: { x: 60, y: 30 },
        7: { x: 20, y: 50 },  // 50% от высоты (1170)
        8: { x: 40, y: 50 },
        9: { x: 60, y: 50 }
    },
    //  4
    {
        1: { x: 25, y: 25 },
        2: { x: 45, y: 25 },
        3: { x: 65, y: 25 },
        4: { x: 25, y: 45 },
        5: { x: 45, y: 45 },
        6: { x: 65, y: 45 },
        7: { x: 25, y: 65 },
        8: { x: 45, y: 65 },
        9: { x: 65, y: 65 }
    },
    //5
    {
        1: { x: 30, y: 30 },
        2: { x: 50, y: 30 },
        3: { x: 70, y: 30 },
        4: { x: 30, y: 50 },
        5: { x: 50, y: 50 },
        6: { x: 70, y: 50 },
        7: { x: 30, y: 70 },
        8: { x: 50, y: 70 },
        9: { x: 70, y: 70 }
    },
    //6
    {
        1: { x: 35, y: 35 },
        2: { x: 55, y: 35 },
        3: { x: 75, y: 35 },
        4: { x: 35, y: 55 },
        5: { x: 55, y: 55 },
        6: { x: 75, y: 55 },
        7: { x: 35, y: 75 },
        8: { x: 55, y: 75 },
        9: { x: 75, y: 75 }
    },
];

const Navigation = ({ currentCoordinates: initialCoordinates }) => {
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [value, setValue] = useState('');
    const [currentCoordinates, setCurrentCoordinates] = useState(initialCoordinates);
    useEffect(() => {
        if (field1) {
            const roomNumber = Math.floor(Number(field1) / 1000) ;
            const floorIndex = Math.floor(roomNumber ) ;

            // Проверяем, что индекс в пределах массива
            if (floorIndex >= 0 && floorIndex < roomCoordinatesList.length) {
                setCurrentCoordinates(roomCoordinatesList[floorIndex]);
            }
        }
    }, [field1]);


    const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

    const getNeighbors = (node) => {
        const directions = [
            { x: 20, y: 0 }, { x: -20, y: 0 },
            { x: 0, y: 20 }, { x: 0, y: -20 }
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
        const startKey = Math.floor((Number(field1) / 1000) );

        const endKey = Math.floor((Number(field2) / 1000));

        if (isNaN(startKey) || isNaN(endKey)) {
            alert("Ошибка: введите числовые значения!");
            return;
        }

        const start = currentCoordinates[startKey];
        const end = currentCoordinates[endKey];

        if ((!start || !end) || (field1 >=7000 || field2 >=7000) ||(field1 <=1000 || field2 <=1000)) {
            alert("Ошибка: введены некорректные номера комнат!");
            return;
        }

        // Находим путь для field1
        const entranceKey = 9; // предположим, что ЛЕСТНИЦА - это комната 9
        const entrance = currentCoordinates[entranceKey];
        const pathToStart = findPath( start, entrance);
        setPath1(pathToStart);

        // Находим путь для field2
        const pathToEnd = findPath(entrance, end);
        setPath2(pathToEnd);

        // Остальной код для изображений...
        const hundredsDigit1 = Math.floor(startKey);
        const hundredsDigit2 = Math.floor(endKey);
        const imageIndex1 = Math.min(6, Math.max(0, hundredsDigit1));
        const imageIndex2 = Math.min(6, Math.max(0, hundredsDigit2));
        console.log(field1, parseInt(field1))

        if (imageIndex1 === imageIndex2) {
            setSelectedImages([`${imageIndex1}.png`]);
        } else {
            setSelectedImages([`${imageIndex1}.png`, `${imageIndex2}.png`]);
            setValue("Переместитесь на " +Math.floor(Number(field2) / 1000) + " этаж");
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

    const [currentCoordinates] = useState(roomCoordinatesList[0]);



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
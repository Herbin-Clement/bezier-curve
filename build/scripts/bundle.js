/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/p5/lib/p5.min.js":
/*!***************************************!*\
  !*** ./node_modules/p5/lib/p5.min.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/***/ }),

/***/ "./src/scripts/lib.js":
/*!****************************!*\
  !*** ./src/scripts/lib.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"computeBezierCurve\": () => (/* binding */ computeBezierCurve),\n/* harmony export */   \"deCasteljauAlgorithm\": () => (/* binding */ deCasteljauAlgorithm),\n/* harmony export */   \"detectColide\": () => (/* binding */ detectColide),\n/* harmony export */   \"drawBezierCurve\": () => (/* binding */ drawBezierCurve),\n/* harmony export */   \"drawPoints\": () => (/* binding */ drawPoints),\n/* harmony export */   \"drawPointsAndLines\": () => (/* binding */ drawPointsAndLines),\n/* harmony export */   \"isInCanvas\": () => (/* binding */ isInCanvas),\n/* harmony export */   \"linearInterpolation\": () => (/* binding */ linearInterpolation),\n/* harmony export */   \"points\": () => (/* binding */ points),\n/* harmony export */   \"vectLine\": () => (/* binding */ vectLine),\n/* harmony export */   \"visualizeBezierCurveDraw\": () => (/* binding */ visualizeBezierCurveDraw)\n/* harmony export */ });\nconst linearInterpolation = (p0, p1, t) => {\n    p0 = p0.copy();\n    p1 = p1.copy();\n    p0.mult(1 - t);\n    p1.mult(t);\n    p0.add(p1);\n    return p0;\n}\n\nconst deCasteljauAlgorithm = (Points, t) => {\n    let [P0, P1, P2, P3] = Points;\n    let A = linearInterpolation(P0, P1, t);\n    let B = linearInterpolation(P1, P2, t);\n    let C = linearInterpolation(P2, P3, t);\n    let D = linearInterpolation(A, B, t);\n    let E = linearInterpolation(B, C, t);\n    let P = linearInterpolation(D, E, t);\n    return { A, B, C, D, E, P };\n}\n\nconst vectLine = (p, P1, P2, color = \"white\") => {\n    p.stroke(color);\n    p.strokeWeight(2);\n    p.line(P1.x, P1.y, P2.x, P2.y);\n    p.noStroke();\n}\n\nconst points = (p, Points, color = \"White\", onlyBorder = false, r) => {\n\n    if (!onlyBorder) p.fill(color);\n    else {\n        p.fill(\"black\")\n        p.stroke(color);\n        p.strokeWeight(3);\n    }\n    Points.forEach(e => p.ellipse(e.x, e.y, r));\n    if (!onlyBorder) p.noFill();\n    p.strokeWeight(1);\n    p.fill(\"white\");\n}\n\nconst detectColide = (p, Points, r) => {\n    let res = -1;\n    console.log(p.mouseX, p.mouseY);\n    Points.forEach((point, index) => {\n        if (p.mouseX > (point.x - r) && p.mouseX < (point.x + r) && p.mouseY > (point.y - r) && p.mouseY < (point.y + r)) {\n            res = index;\n        }\n    });\n    return res;\n}\n\nconst isInCanvas = (p) => {\n    return (p.mouseX > 0 && p.mouseX < (p.windowWidth * 80 / 100) && p.mouseY > 0 && p.mouseY < p.windowHeight);\n}\n\nconst drawPointsAndLines = (p, r, { A, B, C, D, E, P, Points }) => {\n    vectLine(p, A, B, \"yellow\");\n    vectLine(p, B, C, \"yellow\");\n    vectLine(p, D, E, \"pink\");\n    vectLine(p, Points[0], Points[1]);\n    vectLine(p, Points[1], Points[2]);\n    vectLine(p, Points[2], Points[3]);\n    points(p, [A, B, C], \"red\", true, r);\n    points(p, [D, E], \"yellow\", true, r);\n    points(p, [P], \"pink\", true, r);\n    points(p, Points, \"white\", true, r);\n}\n\nconst drawPoints = (p, Points) => {\n    vectLine(p, Points[0], Points[1]);\n    vectLine(p, Points[2], Points[3]);\n    points(p, Points, \"white\", true);\n}\n\nconst computeBezierCurve = (Points, dt) => {\n    let array = [];\n    let t = 0;\n    while (t < 1) {\n        const { A, B, C, D, E, P } = deCasteljauAlgorithm(Points, t);\n        array.push({ A, B, C, D, E, P });\n        t += dt;\n    }\n    return array;\n}\n\nconst drawBezierCurve = (p, vertexArray) => {\n    p.noFill();\n    p.strokeWeight(5);\n    p.beginShape();\n    vertexArray.forEach(({ P }) => {\n        p.vertex(P.x, P.y);\n    });\n    p.strokeWeight(1);\n    p.endShape();\n}\n\nconst visualizeBezierCurveDraw = (p, Points, t_max, dt) => {\n    let vertexArray = [];\n    let t = 0;\n    while(t < t_max) {\n        const { A, B, C, D, E, P } = deCasteljauAlgorithm(Points, t);\n        vertexArray.push({ A, B, C, D, E, P });\n        t += dt;\n    }\n    p.beginShape();\n    p.noFill();\n    vertexArray.forEach(({ P }) => {\n        p.vertex(P.x, P.y);\n    });\n    p.endShape();\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9saWIuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0NBQW9DLDBCQUEwQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbUJBQW1CO0FBQ25DLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsR0FBRztBQUM5QjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbUJBQW1CO0FBQ25DLDJCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsR0FBRztBQUM5QjtBQUNBLEtBQUs7QUFDTDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmV6aWVyY3VydmUvLi9zcmMvc2NyaXB0cy9saWIuanM/MzFlZSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBsaW5lYXJJbnRlcnBvbGF0aW9uID0gKHAwLCBwMSwgdCkgPT4ge1xuICAgIHAwID0gcDAuY29weSgpO1xuICAgIHAxID0gcDEuY29weSgpO1xuICAgIHAwLm11bHQoMSAtIHQpO1xuICAgIHAxLm11bHQodCk7XG4gICAgcDAuYWRkKHAxKTtcbiAgICByZXR1cm4gcDA7XG59XG5cbmNvbnN0IGRlQ2FzdGVsamF1QWxnb3JpdGhtID0gKFBvaW50cywgdCkgPT4ge1xuICAgIGxldCBbUDAsIFAxLCBQMiwgUDNdID0gUG9pbnRzO1xuICAgIGxldCBBID0gbGluZWFySW50ZXJwb2xhdGlvbihQMCwgUDEsIHQpO1xuICAgIGxldCBCID0gbGluZWFySW50ZXJwb2xhdGlvbihQMSwgUDIsIHQpO1xuICAgIGxldCBDID0gbGluZWFySW50ZXJwb2xhdGlvbihQMiwgUDMsIHQpO1xuICAgIGxldCBEID0gbGluZWFySW50ZXJwb2xhdGlvbihBLCBCLCB0KTtcbiAgICBsZXQgRSA9IGxpbmVhckludGVycG9sYXRpb24oQiwgQywgdCk7XG4gICAgbGV0IFAgPSBsaW5lYXJJbnRlcnBvbGF0aW9uKEQsIEUsIHQpO1xuICAgIHJldHVybiB7IEEsIEIsIEMsIEQsIEUsIFAgfTtcbn1cblxuY29uc3QgdmVjdExpbmUgPSAocCwgUDEsIFAyLCBjb2xvciA9IFwid2hpdGVcIikgPT4ge1xuICAgIHAuc3Ryb2tlKGNvbG9yKTtcbiAgICBwLnN0cm9rZVdlaWdodCgyKTtcbiAgICBwLmxpbmUoUDEueCwgUDEueSwgUDIueCwgUDIueSk7XG4gICAgcC5ub1N0cm9rZSgpO1xufVxuXG5jb25zdCBwb2ludHMgPSAocCwgUG9pbnRzLCBjb2xvciA9IFwiV2hpdGVcIiwgb25seUJvcmRlciA9IGZhbHNlLCByKSA9PiB7XG5cbiAgICBpZiAoIW9ubHlCb3JkZXIpIHAuZmlsbChjb2xvcik7XG4gICAgZWxzZSB7XG4gICAgICAgIHAuZmlsbChcImJsYWNrXCIpXG4gICAgICAgIHAuc3Ryb2tlKGNvbG9yKTtcbiAgICAgICAgcC5zdHJva2VXZWlnaHQoMyk7XG4gICAgfVxuICAgIFBvaW50cy5mb3JFYWNoKGUgPT4gcC5lbGxpcHNlKGUueCwgZS55LCByKSk7XG4gICAgaWYgKCFvbmx5Qm9yZGVyKSBwLm5vRmlsbCgpO1xuICAgIHAuc3Ryb2tlV2VpZ2h0KDEpO1xuICAgIHAuZmlsbChcIndoaXRlXCIpO1xufVxuXG5jb25zdCBkZXRlY3RDb2xpZGUgPSAocCwgUG9pbnRzLCByKSA9PiB7XG4gICAgbGV0IHJlcyA9IC0xO1xuICAgIGNvbnNvbGUubG9nKHAubW91c2VYLCBwLm1vdXNlWSk7XG4gICAgUG9pbnRzLmZvckVhY2goKHBvaW50LCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAocC5tb3VzZVggPiAocG9pbnQueCAtIHIpICYmIHAubW91c2VYIDwgKHBvaW50LnggKyByKSAmJiBwLm1vdXNlWSA+IChwb2ludC55IC0gcikgJiYgcC5tb3VzZVkgPCAocG9pbnQueSArIHIpKSB7XG4gICAgICAgICAgICByZXMgPSBpbmRleDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXM7XG59XG5cbmNvbnN0IGlzSW5DYW52YXMgPSAocCkgPT4ge1xuICAgIHJldHVybiAocC5tb3VzZVggPiAwICYmIHAubW91c2VYIDwgKHAud2luZG93V2lkdGggKiA4MCAvIDEwMCkgJiYgcC5tb3VzZVkgPiAwICYmIHAubW91c2VZIDwgcC53aW5kb3dIZWlnaHQpO1xufVxuXG5jb25zdCBkcmF3UG9pbnRzQW5kTGluZXMgPSAocCwgciwgeyBBLCBCLCBDLCBELCBFLCBQLCBQb2ludHMgfSkgPT4ge1xuICAgIHZlY3RMaW5lKHAsIEEsIEIsIFwieWVsbG93XCIpO1xuICAgIHZlY3RMaW5lKHAsIEIsIEMsIFwieWVsbG93XCIpO1xuICAgIHZlY3RMaW5lKHAsIEQsIEUsIFwicGlua1wiKTtcbiAgICB2ZWN0TGluZShwLCBQb2ludHNbMF0sIFBvaW50c1sxXSk7XG4gICAgdmVjdExpbmUocCwgUG9pbnRzWzFdLCBQb2ludHNbMl0pO1xuICAgIHZlY3RMaW5lKHAsIFBvaW50c1syXSwgUG9pbnRzWzNdKTtcbiAgICBwb2ludHMocCwgW0EsIEIsIENdLCBcInJlZFwiLCB0cnVlLCByKTtcbiAgICBwb2ludHMocCwgW0QsIEVdLCBcInllbGxvd1wiLCB0cnVlLCByKTtcbiAgICBwb2ludHMocCwgW1BdLCBcInBpbmtcIiwgdHJ1ZSwgcik7XG4gICAgcG9pbnRzKHAsIFBvaW50cywgXCJ3aGl0ZVwiLCB0cnVlLCByKTtcbn1cblxuY29uc3QgZHJhd1BvaW50cyA9IChwLCBQb2ludHMpID0+IHtcbiAgICB2ZWN0TGluZShwLCBQb2ludHNbMF0sIFBvaW50c1sxXSk7XG4gICAgdmVjdExpbmUocCwgUG9pbnRzWzJdLCBQb2ludHNbM10pO1xuICAgIHBvaW50cyhwLCBQb2ludHMsIFwid2hpdGVcIiwgdHJ1ZSk7XG59XG5cbmNvbnN0IGNvbXB1dGVCZXppZXJDdXJ2ZSA9IChQb2ludHMsIGR0KSA9PiB7XG4gICAgbGV0IGFycmF5ID0gW107XG4gICAgbGV0IHQgPSAwO1xuICAgIHdoaWxlICh0IDwgMSkge1xuICAgICAgICBjb25zdCB7IEEsIEIsIEMsIEQsIEUsIFAgfSA9IGRlQ2FzdGVsamF1QWxnb3JpdGhtKFBvaW50cywgdCk7XG4gICAgICAgIGFycmF5LnB1c2goeyBBLCBCLCBDLCBELCBFLCBQIH0pO1xuICAgICAgICB0ICs9IGR0O1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG59XG5cbmNvbnN0IGRyYXdCZXppZXJDdXJ2ZSA9IChwLCB2ZXJ0ZXhBcnJheSkgPT4ge1xuICAgIHAubm9GaWxsKCk7XG4gICAgcC5zdHJva2VXZWlnaHQoNSk7XG4gICAgcC5iZWdpblNoYXBlKCk7XG4gICAgdmVydGV4QXJyYXkuZm9yRWFjaCgoeyBQIH0pID0+IHtcbiAgICAgICAgcC52ZXJ0ZXgoUC54LCBQLnkpO1xuICAgIH0pO1xuICAgIHAuc3Ryb2tlV2VpZ2h0KDEpO1xuICAgIHAuZW5kU2hhcGUoKTtcbn1cblxuY29uc3QgdmlzdWFsaXplQmV6aWVyQ3VydmVEcmF3ID0gKHAsIFBvaW50cywgdF9tYXgsIGR0KSA9PiB7XG4gICAgbGV0IHZlcnRleEFycmF5ID0gW107XG4gICAgbGV0IHQgPSAwO1xuICAgIHdoaWxlKHQgPCB0X21heCkge1xuICAgICAgICBjb25zdCB7IEEsIEIsIEMsIEQsIEUsIFAgfSA9IGRlQ2FzdGVsamF1QWxnb3JpdGhtKFBvaW50cywgdCk7XG4gICAgICAgIHZlcnRleEFycmF5LnB1c2goeyBBLCBCLCBDLCBELCBFLCBQIH0pO1xuICAgICAgICB0ICs9IGR0O1xuICAgIH1cbiAgICBwLmJlZ2luU2hhcGUoKTtcbiAgICBwLm5vRmlsbCgpO1xuICAgIHZlcnRleEFycmF5LmZvckVhY2goKHsgUCB9KSA9PiB7XG4gICAgICAgIHAudmVydGV4KFAueCwgUC55KTtcbiAgICB9KTtcbiAgICBwLmVuZFNoYXBlKCk7XG59XG5cbmV4cG9ydCB7XG4gICAgbGluZWFySW50ZXJwb2xhdGlvbixcbiAgICBkZUNhc3RlbGphdUFsZ29yaXRobSxcbiAgICB2ZWN0TGluZSxcbiAgICBwb2ludHMsXG4gICAgZGV0ZWN0Q29saWRlLFxuICAgIGlzSW5DYW52YXMsXG4gICAgZHJhd1BvaW50c0FuZExpbmVzLFxuICAgIGRyYXdQb2ludHMsXG4gICAgY29tcHV0ZUJlemllckN1cnZlLFxuICAgIGRyYXdCZXppZXJDdXJ2ZSxcbiAgICB2aXN1YWxpemVCZXppZXJDdXJ2ZURyYXdcbn07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/scripts/lib.js\n");

/***/ }),

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ \"./src/scripts/lib.js\");\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! p5 */ \"./node_modules/p5/lib/p5.min.js\");\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\nconst timeSlider = document.querySelector(\"#time\");\nconst pointsLinesBox = document.querySelector(\"#pointsLines\");\nconst pointsBox = document.querySelector(\"#points\");\nconst startButton = document.querySelector(\"#start\");\nconst animationButton = document.querySelector(\"#animation\");\nconst container = document.querySelector('body');\n\nconst sketch = p => {\n\n    let Points = [];\n    let r = 15;\n    let t = 0;\n    let dt = 0.002;\n    let index = -1;\n\n    let start = false;\n    let locked = false;\n    let animation = true; \n    let vertexArray;\n\n\n\n    startButton.addEventListener(\"click\",() => {\n        if (Points.length === 4) {\n            startButton.disabled = true;\n            start = true;\n        }\n    });\n\n    animationButton.addEventListener(\"click\", () => {\n        animation = true;\n    });\n\n    pointsBox.addEventListener(\"click\", () => {\n        !pointsBox.checked;\n        if(pointsBox.checked) pointsLinesBox.checked = false;\n    });\n\n    pointsLinesBox.addEventListener(\"click\", () => {\n        !pointsLinesBox.checked;\n        if(pointsLinesBox.checked) pointsBox.checked = false;\n    });\n    p.setup = function setup() {\n        p.createCanvas(p.windowWidth * 80 / 100, p.windowHeight);\n    }\n\n    p.draw = function draw() {\n        p.background(\"black\");\n\n        t = p.float(timeSlider.value);\n\n        if(start && !animation) {\n            vertexArray = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.computeBezierCurve)(Points, dt);\n            (0,_lib__WEBPACK_IMPORTED_MODULE_0__.drawBezierCurve)(p, vertexArray);\n            if (pointsLinesBox.checked) {\n                const data = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.deCasteljauAlgorithm)(Points, t);\n                (0,_lib__WEBPACK_IMPORTED_MODULE_0__.drawPointsAndLines)(p, r, {...data, Points});\n            } else if (pointsBox.checked) {\n                (0,_lib__WEBPACK_IMPORTED_MODULE_0__.drawPoints)(p, Points);\n            }\n        } else if (start && animation) {\n            if (t < 1) t += dt;\n            timeSlider.value = String(t);\n            if (pointsLinesBox.checked) {\n                const data = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.deCasteljauAlgorithm)(Points, t);\n                (0,_lib__WEBPACK_IMPORTED_MODULE_0__.drawPointsAndLines)(p, r, {...data, Points});\n            } else if (pointsBox.checked) {\n                (0,_lib__WEBPACK_IMPORTED_MODULE_0__.drawPoints)(p, Points);\n            }\n            (0,_lib__WEBPACK_IMPORTED_MODULE_0__.visualizeBezierCurveDraw)(p, Points, t, dt);\n            if (t > (1 - dt) && t < (1 + dt)) {\n                animationButton.disabled = false;\n                animation = false;\n            }\n        } else {\n            (0,_lib__WEBPACK_IMPORTED_MODULE_0__.points)(p, Points, \"white\", true, r);\n        }\n    }\n\n    p.windowResized = function windowResized() {\n        p.resizeCanvas(windowWidth * 80 / 100, windowHeight);\n    }\n\n    p.mouseClicked = function mouseClicked() {\n        \n        if (index !== -1) {\n        }\n        if (!start && (0,_lib__WEBPACK_IMPORTED_MODULE_0__.isInCanvas)(p)) {\n            Points.push(p.createVector(p.mouseX, p.mouseY));\n            if (Points.length > 4) Points.shift();\n            console.log(Points)\n        }\n        locked = false;\n    }\n\n    p.mousePressed = function mousePressed() {\n        if (pointsBox.checked || pointsLinesBox.checked) {\n            index = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.detectColide)(p, Points, r);   \n            locked = true;\n        }\n    }\n\n    p.mouseDragged = function mouseDragged() {\n        if (locked && index !== -1 && (0,_lib__WEBPACK_IMPORTED_MODULE_0__.isInCanvas)(p)) {\n            Points[index].x = p.mouseX;\n            Points[index].y = p.mouseY;\n            t = 0;\n            vertexArray = [];\n        }\n    }\n\n}\n\nnew (p5__WEBPACK_IMPORTED_MODULE_1___default())(sketch, container);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sketch);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9tYWluLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFZZTs7QUFFSzs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDBCQUEwQix3REFBa0I7QUFDNUMsWUFBWSxxREFBZTtBQUMzQjtBQUNBLDZCQUE2QiwwREFBb0I7QUFDakQsZ0JBQWdCLHdEQUFrQixRQUFRLGdCQUFnQjtBQUMxRCxjQUFjO0FBQ2QsZ0JBQWdCLGdEQUFVO0FBQzFCO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QiwwREFBb0I7QUFDakQsZ0JBQWdCLHdEQUFrQixRQUFRLGdCQUFnQjtBQUMxRCxjQUFjO0FBQ2QsZ0JBQWdCLGdEQUFVO0FBQzFCO0FBQ0EsWUFBWSw4REFBd0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsWUFBWSw0Q0FBTTtBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixnREFBVTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixrREFBWTtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQ0FBc0MsZ0RBQVU7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLElBQUksMkNBQUU7O0FBRU4saUVBQWUsTUFBTSIsInNvdXJjZXMiOlsid2VicGFjazovL2JlemllcmN1cnZlLy4vc3JjL3NjcmlwdHMvbWFpbi5qcz8yOTYzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgbGluZWFySW50ZXJwb2xhdGlvbixcbiAgICBkZUNhc3RlbGphdUFsZ29yaXRobSxcbiAgICB2ZWN0TGluZSxcbiAgICBwb2ludHMsXG4gICAgZGV0ZWN0Q29saWRlLFxuICAgIGlzSW5DYW52YXMsXG4gICAgZHJhd1BvaW50c0FuZExpbmVzLFxuICAgIGRyYXdQb2ludHMsXG4gICAgY29tcHV0ZUJlemllckN1cnZlLFxuICAgIGRyYXdCZXppZXJDdXJ2ZSxcbiAgICB2aXN1YWxpemVCZXppZXJDdXJ2ZURyYXdcbn0gZnJvbSAnLi9saWInO1xuXG5pbXBvcnQgcDUgZnJvbSAncDUnO1xuXG5jb25zdCB0aW1lU2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aW1lXCIpO1xuY29uc3QgcG9pbnRzTGluZXNCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BvaW50c0xpbmVzXCIpO1xuY29uc3QgcG9pbnRzQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwb2ludHNcIik7XG5jb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RhcnRcIik7XG5jb25zdCBhbmltYXRpb25CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FuaW1hdGlvblwiKTtcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuY29uc3Qgc2tldGNoID0gcCA9PiB7XG5cbiAgICBsZXQgUG9pbnRzID0gW107XG4gICAgbGV0IHIgPSAxNTtcbiAgICBsZXQgdCA9IDA7XG4gICAgbGV0IGR0ID0gMC4wMDI7XG4gICAgbGV0IGluZGV4ID0gLTE7XG5cbiAgICBsZXQgc3RhcnQgPSBmYWxzZTtcbiAgICBsZXQgbG9ja2VkID0gZmFsc2U7XG4gICAgbGV0IGFuaW1hdGlvbiA9IHRydWU7IFxuICAgIGxldCB2ZXJ0ZXhBcnJheTtcblxuXG5cbiAgICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoKSA9PiB7XG4gICAgICAgIGlmIChQb2ludHMubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICBzdGFydEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBzdGFydCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFuaW1hdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBhbmltYXRpb24gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcG9pbnRzQm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICFwb2ludHNCb3guY2hlY2tlZDtcbiAgICAgICAgaWYocG9pbnRzQm94LmNoZWNrZWQpIHBvaW50c0xpbmVzQm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICB9KTtcblxuICAgIHBvaW50c0xpbmVzQm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICFwb2ludHNMaW5lc0JveC5jaGVja2VkO1xuICAgICAgICBpZihwb2ludHNMaW5lc0JveC5jaGVja2VkKSBwb2ludHNCb3guY2hlY2tlZCA9IGZhbHNlO1xuICAgIH0pO1xuICAgIHAuc2V0dXAgPSBmdW5jdGlvbiBzZXR1cCgpIHtcbiAgICAgICAgcC5jcmVhdGVDYW52YXMocC53aW5kb3dXaWR0aCAqIDgwIC8gMTAwLCBwLndpbmRvd0hlaWdodCk7XG4gICAgfVxuXG4gICAgcC5kcmF3ID0gZnVuY3Rpb24gZHJhdygpIHtcbiAgICAgICAgcC5iYWNrZ3JvdW5kKFwiYmxhY2tcIik7XG5cbiAgICAgICAgdCA9IHAuZmxvYXQodGltZVNsaWRlci52YWx1ZSk7XG5cbiAgICAgICAgaWYoc3RhcnQgJiYgIWFuaW1hdGlvbikge1xuICAgICAgICAgICAgdmVydGV4QXJyYXkgPSBjb21wdXRlQmV6aWVyQ3VydmUoUG9pbnRzLCBkdCk7XG4gICAgICAgICAgICBkcmF3QmV6aWVyQ3VydmUocCwgdmVydGV4QXJyYXkpO1xuICAgICAgICAgICAgaWYgKHBvaW50c0xpbmVzQm94LmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gZGVDYXN0ZWxqYXVBbGdvcml0aG0oUG9pbnRzLCB0KTtcbiAgICAgICAgICAgICAgICBkcmF3UG9pbnRzQW5kTGluZXMocCwgciwgey4uLmRhdGEsIFBvaW50c30pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwb2ludHNCb3guY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIGRyYXdQb2ludHMocCwgUG9pbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzdGFydCAmJiBhbmltYXRpb24pIHtcbiAgICAgICAgICAgIGlmICh0IDwgMSkgdCArPSBkdDtcbiAgICAgICAgICAgIHRpbWVTbGlkZXIudmFsdWUgPSBTdHJpbmcodCk7XG4gICAgICAgICAgICBpZiAocG9pbnRzTGluZXNCb3guY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBkZUNhc3RlbGphdUFsZ29yaXRobShQb2ludHMsIHQpO1xuICAgICAgICAgICAgICAgIGRyYXdQb2ludHNBbmRMaW5lcyhwLCByLCB7Li4uZGF0YSwgUG9pbnRzfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50c0JveC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgZHJhd1BvaW50cyhwLCBQb2ludHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmlzdWFsaXplQmV6aWVyQ3VydmVEcmF3KHAsIFBvaW50cywgdCwgZHQpO1xuICAgICAgICAgICAgaWYgKHQgPiAoMSAtIGR0KSAmJiB0IDwgKDEgKyBkdCkpIHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25CdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvaW50cyhwLCBQb2ludHMsIFwid2hpdGVcIiwgdHJ1ZSwgcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwLndpbmRvd1Jlc2l6ZWQgPSBmdW5jdGlvbiB3aW5kb3dSZXNpemVkKCkge1xuICAgICAgICBwLnJlc2l6ZUNhbnZhcyh3aW5kb3dXaWR0aCAqIDgwIC8gMTAwLCB3aW5kb3dIZWlnaHQpO1xuICAgIH1cblxuICAgIHAubW91c2VDbGlja2VkID0gZnVuY3Rpb24gbW91c2VDbGlja2VkKCkge1xuICAgICAgICBcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICB9XG4gICAgICAgIGlmICghc3RhcnQgJiYgaXNJbkNhbnZhcyhwKSkge1xuICAgICAgICAgICAgUG9pbnRzLnB1c2gocC5jcmVhdGVWZWN0b3IocC5tb3VzZVgsIHAubW91c2VZKSk7XG4gICAgICAgICAgICBpZiAoUG9pbnRzLmxlbmd0aCA+IDQpIFBvaW50cy5zaGlmdCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coUG9pbnRzKVxuICAgICAgICB9XG4gICAgICAgIGxvY2tlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHAubW91c2VQcmVzc2VkID0gZnVuY3Rpb24gbW91c2VQcmVzc2VkKCkge1xuICAgICAgICBpZiAocG9pbnRzQm94LmNoZWNrZWQgfHwgcG9pbnRzTGluZXNCb3guY2hlY2tlZCkge1xuICAgICAgICAgICAgaW5kZXggPSBkZXRlY3RDb2xpZGUocCwgUG9pbnRzLCByKTsgICBcbiAgICAgICAgICAgIGxvY2tlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwLm1vdXNlRHJhZ2dlZCA9IGZ1bmN0aW9uIG1vdXNlRHJhZ2dlZCgpIHtcbiAgICAgICAgaWYgKGxvY2tlZCAmJiBpbmRleCAhPT0gLTEgJiYgaXNJbkNhbnZhcyhwKSkge1xuICAgICAgICAgICAgUG9pbnRzW2luZGV4XS54ID0gcC5tb3VzZVg7XG4gICAgICAgICAgICBQb2ludHNbaW5kZXhdLnkgPSBwLm1vdXNlWTtcbiAgICAgICAgICAgIHQgPSAwO1xuICAgICAgICAgICAgdmVydGV4QXJyYXkgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5uZXcgcDUoc2tldGNoLCBjb250YWluZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBza2V0Y2g7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/scripts/main.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/main.js");
/******/ 	
/******/ })()
;
function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            // Calculate the index in the dataArray based on current row and column
            let index = i * cols + j;
            if (index < dataArray.length) {
                span.innerHTML = dataArray[index];
            }
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {
	// dataArray is a 2D array
	// complete this function based on the showResult function

    let container = document.getElementById(containerId);
    container.innerHTML = '';
    let table = document.createElement('table');

    for (let i = 0; i < dataArray.length; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < dataArray[i].length; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            span.style.cssText = 'padding:5px;font-size:1em';
            
            span.innerHTML = dataArray[i][j];
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);

    if (operation === 'add') { addMatrices(matrix1, matrix2); }
    if (operation === 'subtract') { subtractMatrices(matrix1, matrix2); }
    if (operation === 'multiply') { multiplyMatrices(matrix1, matrix2); }
}

const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            // Calculate index in the flat list of inputs
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); // Default value if input is missing
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};


// Add your matrix calculation functions here
// The functions must check the posibility of calculation too.
function addMatrices(matrix1, matrix2){ 
	// provide the code

    // Check that the matrixs have the same dimension so that they can be added
    const rows = matrix1.length;
    const cols = matrix1[0].length;
    if (matrix2.length !== rows || matrix2[0].length !== cols) {
        console.error("Matrices must be same dimension to be added.");
        return;
    }

   // Create empty matrix then add the two matrixs
    let result = [];
    for (let i = 0; i < rows; i++) {
        result.push([]);
        for (let j = 0; j < cols; j++) {
            result[i].push(matrix1[i][j] + matrix2[i][j]);
        }
    }

    // Display the matrix
    showResult2D('Addition result', 'matrix3', result);
}
const subtractMatrices = function (matrix1, matrix2) { 
    const rows = matrix1.length;
    const cols = matrix1[0].length;
    if (matrix2.length !== rows || matrix2[0].length !== cols) {
        console.error("Matrices must be same dimension to be subtracted.");
        return;
    }

    // Create an empty matrix that will store the result of the subtraction then subtract matrix 2 from matrix 1
    let result = [];
    for (let i = 0; i < rows; i++) {
        result.push([]);
        for (let j = 0; j < cols; j++) {
            result[i].push(matrix1[i][j] - matrix2[i][j]);
        }
    }

    showResult2D('Subtraction Result', 'matrix3', result);
};  
const multiplyMatrices = (matrix1, matrix2) => { 
    // Check if the matrices can be multiplied
    if (matrix1[0].length !== matrix2.length) {
        console.error("Number of cols in matrix 1 must be equal to number of rows in matrix2");
        return;
    }
    
    // Create empty matrix that is the size of the resulting matrix
    let result = [];
    for (let i = 0; i < matrix1.length; i++) {
        result.push(new Array(matrix2[0].length).fill(0));
    }
    
    // Multiply the two matrices
    for (let i = 0; i < matrix1.length; i++) {
        for (let j = 0; j < matrix2[0].length; j++) {
            for (let k = 0; k < matrix1[0].length; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }
    
    // Call display function to display the result
    showResult2D('Result of multiplying', 'matrix3', result);
};

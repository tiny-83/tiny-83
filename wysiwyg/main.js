const W = 22;
const H = 14;
let grid = [];
let leftCode = null;
let rightCode = null;

window.paintConf = null;

$(document).ready(() => {
  for (let i = 0; i < H; i++) {
    $("#screen").append(`<tr data-i="${i}"></tr>`);
    for (let j = 0; j < W; j++) {
      const dom = $(`<td data-j="${j}" class="off"></td>`);
      dom.on("click", handleClick);
      $("#screen tr").last().append(dom);
    }
  }

  function drawGrid() {
    for (let i = 0; i < H; i++) {
      for (let j = 0; j < W; j++) {
        $(`tr[data-i=${i}] td[data-j=${j}]`)
          .removeClass()
          .addClass(grid[i][j] ? "on" : "off");
      }
    }
  }

  function handleClick() {
    const cellDom = $(this);
    const row = parseInt($(this).parent().attr("data-i"));
    const cell = parseInt($(this).attr("data-j"));
    grid[row][cell] = !grid[row][cell];
    let nowStatus = grid[row][cell];
    cellDom.removeClass().addClass(nowStatus ? "on" : "off");
    if (window.paintConf) {
      if (nowStatus) {
        cellDom.css("background-color", "#" + window.paintConf.pixelColor);
      } else {
        cellDom.css("background-color", window.paintConf.screenColor);
      }
    }
    updateCode();
  }

  function bindDrag() {
    const screen = document.querySelector("#screen");
    let isMouseDown = false;
    screen.addEventListener("mouseup", function () {
      isMouseDown = false;
    });
    screen.addEventListener("mouseleave", function () {
      isMouseDown = false;
    });

    screen.addEventListener("mousedown", function (e) {
      isMouseDown = true;
      screen.addEventListener("mouseover", function (e) {
        if (isMouseDown) {
          if (e.target.tagName === "TD") {
            handleClick.apply(e.target);
          }
        }
      });
    });
  }

  bindDrag();

  function resetGrid() {
    grid = [];
    for (let i = 0; i < H; i++) {
      const row = [];
      for (let j = 0; j < W; j++) {
        row.push(false);
      }
      grid.push(row);
    }
  }

  function updateGrid() {
    resetGrid();
    const xMin = Number($("#x-min").val());
    const xMax = Number($("#x-max").val());
    const yMin = Number($("#y-min").val());
    const yMax = Number($("#y-max").val());
    const nbPointsPerPixel = 16;
    const pixelWidth = (xMax - xMin) / W;
    for (let j = 0; j < W; j++) {
      for (let jIdx = 1; jIdx <= nbPointsPerPixel; jIdx++) {
        const x =
          xMin + j * pixelWidth + (jIdx / (nbPointsPerPixel + 1)) * pixelWidth;
        const f = new Function("x", "return " + $("#user-function").val());
        const y = f(x);
        if (y !== undefined && y < yMax && y > yMin) {
          const i = H - 1 - Math.floor((H * (y - yMin)) / (yMax - yMin));
          grid[i][j] = true;
        }
      }
    }
  }

  function gridToPairOfUint160() {
    let gridR = grid.map((val, index) =>
      [grid].map((row) => row[index]).reverse()
    );
    grid2R = gridR[0].map((val, index) =>
      gridR.map((row) => row[index]).reverse()
    )[0];
    let leftPart = 0n;
    let rightPart = 0n;
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 22; j++) {
        const power = BigInt(13 - i) + 14n * BigInt(j % 11);
        const diff = grid2R[i][j] ? 2n ** power : 0n;
        if (j < 11) {
          leftPart += diff;
        } else {
          rightPart += diff;
        }
      }
    }
    leftCode = leftPart.toString();
    rightCode = rightPart.toString();
    return `${leftCode}, ${rightCode}`;
  }

  function gridFromPairOfUint160(inputString) {
    resetGrid();
    let [_, leftPart, rightPart] = inputString.match(/([0-9]*) *, *([0-9]*)/);
    leftPart = BigInt(leftPart);
    rightPart = BigInt(rightPart);
    leftCode = leftPart.toString();
    rightCode = rightPart.toString();
    for (let j = 0; j < 11; j++) {
      for (let i = 0; i < 14; i++) {
        const leftLsb = leftPart % 2n;
        const rightLsb = rightPart % 2n;
        leftPart /= 2n;
        rightPart /= 2n;
        grid[i][j] = leftLsb ? true : false;
        grid[i][j + 11] = rightLsb ? true : false;
      }
    }
    drawGrid();
  }

  function updateCode() {
    $("#screen-code").val(gridToPairOfUint160());
  }

  function onFunctionChange() {
    try {
      $("#screen-code").val("");
      resetGrid();
      updateGrid();
      drawGrid();
      $("#screen-code").val(gridToPairOfUint160());
    } catch (e) {
      console.log("Invalid function:", e);
    }
  }

  function onScreenCodeChange() {
    gridFromPairOfUint160($("#screen-code").val());
  }

  resetGrid();
  // onFunctionChange();
  $("#x-min").on("input", onFunctionChange);
  $("#x-max").on("input", onFunctionChange);
  $("#y-min").on("input", onFunctionChange);
  $("#y-max").on("input", onFunctionChange);
  $("#user-function").on("input", onFunctionChange);
  $("#screen-code").on("input", onScreenCodeChange);
});

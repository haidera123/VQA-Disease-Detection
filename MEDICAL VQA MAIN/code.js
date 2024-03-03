function simplified_chess_games(inp_param) {
  var i = 0;
  var j = 0;
  var inpArr = inp_param.split("\n");
  var l__arr = new Array();
  var b_mv = 0;
  var w_mv = 0;

  for (i = 0; i < inpArr.length; i++) {
    l__arr[i] = inpArr[i].split(" ");
  }

  l__arr[0][0] = Number(l__arr[0][0]);
  var l_num = 1;

  for (i = 0; i < l__arr[0][0]; i++) {
    l__arr[l_num][0] = Number(l__arr[l_num][0]);
    l__arr[l_num][1] = Number(l__arr[l_num][1]);
    l__arr[l_num][2] = Number(l__arr[l_num][2]);

    w_mv = l__arr[l_num][0];
    b_mv = l__arr[l_num][1];

    l_num++;

    for (j = 0; j < w_mv; j++) {
      l__arr[l_num][2] = Number(l__arr[l_num][2]);
      l_num++;
    }
    for (j = 0; j < b_mv; j++) {
      l__arr[l_num][2] = Number(l__arr[l_num][2]);
      l_num++;
    }
  }

  var gridArr = new Array();

  for (i = 0; i < 4; i++) {
    gridArr[i] = new Array();
    for (j = 0; j < 4; j++) {
      gridArr[i][j] = 0;
    }
  }

  l_num = 1;

  var q_x = 0;
  var q_y = 0;

  var tx = 0;
  var ty = 0;

  var testcontain = false;
  var contain = false;

  for (i = 0; i < l__arr[0][0]; i++) {
    for (j = 0; j < 4; j++) {
      for (k = 0; k < 4; k++) {
        gridArr[j][k] = 0;
      }
    }

    contain = false;

    w_mv = l__arr[l_num][0];
    b_mv = l__arr[l_num][1];

    l_num++;

    for (j = 0; j < w_mv; j++) {
      var info__arr = returnInfo(
        l__arr[l_num][0],
        l__arr[l_num][1],
        l__arr[l_num][2]
      );
      gridArr[info__arr[1]][info__arr[2]] = info__arr[0];

      // process.stdout.write("STORING: "+info__arr[0]+" at "+info__arr[1]+", "+info__arr[2]+"\n");

      l_num++;
    }

    for (j = 0; j < b_mv; j++) {
      var info__arr = returnInfo(
        l__arr[l_num][0],
        l__arr[l_num][1],
        l__arr[l_num][2]
      );
      gridArr[info__arr[1]][info__arr[2]] = 0 - info__arr[0];

      if (info__arr[0] == 1) {
        q_x = info__arr[1];
        q_y = info__arr[2];
      }

      l_num++;
    }

    //Can white queen take black queen?

    for (j = 0; j < 4; j++) {
      for (k = 0; k < 4; k++) {
        if (gridArr[j][k] == 1) {
          tx = j;
          ty = k;

          testcontain = horizontal_mv(tx, ty, q_x, q_y, gridArr);
          if (testcontain == true) {
            contain = true;
          }
          testcontain = vertical__mv(tx, ty, q_x, q_y, gridArr);
          if (testcontain == true) {
            contain = true;
          }
          testcontain = testDiagonal(tx, ty, q_x, q_y, gridArr);
          if (testcontain == true) {
            contain = true;
          }
        }
      }
    }

    //Can white knight take black queen?

    for (j = 0; j < 4; j++) {
      for (k = 0; k < 4; k++) {
        if (gridArr[j][k] == 2) {
          tx = j;
          ty = k;

          testcontain = knight__t(tx, ty, q_x, q_y, gridArr);
          if (testcontain == true) {
            contain = true;
          }
        }
      }
    }

    //Can white bishop take black queen?

    for (j = 0; j < 4; j++) {
      for (k = 0; k < 4; k++) {
        if (gridArr[j][k] == 3) {
          tx = j;
          ty = k;

          testcontain = testDiagonal(tx, ty, q_x, q_y, gridArr);
          if (testcontain == true) {
            contain = true;
          }
        }
      }
    }

    //Can white rook take black queen?

    for (j = 0; j < 4; j++) {
      for (k = 0; k < 4; k++) {
        if (gridArr[j][k] == 4) {
          tx = j;
          ty = k;

          // process.stdout.write("contain\n");

          testcontain = horizontal_mv(tx, ty, q_x, q_y, gridArr);
          if (testcontain == true) {
            contain = true;
          }
          testcontain = vertical__mv(tx, ty, q_x, q_y, gridArr);
          if (testcontain == true) {
            contain = true;
          }
        }
      }
    }

    if (contain == true) {
      process.stdout.write("YES\n");
    } else {
      process.stdout.write("NO\n");
    }
  }
}

function horizontal_mv(tx, ty, q_x, q_y, grid) {
  if (ty != q_y) {
    return false;
  }

  if (Math.abs(ty - q_y) == 1) {
    return true;
  }

  var numBetween = 0;
  var i = 0;

  var start = 0;
  var end = 0;
  if (tx > q_x) {
    start = q_x;
    end = tx;
  } else {
    start = tx;
    end = q_x;
  }

  for (i = start + 1; i < end; i++) {
    if (grid[i][ty] != 0) {
      numBetween++;
    }
  }

  if (numBetween > 0) {
    return false;
  } else {
    return true;
  }
}

function vertical__mv(tx, ty, q_x, q_y, grid) {
  if (tx != q_x) {
    //process.stdout.write("FALSE1: "+tx+", "+q_x+"\n");
    return false;
  }

  if (Math.abs(ty - q_y) == 1) {
    //process.stdout.write("TRUE1\n");
    return true;
  }

  var numBetween = 0;
  var i = 0;

  var start = 0;
  var end = 0;
  if (ty > q_y) {
    start = q_y;
    end = ty;
  } else {
    start = ty;
    end = q_y;
  }

  for (i = start + 1; i < end; i++) {
    if (grid[tx][i] != 0) {
      numBetween++;
    }
  }

  if (numBetween > 0) {
    return false;
  } else {
    return true;
  }
}

function testDiagonal(tx, ty, q_x, q_y, grid) {
  var onDiagonal = false;
  var testx = tx;
  var testy = ty;

  var type = 0;

  while (testx >= 0 && testy >= 0) {
    if (testx == q_x && testy == q_y) {
      onDiagonal = true;
    }

    testy--;
    testx--;
  }

  testx = tx;
  testy = ty;

  while (testx <= 3 && testy <= 3) {
    if (testx == q_x && testy == q_y) {
      onDiagonal = true;
    }
    testy++;
    testx++;
  }

  testx = tx;
  testy = ty;

  while (testx >= 0 && testy <= 3) {
    if (testx == q_x && testy == q_y) {
      onDiagonal = true;
      type = 1;
    }

    testy++;
    testx--;
  }

  testx = tx;
  testy = ty;

  while (testx <= 3 && testy >= 0) {
    if (testx == q_x && testy == q_y) {
      onDiagonal = true;
      type = 1;
    }

    testy--;
    testx++;
  }

  if (onDiagonal == false) {
    return false;
  }

  if (Math.abs(ty - q_y) == 1) {
    return true;
  }

  var numBetween = 0;
  var i = 0;

  var start = 0;
  var end = 0;
  var start1 = 0;

  if (ty > q_y) {
    start = q_y;
    end = ty;
    start1 = q_x;
  } else {
    start = ty;
    end = q_y;

    start1 = tx;
  }

  for (i = start + 1; i < end; i++) {
    if (type == 0) {
      start1++;
    } else {
      start1--;
    }

    if (start1 >= 0 && start1 <= 3) {
      if (grid[start1][i] != 0) {
        numBetween++;
      }
    }
  }

  if (numBetween > 0) {
    return false;
  } else {
    return true;
  }
}

function knight__t(tx, ty, q_x, q_y, gridArr) {
  var contain = false;
  if (tx + 1 == q_x && ty + 2 == q_y) {
    contain = true;
  }
  if (tx + 2 == q_x && ty + 1 == q_y) {
    contain = true;
  }
  if (tx + 1 == q_x && ty - 2 == q_y) {
    contain = true;
  }
  if (tx + 2 == q_x && ty - 1 == q_y) {
    contain = true;
  }
  if (tx - 1 == q_x && ty + 2 == q_y) {
    contain = true;
  }
  if (tx - 2 == q_x && ty + 1 == q_y) {
    contain = true;
  }
  if (tx - 1 == q_x && ty - 2 == q_y) {
    contain = true;
  }
  if (tx - 2 == q_x && ty - 1 == q_y) {
    contain = true;
  }
  return contain;
}

function returnInfo(inf1, inf2, inf3) {
  var info__arr = new Array();

  if (inf1 == "Q") {
    info__arr[0] = 1;
  }
  if (inf1 == "N") {
    info__arr[0] = 2;
  }
  if (inf1 == "B") {
    info__arr[0] = 3;
  }
  if (inf1 == "R") {
    info__arr[0] = 4;
  }

  if (inf2 == "A") {
    info__arr[1] = 0;
  }
  if (inf2 == "B") {
    info__arr[1] = 1;
  }
  if (inf2 == "C") {
    info__arr[1] = 2;
  }
  if (inf2 == "D") {
    info__arr[1] = 3;
  }

  info__arr[2] = inf3 - 1;

  return info__arr;
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_inp_param = "";
process.stdin.on("data", function (inp_param) {
  _inp_param += inp_param;
});

process.stdin.on("end", function () {
  simplified_chess_games(_inp_param);
});

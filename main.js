
const playerX = player("player1", "X", 0);
const playerO = player("Player2", "O", 0);
let currentP = playerX;
let isOver = false;
const board = [];

const gameController = () =>{
    
    if(isOver == false){
        gameBoard();
    }
};


function player(name, sign, score){
    this.name = name;
    this.sign = sign;
    this.score = score;
    
    const getSign = () => sign;
    const getScore = () => score;
    return {name, sign, score};
}



function gameBoard(){
    
    const boxes = document.querySelectorAll(".box");

    for(let i = 0; i < 9; i++){
        board.push(0);
    }

    boxes.forEach((box) => {     
        const boxId = box.getAttribute("id") - 1;
        
        box.addEventListener("click", ()=>{
            
            if(board[boxId] == 0 && isOver == false){
                if(currentP == playerX){
                    board[boxId] = 1;
                    box.textContent = currentP.sign;
                    currentP = playerO;
                }else if(currentP = playerO){
                    board[boxId] = 4;
                    box.textContent = currentP.sign;
                    currentP = playerX;
                    
                }
            }
            win();
            if(isOver){
                dialog.showModal();
            }else{
                if(board.includes(0) == false && isOver == false){
            
                    document.querySelectorAll(".result").forEach((p) =>{
                        p.textContent = "It's a draw!";
                        p.style.cssText = "visibility: visible;";
                    });
                    isOver = true;
                    return;
                }
            }
            
            
        });
    });
}

function win(){
    //win vertically
    for(let i = 0; i<3; i++){
        let total = board[i] + board[i+3] + board[i+6];
        checkWin(total);
    }

    //win horizontally
    for(i=0; i<9; i+=3) {
        let total;
        let array = [];
        array = board.slice(i, i+3);
        total = array.reduce((tot, cur) => {
            return tot + cur ;
        });
        checkWin(total);
      }

      //win diagonally
        let totalDia1 = board[0] + board[4] + board[8];
        checkWin(totalDia1);

        let totalDia2 = board[2] + board[4] + board[6];
        checkWin(totalDia2);
    
    }


    function checkWin(total){
        console.log(isOver);
        if(total == 3 && isOver == false){
            isOver = true;
            console.log("playerx wins");
            playerX.score++;
            document.querySelector(".scoreX").textContent = playerX.score;
            document.querySelectorAll(".result").forEach((p) =>{
                p.textContent = "Player 1 Wins";
                p.style.cssText = "visibility: visible;";
            });
            
            return;
            

        }else if(total == 12 && isOver == false){
            isOver = true;
            console.log("playerO win");
            playerO.score++;
            document.querySelector(".scoreO").textContent = playerO.score;
            document.querySelectorAll(".result").forEach((p) =>{
                p.textContent = "Player 2 Wins";
                p.style.cssText = "visibility: visible;";
            });
            
            return;
            
        }

}

function resetGame(){
    
    board.splice(0, board.length);

    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {     
        
        box.textContent = "";
    });
    document.querySelector(".result").style.cssText = "visibility: hidden";
    isOver = false;
    currentP = playerX;
}

gameController(); //initial call at start


const dialog = document.querySelector("#Dialog");
const confirmBtn = dialog.querySelector("#confirmBtn");

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit the form
  dialog.close();
  resetGame();
  gameController(); //start the game new
});


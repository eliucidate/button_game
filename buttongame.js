function Victory() {
	let modal = document.getElementById('modal');
	modal.style.display = "block";
	let congrats = document.getElementById('congrats');
	congrats.style.display = "block";
}

function Button(id, assoc, color) {
    this.id = id;
    this.assocId = assoc;
	this.color = color;
    this.state = 1;
}

Button.prototype.assignHTML = function(htmlbutton) {
    this.HTML = htmlbutton;
}

Button.prototype.assignBtn = function(id, btns) {
    this.assocPtr = btns[id];
}
Button.prototype.changeState = function() {
    this.state = this.state ^ 1;
	if (this.state == 0) {
		this.HTML.style.background =  '#1a1b1c';
	} else {
		this.HTML.style.background = this.color;
	}
}

Button.prototype.clicked = function(btns) {
    this.changeState();
	this.assocPtr.changeState();
    let winCond = 1;
    for (let b of btns) {
        if (b.state == 1) {
            winCond = 0;
        }
    }
    if (winCond == 1) {
        Victory();
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

window.addEventListener('load', function() {
    const BTN_CT = 4; //Change this variable to produce a puzzle with more buttons!
    let btns = []
    const RIGHT = 100 / Math.floor(BTN_CT / 2);
    const LEFT = 100 / (BTN_CT - Math.floor(BTN_CT / 2));
    let leftCt = 0;
    let rightCt = 0;

    for (let i = 0; i < BTN_CT; i++) {
        let tmp = getRandomInt(0, BTN_CT);
        while (tmp == i) {
            tmp = getRandomInt(0, BTN_CT);
        }
        btns.push(new Button(i, tmp, 'hsla(' + Math.floor(Math.random() * 360) + ', 100%, 70%, 1)'));
        // Make buttons in HTML
        let div = document.createElement("div");
        div.id = i;
        div.className = "cButton";
		div.style.background = btns[i].color;
        if (i <= (BTN_CT - 1) / 2) {
            div.style.left = "0";
            div.style.height = LEFT.toString() + '%';
            div.style.top = leftCt.toString() + '%';
            leftCt = leftCt + LEFT;
        } else {
            div.style.left = "50%";
            div.style.height = RIGHT.toString() + '%';
            div.style.top = rightCt.toString() + '%';
            rightCt += RIGHT;
        }
		div.addEventListener("click", function() {
			btns[i].clicked(btns);
		});
		
		btns[i].assignHTML(div);
        document.getElementById("btns").appendChild(div);
    }
	
    for (let b of btns) {
        b.assignBtn(b.assocId, btns);
    }
	let modal = document.getElementById("modal");
	let welcome = document.getElementById("welcome");
	modal.style.display = "block";
	let closeBtn = document.getElementById("close");
	closeBtn.onclick = function() {
		welcome.style.display = "none";
		modal.style.display = "none";
	}
});
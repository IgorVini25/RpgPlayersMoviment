let data = {
    zoom: 100,
    canvasHeight: $('.content').height(),
    canvasWidth: $('.content').width(),
    Locked: false,
    Objects: [],
};
const canvasHeight = data["canvasHeight"];
const canvasWidth = data["canvasWidth"];

const map = document.querySelector('img.map-base');


var Alt = false, Shift = false;


function toggleMenu() { // WORKING
    if ($("#MenuCard").is(":hidden")) {
        console.log("s");
        $('#MenuCard').show('slide', {direction: 'right'}, 1000);
    } else {
        console.log("n");
        $('#MenuCard').hide('slide', {direction: 'right'}, 1000);
    }
}

function touchHandler(event) {
    var touch = event.changedTouches[0]
    var simulatedEvent = document.createEvent('MouseEvent')
    simulatedEvent.initMouseEvent(
        {
            touchstart: 'mousedown',
            touchmove: 'mousemove',
            touchend: 'mouseup'
        }[event.type],
        true,
        true,
        window,
        1,
        touch.screenX,
        touch.screenY,
        touch.clientX,
        touch.clientY,
        false,
        false,
        false,
        false,
        0,
        null
    )

    touch.target.dispatchEvent(simulatedEvent)
} //WORKING
function initTouchToMouse() {
    document.addEventListener('touchstart', touchHandler, true)
    document.addEventListener('touchmove', touchHandler, true)
    document.addEventListener('touchend', touchHandler, true)
    document.addEventListener('touchcancel', touchHandler, true)
} // WORKING


function changeZoom(zoom) {
    $('.content').css('zoom', `${zoom}%`)
}

function watchObjects() {
    $('.object').each((index, val) => {
        $(val).draggable({
            stack: "div.objects .object",
            start: function (evt, ui) {
                $(this).data('startX', ui.position.left).data('startY', ui.position.top - window.scrollY)
            },
            drag: function (evt, ui) {
                let diffX = ui.position.left - $(this).data('startX')
                let diffY = ui.position.top - $(this).data('startY')

                const zoom = getComputedStyle($(".content")[0]).zoom;

                ui.position.left = +$(this).data('startX') + diffX / zoom
                ui.position.top = +$(this).data('startY') + diffY / zoom

                if (ui.position.left < 0) {
                    console.log("L")
                    ui.position.left = 0;
                }
                if (ui.position.top < 0) {
                    console.log("T")

                    ui.position.top = 0;
                }

                if ((ui.position.left + $(this).width()) * zoom > canvasWidth) {
                    console.log("R")

                    ui.position.left = canvasWidth / zoom - $(this).width();
                }


                if (ui.position.top + $(this).height() * zoom > canvasHeight) {
                    console.log($(this).height() - canvasHeight / zoom)
                    //ui.position.top = canvasHeight / zoom - $(this).height();
                }


                if ((ui.position.top + $(this).height()) * zoom > canvasHeight) {
                    console.log("B")
                    ui.position.top = canvasHeight / zoom - $(this).height();
                }


                $this = $(evt.target);
                data["Objects"][$this.data("data-top-key")]["Left"] = (ui.position.left / canvasWidth) * 100;
                data["Objects"][$this.data("data-top-key")]["Top"] = (ui.position.top / canvasHeight) * 100;
            }
        })
    });
}

function Test() {
    $('.object').each((index, val) => {
        console.log($(val).data("data-top-key"));
    })
}

function toggleLockMap(ToggleAll = false) { //WORKING //Função para destravar e poder mover o mapa
    if (data["Locked"]) {
        $('.content').draggable('enable')
        $('.object').draggable('enable')
    } else {
        $('.content').draggable('disable')
        if (ToggleAll) {// Todo, bloquea todos os objetos
            $('.object').draggable('disable')
        }
    }
    data["Locked"] = !data["Locked"];
}

function addToken() {
    const file = prompt('Digite o caminho da Imagem');

    if (file) {
        let $this = $("<div/>").addClass("object").data("data-top-key", data["Objects"].length).append($("<img/>").attr("src", file).addClass("image")).appendTo(".objects");

        data["Objects"][$this.data("data-top-key")] = {
            name: "default".i,
            Url: file,
            Size: $this.height(),
            Top: 0,
            Left: 0,
            rotation: 0,
            isFlip: false,
            Selected: false,
            Locked: false,
        }
        $this.draggable({
            stack: "div.objects .object",
            start: function (evt, ui) {
                $(this).data('startX', ui.position.left).data('startY', ui.position.top - window.scrollY)
            },
            drag: function (evt, ui) {
                let diffX = ui.position.left - $(this).data('startX')
                let diffY = ui.position.top - $(this).data('startY')

                const zoom = getComputedStyle($(".content")[0]).zoom;

                ui.position.left = +$(this).data('startX') + diffX / zoom
                ui.position.top = +$(this).data('startY') + diffY / zoom

                if (ui.position.left < 0) {
                    console.log("L")
                    ui.position.left = 0;
                }
                if (ui.position.top < 0) {
                    console.log("T")

                    ui.position.top = 0;
                }

                if ((ui.position.left + $(this).width()) * zoom > canvasWidth) {
                    console.log("R")

                    ui.position.left = canvasWidth / zoom - $(this).width();
                }


                if (ui.position.top + $(this).height() * zoom > canvasHeight) {
                    console.log($(this).height() - canvasHeight / zoom)
                    //ui.position.top = canvasHeight / zoom - $(this).height();
                }


                if ((ui.position.top + $(this).height()) * zoom > canvasHeight) {
                    console.log("B")
                    ui.position.top = canvasHeight / zoom - $(this).height();
                }


                $this = $(evt.target);
                data["Objects"][$this.data("data-top-key")]["Left"] = (ui.position.left / canvasWidth) * 100;
                data["Objects"][$this.data("data-top-key")]["Top"] = (ui.position.top / canvasHeight) * 100;
            }
        })
        refreshListeners();
    }
}

function changeMap(url = null) {
    let Urlmap;
    if (!Urlmap) {
        Urlmap = prompt('Digite o link do mapa:')
    }
    if (Urlmap.trim() !== '') {
        fetch(Urlmap)
            .then(function (data) {
                return data.blob()
            })
            .then(function (result) {
                const imgURL = URL.createObjectURL(result)
                map.src = imgURL
            })
            .catch(function (e) {
                alert('Erro ao acessar a imagem')
            })
    } else {
        alert('Erro ao trocar o mapa')
    }
}


function refreshListeners() {
    $(".object").unbind("click").on("click", (e) => {
        let key = $(e.currentTarget).data("data-top-key");
        if (!data["Objects"][key]["Locked"]) {
            if (data["Objects"][key]["Selected"]) {
                data["Objects"][key]["Selected"] = false;
                $(e.currentTarget).removeClass("selected");
            } else {
                data["Objects"][key]["Selected"] = true;
                $(e.currentTarget).addClass("selected");
            }
        }
    })
}


$(() => {
    initTouchToMouse();
    $(".object").each((i, e) => { //Mapeia todos os Tokens
        let $this = $(e);

        $this.data("data-top-key", i);
        data["Objects"][i] = {
            name: "default".i,
            Size: $(e).height(),
            Url: $this.children("img").attr("src"),
            Top: 0,
            Left: 0,
            rotation: 0,
            isFlip: false,
            Selected: false,
            Locked: false,
        }
        if (i === $(".object").length - 1) {
            watchObjects();
            refreshListeners();
        }
    })


    $(".OpenMenu,.CloseMenu").on("click", () => {
        toggleMenu();
    })

    $(".menuaddtoken").on("click", () => {
        addToken();
    })

    $('.content').draggable({
        start: function (evt, ui) {
            console.log("start");
            console.log(ui.position.left, window.scrollY)
            $(this).data('startX', ui.position.left).data('startY', ui.position.top - window.scrollY);
        },
        drag: function (evt, ui) {
            const zoom = getComputedStyle($(".content")[0]).zoom;
            let diffX = ui.position.left - $(this).data('startX');
            let diffY = ui.position.top - $(this).data('startY');
            let containerx = $("main").width();
            let containery = $("main").height();


            ui.position.left = +$(this).data('startX') + diffX / zoom
            ui.position.top = +$(this).data('startY') + diffY / zoom

            if (ui.position.left < -canvasWidth) { //Working
                ui.position.left = -canvasWidth;
            }
            if (ui.position.top < -canvasHeight) { //Working
                ui.position.top = -canvasHeight;
            }
            if (ui.position.left > containerx / zoom) {
                ui.position.left = containerx / zoom;
            }
            if (ui.position.top > containery / zoom) {
                ui.position.top = containery / zoom;
            }
        }
    })


    $('.deleteObj').on('click', function (event, ui) {//TODO fazer funiocal
        console.log("morrido")
        $(".object.selected").each((i, e) => {
            $(e).unbind().remove()
        })
    })

    $(document).on('keydown', (e) => {
        if (e.key === "Alt") {
            Alt = true;
        }
        if (e.key === "Shift") {
            Shift = true;
        }
        let $this = $($('img.image:hover'));
        if ($this.length) {
            if (e.key === "r" || e.key === "R") { //inverter imagem // flip
                //n sei como fiz funfar
                if (data["Objects"][$this.parent().data("data-top-key")]["isFlip"] === true) {
                    $this.css("transform", ` rotate(${data["Objects"][$this.parent().data("data-top-key")]["rotation"]}deg) scaleX(1)`);
                    data["Objects"][$this.parent().data("data-top-key")]["isFlip"] = false;
                } else {
                    $this.css("transform", `rotate(${data["Objects"][$this.parent().data("data-top-key")]["rotation"]}deg) scaleX(-1) `);
                    data["Objects"][$this.parent().data("data-top-key")]["isFlip"] = true;
                }
            }
            if (e.key === "L" || e.key === "l") { //Bloquear, travar objecto
                //n sei como fiz funfar
                console.log(data["Objects"][$this.parent().data("data-top-key")]["Locked"])
                if (data["Objects"][$this.parent().data("data-top-key")]["Locked"] === true) {
                    data["Objects"][$this.parent().data("data-top-key")]["Locked"] = false;
                    $this.parent().draggable("enable");
                } else {
                    data["Objects"][$this.parent().data("data-top-key")]["Locked"] = true;
                    data["Objects"][$this.parent().data("data-top-key")]["Selected"] = false;
                    $this.parent().draggable("disable").removeClass("selected");
                }
            }
        }
    }).on("keyup", (e) => {
        if (e.key === "Alt") {
            Alt = false;
        }
        if (e.key === "Shift") {
            Shift = false;
        }

    });

    jQuery.fn.rotate = function (degrees) {
        console.log($(this).parent().data("data-top-key"));
        $(this).css({transform: `rotate(${degrees}deg) scaleX(${data["Objects"][$(this).parent().data("data-top-key")]["isFlip"] ? -1 : 1})`});
        return $(this);
    };


    $(window).on("mousewheel DOMMouseScroll", (e) => {
        if (Alt) {
            if (e.originalEvent.wheelDelta / 120 > 0) { // ZOOM
                changeZoom(data.zoom += 1)
            } else {
                changeZoom(data.zoom -= 1)
            }

        }
        if (Shift) {
            if (e.originalEvent.wheelDelta / 120 > 0) { // ZOOM

                $('img.image:hover').height(data["Objects"][$('img.image:hover').parent().data("data-top-key")]["Size"] += 10);
                // $('img.image:hover').css({height:(data.Size += 10)+"px" })
                //changeTokenSize(data.Size += 10);
            } else {
                $('img.image:hover').height(data["Objects"][$('img.image:hover').parent().data("data-top-key")]["Size"] -= 10);
                //$('img.image:hover').css({height:(data.Size -= 10)+"px" })
                // changeTokenSize(data.Size -= 10);
            }

        }
        if ($('img.image:active').length) {//Rotacionar (não tirar o scalex, ele que mantém o flip funcionando)
            let $t = $("img.image:active").parent();

            if (e.originalEvent.wheelDelta / 120 > 0) {
                $('img.image:active').css({transform: `rotate(${data["Objects"][$t.data("data-top-key")]["rotation"] += 15}deg) scaleX(${data["Objects"][$t.data("data-top-key")]["isFlip"] ? -1 : 1})`})
            } else {
                $('img.image:active').css({transform: `rotate(${data["Objects"][$t.data("data-top-key")]["rotation"] -= 15}deg) scaleX(${data["Objects"][$t.data("data-top-key")]["isFlip"] ? -1 : 1})`})
            }
        }
    })

})




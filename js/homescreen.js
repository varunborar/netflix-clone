var sliderFilms = document.getElementById('slider-wrapper-films');
var sliderSeries = document.getElementById('slider-wrapper-series');


function scrollLeft(event) {
    // console.log(event.currentTarget.parentElement.lastChild);
    event.currentTarget.parentElement.lastChild.scrollLeft -= 250;
}

function scrollRight(event) {
    // console.log(event);
    event.currentTarget.parentElement.lastChild.scrollLeft += 250;
}

function changeContent(event) {
    var films = document.getElementsByClassName('films');
    var series = document.getElementsByClassName('series');
    if (event.target.firstChild.textContent === "Films") {
        films[0].style.display = "block";
        series[0].style.display = "none";
    } else {
        films[0].style.display = "none";
        series[0].style.display = "block";
    }
}

function closeFullView(event) {
    event.currentTarget.parentElement.parentElement.removeChild(event.currentTarget.parentElement);
}

function expand(event) {
    let data = event.currentTarget.dataset;
    let targetElement = event.currentTarget.parentElement.parentElement;

    if (targetElement.lastChild.classList[0] == "full-view") {
        targetElement.removeChild(targetElement.lastChild);
    }

    let expandElement = document.createElement('div');
    expandElement.classList.add('full-view');
    let image = document.createElement('img');
    image.src = data['source'] + "/large.webp";

    let content = document.createElement('div');
    content.classList.add('content');
    let title = document.createElement('h1');
    title.innerText = data['title'];
    let summary = document.createElement('h4');
    summary.innerText = data['summary'];
    let playButton = document.createElement('button');
    playButton.classList.add("play");
    playButton.innerText = "Play";

    let accIcon = document.createElement('div');
    accIcon.classList.add('close-full-view');
    let accIconImg = document.createElement('img');
    accIconImg.src = "../images/icons/close-slim.webp";

    accIcon.appendChild(accIconImg);
    accIcon.addEventListener('click', closeFullView);

    content.appendChild(title);
    content.appendChild(summary);
    content.appendChild(playButton);

    expandElement.appendChild(accIcon);
    expandElement.appendChild(content);
    expandElement.appendChild(image);

    targetElement.appendChild(expandElement);

}


function classifyData(raw) {
    const FILMS = raw['films'];
    const SERIES = raw['series'];

    let classifiedFilms = {};
    let classifiedSeries = {};

    for (var film of FILMS) {
        if (classifiedFilms[film['genre']]) {
            classifiedFilms[film['genre']].push(film);
        } else {
            classifiedFilms[film['genre']] = [];
            classifiedFilms[film['genre']].push(film);
        }
    }
    for (var s of SERIES) {
        if (classifiedSeries[s['genre']]) {
            classifiedSeries[s['genre']].push(s);
        } else {
            classifiedSeries[s['genre']] = [];
            classifiedSeries[s['genre']].push(s);
        }
    }

    createSliders(sliderFilms, classifiedFilms, "films");
    createSliders(sliderSeries, classifiedSeries, "series");
}

function createSliders(container, data, source) {

    let genres = Object.keys(data);
    let basePath = "../images/" + source;
    for (let genre of genres) {
        let sliderContainer = document.createElement('div');
        sliderContainer.classList.add('slider-container');

        let sliderHeader = document.createElement('h2');
        sliderHeader.classList.add('slider-header');
        sliderHeader.innerText = genre;

        let slider = document.createElement('div');
        slider.classList.add("slider", "row", "d-flex", "flex-nowrap");

        for (item of data[genre]) {
            let sliderItem = document.createElement('div');
            sliderItem.classList.add("slider-item", "col-lg-3", "col-md-4", "col-sm-8")
            sliderItem.setAttribute('data-title', item['title']);
            sliderItem.setAttribute('data-source', basePath + "/" + item['source']);
            sliderItem.setAttribute('data-summary', item['summary']);
            sliderItem.setAttribute('data-id', item['id']);
            sliderItem.addEventListener('click', expand);

            let sliderItemImg = document.createElement('img');
            sliderItemImg.src = basePath + "/" + item['source'] + "/small.webp";

            sliderItem.appendChild(sliderItemImg);
            slider.appendChild(sliderItem);
        }

        let leftArrowButton = document.createElement('a');
        leftArrowButton.classList.add('scroll-left');
        leftArrowButton.innerHTML = "&#10094;"
        leftArrowButton.addEventListener('click', scrollLeft);

        let rightArrowButton = document.createElement('a');
        rightArrowButton.classList.add('scroll-right');
        rightArrowButton.innerHTML = "&#10095;"
        rightArrowButton.addEventListener('click', scrollRight)


        sliderContainer.appendChild(leftArrowButton);
        sliderContainer.appendChild(rightArrowButton);

        sliderContainer.appendChild(sliderHeader);
        sliderContainer.appendChild(slider);
        container.appendChild(sliderContainer);
    }
}






fetch("../data/browse.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        classifyData(data);
    });
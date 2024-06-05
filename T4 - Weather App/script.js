const cont = document.querySelector('.cont');
const search = document.querySelector('.searchbox button');
const wb = document.querySelector('.weatherbox');
const wd = document.querySelector('.weatherdetails');
const error404 = document.querySelector('.notfound');
const ch = document.querySelector('.cityhide');

search.addEventListener('click', () => {
    const APIKey = '22ae5ba7e9cc7cc838d0912351710c1a';
    const city = document.querySelector('.searchbox input').value;
    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        if (json.cod === '404') {
            ch.textContent = city;
            cont.style.height = '400px';
            error404.classList.add('active');
            wb.classList.remove('active');
            wd.classList.remove('active');
            return;
        }

        cont.style.height = '555px';
        error404.classList.remove('active');
        wb.classList.add('active');
        wd.classList.add('active');

        const image = document.querySelector('.weatherbox img');
        const temp = document.querySelector('.weatherbox .temp');
        const desc = document.querySelector('.weatherbox .desc');
        const humidity = document.querySelector('.weatherdetails .humidity span');
        const wind = document.querySelector('.weatherdetails .wind span');

        if (ch.textContent == city) {
            return;
        } else {
            ch.textContent = city;
            cont.style.height = '555px'
            cont.classList.add('active');
            wb.classList.add('active');
            wd.classList.add('active');
            error404.classList.remove('active');

            setTimeout(() => {
                cont.classList.remove('active');
            }, 2500);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'img/clear.png';
                    break;
                case 'Clouds':
                    image.src = 'img/cloud.png';
                    break;
                case 'Haze':
                    image.src = 'img/mist.png';
                    break;
                case 'Mist':
                    image.src = 'img/mist.png';
                    break;
                case 'Rain':
                    image.src = 'img/rain.png';
                    break;
                case 'Snow':
                    image.src = 'img/snow.png';
                    break;
                default:
                    image.src = 'img/cloud.png';
            }

            temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            desc.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${parseInt(json.wind.speed)} Km/h`;

            // **Remove previous clones if they exist**
            const prevClones = document.querySelectorAll('#cloneweatherinfo, #clonehumidityinfo, #clonewindinfo');
            prevClones.forEach(clone => clone.remove());

            // Clone and insert new weather information
            const wti = document.querySelector('.weatherinfo');
            const hi = document.querySelector('.humidityinfo');
            const wi = document.querySelector('.windinfo');

            const elClonewti = wti.cloneNode(true);
            const elClonehi = hi.cloneNode(true);
            const elClonewi = wi.cloneNode(true);

            elClonewti.id = 'cloneweatherinfo';
            elClonewti.classList.add('activeclone');

            elClonehi.id = 'clonehumidityinfo';
            elClonehi.classList.add('activeclone');

            elClonewi.id = 'clonewindinfo';
            elClonewi.classList.add('activeclone');

            setTimeout(() => {
                wti.insertAdjacentElement("afterend", elClonewti);
                hi.insertAdjacentElement("afterend", elClonehi);
                wi.insertAdjacentElement("afterend", elClonewi);
            }, 2200);

            const cloneweatherinfo = document.querySelectorAll('.infoweather.activeclone');
            const totalCloneweatherinfo = cloneweatherinfo.length;
            const cloneweatherinfofirst = cloneweatherinfo[0];

            const clonehumidityinfo = document.querySelectorAll('.infohumidity.activeclone');
            const clonehumidityinfofirst = clonehumidityinfo[0];

            const clonewindinfo = document.querySelectorAll('.infowind.activeclone');
            const clonewindinfofirst = clonewindinfo[0];

            if (totalCloneweatherinfo > 0) {
                cloneweatherinfofirst.classList.remove('activeclone');
                clonehumidityinfofirst.classList.remove('activeclone');
                clonewindinfofirst.classList.remove('activeclone');

                setTimeout(() => {
                    cloneweatherinfofirst.remove();
                    clonehumidityinfofirst.remove();
                    clonewindinfofirst.remove();
                }, 2200);
            }
        }
    });
});
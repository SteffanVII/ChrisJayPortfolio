let greeting = document.querySelector('.greeting h1:nth-child(2)');

let sectionsObserver = new IntersectionObserver(observerCallBack, {
    threshold: 0.55
});

let fps = 60,
    interval = 1000/fps,
    delta = 0,
    lastTime = (new Date().getTime()),
    currentTime = 0;

let scrollHeight = document.documentElement.scrollHeight - window.innerHeight,
    currentScroll = 0,
    targetScroll = 0;

let randomLetterInterval,
    sectionName = 'Hi';
    cycles = 0,
    textPosition = -1;

// Calls -----------------------

window.requestAnimationFrame(Loop);

greetingsGraphicsTransition();

Array.from(document.querySelectorAll('.observers div')).forEach( observer => {
    sectionsObserver.observe(observer);
} );

// Event listeners -------------

document.body.addEventListener('wheel', (event) => {
    targetScroll += event.deltaY;
    if ( targetScroll > getScrollHeihgt() ) targetScroll = getScrollHeihgt();
    if ( targetScroll < 0 ) targetScroll = 0;
});

Array.from(document.querySelectorAll('.skill-image')).forEach(element => {
    element.addEventListener('mouseover', (event) => {
        document.querySelector('.skill-label').classList.add('show');

        if ( event.target.classList.contains('html') ) {
            document.querySelector('.skill-label').innerText = 'Html';
            document.querySelector('.skill-label').style.setProperty('--skill-label-position', 'calc( 20% - 32px )');
        }
        else if ( event.target.classList.contains('css') ) {
            document.querySelector('.skill-label').innerText = 'Css';
            document.querySelector('.skill-label').style.setProperty('--skill-label-position', 'calc( 40% - 32px )');
        }
        else if ( event.target.classList.contains('js') ) {
            document.querySelector('.skill-label').innerText = 'Javascript';
            document.querySelector('.skill-label').style.setProperty('--skill-label-position', 'calc( 60% - 32px )');
        }
        else if ( event.target.classList.contains('sass') ) {
            document.querySelector('.skill-label').innerText = 'Sass';
            document.querySelector('.skill-label').style.setProperty('--skill-label-position', 'calc( 80% - 32px )');
        }
        else if ( event.target.classList.contains('react') ) {
            document.querySelector('.skill-label').innerText = 'ReactJs';
            document.querySelector('.skill-label').style.setProperty('--skill-label-position', 'calc( 100% - 32px )');
        }
    });

    element.addEventListener('mouseout', (event) => {
        document.querySelector('.skill-label').classList.remove('show');
    })
});

document.querySelector('.contact-button').addEventListener('click', (event) => {
    let contactContainer = document.querySelector('.contact-container');
    console.log('test');
    contactContainer.classList.remove('init');
    contactContainer.classList.add('show');
});

document.querySelector('.contact-close').addEventListener('click', event => {
    document.querySelector('.contact-container').classList.remove('show');
});

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    let form = event.target;
    let name = form.name.value;
    let email = form.email.value;
    let subject = form.subject.value;
    let message = form.message.value;

    let xml = new XMLHttpRequest();

    xml.open( 'POST', 'scripts/backend/contact.php' );
    xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xml.onreadystatechange = event => {
        if ( xml.status == 200 && xml.readyState == 4 ) {
            let response = xml.response;
            console.log(response);
        }
    }

    let params = 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message;

    xml.send(params);
    return false;
});

// Functions ------------------

function MainProcess() {
    scroller();
}

function Loop() {
    
    currentTime = new Date().getTime();
    delta = currentTime - lastTime;

    lastTime = currentTime;
    if ( delta >= interval ) {
        MainProcess();
    }

    window.requestAnimationFrame(Loop);
}

function observerCallBack(entries) {
    if ( entries.length == 1 ) {
        let entry = entries[0];
        let target = entry.target;

        if ( target.classList.contains('greeting-observer') ) {
            document.querySelector('#greeting-section').classList.toggle('close');
            document.querySelector('.section-number').innerText = '/001';
            if ( sectionName != 'greetings' ) {
                randomLetterInterval = randomLetterTransition("greetings", 50, 3, (generated) => {
                    if ( generated != document.querySelector('.section-name').innerText ) {
                        document.querySelector('.section-name').innerText = generated;
                    }
                });
            }
            sectionName = 'greetings';
        }
        else if ( target.classList.contains('about-observer') ) {
            document.querySelector('#about-section').classList.toggle('close');
            document.querySelector('#about-section .wrapper').classList.remove('init');
            document.querySelector('.section-number').innerText = '/010';
            if ( sectionName != 'about' ) {
                randomLetterInterval = randomLetterTransition("about", 80, 3, (generated) => {
                    if ( generated != document.querySelector('.section-name').innerText ) {
                        document.querySelector('.section-name').innerText = generated;
                    }
                });
            }
            sectionName = 'about';
        }
        else if ( target.classList.contains('projects-observer') ) {
            document.querySelector('#projects-section').classList.toggle('close');
            document.querySelector('#projects-section .wrapper').classList.remove('init');
            document.querySelector('.section-number').innerText = '/011';
            if ( sectionName != 'projects' ) {
                randomLetterInterval = randomLetterTransition("projects", 50, 3, (generated) => {
                    if ( generated != document.querySelector('.section-name').innerText ) {
                        document.querySelector('.section-name').innerText = generated;
                    }
                });
            }
            sectionName = 'projects';
        }
    }
}

function getScrollHeihgt() {
    return (window.innerHeight * 3) - window.innerHeight;
}

function scroller() {
    currentScroll += Math.floor((targetScroll - currentScroll) * 0.05);
    if ( currentScroll > getScrollHeihgt() - 20 ) currentScroll = getScrollHeihgt();
    document.querySelector('.observers').style.setProperty('--position', '-' + currentScroll + "px");
    let linePosition = (currentScroll / getScrollHeihgt()) * 100;
    document.querySelector('.currentScroll').innerText = Math.floor(linePosition) + ' %';
    document.querySelector('.line').style.setProperty('--line-position', (100 - linePosition) + "%" );
}

function randomLetterTransition( text, speed, cycle, callback ) {
    let letters = "abcdefghijklmnopqrstuvwxyz";
    cycles = 0;
    textPosition = -1;

    if ( randomLetterInterval != undefined ) clearInterval(randomLetterInterval);

    return setInterval(() => {
        let generated = "";

        if ( cycles === cycle ) {
            cycles = 0;
            textPosition++;
        }

        if ( generated != text ) {
            for (let index = 0; index < text.length; index++) {
                if ( index <= textPosition && textPosition != -1 ) {
                    generated = generated + text.split('')[index];
                } else {
                    generated = generated + letters.split('')[Math.floor(Math.random() * letters.length)];
                }
            }
        }
        cycles++;
        
        callback(generated);
    }, speed);
}

function greetingsGraphicsTransition() {
    let greetingsSvg = document.getElementById('greetings-graphics');
    let lines = Array.from(greetingsSvg.querySelectorAll('.code-line'));
    let wireframes = Array.from(greetingsSvg.querySelectorAll('.wireframe'));
    let numbers = Array.from(greetingsSvg.querySelectorAll('.number'));
    let main = document.querySelector('.main');

    lines.forEach( line => {
        let totalLength = line.getTotalLength();
        line.style.setProperty('--totalLength', totalLength + 'px');
    });

    wireframes.forEach( wireframe => {
        let totalLength = wireframe.getTotalLength();
        wireframe.style.setProperty('--totalLength', totalLength + 'px');
    } );

    numbers.reverse().forEach( number => {
        number.style.setProperty('animation-delay', 0.1 * numbers.indexOf(number) + 's');
    } );
    
    main.style.setProperty('--totalLength', main.getTotalLength() + 'px');
}
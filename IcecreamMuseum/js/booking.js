document.addEventListener('DOMContentLoaded', function () {
    const stepsContent = document.querySelectorAll('.wizard-content > div');
    const stepsProgress = document.querySelectorAll('.wizard-progress-bar-item__text');
    const linesProgress = document.querySelectorAll('.wizard-progress-bar-item__line');
    const informer = document.querySelector('.informer');
    const informerBtn = document.querySelector('.wizard-step-page__button .button');

    
    let currentStep = 0;
    let selectedDay = null; // какой день выбран

    function goToStep(index) {
        stepsContent.forEach((content, i) => {
            content.style.display = (i === index) ? '' : 'none';
        });

        stepsProgress.forEach((item, i) => {
            item.classList.remove('-is-current', '-is-done');
            if (i < index) item.classList.add('-is-done');
            if (i === index) item.classList.add('-is-current');
        });

        linesProgress.forEach((line, i) => {
            line.classList.remove('-is-current', '-is-done');
            if (i < index) line.classList.add('-is-done');
            if (i === index) line.classList.add('-is-current');
        });

        currentStep = index;
    }

    function nextStep() {
        if (currentStep < stepsContent.length - 1) goToStep(currentStep + 1);
    }

    function prevStep() {
        if (currentStep > 0) goToStep(currentStep - 1);
    }

    // выбор дня
    document.querySelectorAll('.calendar-day:not(.-disable)').forEach(day => {
        day.addEventListener('click', () => {
            if (selectedDay === day) {
                // повторный клик — снимаем выбор
                day.classList.remove('selected', '-selected');
                selectedDay = null;

                // скрываем информер и сбрасываем кнопку
                if (informer) informer.style.display = 'none';
                if (informerBtn) informerBtn.disabled = true;

                // убираем выделение времени
                document.querySelectorAll('.informer-content-time__value').forEach(t => t.classList.remove('selected'));
                return;
            }

            // снимаем выделение со всех
            document.querySelectorAll('.calendar-day.selected').forEach(d => d.classList.remove('selected'));

            // выделяем новый день
            day.classList.add('selected','-selected');
            selectedDay = day;

            // показываем информер, блокируем кнопку
            if (informer) informer.style.display = 'block';
            if (informerBtn) informerBtn.disabled = true;

            // сбрасываем выбор времени
            document.querySelectorAll('.informer-content-time__value').forEach(t => t.classList.remove('selected'));
        });
    });




   
    // выбор времени
    document.querySelectorAll('.informer-content-time__value').forEach(time => {
        time.addEventListener('click', () => {
            // снимаем выделение с других
            document.querySelectorAll('.informer-content-time__value').forEach(t => t.classList.remove('selected'));
            // выделяем текущий
            time.classList.add('selected');
            // включаем кнопку
            if (informerBtn) {
                informerBtn.disabled = false;
            }
        });
    });

    // продолжить в корзину
    if (informerBtn) {
        informerBtn.addEventListener('click', () => {
            if (!document.querySelector('.informer-content-time__value.selected')) return;
            if (informer) informer.style.display = 'none';
            goToStep(1);
        });
    }

    const basketBtn = document.querySelector('.basket__buttons .button');
    if (basketBtn) basketBtn.addEventListener('click', nextStep);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextStep();
        if (e.key === 'ArrowLeft') prevStep();
    });

    goToStep(0);
});

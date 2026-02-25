'use strict';

class DatePicker {
    constructor(id, callback) {
        this.id = id;
        this.callback = callback;
        this.currentDate = null;
    }

    render(date) {
        this.currentDate = new Date(date.getFullYear(), date.getMonth(), 1);
        this.renderCalendar();
    }

    renderCalendar() {
        const container = document.getElementById(this.id);
        if (!container) {
            return;
        }

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        // for easy scroll
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const dayAbbrevs = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        // Clear existing content
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        // essentially, we are creating 2 divs.
        // first div is for title, button, second div
        // is the table for date.

        const calendar = document.createElement('div');
        calendar.className = 'dp-calendar';

        const header = document.createElement('div');
        header.className = 'dp-header';

        // button for previous month
        // when pressed, re-render the calendar (inefficient but oh well)
        const prevBtn = document.createElement('button');
        prevBtn.className = 'dp-nav dp-prev';
        prevBtn.textContent = '<';
        prevBtn.addEventListener('click', () => {
            this.currentDate = new Date(year, month - 1, 1);
            this.renderCalendar();
        });

        // MONTH_YEAR between month buttons
        const monthYearLabel = document.createElement('span');
        monthYearLabel.className = 'dp-month-year';
        monthYearLabel.textContent = `${monthNames[month]} ${year}`;

        // button for next month
        const nextBtn = document.createElement('button');
        nextBtn.className = 'dp-nav dp-next';
        nextBtn.textContent = '>';
        nextBtn.addEventListener('click', () => {
            this.currentDate = new Date(year, month + 1, 1);
            this.renderCalendar();
        });

        header.appendChild(prevBtn);
        header.appendChild(monthYearLabel);
        header.appendChild(nextBtn);

        const table = document.createElement('table');
        table.className = 'dp-table';

        // thead, used for day abbreviations in a week
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        for (const abbrev of dayAbbrevs) {
            const th = document.createElement('th');
            th.className = 'dp-dow';
            th.textContent = abbrev;
            headerRow.appendChild(th);
        }
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        // get the first day of the week
        const firstDay = new Date(year, month, 1).getDay();

        // cursor essentially starts at the Sunday of the week,
        // no matter what day is it goes back that exact day for sunday.
        const cursor = new Date(year, month, 1 - firstDay); 

        let done = false;
        while (!done) {
            const row = document.createElement('tr');

            for (let col = 0; col < 7; col++) {
                const d = cursor.getDate();
                const m = cursor.getMonth();
                const y = cursor.getFullYear();
                const isCurrentMonth = m === month && y === year;

                const td = document.createElement('td');
                td.className = isCurrentMonth ? 'dp-day' : 'dp-day dp-other';
                td.textContent = d;

                if (isCurrentMonth) {
                    const day = d;
                    const mon = m + 1;
                    const yr = y;
                    td.addEventListener('click', () => {
                        this.callback(this.id, { month: mon, day: day, year: yr });
                    });
                }

                row.appendChild(td);
                cursor.setDate(cursor.getDate() + 1);
            }

            tbody.appendChild(row);

            if (cursor.getMonth() !== month || cursor.getFullYear() !== year) {
                done = true;
            }
        }

        // append stuffs together
        table.appendChild(tbody);
        calendar.appendChild(header);
        calendar.appendChild(table);
        container.appendChild(calendar);
    }
}

window.onload = function () {

  var today = new Date();
  var thisYear = today.getFullYear();
  var thisMonth = today.getMonth() + 1; // Note that `getMonth()` returns 0-11
  var thisDate = today.getDate();
  var calendar = document.getElementsByClassName('my-calendar')[0];
  var tableHtml = '';

  // the first to run, the year and month equal to this year and this month
  // function: initialize the `tableHtml`
  function initCalendar() {
    tableHtml += '<table><thead class="calendar-head"><tr class="calendar-title"><th class="calendar-title-left"><span class="circle">\<</span></th> <th colspan="5" class="calendar-title-name"><span class="cur-year">' + thisYear + '</span>年<span class="cur-month">' + thisMonth + '</span>月</th><th class="calendar-title-right"><span class="circle">\></span></th></tr><tr class="calendar-week-days"><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead>';
    tableHtml += generateCalendarBody(thisYear, thisMonth);
    tableHtml += '</table>';
    calendar.innerHTML = tableHtml;
  }

  function findWritingDatesInYearAndMonth(year, month) {

    var month = Number(month);//int
    if (month < 10) {
      month = '0' + month;//string
    }
    var match = year + '-' + month
    var days = []

    for (var i = 0; i < dates.length; i++) {
      if (dates[i].startsWith(match)) {
        days.push(dates[i].substr(8, 10))
      }
    }
    console.log(days)
    return days
  }

  function generateCalendarBody(year, month) {

    days = findWritingDatesInYearAndMonth(year, month)

    // Note that `Date()` uses month 0-11
    var lastDayOfPreviousMonth = new Date(year, month - 1, 0);
    var lastDayOfCurrentMonth = new Date(year, month, 0);
    var lastDayOfPreviousMonthDay = lastDayOfPreviousMonth.getDay();
    var lastDayOfPreviousMonthDate = lastDayOfPreviousMonth.getDate();
    var lastDayOfCurrentMonthDate = lastDayOfCurrentMonth.getDate();
    var lastDayOfCurrentMonthDay = lastDayOfCurrentMonth.getDay();

    // day=6 Saturday means 
    // the first day of this month is Sunday -> the first date in calendar is 1
    var firstDayOfCalendarDate = (lastDayOfPreviousMonthDay != 6) ? lastDayOfPreviousMonthDate - lastDayOfPreviousMonthDay : 1;

    var tbodyHtml = '<tbody class="calendar-content">';
    var displayDate = 0; // date to display in the calendar
    var isThisMonth = (year == thisYear && month == thisMonth); // check if this month

    // render the first line in the calendar body
    for (var i = 0; i < 7; i++) {
      var tmpDate = firstDayOfCalendarDate + i;
      if (firstDayOfCalendarDate == 1) {
        displayDate = tmpDate;
        // today class will have a different style
        if (isThisMonth && displayDate == thisDate) {
          if (days.includes(displayDate.toString())) {
            tbodyHtml += '<td class="cur-month today written" onclick="getCalendarDate(this);">' + displayDate + '</td>';
          } else {
            tbodyHtml += '<td class="cur-month today">' + displayDate + '</td>';
          }
        } else {
          if (days.includes(displayDate.toString())) {
            tbodyHtml += '<td class="cur-month written" onclick="getCalendarDate(this);">' + displayDate + '</td>';
          } else {
            tbodyHtml += '<td class="cur-month">' + displayDate + '</td>';
          }
        }
      } else if (tmpDate > lastDayOfPreviousMonthDate) {
        displayDate = tmpDate - lastDayOfPreviousMonthDate;
        // today class will have a different style
        if (isThisMonth && displayDate == thisDate) {
          if (days.includes(displayDate.toString())) {
            tbodyHtml += '<td class="cur-month today written" onclick="getCalendarDate(this);">' + displayDate + '</td>';
          } else {
            tbodyHtml += '<td class="cur-month today">' + displayDate + '</td>';
          }
        } else {
          if (days.includes(displayDate.toString())) {
            tbodyHtml += '<td class="cur-month written" onclick="getCalendarDate(this);">' + displayDate + '</td>';
          } else {
            tbodyHtml += '<td class="cur-month">' + displayDate + '</td>';
          }
        }
      } else {
        displayDate = tmpDate;
        tbodyHtml += '<td class="last-month">' + displayDate + '</td>';
      }
    }
    tbodyHtml += '</tr><tr>'; // the end of a line & the begin of another line
    displayDate++;

    var daysInALine = 0;
    while (displayDate <= lastDayOfCurrentMonthDate) {
      // today class will have a different style
      if (isThisMonth && displayDate == thisDate) {
        if (days.includes(displayDate.toString())) {
          tbodyHtml += '<td class="cur-month today written" onclick="getCalendarDate(this);">' + displayDate + '</td>';
        } else {
          tbodyHtml += '<td class="cur-month today">' + displayDate + '</td>';
        }
      } else {
        if (days.includes(displayDate.toString())) {
          tbodyHtml += '<td class="cur-month written" onclick="getCalendarDate(this);">' + displayDate + '</td>';
        } else {
          tbodyHtml += '<td class="cur-month">' + displayDate + '</td>';
        }
      }
      daysInALine++;
      displayDate++;
      if (daysInALine == 7) {
        tbodyHtml += '</tr>'; // the end of a line
        if (displayDate != lastDayOfCurrentMonthDate)
          tbodyHtml += '<tr>'; // the begin of another line, only for current display date doesn't equal to the last day of current month
        daysInALine = 0
      }
    }

    displayDate = 1; // the first day of next month
    while (daysInALine < 7 && lastDayOfCurrentMonthDay != 6) {
      tbodyHtml += '<td class="next-month">' + displayDate + '</td>';
      displayDate++;
      daysInALine++;
    }
    tbodyHtml += '</tr></tbody>';
    return tbodyHtml
  }

  function updateCalendar(year, month) {
    // update the head
    document.getElementsByClassName('cur-year')[0].innerHTML = year;
    document.getElementsByClassName('cur-month')[0].innerHTML = month;

    // update the body
    document.getElementsByClassName('calendar-content')[0].innerHTML = generateCalendarBody(year, month);
  }

  getCalendarDate = function (object) {
    var year = document.getElementsByClassName('cur-year')[0].innerHTML; //string
    var month = Number(document.getElementsByClassName('cur-month')[0].innerHTML);//int
    var date = Number(object.innerHTML);
    if (month < 10) {
      month = '0' + month;//string
    }
    if (date < 10) {
      date = '0' + date;//string
    }

    // console.log('https://hanmei.netlify.app/' + year + '/' + month + '/' + date)

    window.location.href = 'https://hanmei.netlify.app/' + year + '/' + month + '/' + date;
  }

  // executing...
  initCalendar();

  var prev = document.getElementsByClassName('calendar-title-left')[0];
  var next = document.getElementsByClassName('calendar-title-right')[0];
  var year = document.getElementsByClassName('cur-year')[0].innerHTML; // display year
  var month = document.getElementsByClassName('cur-month')[0].innerHTML; // display month

  prev.onclick = function () {
    console.log("prev");
    if (month == 1) {
      year--;
      month = 12;
    } else {
      month--;
    }
    updateCalendar(year, month);
  };

  next.onclick = function () {
    console.log("next");
    if (month == 12) {
      year++;
      month = 1;
    } else {
      month++;
    }
    updateCalendar(year, month);
  };
}
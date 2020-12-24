import React, { Component } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';
import TransitionsModal from '../modal/modal';
import { PersonalVideo } from '@material-ui/icons';
import moment from 'moment';

export class Calendar extends Component {




    state = {
        modal: false,
        dateContext: moment(),
        today: moment(),
        weekDays: moment.weekdaysShort(),
        selectedDate: null,
        eventData: {
            title: "",
            isEvent: false,
            description: "",
            startTime: "",
            endTime: "",

        },
        allEvents: [],
        serachKeyword: '',
        currentMonth: moment().get("month") + 1,
        activeEditData : ''
    }



    handleModal = (e, date) => {
        this.setState(prev => ({
            modal: !prev.modal,
            selectedDate: date
        }))
    }


    firstDayOfMonth = () => {
        const dateContext = this.state.dateContext
        const firstday = moment(dateContext).startOf('month').format('d')
        return firstday
    }

    lastDayOfMonth = () => {
        const dateContext = this.state.dateContext
        const lastDay = moment(dateContext).endOf('month').format('d')
        return lastDay
    }

    handlePrevMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext)
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({
            dateContext,
            currentMonth: dateContext.get("month") + 1
        })
    }

    handleNextMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext)
        dateContext = moment(dateContext).add(1, "month");
        this.setState({
            dateContext,
            currentMonth: dateContext.get("month") + 1
        })
    }

    handleSave = (eventData) => {
        const { allEvents, selectedDate, currentMonth } = this.state
        const data = eventData
        data.selectedDate = selectedDate
        data.currentMonth = currentMonth
        // const data = Object.assign({},eventData)
        // this.dummyArray.push(Object.assign({},data))
        this.setState(prev => ({
            eventData: data,
            modal: !prev.modal,
            allEvents: [...allEvents, Object.assign({}, data)]
        }))

    }

    handleOpenEvent = (e,data) =>{
        e.preventDefault()
        this.setState(prev=> ({
            modal : !prev.modal,
            activeEditData : data
        }))
    }

    // handleCurrentMonth = () => {

    // }


    render() {
        const { modal, dateContext, weekDays, allEvents, serachKeyword, currentMonth } = this.state
        console.log(this.state.allEvents, currentMonth)
        console.log(this.state.dateContext.get("month") + 1)


        let weekdays = weekDays.map(day => ( // *for short week days
            <li key={day}>{day}</li>
        ))

        let prevMonthdates = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            prevMonthdates.push(
                <div className="date-box last-month">
                    <span>00</span>
                </div>
            )
        }

        let currentMonthDates = []
        for (let i = 1; i <= dateContext.daysInMonth(); i++) {
            currentMonthDates.push(
                <div className="date-box" key={i} onClick={(e) => this.handleModal(e, i)}>
                    <span>{i}</span>
                    {allEvents.map(eve => eve.selectedDate == i && eve.currentMonth == currentMonth ? (
                        <p className={`${serachKeyword == '' ? "" : eve.title.includes(serachKeyword) ? 'd-block' : "d-none"}`} onClick={(e)=>this.handleOpenEvent(e,eve)}>{eve.title}</p>
                    ) : "")}
                </div>
            )
        }


        let nextMonthdates = []
        for (let i = 1; i < 7 - this.lastDayOfMonth(); i++) {
            nextMonthdates.push(
                <div className="date-box last-month">
                    <span>04</span>
                </div>
            )
        }


        let totalDays = [...prevMonthdates, ...currentMonthDates, ...nextMonthdates]

        let rows = []
        let cells = []

        totalDays.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
            if (i === totalDays.length - 1) {
                rows.push(cells);
            }
        });


        let dates = rows.map((day, i) => (
            i != 0 ? <div key={i}>{day}</div> : ""
        ))

        console.log(this.state.serachKeyword == "" || this.state.eventData.title ? true : false)


        return (
            <div className="container">
                <div className="calendar">
                    <div class="front">
                        <div class="current-date">
                            <div className="left-nav">
                                <ArrowBackIosIcon className="next-prev-btns" onClick={this.handlePrevMonth} />
                                <h1>{dateContext.format("MMMM")} {dateContext.format("Y")}</h1>
                                <ArrowForwardIosIcon className="next-prev-btns" onClick={this.handleNextMonth} />
                            </div>
                            <div className="right-nav">
                                <SearchIcon fontSize="large" />
                                <input className="search-box" placeholder="search for events..." type="text" onChange={(e) => this.setState({ serachKeyword: e.target.value })} />
                            </div>
                        </div>

                        <div class="current-month">
                            <ul class="week-days">
                                {weekdays}
                            </ul>

                            <div class="weeks">
                                {dates}
                            </div>
                        </div>
                    </div>
                    <TransitionsModal open={modal}  handleSave={(data) => this.handleSave(data)} handleModal={this.handleModal} />
                </div>
            </div>

        )
    }
}

export default Calendar
